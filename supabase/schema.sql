-- ═══════════════════════════════════════════════════════════════════
-- Database LMS Global Perspectives Kelas 6 — untuk Supabase
-- Cara pakai: Supabase → SQL Editor → New query → tempel seluruh isi file ini → Run.
-- Aman dijalankan ulang.
--
-- Keamanan: semua tabel dikunci (RLS aktif tanpa policy), jadi kunci "anon"
-- di aplikasi TIDAK bisa membaca tabel secara langsung. Aplikasi hanya bisa
-- memanggil fungsi-fungsi di bawah, dan setiap fungsi memeriksa token sesi:
--   • siswa hanya bisa membaca/menyimpan progresnya sendiri;
--   • guru hanya bisa melihat dan menilai siswa di kelasnya sendiri.
-- Kata sandi guru dan PIN siswa tidak pernah dikirim balik kecuali PIN ke guru kelasnya.
-- ═══════════════════════════════════════════════════════════════════

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create table if not exists gp_teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  pw_hash text not null,
  created_at timestamptz not null default now()
);
create table if not exists gp_classes (
  code text primary key,
  name text not null,
  teacher_id uuid not null references gp_teachers(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists gp_students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_code text not null references gp_classes(code) on delete cascade,
  pin text not null,
  created_at timestamptz not null default now()
);
create index if not exists gp_students_class on gp_students(class_code);
create table if not exists gp_progress (
  student_id uuid primary key references gp_students(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists gp_grades (
  student_id uuid not null references gp_students(id) on delete cascade,
  task_id text not null,
  grade int,
  feedback text not null default '',
  rubric jsonb,
  graded_at timestamptz not null default now(),
  primary key (student_id, task_id)
);
create table if not exists gp_sessions (
  token uuid primary key default gen_random_uuid(),
  role text not null check (role in ('teacher','student')),
  user_id uuid not null,
  created_at timestamptz not null default now()
);
create table if not exists gp_login_attempts (
  key text primary key,
  fails int not null default 0,
  last_at timestamptz not null default now()
);

alter table gp_teachers enable row level security;
alter table gp_classes enable row level security;
alter table gp_students enable row level security;
alter table gp_progress enable row level security;
alter table gp_grades enable row level security;
alter table gp_sessions enable row level security;
alter table gp_login_attempts enable row level security;
revoke all on gp_teachers, gp_classes, gp_students, gp_progress, gp_grades, gp_sessions, gp_login_attempts from public;
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on gp_teachers, gp_classes, gp_students, gp_progress, gp_grades, gp_sessions, gp_login_attempts from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on gp_teachers, gp_classes, gp_students, gp_progress, gp_grades, gp_sessions, gp_login_attempts from authenticated';
  end if;
end $$;

-- ── fungsi bantu (internal, tidak bisa dipanggil dari aplikasi)
create or replace function gp__session(p_token uuid, p_role text default null)
returns gp_sessions language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  select * into s from gp_sessions where token = p_token and created_at > now() - interval '120 days';
  if s.token is null then raise exception 'SESI_HABIS' using hint = 'Silakan masuk lagi.'; end if;
  if p_role is not null and s.role <> p_role then raise exception 'TIDAK_DIIZINKAN'; end if;
  return s;
end $$;

create or replace function gp__teacher_owns_student(p_teacher uuid, p_student uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from gp_students s join gp_classes c on c.code = s.class_code
                 where s.id = p_student and c.teacher_id = p_teacher);
$$;

create or replace function gp__can_access_student(p_token uuid, p_student uuid)
returns gp_sessions language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token);
  if s.role = 'student' and s.user_id = p_student then return s; end if;
  if s.role = 'teacher' and gp__teacher_owns_student(s.user_id, p_student) then return s; end if;
  raise exception 'TIDAK_DIIZINKAN';
end $$;

create or replace function gp__throttle(p_key text) returns void
language plpgsql security definer set search_path = public as $$
declare a gp_login_attempts;
begin
  select * into a from gp_login_attempts where key = p_key;
  if a.key is not null and a.fails >= 5 and a.last_at > now() - interval '5 minutes' then
    raise exception 'TERLALU_BANYAK' using hint = 'Terlalu banyak percobaan. Tunggu 5 menit.';
  end if;
end $$;
create or replace function gp__fail(p_key text) returns void
language sql security definer set search_path = public as $$
  insert into gp_login_attempts(key, fails, last_at) values (p_key, 1, now())
  on conflict (key) do update set
    fails = case when gp_login_attempts.last_at < now() - interval '5 minutes' then 1 else gp_login_attempts.fails + 1 end,
    last_at = now();
$$;

create or replace function gp__student_json(s gp_students, with_pin boolean)
returns jsonb language sql immutable as $$
  select jsonb_build_object('id', s.id, 'name', s.name, 'classCode', s.class_code,
    'createdAt', (extract(epoch from s.created_at) * 1000)::bigint)
    || case when with_pin then jsonb_build_object('pin', s.pin) else '{}'::jsonb end;
$$;

create or replace function gp__progress_json(p_student uuid)
returns jsonb language sql security definer set search_path = public as $$
  select jsonb_build_object(
    'data', coalesce((select data from gp_progress where student_id = p_student), '{}'::jsonb),
    'updatedAt', (select (extract(epoch from updated_at) * 1000)::bigint from gp_progress where student_id = p_student),
    'grades', coalesce((select jsonb_object_agg(task_id, jsonb_build_object('grade', grade, 'feedback', feedback, 'rubric', rubric,
                 'gradedAt', (extract(epoch from graded_at) * 1000)::bigint)) from gp_grades where student_id = p_student), '{}'::jsonb));
$$;

-- ── fungsi publik (dipanggil aplikasi)
create or replace function gp_register_teacher(p_name text, p_email text, p_password text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare t gp_teachers; tok uuid;
begin
  if length(coalesce(p_password, '')) < 6 then raise exception 'SANDI_PENDEK' using hint = 'Kata sandi minimal 6 karakter.'; end if;
  if exists (select 1 from gp_teachers where email = lower(trim(p_email))) then
    raise exception 'EMAIL_ADA' using hint = 'Email ini sudah terdaftar. Silakan masuk.';
  end if;
  insert into gp_teachers(name, email, pw_hash)
  values (trim(p_name), lower(trim(p_email)), extensions.crypt(p_password, extensions.gen_salt('bf')))
  returning * into t;
  insert into gp_sessions(role, user_id) values ('teacher', t.id) returning token into tok;
  return jsonb_build_object('token', tok, 'role', 'teacher', 'user', jsonb_build_object('id', t.id, 'name', t.name, 'email', t.email));
end $$;

create or replace function gp_login_teacher(p_email text, p_password text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare t gp_teachers; tok uuid; k text := 't:' || lower(trim(p_email));
begin
  perform gp__throttle(k);
  select * into t from gp_teachers where email = lower(trim(p_email));
  if t.id is null or t.pw_hash <> extensions.crypt(p_password, t.pw_hash) then
    perform gp__fail(k);
    return jsonb_build_object('error', 'Email atau kata sandi salah.');
  end if;
  delete from gp_login_attempts where key = k;
  insert into gp_sessions(role, user_id) values ('teacher', t.id) returning token into tok;
  return jsonb_build_object('token', tok, 'role', 'teacher', 'user', jsonb_build_object('id', t.id, 'name', t.name, 'email', t.email));
end $$;

create or replace function gp_class_public(p_code text)
returns jsonb language sql security definer set search_path = public as $$
  select case when c.code is null then null else jsonb_build_object('code', c.code, 'name', c.name,
    'students', coalesce((select jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name) order by s.name) from gp_students s where s.class_code = c.code), '[]'::jsonb)) end
  from (select 1) x left join gp_classes c on c.code = upper(trim(p_code));
$$;

create or replace function gp_login_student(p_code text, p_student uuid, p_pin text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_students; tok uuid; k text := 's:' || p_student::text;
begin
  perform gp__throttle(k);
  select * into s from gp_students where id = p_student and class_code = upper(trim(p_code));
  if s.id is null or s.pin <> trim(p_pin) then
    perform gp__fail(k);
    return jsonb_build_object('error', 'PIN salah. Tanyakan PIN kepada gurumu.');
  end if;
  delete from gp_login_attempts where key = k;
  insert into gp_sessions(role, user_id) values ('student', s.id) returning token into tok;
  return jsonb_build_object('token', tok, 'role', 'student', 'user', gp__student_json(s, false));
end $$;

create or replace function gp_me(p_token uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions; u jsonb;
begin
  select * into s from gp_sessions where token = p_token and created_at > now() - interval '120 days';
  if s.token is null then return null; end if;
  if s.role = 'teacher' then
    select jsonb_build_object('id', id, 'name', name, 'email', email) into u from gp_teachers where id = s.user_id;
  else
    select gp__student_json(st, false) into u from gp_students st where id = s.user_id;
  end if;
  if u is null then return null; end if;
  return jsonb_build_object('role', s.role, 'id', s.user_id, 'user', u);
end $$;

create or replace function gp_logout(p_token uuid) returns void
language sql security definer set search_path = public as $$ delete from gp_sessions where token = p_token; $$;

create or replace function gp_create_class(p_token uuid, p_name text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions; c text; abc text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; r gp_classes;
begin
  s := gp__session(p_token, 'teacher');
  loop
    c := 'GP6-' || (select string_agg(substr(abc, 1 + floor(random() * length(abc))::int, 1), '') from generate_series(1, 4));
    exit when not exists (select 1 from gp_classes where code = c);
  end loop;
  insert into gp_classes(code, name, teacher_id) values (c, trim(p_name), s.user_id) returning * into r;
  return jsonb_build_object('code', r.code, 'name', r.name, 'teacherId', r.teacher_id, 'createdAt', (extract(epoch from r.created_at) * 1000)::bigint);
end $$;

create or replace function gp_classes_of(p_token uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  return coalesce((select jsonb_agg(jsonb_build_object('code', code, 'name', name, 'teacherId', teacher_id,
    'createdAt', (extract(epoch from created_at) * 1000)::bigint) order by created_at) from gp_classes where teacher_id = s.user_id), '[]'::jsonb);
end $$;

create or replace function gp_delete_class(p_token uuid, p_code text) returns void
language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  delete from gp_classes where code = p_code and teacher_id = s.user_id;
end $$;

create or replace function gp_add_students(p_token uuid, p_code text, p_names text[])
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions; n text; out jsonb := '[]'::jsonb; st gp_students;
begin
  s := gp__session(p_token, 'teacher');
  if not exists (select 1 from gp_classes where code = p_code and teacher_id = s.user_id) then raise exception 'TIDAK_DIIZINKAN'; end if;
  foreach n in array p_names loop
    if trim(n) <> '' then
      insert into gp_students(name, class_code, pin) values (trim(n), p_code, (1000 + floor(random() * 9000))::int::text) returning * into st;
      out := out || gp__student_json(st, true);
    end if;
  end loop;
  return out;
end $$;

create or replace function gp_students_of(p_token uuid, p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  if not exists (select 1 from gp_classes where code = p_code and teacher_id = s.user_id) then raise exception 'TIDAK_DIIZINKAN'; end if;
  return coalesce((select jsonb_agg(gp__student_json(st, true) order by st.name) from gp_students st where st.class_code = p_code), '[]'::jsonb);
end $$;

create or replace function gp_student(p_token uuid, p_student uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__can_access_student(p_token, p_student);
  return (select gp__student_json(st, s.role = 'teacher') from gp_students st where id = p_student);
end $$;

create or replace function gp_reset_pin(p_token uuid, p_student uuid)
returns text language plpgsql security definer set search_path = public as $$
declare s gp_sessions; np text := (1000 + floor(random() * 9000))::int::text;
begin
  s := gp__session(p_token, 'teacher');
  if not gp__teacher_owns_student(s.user_id, p_student) then raise exception 'TIDAK_DIIZINKAN'; end if;
  update gp_students set pin = np where id = p_student;
  delete from gp_sessions where role = 'student' and user_id = p_student;
  return np;
end $$;

create or replace function gp_remove_student(p_token uuid, p_student uuid) returns void
language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  if not gp__teacher_owns_student(s.user_id, p_student) then raise exception 'TIDAK_DIIZINKAN'; end if;
  delete from gp_sessions where role = 'student' and user_id = p_student;
  delete from gp_students where id = p_student;
end $$;

create or replace function gp_get_progress(p_token uuid, p_student uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  perform gp__can_access_student(p_token, p_student);
  return gp__progress_json(p_student);
end $$;

create or replace function gp_save_progress(p_token uuid, p_data jsonb)
returns bigint language plpgsql security definer set search_path = public as $$
declare s gp_sessions; ts timestamptz := now();
begin
  s := gp__session(p_token, 'student');
  if octet_length(p_data::text) > 1000000 then raise exception 'DATA_TERLALU_BESAR'; end if;
  insert into gp_progress(student_id, data, updated_at) values (s.user_id, p_data, ts)
  on conflict (student_id) do update set data = excluded.data, updated_at = ts;
  return (extract(epoch from ts) * 1000)::bigint;
end $$;

create or replace function gp_set_grade(p_token uuid, p_student uuid, p_task text, p_grade int, p_feedback text, p_rubric jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  if not gp__teacher_owns_student(s.user_id, p_student) then raise exception 'TIDAK_DIIZINKAN'; end if;
  insert into gp_grades(student_id, task_id, grade, feedback, rubric, graded_at)
  values (p_student, p_task, p_grade, coalesce(p_feedback, ''), p_rubric, now())
  on conflict (student_id, task_id) do update set grade = excluded.grade, feedback = excluded.feedback, rubric = excluded.rubric, graded_at = now();
end $$;

create or replace function gp_class_progress(p_token uuid, p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare s gp_sessions;
begin
  s := gp__session(p_token, 'teacher');
  if not exists (select 1 from gp_classes where code = p_code and teacher_id = s.user_id) then raise exception 'TIDAK_DIIZINKAN'; end if;
  return coalesce((select jsonb_object_agg(st.id, gp__progress_json(st.id)) from gp_students st where st.class_code = p_code), '{}'::jsonb);
end $$;

-- Hanya fungsi publik (gp_*) yang boleh dipanggil aplikasi; fungsi bantu (gp__*) tidak.
do $$
declare f record;
begin
  for f in select p.oid::regprocedure as sig, p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname like 'gp\_%' loop
    execute format('revoke all on function %s from public', f.sig);
    if f.proname not like 'gp\_\_%' then
      if exists (select 1 from pg_roles where rolname = 'anon') then execute format('grant execute on function %s to anon', f.sig); end if;
      if exists (select 1 from pg_roles where rolname = 'authenticated') then execute format('grant execute on function %s to authenticated', f.sig); end if;
    else
      if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on function %s from anon', f.sig); end if;
      if exists (select 1 from pg_roles where rolname = 'authenticated') then execute format('revoke all on function %s from authenticated', f.sig); end if;
    end if;
  end loop;
end $$;
