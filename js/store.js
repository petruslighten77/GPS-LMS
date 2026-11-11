// Lapisan data. Dua mode dengan fungsi yang sama:
//  • LocalStore    — data di browser perangkat ini (dipakai bila js/config.js kosong)
//  • SupabaseStore — data online di Supabase (dipakai bila js/config.js terisi)

const LocalStore = (() => {
  const KEY = "gp6-lms:v1";
  let mem = null; // cadangan jika localStorage diblokir
  let canLS = true;
  try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); } catch { canLS = false; }

  const empty = () => ({ teachers: {}, classes: {}, students: {}, progress: {}, session: null });

  function load() {
    if (!canLS) return mem || (mem = empty());
    try { return JSON.parse(localStorage.getItem(KEY)) || empty(); } catch { return empty(); }
  }
  function save(db) {
    if (!canLS) { mem = db; return; }
    localStorage.setItem(KEY, JSON.stringify(db));
  }
  const uid = (p) => p + "_" + Math.random().toString(36).slice(2, 10);
  const pin = () => String(Math.floor(1000 + Math.random() * 9000));
  function hash(s) { // hash sederhana (mode lokal)
    let h = 2166136261;
    for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(16);
  }
  function classCode(db) {
    const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c;
    do { c = "GP6-" + Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join(""); } while (db.classes[c]);
    return c;
  }
  const blankProgress = () => ({ lessons: {}, answers: {}, quiz: {}, reflect: {}, interactive: {}, practice: {}, updatedAt: null });

  return {
    mode: canLS ? "local" : "memory",

    // ── sesi
    async me() {
      const db = load(), s = db.session;
      if (!s) return null;
      const user = s.role === "teacher" ? db.teachers[s.id] : db.students[s.id];
      return user ? { ...s, user } : null;
    },
    async classForLogin(code) {
      const db = load(), c = db.classes[(code || "").trim().toUpperCase()];
      if (!c) return null;
      return { code: c.code, name: c.name, students: Object.values(db.students).filter((s) => s.classCode === c.code).sort((a, b) => a.name.localeCompare(b.name)).map((s) => ({ id: s.id, name: s.name })) };
    },
    async logout() { const db = load(); db.session = null; save(db); },

    // ── guru
    async registerTeacher(name, email, password) {
      const db = load();
      email = email.trim().toLowerCase();
      if (Object.values(db.teachers).some((t) => t.email === email)) throw new Error("Email ini sudah terdaftar. Silakan masuk.");
      const t = { id: uid("t"), name: name.trim(), email, pw: hash(password) };
      db.teachers[t.id] = t;
      db.session = { role: "teacher", id: t.id };
      save(db);
      return t;
    },
    async loginTeacher(email, password) {
      const db = load();
      const t = Object.values(db.teachers).find((x) => x.email === email.trim().toLowerCase());
      if (!t || t.pw !== hash(password)) throw new Error("Email atau kata sandi salah.");
      db.session = { role: "teacher", id: t.id };
      save(db);
      return t;
    },
    async teacher(id) { return load().teachers[id] || null; },

    // ── kelas
    async createClass(teacherId, name) {
      const db = load();
      const code = classCode(db);
      db.classes[code] = { code, name: name.trim(), teacherId, createdAt: Date.now() };
      save(db);
      return db.classes[code];
    },
    async classesOf(teacherId) { return Object.values(load().classes).filter((c) => c.teacherId === teacherId).sort((a, b) => a.createdAt - b.createdAt); },
    async getClass(code) { return load().classes[(code || "").trim().toUpperCase()] || null; },
    async deleteClass(code) {
      const db = load();
      for (const s of Object.values(db.students)) if (s.classCode === code) { delete db.students[s.id]; delete db.progress[s.id]; }
      delete db.classes[code];
      save(db);
    },

    // ── siswa
    async addStudents(classCode, names) {
      const db = load();
      const out = names.map((name, i) => ({ id: uid("s"), name: name.trim(), classCode, pin: pin(), createdAt: Date.now() + i }));
      out.forEach((s) => (db.students[s.id] = s));
      save(db);
      return out;
    },
    async studentsOf(classCode) { return Object.values(load().students).filter((s) => s.classCode === classCode).sort((a, b) => a.name.localeCompare(b.name)); },
    async student(id) { return load().students[id] || null; },
    async resetPin(id) { const db = load(); db.students[id].pin = pin(); save(db); return db.students[id].pin; },
    async removeStudent(id) { const db = load(); delete db.students[id]; delete db.progress[id]; save(db); },
    async loginStudent(code, studentId, pinIn) {
      const db = load();
      const s = db.students[studentId];
      if (!s || s.classCode !== code.trim().toUpperCase() || s.pin !== String(pinIn).trim()) throw new Error("PIN salah. Tanyakan PIN kepada gurumu.");
      db.session = { role: "student", id: s.id };
      save(db);
      return s;
    },

    // ── progres
    async progress(studentId) { return load().progress[studentId] || blankProgress(); },
    async classProgress(code) {
      const db = load(), out = {};
      Object.values(db.students).filter((s) => s.classCode === code).forEach((s) => (out[s.id] = db.progress[s.id] || blankProgress()));
      return out;
    },
    async setGrade(studentId, taskId, g) {
      const db = load();
      const a = db.progress[studentId]?.answers?.[taskId];
      if (!a) throw new Error("Jawaban tidak ditemukan.");
      Object.assign(a, g, { gradedAt: Date.now() });
      save(db);
    },
    async updateProgress(studentId, fn) {
      const db = load();
      const p = db.progress[studentId] || blankProgress();
      fn(p);
      p.updatedAt = Date.now();
      db.progress[studentId] = p;
      save(db);
      return p;
    },

    // ── cadangan & demo
    async exportAll() { const db = load(); return JSON.stringify({ ...db, session: null }, null, 2); },
    async importAll(json) {
      const data = JSON.parse(json);
      if (!data.classes || !data.students) throw new Error("File cadangan tidak dikenali.");
      const db = load();
      Object.assign(db.teachers, data.teachers || {});
      Object.assign(db.classes, data.classes);
      Object.assign(db.students, data.students);
      Object.assign(db.progress, data.progress || {});
      save(db);
    },
    async seedDemo() {
      const db = load();
      let t = Object.values(db.teachers).find((x) => x.email === "guru@demo.id");
      if (!t) {
        t = { id: uid("t"), name: "Bu Guru Demo", email: "guru@demo.id", pw: hash("guru123") };
        db.teachers[t.id] = t;
        const code = "GP6-DEMO";
        db.classes[code] = { code, name: "Kelas 6A (Demo)", teacherId: t.id, createdAt: Date.now() };
        const names = [["Ayu Lestari", "1111"], ["Budi Santoso", "2222"], ["Siti Rahma", "3333"], ["Kevin Wijaya", "4444"]];
        names.forEach(([n, p], i) => {
          const s = { id: uid("s"), name: n, classCode: code, pin: p, createdAt: Date.now() + i };
          db.students[s.id] = s;
          const pr = blankProgress();
          const done = [5, 3, 7, 0][i];
          ["u1-l1", "u1-l2", "u1-l3", "u1-l4", "u1-l5", "u2-l1", "u2-l2"].slice(0, done).forEach((l) => (pr.lessons[l] = Date.now()));
          if (done >= 1) pr.answers["u1-l1-a"] = { v: { text: ["1. Food waste is the biggest, plastic is second.\n2. Yes, our class list also had lots of snack wrappers.\n3. Organic: rice, mango skin, leaves. Inorganic: plastic straw, can, newspaper, snack wrapper.", "1. Food waste, then plastic.\n2. No, I thought plastic was the biggest.\n3. Organic: rice, mango skin, leaves, newspaper. Inorganic: straw, can, wrapper.", "1. Food waste (39%) then plastic (20%).\n2. I expected plastic because our bin is full of cups.\n3. Organic: rice, mango skin, leaves. Inorganic: straw, can, snack wrapper. Newspaper is paper — it can be recycled."][i] }, at: Date.now() - 86400000 * (3 - i), grade: i === 2 ? 3 : null, feedback: i === 2 ? "Great reasoning with numbers from the table!" : "" };
          if (done >= 5) pr.quiz.u1 = { best: [8, 0, 9][i] || 0, last: [8, 0, 9][i] || 0, total: 10, attempts: 1, at: Date.now() };
          db.progress[s.id] = pr;
        });
      }
      save(db);
    },
  };
})();

const SupabaseStore = (cfg) => {
  const TOKEN_KEY = "gp6-lms:token";
  const base = cfg.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/";
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} } };
  let token = ls.get(TOKEN_KEY);
  let mine = null; // cache progres siswa yang login: {id, p}
  const ERR = { SESI_HABIS: "Sesi berakhir. Silakan masuk lagi.", TIDAK_DIIZINKAN: "Akses tidak diizinkan.", TERLALU_BANYAK: "Terlalu banyak percobaan salah. Tunggu 5 menit.", EMAIL_ADA: "Email ini sudah terdaftar. Silakan masuk.", SANDI_PENDEK: "Kata sandi minimal 6 karakter." };

  async function rpc(fn, args = {}) {
    let res;
    try {
      res = await fetch(base + fn, { method: "POST", headers: Object.assign({ "Content-Type": "application/json", apikey: cfg.supabaseAnonKey }, cfg.supabaseAnonKey.startsWith("eyJ") ? { Authorization: "Bearer " + cfg.supabaseAnonKey } : {}), body: JSON.stringify(args) });
    } catch { throw new Error("Tidak bisa terhubung ke server. Periksa koneksi internet."); }
    const txt = await res.text();
    const body = txt ? JSON.parse(txt) : null;
    if (!res.ok) {
      const code = body?.message || "";
      if (code === "SESI_HABIS") { token = null; ls.set(TOKEN_KEY, null); setTimeout(() => location.reload(), 1500); }
      throw new Error(ERR[code] || body?.hint || code || "Terjadi kesalahan server.");
    }
    if (body && body.error) throw new Error(body.error);
    return body;
  }
  const blank = () => ({ lessons: {}, answers: {}, quiz: {}, reflect: {}, interactive: {}, practice: {}, updatedAt: null });
  function merge(r) {
    const p = Object.assign(blank(), r?.data || {});
    p.updatedAt = r?.updatedAt || null;
    for (const [task, g] of Object.entries(r?.grades || {})) if (p.answers[task]) Object.assign(p.answers[task], g);
    return p;
  }
  function strip(p) {
    const d = JSON.parse(JSON.stringify(p));
    delete d.updatedAt;
    for (const a of Object.values(d.answers || {})) { delete a.grade; delete a.feedback; delete a.rubric; delete a.gradedAt; }
    return d;
  }
  const signIn = (r) => { token = r.token; ls.set(TOKEN_KEY, token); mine = null; return r.user; };

  return {
    mode: "online",
    async me() {
      if (!token) return null;
      const r = await rpc("gp_me", { p_token: token });
      if (!r) { token = null; ls.set(TOKEN_KEY, null); }
      return r;
    },
    async logout() { if (token) await rpc("gp_logout", { p_token: token }).catch(() => {}); token = null; mine = null; ls.set(TOKEN_KEY, null); },
    async registerTeacher(name, email, password) { return signIn(await rpc("gp_register_teacher", { p_name: name, p_email: email, p_password: password })); },
    async loginTeacher(email, password) { return signIn(await rpc("gp_login_teacher", { p_email: email, p_password: password })); },
    async classForLogin(code) { return rpc("gp_class_public", { p_code: code || "" }); },
    async loginStudent(code, studentId, pin) {
      if (!studentId) throw new Error("Pilih namamu dulu.");
      return signIn(await rpc("gp_login_student", { p_code: code, p_student: studentId, p_pin: String(pin) }));
    },
    async createClass(_tid, name) { return rpc("gp_create_class", { p_token: token, p_name: name }); },
    async classesOf() { return rpc("gp_classes_of", { p_token: token }); },
    async deleteClass(code) { return rpc("gp_delete_class", { p_token: token, p_code: code }); },
    async addStudents(code, names) { return rpc("gp_add_students", { p_token: token, p_code: code, p_names: names }); },
    async studentsOf(code) { return rpc("gp_students_of", { p_token: token, p_code: code }); },
    async student(id) { return rpc("gp_student", { p_token: token, p_student: id }); },
    async resetPin(id) { return rpc("gp_reset_pin", { p_token: token, p_student: id }); },
    async removeStudent(id) { return rpc("gp_remove_student", { p_token: token, p_student: id }); },
    async progress(id) {
      const p = merge(await rpc("gp_get_progress", { p_token: token, p_student: id }));
      mine = { id, p };
      return p;
    },
    async updateProgress(id, fn) {
      const p = mine?.id === id ? mine.p : await this.progress(id);
      fn(p);
      p.updatedAt = await rpc("gp_save_progress", { p_token: token, p_data: strip(p) });
      mine = { id, p };
      return p;
    },
    async classProgress(code) {
      const r = await rpc("gp_class_progress", { p_token: token, p_code: code });
      const out = {};
      for (const [id, v] of Object.entries(r || {})) out[id] = merge(v);
      return out;
    },
    async setGrade(id, task, g) { return rpc("gp_set_grade", { p_token: token, p_student: id, p_task: task, p_grade: g.grade ?? null, p_feedback: g.feedback || "", p_rubric: g.rubric || null }); },
    async exportAll() { return JSON.stringify({ exportedAt: new Date().toISOString() }); },
  };
};

const Store = (window.GP_CONFIG && GP_CONFIG.supabaseUrl && GP_CONFIG.supabaseAnonKey) ? SupabaseStore(GP_CONFIG) : LocalStore;
