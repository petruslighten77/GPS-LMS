// Audio bahasa Inggris: membacakan teks dengan suara bawaan browser (gratis, tanpa server).
// Pemakaian di HTML:
//   <div data-speak> ... <button class="say" data-say>🔊</button> ... </div>  → membacakan isi div
//   <span data-word="recycle">recycle</span>                                  → membacakan satu kata
const Speech = (() => {
  const synth = window.speechSynthesis;
  const RATES = [{ v: 0.7, l: "🐢 Pelan" }, { v: 0.9, l: "🙂 Normal" }, { v: 1.1, l: "🐇 Cepat" }];
  let rateIdx = 1;
  try { rateIdx = +(localStorage.getItem("gp6-rate") ?? 1); if (!RATES[rateIdx]) rateIdx = 1; } catch {}
  let voice = null, queue = [], pos = 0, el = null, paused = false, bar = null;

  function pickVoice() {
    if (!synth) return null;
    const vs = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    const score = (v) => (/natural|neural|online/i.test(v.name) ? 4 : 0) + (/google|microsoft/i.test(v.name) ? 2 : 0) + (/en[-_]gb/i.test(v.lang) ? 1 : 0) + (/en[-_]us/i.test(v.lang) ? 1 : 0);
    return vs.sort((a, b) => score(b) - score(a))[0] || null;
  }
  if (synth) { voice = pickVoice(); synth.onvoiceschanged = () => (voice = pickVoice()); }

  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement("div");
    bar.className = "speechbar";
    bar.innerHTML = `<span class="sb-ic">🔊</span><span class="sb-text"></span>
      <button type="button" data-sb="pause" title="Jeda/lanjut">⏸</button>
      <button type="button" data-sb="rate"></button>
      <button type="button" data-sb="stop" title="Berhenti">⏹</button>`;
    document.body.appendChild(bar);
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("[data-sb]");
      if (!b) return;
      if (b.dataset.sb === "stop") stop();
      else if (b.dataset.sb === "pause") togglePause();
      else if (b.dataset.sb === "rate") { rateIdx = (rateIdx + 1) % RATES.length; try { localStorage.setItem("gp6-rate", rateIdx); } catch {} renderBar(); if (queue.length && !paused) { synth.cancel(); speakNext(); } }
    });
    return bar;
  }
  function renderBar(text) {
    ensureBar();
    if (text != null) bar.querySelector(".sb-text").textContent = text;
    bar.querySelector('[data-sb="rate"]').textContent = RATES[rateIdx].l;
    bar.querySelector('[data-sb="pause"]').textContent = paused ? "▶" : "⏸";
  }
  function split(text) {
    return text.replace(/\s+/g, " ").match(/[^.!?…]+[.!?…]+["”')]*|[^.!?…]+$/g)?.map((s) => s.trim()).filter((s) => /[a-z0-9]/i.test(s)) || [];
  }
  function speakNext() {
    if (pos >= queue.length) return stop();
    const u = new SpeechSynthesisUtterance(queue[pos]);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "en-GB";
    u.rate = RATES[rateIdx].v;
    u.onend = () => { if (queue.length && !paused) { pos++; speakNext(); } };
    renderBar(queue[pos]);
    synth.speak(u);
  }
  function play(text, target) {
    if (!synth) { alert("Browser ini belum mendukung audio. Coba pakai Google Chrome."); return; }
    stop();
    queue = split(text); pos = 0; paused = false;
    if (!queue.length) return;
    el = target || null;
    el?.classList.add("speaking");
    ensureBar().classList.add("show");
    speakNext();
  }
  function word(w) {
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(w);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "en-GB";
    u.rate = Math.min(RATES[rateIdx].v, 0.9);
    synth.speak(u);
  }
  function togglePause() {
    if (!queue.length) return;
    paused = !paused;
    if (paused) synth.cancel(); else speakNext();
    renderBar();
  }
  function stop() {
    if (synth) synth.cancel();
    queue = []; pos = 0; paused = false;
    el?.classList.remove("speaking"); el = null;
    bar?.classList.remove("show");
  }
  function textOf(container) {
    const c = container.cloneNode(true);
    c.querySelectorAll("button, input, textarea, select, iframe, .taskbox, .tb-foot, .expl[hidden], .no-speak, .links, .muted.hint").forEach((x) => x.remove());
    c.querySelectorAll("li, p, h4, legend, label, tr, dt, dd, div").forEach((x) => x.append(". "));
    return c.textContent.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").replace(/\s+([.,!?])/g, "$1").replace(/([.!?:])\s*\./g, "$1").replace(/(\.\s*)+/g, ". ");
  }

  document.addEventListener("click", (e) => {
    const s = e.target.closest("[data-say]");
    if (s) { e.preventDefault(); const c = s.closest("[data-speak]"); if (!c) return; if (el === c && queue.length) return stop(); play(textOf(c), c); return; }
    const w = e.target.closest("[data-word]");
    if (w) word(w.dataset.word);
  });
  window.addEventListener("hashchange", stop);

  return { play, word, stop, supported: !!synth };
})();

// Tombol kecil 🔊 untuk dipasang di dalam elemen ber-atribut data-speak.
const sayBtn = (label = "Dengarkan") => `<button type="button" class="say" data-say title="${label}" aria-label="${label}">🔊<span>${label}</span></button>`;
