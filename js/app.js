// Aplikasi LMS Global Perspectives Kelas 6 — tampilan & alur.
const $app = document.getElementById("app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const unitById = (id) => UNITS.find((u) => u.id === id);
const allTasks = (u) => {
  const ids = [];
  if (u.getStarted?.task) ids.push({ id: u.getStarted.task, label: "Get Started" });
  u.lessons.forEach((l) => l.blocks.forEach((b) => b.task && ids.push({ id: b.task, label: `Lesson ${l.code} · ${b.title || { think: "Think & Talk", tool: "Thinking Tool" }[b.t] || "Activity"}` })));
  ids.push({ id: u.challenge.task, label: "Unit Challenge: " + u.challenge.title, challenge: true });
  return ids;
};
const TOTAL_LESSONS = UNITS.reduce((n, u) => n + u.lessons.length, 0);
const fmtDate = (t) => (t ? new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
const stars = (n) => (n ? "⭐".repeat(n) : "");
const GRADE_LABEL = { 1: "Beginning ⭐", 2: "Developing ⭐⭐", 3: "Secure ⭐⭐⭐" };

let ME = null; // {role, id, user}
let PROG = null; // progres siswa yang sedang login

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2200);
}

function unitStats(u, p) {
  const done = u.lessons.filter((l) => p.lessons[l.id]).length;
  const q = p.quiz[u.id];
  const tasks = allTasks(u);
  const sent = tasks.filter((t) => p.answers[t.id]).length;
  const pct = Math.round(((done / u.lessons.length) * 0.6 + (q ? 0.25 : 0) + (p.reflect[u.id]?.done ? 0.15 : 0)) * 100);
  return { done, total: u.lessons.length, quiz: q, sent, tasks: tasks.length, pct };
}
function overall(p) {
  const s = UNITS.map((u) => unitStats(u, p));
  return { pct: Math.round(s.reduce((a, x) => a + x.pct, 0) / UNITS.length), lessons: s.reduce((a, x) => a + x.done, 0) };
}
const bar = (pct, color = "var(--green)") => `<div class="bar"><span style="width:${pct}%;background:${color}"></span></div>`;

// ───────────────────────────── kerangka halaman
function shell(content, active = "") {
  const isT = ME?.role === "teacher";
  const nav = isT
    ? [["#/guru", "🏠", "Dasbor"], ["#/guru/tugas", "📥", "Tugas masuk"], ["#/guru/siswa", "👥", "Kelola siswa"], ["#/materi", "📚", "Materi"], ["#/guru/catatan", "📝", "Catatan guru"]]
    : [["#/", "🏠", "Beranda"], ["#/nilai", "⭐", "Nilai saya"], ["#/glosarium", "📖", "Glosarium"], ["#/keterampilan", "🧭", "6 Keterampilan"]];
  return `
  <header class="top">
    <a class="brand" href="${isT ? "#/guru" : "#/"}"><img src="img/cover.jpg" alt=""><span><b>Global Perspectives</b><small>Kelas 6 · SD Sinar Bangsa</small></span></a>
    <nav>${nav.map(([h, i, l]) => `<a href="${h}" class="${active === h ? "on" : ""}"><span>${i}</span>${l}</a>`).join("")}</nav>
    <div class="me"><span>${isT ? "👩‍🏫" : "🧒"} ${esc(ME.user.name)}</span><button class="link" data-act="logout">Keluar</button></div>
  </header>
  <main>${content}</main>
  <footer>Materi: Global Perspectives Grade 6 — Student WorkText · Cambridge Primary Global Perspectives (0838) Stage 6${Store.mode === "memory" ? " · <b>Peringatan: penyimpanan browser diblokir, data hilang saat halaman ditutup.</b>" : Store.mode === "local" ? " · Mode demo: data tersimpan di perangkat ini" : ""}</footer>`;
}

// ───────────────────────────── login
async function viewLanding() {
  $app.innerHTML = `
  <div class="landing">
    <div class="hero">
      <img src="img/cover.jpg" alt="Sampul Global Perspectives Grade 6">
      <div>
        <h1>Global Perspectives<br><span>Kelas 6</span></h1>
        <p>Belajar berpikir kritis tentang isu nyata: dari diriku → komunitasku → negaraku → dunia.</p>
        <div class="skills-row">${SKILLS.map((s) => `<span title="${esc(s.desc)}">${s.icon} ${s.name}</span>`).join("")}</div>
      </div>
    </div>
    <div class="login-cards">
      <form class="card" id="f-student">
        <h2>🧒 Masuk sebagai Siswa</h2>
        <label>Kode kelas<input name="code" placeholder="contoh: GP6-AB12" required autocomplete="off" style="text-transform:uppercase"></label>
        <label>Nama<select name="sid" required disabled><option value="">Isi kode kelas dulu</option></select></label>
        <label>PIN (4 angka)<input name="pin" inputmode="numeric" maxlength="4" required autocomplete="off"></label>
        <button class="btn">Masuk</button>
        <p class="err"></p>
      </form>
      <div class="card">
        <h2>👩‍🏫 Guru</h2>
        <div class="tabs"><button class="on" data-tab="in">Masuk</button><button data-tab="up">Daftar</button></div>
        <form id="f-tin">
          <label>Email<input name="email" type="email" required></label>
          <label>Kata sandi<input name="pw" type="password" required></label>
          <button class="btn">Masuk</button><p class="err"></p>
        </form>
        <form id="f-tup" hidden>
          <label>Nama guru<input name="name" required></label>
          <label>Email<input name="email" type="email" required></label>
          <label>Kata sandi<input name="pw" type="password" minlength="6" required></label>
          <button class="btn">Daftar & buat akun</button><p class="err"></p>
        </form>
      </div>
    </div>
    ${Store.mode === "online" ? "" : `<div class="demo card">
      <span><b>Ingin mencoba dulu?</b> Buka kelas contoh: kode <code>GP6-DEMO</code>, siswa <i>Ayu Lestari</i> PIN <code>1111</code>; guru <code>guru@demo.id</code> / <code>guru123</code>.</span>
      <button class="btn ghost" data-act="demo">Siapkan kelas demo</button>
    </div>`}
  </div>`;

  const fs = document.getElementById("f-student");
  const sel = fs.sid;
  const loadNames = async () => {
    const v = fs.code.value.trim();
    if (v.length < 8) { sel.innerHTML = `<option value="">Isi kode kelas dulu</option>`; sel.disabled = true; return; }
    const c = await Store.classForLogin(v);
    if (!c) { sel.innerHTML = `<option value="">Kode kelas tidak ditemukan</option>`; sel.disabled = true; return; }
    const list = c.students;
    sel.innerHTML = `<option value="">— pilih namamu —</option>` + list.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join("");
    sel.disabled = false;
  };
  fs.code.addEventListener("input", loadNames);
  fs.onsubmit = async (e) => {
    e.preventDefault();
    try { await Store.loginStudent(fs.code.value, sel.value, fs.pin.value); boot(); }
    catch (er) { fs.querySelector(".err").textContent = er.message; }
  };
  document.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => {
    document.querySelectorAll("[data-tab]").forEach((x) => x.classList.toggle("on", x === b));
    document.getElementById("f-tin").hidden = b.dataset.tab !== "in";
    document.getElementById("f-tup").hidden = b.dataset.tab !== "up";
  }));
  const ti = document.getElementById("f-tin");
  ti.onsubmit = async (e) => { e.preventDefault(); try { await Store.loginTeacher(ti.email.value, ti.pw.value); location.hash = "#/guru"; boot(); } catch (er) { ti.querySelector(".err").textContent = er.message; } };
  const tu = document.getElementById("f-tup");
  tu.onsubmit = async (e) => { e.preventDefault(); try { await Store.registerTeacher(tu.name.value, tu.email.value, tu.pw.value); location.hash = "#/guru"; boot(); } catch (er) { tu.querySelector(".err").textContent = er.message; } };
  const demoBtn = document.querySelector("[data-act=demo]");
  if (demoBtn) demoBtn.onclick = async () => { await Store.seedDemo(); fs.code.value = "GP6-DEMO"; await loadNames(); toast("Kelas demo siap. Pilih nama dan masukkan PIN."); };
}

// ───────────────────────────── SISWA: beranda
function viewHome() {
  const o = overall(PROG);
  return shell(`
  <section class="welcome">
    <div><h1>Halo, ${esc(ME.user.name.split(" ")[0])}! 👋</h1><p>Kamu sudah menyelesaikan <b>${o.lessons}</b> dari ${TOTAL_LESSONS} pelajaran.</p>${bar(o.pct)}<small>${o.pct}% selesai</small></div>
  </section>
  <h2 class="sec">Unit belajar</h2>
  <div class="units">${UNITS.map((u) => {
    const s = unitStats(u, PROG);
    return `<a class="unit-card" href="#/unit/${u.id}" style="--c:${u.color}">
      <img src="${u.image}" alt="" loading="lazy">
      <div class="uc-body"><span class="tag">Unit ${u.num}</span><h3>${esc(u.title)}</h3><p>${esc(u.bigQuestion)}</p>
      <div class="sk">${u.skills.map((k) => SKILLS.find((x) => x.id === k).icon).join(" ")}</div>
      ${bar(s.pct, u.color)}<small>${s.done}/${s.total} pelajaran · kuis ${s.quiz ? s.quiz.best + "/" + s.quiz.total : "belum"}</small></div></a>`;
  }).join("")}</div>`, "#/");
}

// ───────────────────────────── SISWA/GURU: halaman unit
function viewUnit(u) {
  const s = unitStats(u, PROG || { lessons: {}, answers: {}, quiz: {}, reflect: {} });
  const isS = ME.role === "student";
  return shell(`
  <a class="back" href="${isS ? "#/" : "#/materi"}">← Semua unit</a>
  <section class="opener" style="--c:${u.color}">
    <img src="${u.image}" alt="">
    <div><span class="tag">Unit ${u.num}</span><h1>${esc(u.title)}</h1><p class="bq"><b>Big Question:</b> ${esc(u.bigQuestion)}</p>
    ${u.opener ? `<p>${esc(u.opener)}</p>` : ""}${u.intro ? `<p>${esc(u.intro)}</p>` : ""}
    ${isS ? `${bar(s.pct, u.color)}<small>${s.pct}% selesai</small>` : ""}</div>
  </section>
  <div class="grid2">
    <div class="box"><h3>In this unit, I will learn to:</h3><ul class="goals">${u.goals.map((g) => `<li>${esc(g)}</li>`).join("")}</ul></div>
    <div class="box"><h3>Word Bank</h3><div class="words">${u.wordBank.map((w) => `<span>${esc(w)}</span>`).join("")}</div></div>
  </div>
  <h2 class="sec">Langkah belajar</h2>
  <ol class="steps">
    <li><a href="#/unit/${u.id}/mulai"><span class="ic">🚀</span><b>Get Started</b><em>${PROG?.answers[u.getStarted.task] || (u.getStarted.rank && PROG?.interactive[u.id + "-rank"]) ? "✓" : ""}</em></a></li>
    ${u.lessons.map((l) => `<li><a href="#/unit/${u.id}/${l.id}"><span class="ic">${PROG?.lessons[l.id] ? "✅" : "📘"}</span><b>Lesson ${l.code}</b> ${esc(l.title)}</a></li>`).join("")}
    <li><a href="#/unit/${u.id}/tantangan"><span class="ic">🤝</span><b>Unit Challenge</b> ${esc(u.challenge.title)}<em>${PROG?.answers[u.challenge.task] ? "✓ terkirim" : ""}</em></a></li>
    <li><a href="#/unit/${u.id}/kuis"><span class="ic">📝</span><b>Kuis Unit ${u.num}</b> ${u.quiz.length} soal<em>${s.quiz ? `nilai terbaik ${s.quiz.best}/${s.quiz.total}` : ""}</em></a></li>
    <li><a href="#/unit/${u.id}/refleksi"><span class="ic">🪞</span><b>Reflect & Check</b><em>${PROG?.reflect[u.id]?.done ? "✓" : ""}</em></a></li>
  </ol>`, isS ? "#/" : "#/materi");
}

// ───────────────────────────── kotak jawaban (tugas)
function taskBox(id, fields = [{ k: "text", label: "Jawabanku" }], { rows = 5 } = {}) {
  if (ME.role !== "student") return `<div class="taskbox preview">✍️ Siswa menulis jawaban di sini dan mengirimkannya ke guru.</div>`;
  const a = PROG.answers[id];
  const v = a?.v || {};
  return `<form class="taskbox" data-task="${id}">
    <div class="tb-fields ${fields.length > 1 ? "multi" : ""}">${fields.map((f) => `<label>${esc(f.label)}<textarea name="${f.k}" rows="${rows}">${esc(v[f.k] || "")}</textarea></label>`).join("")}</div>
    <div class="tb-foot"><button class="btn small">${a ? "Perbarui jawaban" : "Kirim ke guru"}</button>
    <span class="status">${a ? `Terkirim ${fmtDate(a.at)}` : ""}</span></div>
    ${a?.grade || a?.feedback ? `<div class="feedback">👩‍🏫 <b>${GRADE_LABEL[a.grade] || ""}</b> ${esc(a.feedback || "")}</div>` : ""}
  </form>`;
}

// ───────────────────────────── blok materi
function renderBlock(b, u) {
  switch (b.t) {
    case "p": return `<p>${b.html}</p>`;
    case "list": return b.html;
    case "read": return `<div class="read"><h4>📖 Read & Discover: ${esc(b.title)}</h4>${b.html}</div>`;
    case "img": return `<figure><img src="${b.src}" alt="${esc(b.caption)}" loading="lazy"><figcaption>${esc(b.caption)}</figcaption></figure>`;
    case "table": return `<div class="source"><h4>${esc(b.title)}</h4><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>${b.note ? `<p class="muted">${esc(b.note)}</p>` : ""}</div>`;
    case "source": return `<div class="source">${b.html}</div>`;
    case "skills": return `<div class="skills"><h4>${esc(b.title)}</h4>${b.html}</div>`;
    case "dyk": return `<div class="callout dyk"><b>💡 Did You Know?</b> ${b.html}</div>`;
    case "local": return `<div class="callout local"><b>📍 Local Lens:</b> ${b.html}</div>`;
    case "action": return `<div class="callout action"><b>🌱 Take Action:</b> ${b.html}</div>`;
    case "think": return `<div class="think"><h4>💬 Think & Talk</h4>${b.html}${b.task ? taskBox(b.task) : ""}</div>`;
    case "tool": return `<div class="tool"><h4>🛠️ ${esc(b.title)}</h4>${b.html}${b.task ? (b.pmi ? taskBox(b.task, [{ k: "p", label: "➕ Plus (good points)" }, { k: "m", label: "➖ Minus (bad points)" }, { k: "i", label: "❓ Interesting (questions)" }]) : taskBox(b.task)) : ""}</div>`;
    case "activity": return `<div class="activity"><h4>✏️ ${esc(b.title)}</h4>${b.html}${b.task ? taskBox(b.task, undefined, { rows: 6 }) : ""}</div>`;
    case "video": return `<div class="video"><h4>🎬 Watch & Think</h4><p><b>${esc(b.title)}</b></p>
      ${b.yt ? `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${b.yt}" title="${esc(b.title)}" allowfullscreen loading="lazy"></iframe></div>` : ""}
      <p class="links"><a href="${b.url}" target="_blank" rel="noopener">▶ Buka video</a>${(b.extra || []).map(([t, h]) => ` · <a href="${h}" target="_blank" rel="noopener">${esc(t)}</a>`).join("")}</p>
      <ol>${b.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>${b.task ? taskBox(b.task) : ""}</div>`;
    case "sort": return renderSort(b);
    case "rate": return `<div class="activity"><h4>✏️ ${esc(b.title)}</h4><p>${b.html}</p>${renderRate(b)}${taskBox(b.task, [{ k: "text", label: "Jelaskan nilaimu dengan Source Checker (Who? Why? Evidence? Too good to be true?)" }])}</div>`;
    case "tracker": return renderTracker(b);
    default: return "";
  }
}

function renderSort(b) {
  const st = (PROG?.interactive[b.id]) || {};
  const checked = st.checked;
  return `<div class="sortbox" data-sort="${b.id}"><h4>🧩 ${esc(b.title)}</h4><p class="muted">Pilih kelompok untuk setiap kalimat, lalu tekan <b>Periksa</b>.</p>
    ${b.items.map(([txt, ans], i) => {
      const pick = st.picks?.[i];
      const ok = checked && pick === ans, bad = checked && pick != null && pick !== ans;
      return `<div class="sort-row ${ok ? "ok" : ""} ${bad ? "bad" : ""}"><span>${esc(txt)}</span><div>${b.groups.map((g, gi) => `<button type="button" data-i="${i}" data-g="${gi}" class="${pick === gi ? "on" : ""}">${esc(g)}</button>`).join("")}</div></div>`;
    }).join("")}
    <div class="tb-foot"><button class="btn small" data-check>Periksa</button><span class="status">${checked ? `Benar ${b.items.filter(([, a], i) => st.picks?.[i] === a).length}/${b.items.length}` : ""}</span></div></div>`;
}
function renderRate(b) {
  const st = PROG?.interactive[b.id] || {};
  return `<div class="rate" data-rate="${b.id}">${b.items.map((it, i) => `<div class="rate-row"><span>${esc(it)}</span><div>${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-i="${i}" data-n="${n}" class="${st[i] === n ? "on" : ""}">${n}</button>`).join("")}</div></div>`).join("")}</div>`;
}
function renderTracker(b) {
  const st = PROG?.interactive[b.id] || { sleep: [], move: [] };
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const maxS = 12, maxM = 120;
  return `<div class="activity tracker" data-tracker="${b.id}"><h4>📊 ${esc(b.title)}</h4><p>${b.html}</p>
    <table><thead><tr><th>Hari</th><th>Tidur (jam)</th><th>Aktif (menit)</th></tr></thead><tbody>
    ${days.map((d, i) => `<tr><td>${d}</td><td><input type="number" min="0" max="16" step="0.5" data-k="sleep" data-i="${i}" value="${st.sleep[i] ?? ""}"></td><td><input type="number" min="0" max="300" step="5" data-k="move" data-i="${i}" value="${st.move[i] ?? ""}"></td></tr>`).join("")}
    </tbody></table>
    <div class="chart">${days.map((d, i) => {
      const s = +st.sleep[i] || 0, m = +st.move[i] || 0;
      return `<div class="col"><div class="bars"><i class="s ${s >= 9 ? "good" : ""}" style="height:${Math.min(100, (s / maxS) * 100)}%" title="${s} jam"></i><i class="m ${m >= 60 ? "good" : ""}" style="height:${Math.min(100, (m / maxM) * 100)}%" title="${m} menit"></i></div><small>${d}</small></div>`;
    }).join("")}<div class="legend"><span class="s"></span>Tidur (target 9 jam) <span class="m"></span>Aktif (target 60 menit)</div></div></div>`;
}

// ───────────────────────────── halaman pelajaran
function viewLesson(u, l) {
  const idx = u.lessons.indexOf(l);
  const prev = idx > 0 ? `#/unit/${u.id}/${u.lessons[idx - 1].id}` : `#/unit/${u.id}/mulai`;
  const next = idx < u.lessons.length - 1 ? `#/unit/${u.id}/${u.lessons[idx + 1].id}` : `#/unit/${u.id}/tantangan`;
  const done = PROG?.lessons[l.id];
  return shell(`
  <a class="back" href="#/unit/${u.id}">← Unit ${u.num}: ${esc(u.title)}</a>
  <article class="lesson" style="--c:${u.color}">
    <span class="tag">Lesson ${l.code}</span><h1>${esc(l.title)}</h1>
    ${l.blocks.map((b) => renderBlock(b, u)).join("")}
  </article>
  <div class="lesson-nav">
    <a class="btn ghost" href="${prev}">← Sebelumnya</a>
    ${ME.role === "student" ? `<button class="btn ${done ? "done" : ""}" data-act="done" data-l="${l.id}">${done ? "✅ Sudah selesai" : "Tandai selesai"}</button>` : ""}
    <a class="btn ghost" href="${next}">Berikutnya →</a>
  </div>`, ME.role === "student" ? "#/" : "#/materi");
}

function viewGetStarted(u) {
  const g = u.getStarted;
  let extra = "";
  if (g.kwl) extra = taskBox(g.task, [{ k: "k", label: "K — What I know about waste" }, { k: "w", label: "W — What I want to know" }, { k: "l", label: "L — What I learned (isi di akhir unit)" }]);
  else if (g.rank) {
    const order = PROG?.interactive[u.id + "-rank"] || g.rank;
    extra = `<ol class="rank" data-rank="${u.id}-rank">${order.map((v, i) => `<li><span>${esc(v)}</span><button type="button" data-up="${i}" aria-label="naik">▲</button><button type="button" data-down="${i}" aria-label="turun">▼</button></li>`).join("")}</ol>` + taskBox(g.task, [{ k: "text", label: "Bandingkan dengan temanmu. Mengapa urutan kalian berbeda?" }]);
  } else if (g.task) extra = taskBox(g.task);
  return shell(`<a class="back" href="#/unit/${u.id}">← Unit ${u.num}: ${esc(u.title)}</a>
  <article class="lesson" style="--c:${u.color}"><span class="tag">Unit ${u.num}</span><h1>🚀 Get Started</h1>${g.html}${extra}</article>
  <div class="lesson-nav"><span></span><a class="btn" href="#/unit/${u.id}/${u.lessons[0].id}">Mulai Lesson ${u.lessons[0].code} →</a></div>`, ME.role === "student" ? "#/" : "#/materi");
}

function rubricTable(rub) {
  return `<table class="rubric"><thead><tr><th>Criteria</th><th>Beginning ⭐</th><th>Developing ⭐⭐</th><th>Secure ⭐⭐⭐</th></tr></thead><tbody>${rub.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join("")}</tr>`).join("")}</tbody></table>`;
}

function viewChallenge(u) {
  const c = u.challenge;
  const a = PROG?.answers[c.task];
  return shell(`<a class="back" href="#/unit/${u.id}">← Unit ${u.num}: ${esc(u.title)}</a>
  <article class="lesson" style="--c:${u.color}"><span class="tag">Unit Challenge</span><h1>🤝 ${esc(c.title)}</h1>
  ${c.intro ? `<p>${esc(c.intro)}</p>` : ""}${c.roles ? `<p><b>Team roles:</b> ${esc(c.roles)}</p>` : ""}
  <ol class="chsteps">${c.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
  <h3>Success criteria</h3>${rubricTable(c.rubric)}
  ${a?.rubric ? `<h3>Penilaian guru</h3><ul>${c.rubric.map((r, i) => `<li><b>${esc(r[0])}:</b> ${GRADE_LABEL[a.rubric[i]] || "–"}</li>`).join("")}</ul>` : ""}
  <h3>Kirim hasil tim</h3><p class="muted">Tulis anggota tim, peranmu, temuan, dan rencana aksi. Tempel link poster/slide jika ada.</p>
  ${taskBox(c.task, [{ k: "team", label: "Anggota tim & peranku" }, { k: "text", label: "Hasil / laporan tim" }, { k: "link", label: "Link poster, foto atau slide (opsional)" }], { rows: 4 })}
  </article>`, ME.role === "student" ? "#/" : "#/materi");
}

// ───────────────────────────── kuis
function viewQuiz(u) {
  const isS = ME.role === "student";
  const q = PROG?.quiz[u.id];
  return shell(`<a class="back" href="#/unit/${u.id}">← Unit ${u.num}: ${esc(u.title)}</a>
  <article class="lesson quiz" style="--c:${u.color}"><span class="tag">Kuis</span><h1>📝 Kuis Unit ${u.num}: ${esc(u.title)}</h1>
  ${q ? `<p class="score-old">Nilai terbaikmu: <b>${q.best}/${q.total}</b> (${q.attempts}× mencoba). Kamu boleh mencoba lagi.</p>` : `<p>Jawab ${u.quiz.length} soal berikut. Nilai langsung keluar setelah kamu mengirim.</p>`}
  <form id="quiz">${u.quiz.map((it, i) => `<fieldset class="qitem"><legend>${i + 1}. ${esc(it.q)}</legend>${it.o.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}" required> ${esc(o)}</label>`).join("")}<p class="expl" hidden></p></fieldset>`).join("")}
  ${isS ? `<button class="btn">Kirim jawaban</button>` : `<p class="muted">(Pratinjau guru — kunci: ${u.quiz.map((it, i) => `${i + 1}${"ABCD"[it.a]}`).join(", ")})</p>`}
  </form><div id="quiz-result"></div></article>`, isS ? "#/" : "#/materi");
}

function viewReflect(u) {
  const r = PROG?.reflect[u.id] || { checks: [], journal: [] };
  const isS = ME.role === "student";
  return shell(`<a class="back" href="#/unit/${u.id}">← Unit ${u.num}: ${esc(u.title)}</a>
  <article class="lesson" style="--c:${u.color}"><span class="tag">Reflect & Check</span><h1>🪞 Reflect & Check</h1>
  <form id="reflect"><h3>Tick what you can do now:</h3>
  ${u.reflect.checks.map((c, i) => `<label class="check"><input type="checkbox" name="c${i}" ${r.checks[i] ? "checked" : ""}> ${esc(c)}</label>`).join("")}
  <h3>My reflection journal</h3>
  ${u.reflect.journal.map((j, i) => `<label>${esc(j)}<textarea name="j${i}" rows="3">${esc(r.journal[i] || "")}</textarea></label>`).join("")}
  ${isS ? `<button class="btn">Simpan refleksi</button> <span class="status">${r.at ? "Tersimpan " + fmtDate(r.at) : ""}</span>` : ""}</form>
  ${u.glossary ? `<h3>Glossary</h3><dl class="gloss">${u.glossary.map(([w, m]) => `<dt>${esc(w)}</dt><dd>${esc(m)}</dd>`).join("")}</dl>` : ""}
  </article>`, isS ? "#/" : "#/materi");
}

function viewGrades() {
  const rows = [];
  UNITS.forEach((u) => allTasks(u).forEach((t) => { const a = PROG.answers[t.id]; if (a) rows.push({ u, t, a }); }));
  return shell(`<h1>⭐ Nilai & umpan balik</h1>
  <h2 class="sec">Kuis</h2>
  <div class="quizgrid">${UNITS.map((u) => { const q = PROG.quiz[u.id]; return `<div class="qcell" style="--c:${u.color}"><small>Unit ${u.num}</small><b>${q ? `${q.best}/${q.total}` : "–"}</b></div>`; }).join("")}</div>
  <h2 class="sec">Tugas yang sudah dikirim (${rows.length})</h2>
  ${rows.length ? `<table class="list"><thead><tr><th>Unit</th><th>Tugas</th><th>Dikirim</th><th>Nilai</th><th>Umpan balik</th></tr></thead><tbody>${rows.map(({ u, t, a }) => `<tr><td>${u.num}</td><td><a href="${taskLink(u, t.id)}">${esc(t.label)}</a></td><td>${fmtDate(a.at)}</td><td>${a.grade ? stars(a.grade) : a.rubric ? "dinilai" : "<span class='muted'>menunggu</span>"}</td><td>${esc(a.feedback || "")}</td></tr>`).join("")}</tbody></table>` : `<p class="muted">Belum ada tugas yang dikirim.</p>`}`, "#/nilai");
}
function taskLink(u, id) {
  if (id === u.getStarted.task) return `#/unit/${u.id}/mulai`;
  if (id === u.challenge.task) return `#/unit/${u.id}/tantangan`;
  const l = u.lessons.find((l) => l.blocks.some((b) => b.task === id));
  return `#/unit/${u.id}/${l?.id || ""}`;
}

function viewGlossary() {
  const all = UNITS.flatMap((u) => u.glossary.map(([w, m]) => ({ w, m, u }))).sort((a, b) => a.w.localeCompare(b.w));
  return shell(`<h1>📖 Glosarium</h1><input class="search" placeholder="Cari kata…" id="gsearch">
  <dl class="gloss" id="glist">${all.map(({ w, m, u }) => `<div data-w="${esc((w + " " + m).toLowerCase())}"><dt>${esc(w)} <small style="color:${u.color}">Unit ${u.num}</small></dt><dd>${esc(m)}</dd></div>`).join("")}</dl>`, "#/glosarium");
}
function viewSkills() {
  return shell(`<h1>🧭 Enam keterampilan Global Perspectives</h1>
  <div class="skillcards">${SKILLS.map((s) => `<div class="box"><div class="big">${s.icon}</div><h3>${s.name}</h3><p>${esc(s.desc)}</p></div>`).join("")}</div>
  <h2 class="sec">Thinking tools</h2><table class="list"><thead><tr><th>Tool</th><th>Helps me to…</th></tr></thead><tbody>${THINKING_TOOLS.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table>`, "#/keterampilan");
}

// ───────────────────────────── GURU
let CUR_CLASS = null;
async function teacherClass() {
  const cls = await Store.classesOf(ME.id);
  if (!cls.length) return { cls, c: null };
  const saved = sessionStorage.getItem("gp6-class");
  const c = cls.find((x) => x.code === (CUR_CLASS || saved)) || cls[0];
  CUR_CLASS = c.code;
  return { cls, c };
}
function classPicker(cls, c) {
  return `<div class="classbar"><label>Kelas: <select id="classsel">${cls.map((x) => `<option value="${x.code}" ${x.code === c.code ? "selected" : ""}>${esc(x.name)} (${x.code})</option>`).join("")}</select></label>
  <span>Kode kelas untuk siswa: <code class="code">${c.code}</code></span>
  <form id="newclass" class="inline"><input name="name" placeholder="Nama kelas baru, mis. 6B" required><button class="btn small ghost">+ Kelas baru</button></form></div>`;
}
async function viewTeacherHome() {
  const { cls, c } = await teacherClass();
  if (!c) return shell(`<h1>Selamat datang, ${esc(ME.user.name)} 👋</h1><div class="box"><h3>Buat kelas pertama Anda</h3>
  <form id="newclass" class="inline"><input name="name" placeholder="mis. Kelas 6A" required><button class="btn">Buat kelas</button></form>
  <p class="muted">Setelah kelas dibuat, Anda mendapat kode kelas dan bisa menambahkan siswa.</p></div>`, "#/guru");
  const students = await Store.studentsOf(c.code);
  const cp = await Store.classProgress(c.code);
  const progs = students.map((s) => cp[s.id]);
  let pending = 0;
  progs.forEach((p) => Object.values(p.answers).forEach((a) => { if (!a.grade && !a.feedback && !a.rubric) pending++; }));
  const avg = progs.length ? Math.round(progs.reduce((a, p) => a + overall(p).pct, 0) / progs.length) : 0;
  return shell(`<h1>Dasbor guru</h1>${classPicker(cls, c)}
  <div class="kpis"><div><b>${students.length}</b><small>siswa</small></div><div><b>${avg}%</b><small>rata-rata progres</small></div><div><a href="#/guru/tugas"><b>${pending}</b><small>tugas belum dinilai</small></a></div></div>
  ${students.length ? `<div class="scroll"><table class="list matrix"><thead><tr><th>Siswa</th><th>Total</th>${UNITS.map((u) => `<th style="color:${u.color}">Unit ${u.num}<br><small>pelajaran · kuis</small></th>`).join("")}<th>Terakhir aktif</th></tr></thead><tbody>
  ${students.map((s, i) => { const p = progs[i]; const o = overall(p); return `<tr><td><a href="#/guru/siswa/${s.id}">${esc(s.name)}</a></td><td>${bar(o.pct)}<small>${o.pct}%</small></td>${UNITS.map((u) => { const st = unitStats(u, p); return `<td><small>${st.done}/${st.total} · ${st.quiz ? st.quiz.best + "/" + st.quiz.total : "–"}</small>${bar(st.pct, u.color)}</td>`; }).join("")}<td><small>${p.updatedAt ? fmtDate(p.updatedAt) : "belum"}</small></td></tr>`; }).join("")}
  </tbody></table></div>` : `<div class="box">Belum ada siswa. <a href="#/guru/siswa">Tambahkan siswa →</a></div>`}`, "#/guru");
}

async function viewTeacherStudents() {
  const { cls, c } = await teacherClass();
  if (!c) { location.hash = "#/guru"; return ""; }
  const students = await Store.studentsOf(c.code);
  return shell(`<h1>Kelola siswa</h1>${classPicker(cls, c)}
  <div class="grid2">
    <div class="box"><h3>Tambah siswa</h3><p class="muted">Satu nama per baris. Setiap siswa otomatis mendapat PIN 4 angka.</p>
    <form id="addst"><textarea name="names" rows="6" placeholder="Ayu Lestari&#10;Budi Santoso"></textarea><button class="btn">Tambahkan</button></form></div>
    <div class="box"><h3>Cara siswa masuk</h3><ol><li>Buka aplikasi ini.</li><li>Isi kode kelas <code class="code">${c.code}</code>.</li><li>Pilih nama, lalu masukkan PIN.</li></ol>
    <button class="btn ghost" data-act="print">🖨️ Cetak kartu login</button></div>
  </div>
  <table class="list"><thead><tr><th>Nama</th><th>PIN</th><th></th></tr></thead><tbody>
  ${students.map((s) => `<tr><td><a href="#/guru/siswa/${s.id}">${esc(s.name)}</a></td><td><code>${s.pin}</code></td><td class="r"><button class="link" data-reset="${s.id}">PIN baru</button> · <button class="link danger" data-del="${s.id}">Hapus</button></td></tr>`).join("")}
  </tbody></table>
  <div class="printcards">${students.map((s) => `<div class="pcard"><b>Global Perspectives Kelas 6</b><span>${esc(s.name)}</span><span>Kode kelas: <code>${c.code}</code></span><span>PIN: <code>${s.pin}</code></span></div>`).join("")}</div>
  <div class="box"><h3>Rekap & data</h3>
  <button class="btn ghost" data-act="csv">⬇️ Unduh rekap nilai (Excel/CSV)</button>
  ${Store.mode === "online" ? "" : `<p class="muted">Mode demo: data tersimpan di browser perangkat ini. Unduh cadangan secara berkala.</p><button class="btn ghost" data-act="export">⬇️ Unduh cadangan</button> <label class="btn ghost">⬆️ Pulihkan dari file<input type="file" accept=".json" id="importf" hidden></label>`}
  <p><button class="link danger" data-act="delclass">Hapus kelas ini</button></p></div>`, "#/guru/siswa");
}

function answerView(v) {
  return Object.entries(v).filter(([, x]) => x).map(([k, x]) => `<div class="ans"><small>${{ text: "Jawaban", k: "K", w: "W", l: "L", p: "Plus", m: "Minus", i: "Interesting", team: "Tim", link: "Link" }[k] || k}</small><div>${k === "link" ? `<a href="${esc(x)}" target="_blank" rel="noopener">${esc(x)}</a>` : esc(x).replace(/\n/g, "<br>")}</div></div>`).join("");
}
function gradeForm(sid, u, t, a) {
  const isCh = t.challenge;
  return `<form class="grade" data-sid="${sid}" data-task="${t.id}" data-unit="${u.id}">
    ${isCh ? `<div class="rubgrade">${u.challenge.rubric.map((r, i) => `<label>${esc(r[0])}<select name="r${i}"><option value="">–</option>${[1, 2, 3].map((n) => `<option value="${n}" ${a.rubric?.[i] === n ? "selected" : ""}>${GRADE_LABEL[n]}</option>`).join("")}</select></label>`).join("")}</div>`
      : `<div class="stars">${[1, 2, 3].map((n) => `<label><input type="radio" name="grade" value="${n}" ${a.grade === n ? "checked" : ""}> ${GRADE_LABEL[n]}</label>`).join("")}</div>`}
    <input name="feedback" placeholder="Umpan balik (mis. Two Stars and a Wish)" value="${esc(a.feedback || "")}"><button class="btn small">Simpan nilai</button></form>`;
}

async function viewTeacherInbox() {
  const { cls, c } = await teacherClass();
  if (!c) { location.hash = "#/guru"; return ""; }
  const students = await Store.studentsOf(c.code);
  const items = [];
  const cp = await Store.classProgress(c.code);
  for (const s of students) {
    const p = cp[s.id];
    UNITS.forEach((u) => allTasks(u).forEach((t) => { const a = p.answers[t.id]; if (a) items.push({ s, u, t, a }); }));
  }
  const filter = sessionStorage.getItem("gp6-inbox") || "todo";
  const shown = items.filter((x) => filter === "all" || (!x.a.grade && !x.a.rubric && !x.a.feedback)).sort((a, b) => b.a.at - a.a.at);
  return shell(`<h1>📥 Tugas masuk</h1>${classPicker(cls, c)}
  <div class="tabs"><button data-inbox="todo" class="${filter === "todo" ? "on" : ""}">Belum dinilai</button><button data-inbox="all" class="${filter === "all" ? "on" : ""}">Semua (${items.length})</button></div>
  ${shown.length ? shown.map(({ s, u, t, a }) => `<div class="sub" style="--c:${u.color}"><div class="subhead"><b>${esc(s.name)}</b> · Unit ${u.num} · ${esc(t.label)} <small>${fmtDate(a.at)}</small></div>${answerView(a.v)}${gradeForm(s.id, u, t, a)}</div>`).join("") : `<p class="muted">Tidak ada tugas ${filter === "todo" ? "yang menunggu penilaian" : ""}. 🎉</p>`}`, "#/guru/tugas");
}

async function viewTeacherStudent(sid) {
  const s = await Store.student(sid);
  if (!s) return shell(`<p>Siswa tidak ditemukan.</p>`);
  const p = await Store.progress(sid);
  const o = overall(p);
  return shell(`<a class="back" href="#/guru">← Dasbor</a><h1>${esc(s.name)}</h1><p>Progres total ${o.pct}% · ${o.lessons}/${TOTAL_LESSONS} pelajaran</p>${bar(o.pct)}
  ${UNITS.map((u) => {
    const st = unitStats(u, p);
    const r = p.reflect[u.id];
    const tasks = allTasks(u).filter((t) => p.answers[t.id]);
    return `<details class="unitdet" style="--c:${u.color}" ${tasks.length ? "open" : ""}><summary><b>Unit ${u.num}: ${esc(u.title)}</b> <small>${st.done}/${st.total} pelajaran · kuis ${st.quiz ? `${st.quiz.best}/${st.quiz.total} (${st.quiz.attempts}×)` : "–"} · ${st.sent}/${st.tasks} tugas</small></summary>
    ${tasks.map((t) => { const a = p.answers[t.id]; return `<div class="sub"><div class="subhead">${esc(t.label)} <small>${fmtDate(a.at)}</small></div>${answerView(a.v)}${gradeForm(sid, u, t, a)}</div>`; }).join("") || `<p class="muted">Belum ada tugas.</p>`}
    ${r ? `<div class="sub"><div class="subhead">🪞 Refleksi</div><ul>${u.reflect.checks.map((c, i) => `<li>${r.checks[i] ? "✅" : "⬜"} ${esc(c)}</li>`).join("")}</ul>${u.reflect.journal.map((j, i) => (r.journal[i] ? `<div class="ans"><small>${esc(j)}</small><div>${esc(r.journal[i])}</div></div>` : "")).join("")}</div>` : ""}
    </details>`;
  }).join("")}`, "#/guru");
}

function viewMateri() {
  return shell(`<h1>📚 Materi</h1><p>Pratinjau materi seperti yang dilihat siswa.</p>
  <div class="units">${UNITS.map((u) => `<a class="unit-card" href="#/unit/${u.id}" style="--c:${u.color}"><img src="${u.image}" alt="" loading="lazy"><div class="uc-body"><span class="tag">Unit ${u.num}</span><h3>${esc(u.title)}</h3><p>${esc(u.bigQuestion)}</p><small>${u.lessons.map((l) => l.code).join(" · ")}</small></div></a>`).join("")}</div>`, "#/materi");
}
function viewNotes() {
  return shell(`<h1>📝 Catatan guru</h1><div class="box"><ul class="notes">${TEACHER_NOTES.map((n) => `<li>${n}</li>`).join("")}</ul></div>
  <h2 class="sec">Struktur setiap unit</h2><p>Opener → Get Started → lima pelajaran (bacaan, thinking tool, aktivitas, video) → Unit Challenge → Reflect & Check. Setiap unit ±5–6 minggu, 2 pertemuan × 35–40 menit per minggu.</p>`, "#/guru/catatan");
}

// ───────────────────────────── router
async function route() {
  const h = location.hash || "#/";
  const parts = h.slice(2).split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (ME.role === "student") PROG = await Store.progress(ME.id);
  let html = "";
  if (parts[0] === "unit") {
    const u = unitById(parts[1]);
    if (!u) html = shell("<p>Unit tidak ditemukan.</p>");
    else if (!parts[2]) html = viewUnit(u);
    else if (parts[2] === "mulai") html = viewGetStarted(u);
    else if (parts[2] === "tantangan") html = viewChallenge(u);
    else if (parts[2] === "kuis") html = viewQuiz(u);
    else if (parts[2] === "refleksi") html = viewReflect(u);
    else { const l = u.lessons.find((x) => x.id === parts[2]); html = l ? viewLesson(u, l) : viewUnit(u); }
  } else if (ME.role === "teacher") {
    if (parts[0] === "materi") html = viewMateri();
    else if (parts[1] === "tugas") html = await viewTeacherInbox();
    else if (parts[1] === "siswa" && parts[2]) html = await viewTeacherStudent(parts[2]);
    else if (parts[1] === "siswa") html = await viewTeacherStudents();
    else if (parts[1] === "catatan") html = viewNotes();
    else html = await viewTeacherHome();
  } else {
    if (parts[0] === "nilai") html = viewGrades();
    else if (parts[0] === "glosarium") html = viewGlossary();
    else if (parts[0] === "keterampilan") html = viewSkills();
    else html = viewHome();
  }
  if (html) $app.innerHTML = html;
}
const _route = route;
route = async function () {
  try { await _route(); } catch (er) { $app.innerHTML = shell(`<div class="box"><h3>Gagal memuat</h3><p>${esc(er.message)}</p><button class="btn" onclick="route()">Coba lagi</button></div>`); }
};

// ───────────────────────────── interaksi (event delegation)
document.addEventListener("submit", async (e) => {
  const f = e.target;
  if (f.matches(".taskbox")) {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f));
    if (!Object.values(v).some((x) => x.trim())) return toast("Jawaban masih kosong.");
    await Store.updateProgress(ME.id, (p) => { const old = p.answers[f.dataset.task] || {}; p.answers[f.dataset.task] = { ...old, v, at: Date.now() }; });
    PROG = await Store.progress(ME.id);
    f.querySelector(".status").textContent = "Terkirim " + fmtDate(Date.now());
    f.querySelector("button").textContent = "Perbarui jawaban";
    toast("Jawaban terkirim ke guru ✓");
  } else if (f.id === "quiz") {
    e.preventDefault();
    const u = unitById(location.hash.split("/")[2]);
    const fd = new FormData(f);
    let score = 0;
    u.quiz.forEach((it, i) => {
      const pick = +fd.get("q" + i);
      const ok = pick === it.a;
      if (ok) score++;
      const fs = f.querySelectorAll(".qitem")[i];
      fs.classList.add(ok ? "ok" : "bad");
      fs.querySelectorAll("input").forEach((inp) => { inp.disabled = true; if (+inp.value === it.a) inp.parentElement.classList.add("key"); });
      const ex = fs.querySelector(".expl"); ex.hidden = false; ex.textContent = (ok ? "✓ Benar. " : `✗ Jawaban: ${it.o[it.a]}. `) + it.e;
    });
    await Store.updateProgress(ME.id, (p) => { const o = p.quiz[u.id] || { best: 0, attempts: 0 }; p.quiz[u.id] = { best: Math.max(o.best, score), last: score, total: u.quiz.length, attempts: o.attempts + 1, at: Date.now() }; });
    f.querySelector("button").outerHTML = `<a class="btn ghost" href="#/unit/${u.id}/kuis" onclick="setTimeout(route,0)">Coba lagi</a>`;
    const pct = score / u.quiz.length;
    document.getElementById("quiz-result").innerHTML = `<div class="result ${pct >= 0.7 ? "good" : ""}"><b>Nilaimu: ${score}/${u.quiz.length}</b> ${pct === 1 ? "🏆 Sempurna!" : pct >= 0.7 ? "🎉 Bagus sekali!" : "💪 Baca lagi pelajarannya, lalu coba lagi."}</div>`;
    document.getElementById("quiz-result").scrollIntoView({ behavior: "smooth" });
  } else if (f.id === "reflect") {
    e.preventDefault();
    const u = unitById(location.hash.split("/")[2]);
    const fd = new FormData(f);
    const r = { checks: u.reflect.checks.map((_, i) => fd.has("c" + i)), journal: u.reflect.journal.map((_, i) => fd.get("j" + i) || ""), at: Date.now() };
    r.done = r.journal.some((x) => x.trim()) || r.checks.some(Boolean);
    await Store.updateProgress(ME.id, (p) => (p.reflect[u.id] = r));
    f.querySelector(".status").textContent = "Tersimpan " + fmtDate(r.at);
    toast("Refleksi tersimpan ✓");
  } else if (f.id === "newclass") {
    e.preventDefault();
    const c = await Store.createClass(ME.id, f.name.value);
    CUR_CLASS = c.code; sessionStorage.setItem("gp6-class", c.code);
    toast("Kelas dibuat: " + c.code); route();
  } else if (f.id === "addst") {
    e.preventDefault();
    const names = f.names.value.split("\n").map((x) => x.trim()).filter(Boolean);
    await Store.addStudents(CUR_CLASS, names);
    toast(`${names.length} siswa ditambahkan`); route();
  } else if (f.matches(".grade")) {
    e.preventDefault();
    const fd = new FormData(f);
    const u = unitById(f.dataset.unit);
    const g = { feedback: fd.get("feedback") || "", rubric: null, grade: null };
    if (f.dataset.task === u.challenge.task) {
      g.rubric = u.challenge.rubric.map((_, i) => +fd.get("r" + i) || null);
      const r = g.rubric.filter(Boolean);
      g.grade = r.length ? Math.round(r.reduce((x, y) => x + y, 0) / r.length) : null;
    } else g.grade = +fd.get("grade") || null;
    await Store.setGrade(f.dataset.sid, f.dataset.task, g);
    toast("Nilai tersimpan ✓");
    f.closest(".sub")?.classList.add("graded");
  }
});

document.addEventListener("click", async (e) => {
  const t = e.target.closest("button, [data-act]");
  if (!t) return;
  const act = t.dataset.act;
  if (act === "logout") { await Store.logout(); location.hash = ""; boot(); }
  else if (act === "done") {
    const id = t.dataset.l;
    await Store.updateProgress(ME.id, (p) => { if (p.lessons[id]) delete p.lessons[id]; else p.lessons[id] = Date.now(); });
    PROG = await Store.progress(ME.id);
    const d = PROG.lessons[id];
    t.classList.toggle("done", !!d); t.textContent = d ? "✅ Sudah selesai" : "Tandai selesai";
    if (d) toast("Hebat! Pelajaran selesai 🎉");
  } else if (t.closest("[data-sort]") && t.dataset.g != null) {
    const box = t.closest("[data-sort]");
    await Store.updateProgress(ME.id, (p) => { const s = p.interactive[box.dataset.sort] || { picks: {} }; s.picks[t.dataset.i] = +t.dataset.g; s.checked = false; p.interactive[box.dataset.sort] = s; });
    t.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === t));
    t.closest(".sort-row").classList.remove("ok", "bad");
  } else if (t.hasAttribute("data-check")) {
    const box = t.closest("[data-sort]");
    if (ME.role !== "student") return;
    await Store.updateProgress(ME.id, (p) => { const s = p.interactive[box.dataset.sort] || { picks: {} }; s.checked = true; p.interactive[box.dataset.sort] = s; });
    route();
  } else if (t.closest("[data-rate]") && t.dataset.n) {
    if (ME.role !== "student") return;
    const box = t.closest("[data-rate]");
    await Store.updateProgress(ME.id, (p) => { const s = p.interactive[box.dataset.rate] || {}; s[t.dataset.i] = +t.dataset.n; p.interactive[box.dataset.rate] = s; });
    t.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === t));
  } else if (t.dataset.up != null || t.dataset.down != null) {
    if (ME.role !== "student") return;
    const ol = t.closest("[data-rank]");
    const u = unitById(ol.dataset.rank.split("-")[0]);
    const i = +(t.dataset.up ?? t.dataset.down), j = t.dataset.up != null ? i - 1 : i + 1;
    await Store.updateProgress(ME.id, (p) => { const arr = [...(p.interactive[ol.dataset.rank] || u.getStarted.rank)]; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; p.interactive[ol.dataset.rank] = arr; });
    route();
  } else if (t.dataset.reset) {
    const pin = await Store.resetPin(t.dataset.reset); toast("PIN baru: " + pin); route();
  } else if (t.dataset.del) {
    if (confirm("Hapus siswa ini beserta semua progresnya?")) { await Store.removeStudent(t.dataset.del); route(); }
  } else if (act === "print") { document.body.classList.add("printing"); window.print(); setTimeout(() => document.body.classList.remove("printing"), 500); }
  else if (act === "csv") {
    const students = await Store.studentsOf(CUR_CLASS);
    const cp = await Store.classProgress(CUR_CLASS);
    const head = ["Nama", "Progres total %", ...UNITS.flatMap((u) => [`U${u.num} pelajaran`, `U${u.num} kuis`, `U${u.num} tugas dikirim`, `U${u.num} rata-rata nilai tugas`])];
    const rows = students.map((s) => {
      const p = cp[s.id];
      return [s.name, overall(p).pct, ...UNITS.flatMap((u) => {
        const st = unitStats(u, p);
        const gs = allTasks(u).map((t) => p.answers[t.id]?.grade).filter(Boolean);
        return [`${st.done}/${st.total}`, st.quiz ? `${st.quiz.best}/${st.quiz.total}` : "", st.sent, gs.length ? (gs.reduce((a, b) => a + b, 0) / gs.length).toFixed(1) : ""];
      })];
    });
    const csv = "\ufeff" + [head, ...rows].map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `rekap-${CUR_CLASS}-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  } else if (act === "export") {
    const blob = new Blob([await Store.exportAll()], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `cadangan-gp6-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  } else if (act === "delclass") {
    if (confirm("Hapus kelas ini beserta semua siswa dan progresnya? Tindakan ini tidak bisa dibatalkan.")) { await Store.deleteClass(CUR_CLASS); CUR_CLASS = null; sessionStorage.removeItem("gp6-class"); location.hash = "#/guru"; route(); }
  } else if (t.dataset.inbox) { sessionStorage.setItem("gp6-inbox", t.dataset.inbox); route(); }
});

document.addEventListener("change", async (e) => {
  const t = e.target;
  if (t.id === "classsel") { CUR_CLASS = t.value; sessionStorage.setItem("gp6-class", t.value); route(); }
  else if (t.closest("[data-tracker]") && ME.role === "student") {
    const id = t.closest("[data-tracker]").dataset.tracker;
    await Store.updateProgress(ME.id, (p) => { const s = p.interactive[id] || { sleep: [], move: [] }; s[t.dataset.k][t.dataset.i] = t.value === "" ? null : +t.value; p.interactive[id] = s; });
    PROG = await Store.progress(ME.id);
    const el = t.closest("[data-tracker]");
    const b = UNITS[1].lessons[2].blocks.find((x) => x.id === id);
    const tmp = document.createElement("div"); tmp.innerHTML = renderTracker(b);
    el.querySelector(".chart").replaceWith(tmp.querySelector(".chart"));
  } else if (t.id === "importf" && t.files[0]) {
    try { await Store.importAll(await t.files[0].text()); toast("Data dipulihkan ✓"); route(); } catch (er) { alert(er.message); }
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "gsearch") { const q = e.target.value.toLowerCase(); document.querySelectorAll("#glist > div").forEach((d) => (d.hidden = !d.dataset.w.includes(q))); }
});

async function boot() {
  let s = null;
  try { s = await Store.me(); } catch (er) { toast(er.message); }
  if (!s) { ME = null; return viewLanding(); }
  ME = s;
  const user = s.user;
  if (s.role === "teacher" && !location.hash.startsWith("#/guru") && !location.hash.startsWith("#/unit") && !location.hash.startsWith("#/materi")) location.hash = "#/guru";
  route();
}
window.addEventListener("hashchange", () => ME && route());
window.addEventListener("unhandledrejection", (e) => { toast(e.reason?.message || "Terjadi kesalahan."); });
boot();
