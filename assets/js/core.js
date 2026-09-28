/* Shared runtime: theme, navigation, progress, math rendering, canvas helpers, quiz engine. */
(function () {
  'use strict';

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (err) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* storage unavailable */ }
    }
  };

  /* ---------- theme ---------- */
  const themeListeners = [];
  const savedTheme = store.get('bio-theme', null);
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  function isDark() {
    const forced = document.documentElement.getAttribute('data-theme');
    if (forced) return forced === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function notifyTheme() {
    themeListeners.forEach(fn => fn(isDark()));
  }

  function toggleTheme() {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set('bio-theme', next);
    updateThemeIcon();
    notifyTheme();
  }

  function updateThemeIcon() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.textContent = isDark() ? '☀' : '☾';
      btn.setAttribute('aria-label', isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    updateThemeIcon();
    notifyTheme();
  });

  function css(name, el) {
    return getComputedStyle(el || document.body).getPropertyValue(name).trim();
  }

  function onTheme(fn) {
    themeListeners.push(fn);
  }

  /* ---------- formatting ---------- */
  function fmt(value, decimals) {
    if (!isFinite(value)) return '—';
    const d = decimals === undefined ? 1 : decimals;
    return value.toLocaleString('es', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function renderMath(el) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(el || document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  /* ---------- canvas helper: crisp on HiDPI, redraws on resize ---------- */
  function setupCanvas(canvas, aspect, draw, minHeight) {
    const ctx = canvas.getContext('2d');
    const state = { ctx, w: 0, h: 0 };
    function resize() {
      const w = canvas.parentElement.clientWidth;
      const h = Math.max(minHeight || 220, Math.round(w * aspect));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.w = w;
      state.h = h;
      draw(state);
    }
    new ResizeObserver(resize).observe(canvas.parentElement);
    onTheme(() => draw(state));
    resize();
    return state;
  }

  /* ---------- Chart.js theming ---------- */
  function chartTheme() {
    if (!window.Chart) return;
    const C = window.Chart;
    C.defaults.font.family = 'Inter, system-ui, sans-serif';
    C.defaults.font.size = 12;
    C.defaults.color = css('--text-2');
    C.defaults.borderColor = css('--grid');
    C.defaults.plugins.tooltip.backgroundColor = css('--surface');
    C.defaults.plugins.tooltip.titleColor = css('--text');
    C.defaults.plugins.tooltip.bodyColor = css('--text-2');
    C.defaults.plugins.tooltip.borderColor = css('--border');
    C.defaults.plugins.tooltip.borderWidth = 1;
    C.defaults.plugins.tooltip.padding = 10;
    C.defaults.plugins.legend.labels.boxWidth = 12;
    C.defaults.plugins.legend.labels.boxHeight = 12;
    C.defaults.maintainAspectRatio = false;
  }

  /* Builds a Chart.js chart and rebuilds it when the theme changes, so colors follow the tokens. */
  function themedChart(canvas, buildConfig) {
    let chart = null;
    function build() {
      chartTheme();
      if (chart) chart.destroy();
      chart = new window.Chart(canvas, buildConfig());
      handle.chart = chart;
    }
    const handle = { chart: null, rebuild: build };
    onTheme(build);
    build();
    return handle;
  }

  /* ---------- range binding ---------- */
  function bindRange(input, onChange, format) {
    const out = document.querySelector(`output[for="${input.id}"]`);
    function update() {
      const v = parseFloat(input.value);
      if (out) out.textContent = format ? format(v) : input.value;
      onChange(v);
    }
    input.addEventListener('input', update);
    update();
  }

  /* ---------- page chrome ---------- */
  function initChrome() {
    updateThemeIcon();
    document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', toggleTheme));
    const menu = document.querySelector('.menu-btn');
    const scrim = document.querySelector('.scrim');
    if (menu) menu.addEventListener('click', () => document.body.classList.toggle('nav-open'));
    if (scrim) scrim.addEventListener('click', () => document.body.classList.remove('nav-open'));
  }

  /* Builds the sidebar TOC from the section headings and tracks which sub-modules were read. */
  function initModule() {
    const moduleKey = document.body.dataset.module;
    if (!moduleKey) return;
    const sections = Array.from(document.querySelectorAll('section.sub'));
    const toc = document.querySelector('.toc');
    const seen = new Set(store.get('bio-seen-' + moduleKey, []));
    const links = {};

    sections.forEach(sec => {
      const h2 = sec.querySelector('h2');
      const num = h2.querySelector('.sub-num');
      const title = h2.textContent.replace(num ? num.textContent : '', '').trim();
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + sec.id;
      if (sec.id === 'evaluacion') a.classList.add('quiz-link');
      a.innerHTML = `<span class="chk">✓</span><span>${num ? num.textContent + ' · ' : ''}${title}</span>`;
      a.addEventListener('click', () => document.body.classList.remove('nav-open'));
      li.appendChild(a);
      toc.appendChild(li);
      links[sec.id] = a;
    });

    const readable = sections.filter(s => s.id !== 'evaluacion');
    function paintProgress() {
      readable.forEach(s => links[s.id].classList.toggle('seen', seen.has(s.id)));
      const pct = Math.round((readable.filter(s => seen.has(s.id)).length / readable.length) * 100);
      const bar = document.querySelector('.side-progress .bar span');
      const lbl = document.querySelector('.side-progress .pct');
      const top = document.querySelector('.progress-top');
      if (bar) bar.style.width = pct + '%';
      if (lbl) lbl.textContent = pct + '%';
      if (top) top.style.width = pct + '%';
      const best = store.get('bio-best-' + moduleKey, null);
      const bestEl = document.querySelector('.side-progress .best');
      if (bestEl) bestEl.textContent = best === null ? 'Evaluación: pendiente' : `Mejor nota: ${best}/30`;
      if (best !== null && links.evaluacion) links.evaluacion.classList.add('seen');
    }

    // A section counts as read once its bottom edge has been reached.
    const endObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.dataset.endOf;
        if (seen.has(id)) return;
        seen.add(id);
        store.set('bio-seen-' + moduleKey, Array.from(seen));
        paintProgress();
      });
    });
    readable.forEach(sec => {
      const marker = document.createElement('div');
      marker.dataset.endOf = sec.id;
      sec.appendChild(marker);
      endObserver.observe(marker);
    });

    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        Object.values(links).forEach(l => l.classList.remove('active'));
        links[entry.target.id].classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    paintProgress();
    document.addEventListener('bio:quiz-graded', paintProgress);
  }

  /* ---------- quiz engine ---------- */
  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function mountQuiz(root, questions, moduleKey) {
    const LETTERS = ['A', 'B', 'C', 'D'];
    let order = [];
    let graded = false;

    function render() {
      graded = false;
      // Shuffle option order per attempt so position never gives the answer away.
      order = questions.map((q, qi) => ({ qi, opts: shuffle(q.o.map((_, oi) => oi)) }));
      const best = store.get('bio-best-' + moduleKey, null);
      root.innerHTML = `
        <div class="quiz-intro">
          <span class="chip">30 preguntas · opción múltiple</span>
          <span class="chip">Una sola respuesta correcta</span>
          <span class="chip">${best === null ? 'Sin intentos previos' : 'Tu mejor nota: ' + best + '/30'}</span>
        </div>
        <div class="q-sticky"><span class="cnt"><span class="q-done">0</span>/30 respondidas</span><div class="bar"><span></span></div></div>
        <form class="q-form" novalidate></form>
        <div class="q-result-slot"></div>
        <div class="btn-row">
          <button type="button" class="btn primary q-grade">Calificar evaluación</button>
          <button type="button" class="btn q-retry">Nuevo intento (reordenar)</button>
        </div>`;
      const form = root.querySelector('.q-form');
      order.forEach((item, n) => {
        const q = questions[item.qi];
        const card = document.createElement('div');
        card.className = 'q-card';
        card.dataset.qi = item.qi;
        card.innerHTML = `
          <div class="q-meta"><span>Pregunta ${n + 1}</span><span>Tema ${q.t}</span></div>
          <div class="q-text">${q.q}</div>
          <div class="q-opts">
            ${item.opts.map((oi, k) => `
              <label class="q-opt" data-oi="${oi}">
                <input type="radio" name="q${item.qi}" value="${oi}">
                <span class="letter">${LETTERS[k]}</span><span>${q.o[oi]}</span>
              </label>`).join('')}
          </div>
          <div class="q-exp"></div>`;
        form.appendChild(card);
      });
      form.addEventListener('change', e => {
        if (graded) return;
        const card = e.target.closest('.q-card');
        card.querySelectorAll('.q-opt').forEach(l => l.classList.toggle('sel', l.querySelector('input').checked));
        updateCount();
      });
      root.querySelector('.q-grade').addEventListener('click', grade);
      root.querySelector('.q-retry').addEventListener('click', () => {
        render();
        root.scrollIntoView({ behavior: 'smooth' });
      });
      renderMath(root);
    }

    function updateCount() {
      const done = root.querySelectorAll('.q-form input:checked').length;
      root.querySelector('.q-done').textContent = done;
      root.querySelector('.q-sticky .bar span').style.width = (done / questions.length * 100) + '%';
    }

    function grade() {
      if (graded) return;
      const unanswered = questions.length - root.querySelectorAll('.q-form input:checked').length;
      if (unanswered > 0 && !window.confirm(`Te faltan ${unanswered} preguntas. Se contarán como incorrectas. ¿Calificar de todas formas?`)) return;
      graded = true;
      let score = 0;
      const missedTopics = new Map();
      root.querySelector('.q-form').classList.add('graded');
      root.querySelectorAll('.q-card').forEach(card => {
        const q = questions[+card.dataset.qi];
        const checked = card.querySelector('input:checked');
        const chosen = checked ? +checked.value : null;
        const ok = chosen === q.a;
        if (ok) score++;
        else missedTopics.set(q.t, (missedTopics.get(q.t) || 0) + 1);
        card.querySelectorAll('.q-opt').forEach(l => {
          const oi = +l.dataset.oi;
          l.querySelector('input').disabled = true;
          l.classList.remove('sel');
          if (oi === q.a) l.classList.add('correct');
          else if (oi === chosen) l.classList.add('wrong');
        });
        const exp = card.querySelector('.q-exp');
        exp.innerHTML = `<span class="q-status ${ok ? 'ok' : 'ko'}">${ok ? '✓ Correcta.' : (chosen === null ? '— Sin responder.' : '✗ Incorrecta.')}</span> ${q.e}`;
      });

      const best = store.get('bio-best-' + moduleKey, null);
      if (best === null || score > best) store.set('bio-best-' + moduleKey, score);
      document.dispatchEvent(new CustomEvent('bio:quiz-graded'));

      const pct = Math.round(score / questions.length * 100);
      const level = pct >= 90 ? ['Excelente dominio del capítulo.', 'var(--good)']
        : pct >= 70 ? ['Aprobado con buen nivel. Revisa los temas fallados.', 'var(--good)']
        : pct >= 50 ? ['Aún hay lagunas importantes: repasa los temas señalados.', 'var(--warn)']
        : ['Conviene volver a estudiar el módulo antes de reintentar.', 'var(--bad)'];
      const topics = Array.from(missedTopics.entries()).sort((a, b) => b[1] - a[1]);
      root.querySelector('.q-result-slot').innerHTML = `
        <div class="q-result">
          <div class="score">${score}<small> / ${questions.length} · ${pct}%</small></div>
          <div class="meter"><span style="width:${pct}%;background:${level[1]}"></span></div>
          <p><strong>${level[0]}</strong></p>
          ${topics.length ? `<p class="small muted">Temas con errores (repásalos):</p><ul>${topics.map(([t, n]) => `<li><a href="#s${t.replace('.', '-')}">Tema ${t}</a> — ${n} ${n === 1 ? 'error' : 'errores'}</li>`).join('')}</ul>` : ''}
        </div>`;
      renderMath(root);
      root.querySelector('.q-result-slot').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    render();
  }

  /* ---------- index progress ---------- */
  function initHome() {
    document.querySelectorAll('[data-home-progress]').forEach(card => {
      const key = card.dataset.homeProgress;
      const total = +card.dataset.total;
      const seen = store.get('bio-seen-' + key, []).length;
      const best = store.get('bio-best-' + key, null);
      const pct = Math.min(100, Math.round(seen / total * 100));
      card.querySelector('.pbar span').style.width = pct + '%';
      card.querySelector('.plbl').innerHTML = `<span>${pct}% leído</span><span>${best === null ? 'Evaluación pendiente' : 'Nota: ' + best + '/30'}</span>`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    initModule();
    initHome();
    renderMath(document.body);
    const quizRoot = document.querySelector('.quiz-root');
    const moduleKey = document.body.dataset.module;
    const bank = window.QUIZ && window.QUIZ[moduleKey];
    if (quizRoot && bank) mountQuiz(quizRoot, bank, moduleKey);
  });

  window.Bio = { css, onTheme, isDark, fmt, renderMath, setupCanvas, themedChart, bindRange, store };
})();
