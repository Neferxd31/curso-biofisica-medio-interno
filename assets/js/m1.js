/* Module 1 widgets: states of matter, concentration translator, Watson, gamblegram, tracer dilution, distribution volume. */
(function () {
  'use strict';
  const { css, fmt, setupCanvas, themedChart, bindRange } = window.Bio;

  function stat(k, v, u) {
    return `<div class="stat"><div class="k">${k}</div><div class="v">${v} <span class="u">${u || ''}</span></div></div>`;
  }

  /* Runs an animation loop only while the element is on screen. */
  function visibleLoop(el, step) {
    let running = false;
    let raf = 0;
    function frame() {
      step();
      if (running) raf = requestAnimationFrame(frame);
    }
    new IntersectionObserver(entries => {
      const on = entries[0].isIntersecting;
      if (on && !running) { running = true; raf = requestAnimationFrame(frame); }
      if (!on) { running = false; cancelAnimationFrame(raf); }
    }).observe(el);
  }

  /* ------------------------------------------------------------ 1.1 states of matter */
  function initStates() {
    const canvas = document.getElementById('states-canvas');
    if (!canvas) return;
    const N = 64;
    const R = 7;
    let T = 20;
    let view = null;
    const parts = [];

    function anchors(w, h) {
      const cols = 8;
      const gap = R * 2.3;
      const x0 = w / 2 - (cols - 1) * gap / 2;
      return Array.from({ length: N }, (_, i) => ({
        ax: x0 + (i % cols) * gap,
        ay: h - 16 - R - Math.floor(i / cols) * gap
      }));
    }

    function phase() {
      if (T < 30) return 'solid';
      if (T < 65) return 'liquid';
      return 'gas';
    }

    function draw(state) {
      view = state;
      if (parts.length === 0) {
        anchors(state.w, state.h).forEach(a => parts.push({ x: a.ax, y: a.ay, vx: 0, vy: 0, ax: a.ax, ay: a.ay }));
      } else {
        anchors(state.w, state.h).forEach((a, i) => { parts[i].ax = a.ax; parts[i].ay = a.ay; });
      }
      render();
    }

    function render() {
      if (!view) return;
      const { ctx, w, h } = view;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = css('--surface-2');
      ctx.fillRect(8, 8, w - 16, h - 16);
      ctx.strokeStyle = css('--axis');
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, w - 16, h - 16);
      const color = css('--accent');
      parts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = css('--surface');
        ctx.stroke();
      });
    }

    function step() {
      if (!view) return;
      const { w, h } = view;
      const ph = phase();
      const thermal = 0.35 * Math.sqrt(T);
      const minX = 8 + R, maxX = w - 8 - R, minY = 8 + R, maxY = h - 8 - R;

      parts.forEach(p => {
        if (ph === 'solid') {
          // Spring to lattice site + thermal jitter: vibration around a fixed position.
          p.vx = (p.vx + (p.ax - p.x) * 0.12 + (Math.random() - 0.5) * thermal * 0.9) * 0.72;
          p.vy = (p.vy + (p.ay - p.y) * 0.12 + (Math.random() - 0.5) * thermal * 0.9) * 0.72;
        } else if (ph === 'liquid') {
          p.vy += 0.18;
          p.vx += (Math.random() - 0.5) * thermal * 0.35;
          p.vy += (Math.random() - 0.5) * thermal * 0.35;
          p.vx *= 0.93;
          p.vy *= 0.93;
        } else {
          const sp = Math.hypot(p.vx, p.vy) || 1;
          const target = thermal * 1.3;
          p.vx = p.vx / sp * (sp + (target - sp) * 0.1) + (Math.random() - 0.5) * 0.3;
          p.vy = p.vy / sp * (sp + (target - sp) * 0.1) + (Math.random() - 0.5) * 0.3;
        }
      });

      if (ph !== 'solid') {
        // Short-range repulsion: particles bounce off each other instead of overlapping.
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const a = parts[i], b = parts[j];
            const dx = b.x - a.x, dy = b.y - a.y;
            const d = Math.hypot(dx, dy);
            if (d > 0 && d < 2 * R) {
              const push = (2 * R - d) / 2;
              const nx = dx / d, ny = dy / d;
              a.x -= nx * push; a.y -= ny * push;
              b.x += nx * push; b.y += ny * push;
              const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
              if (rel < 0) {
                a.vx += rel * nx; a.vy += rel * ny;
                b.vx -= rel * nx; b.vy -= rel * ny;
              }
            }
          }
        }
      }

      parts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < minX) { p.x = minX; p.vx = Math.abs(p.vx); }
        if (p.x > maxX) { p.x = maxX; p.vx = -Math.abs(p.vx); }
        if (p.y < minY) { p.y = minY; p.vy = Math.abs(p.vy); }
        if (p.y > maxY) { p.y = maxY; p.vy = -Math.abs(p.vy) * (ph === 'liquid' ? 0.3 : 1); }
      });
      render();
    }

    setupCanvas(canvas, 0.42, draw, 240);
    visibleLoop(canvas, step);

    const labels = {
      solid: ['Sólido', 'Sí', 'No', '≪ 1'],
      liquid: ['Líquido', 'Sí', 'Sí', '≈ 1 (mismo orden)'],
      gas: ['Gas', 'No', 'Sí', '≫ 1']
    };
    bindRange(document.getElementById('temp'), v => {
      T = v;
      const l = labels[phase()];
      // Log scale so the liquid band (30–65) spans one order of magnitude around Ec/EI = 1.
      const ratio = Math.pow(10, (T - 47.5) / 30);
      document.getElementById('st-state').textContent = l[0];
      document.getElementById('st-ratio').innerHTML = `${fmt(ratio, ratio < 1 ? 2 : 1)} <span class="u">${l[3]}</span>`;
      document.getElementById('st-coh').textContent = l[1];
      document.getElementById('st-flu').textContent = l[2];
    });
  }

  /* ------------------------------------------------------------ 1.3 concentration translator */
  function initConc() {
    const root = document.getElementById('w-conc');
    if (!root) return;
    const SOLUTES = {
      nacl: { name: 'NaCl', M: 58.5, i: 2, eq: 1, eqUnit: 'mEq/L de cationes (= de aniones)' },
      glucosa: { name: 'glucosa', M: 180, i: 1, eq: 0 },
      urea: { name: 'urea', M: 60, i: 1, eq: 0 },
      cacl2: { name: 'CaCl₂', M: 111, i: 3, eq: 2, eqUnit: 'mEq/L de cationes (= de aniones)' },
      albumina: { name: 'albúmina', M: 70000, i: 1, eq: 16, eqUnit: 'mEq/L de carga negativa (≈ 16 por molécula)' }
    };
    const sel = document.getElementById('c-solute');
    const mass = document.getElementById('c-mass');
    const phi = document.getElementById('c-phi');
    const M0 = 0.018;

    function update() {
      const s = SOLUTES[sel.value];
      const m = parseFloat(mass.value);
      const f = parseFloat(phi.value);
      const molar = m / s.M * 1000;
      const molal = molar / f;
      const osmolar = molar * s.i;
      const osmolal = osmolar / f;
      const meq = molar * s.eq;
      const fWater = 1 / (1 + M0 * osmolal / 1000);
      root.querySelector('#c-out').innerHTML =
        stat('Ponderal', fmt(m, 1), 'g/L') +
        stat('Molar', fmt(molar, molar < 1 ? 3 : 1), 'mmol/L') +
        stat('Molal', fmt(molal, molal < 1 ? 3 : 1), 'mmol/kg agua') +
        stat('Osmolar', fmt(osmolar, osmolar < 1 ? 3 : 1), 'mOsm/L') +
        stat('Osmolal', fmt(osmolal, osmolal < 1 ? 3 : 1), 'mOsm/kg') +
        stat('Equivalente', s.eq ? fmt(meq, 1) : '0', s.eq ? s.eqUnit : 'sin carga') +
        stat('f<sub>H₂O</sub>', fmt(fWater, 5), '');
      let msg;
      if (osmolal >= 270 && osmolal <= 330) {
        msg = '<b>≈ isoosmolal con el plasma</b> (≈ 290–300 mOsm/kg).';
        if (sel.value === 'nacl') msg += ' Con 9 g/L de NaCl obtienes el «suero fisiológico».';
        if (sel.value === 'glucosa') msg += ' Con 50 g/L (glucosa al 5 %) obtienes el suero glucosado isotónico.';
      } else if (osmolal < 270) {
        msg = '<b>Hipoosmolal</b> respecto al plasma (≈ 290–300 mOsm/kg).';
      } else {
        msg = '<b>Hiperosmolal</b> respecto al plasma (≈ 290–300 mOsm/kg).';
      }
      if (sel.value === 'urea') msg += ' Ojo: la urea es osmóticamente <b>ineficaz</b>. Aunque su osmolalidad fuera la del plasma, no sería isotónica: para las células se comporta como agua pura (módulo 2).';
      if (sel.value === 'albumina') msg += ' Fíjate: decenas de g/L de proteína aportan apenas ~1 mOsm, pero muchas cargas (≈ 16 por molécula).';
      if (f < 1) msg += ` Con φ = ${fmt(f, 2)}, la molalidad supera a la molaridad en un ${fmt((1 / f - 1) * 100, 1)} %.`;
      msg += ' <span class="muted small">(Cálculo ideal: disociación total, sin coeficiente osmótico.)</span>';
      root.querySelector('#c-verdict').innerHTML = msg;
    }
    sel.addEventListener('change', () => {
      const defaults = { nacl: 9, glucosa: 50, urea: 0.3, cacl2: 1.1, albumina: 40 };
      mass.value = defaults[sel.value];
      mass.dispatchEvent(new Event('input'));
    });
    bindRange(mass, update, v => fmt(v, 1));
    bindRange(phi, update, v => fmt(v, 2));
  }

  /* ------------------------------------------------------------ 1.4 Watson */
  function initWatson() {
    const root = document.getElementById('w-watson');
    if (!root) return;
    const sex = document.getElementById('w-sex');
    const hIn = document.getElementById('w-h');
    const wIn = document.getElementById('w-w');
    const aIn = document.getElementById('w-a');
    let values = [0, 0, 0, 0];

    const chart = themedChart(document.getElementById('watson-chart'), () => ({
      type: 'doughnut',
      data: {
        labels: ['Agua celular', 'Agua intersticial', 'Agua plasmática', 'Masa sin agua'],
        datasets: [{
          data: values,
          backgroundColor: [css('--s1'), css('--s3'), css('--s2'), css('--surface-3')],
          borderColor: css('--surface'),
          borderWidth: 2
        }]
      },
      options: {
        cutout: '58%',
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: c => ` ${c.label}: ${fmt(c.raw, 1)} kg` } }
        }
      }
    }));

    function update() {
      const h = +hIn.value, w = +wIn.value, a = +aIn.value;
      const male = sex.value === 'm';
      document.getElementById('w-age-ctrl').style.opacity = male ? 1 : 0.4;
      const act = male
        ? 0.1074 * h + 0.3362 * w - 0.09516 * a + 2.447
        : 0.1069 * h + 0.2466 * w - 2.097;
      values = [act * 0.6, act * 0.28, act * 0.12, Math.max(0, w - act)];
      chart.chart.data.datasets[0].data = values;
      chart.chart.update();
      root.querySelector('#w-out').innerHTML =
        stat('Agua total', fmt(act, 1), `L · ${fmt(act / w * 100, 0)} % del peso`) +
        stat('Celular (60 %)', fmt(act * 0.6, 1), 'L') +
        stat('Extracelular (40 %)', fmt(act * 0.4, 1), 'L') +
        stat('Intersticial (28 %)', fmt(act * 0.28, 1), 'L') +
        stat('Plasmática (12 %)', fmt(act * 0.12, 1), 'L') +
        stat('Volumen plasmático', fmt(act * 0.12 / 0.93, 1), 'L (agua/0.93)');
    }
    sex.addEventListener('change', update);
    [hIn, wIn, aIn].forEach(i => bindRange(i, update));
  }

  /* ------------------------------------------------------------ 1.5 gamblegram */
  function initGamble() {
    const canvas = document.getElementById('gamble-chart');
    if (!canvas) return;
    const COMP = ['Plasma', 'Intersticio', 'Célula'];
    const SERIES = [
      { label: 'Na⁺', stack: 'cat', v: [142, 144, 10], c: '--s1' },
      { label: 'K⁺', stack: 'cat', v: [4, 4, 160], c: '--s2' },
      { label: 'Ca²⁺ + Mg²⁺', stack: 'cat', v: [5, 5, 42], c: '--s3' },
      { label: 'Cl⁻', stack: 'an', v: [103, 114, 6], c: '--s4' },
      { label: 'HCO₃⁻', stack: 'an', v: [26, 29, 8], c: '--s5' },
      { label: 'Fosfatos', stack: 'an', v: [2, 2, 140], c: '--s6' },
      { label: 'Proteínas', stack: 'an', v: [16, 4, 55], c: '--s7' },
      { label: 'Otros aniones', stack: 'an', v: [4, 4, 3], c: '--s8' }
    ];
    let visible = [0, 1, 2];

    function luminance(hex) {
      const n = parseInt(hex.replace('#', ''), 16);
      const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    const segmentLabels = {
      id: 'segmentLabels',
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        chart.data.datasets.forEach((ds, di) => {
          chart.getDatasetMeta(di).data.forEach((bar, i) => {
            const v = ds.data[i];
            if (v < 14 || bar.height < 16) return;
            // Full label if it fits the bar, value only otherwise.
            let text = `${ds.label} ${v}`;
            if (ctx.measureText(text).width > bar.width - 6) text = String(v);
            ctx.fillStyle = luminance(ds.backgroundColor) > 0.45 ? '#0b0b0b' : '#ffffff';
            ctx.fillText(text, bar.x, bar.y + bar.height / 2);
          });
        });
        ctx.restore();
      }
    };

    const handle = themedChart(canvas, () => ({
      type: 'bar',
      data: {
        labels: visible.map(i => COMP[i]),
        datasets: SERIES.map(s => ({
          label: s.label,
          stack: s.stack,
          data: visible.map(i => s.v[i]),
          backgroundColor: css(s.c),
          borderColor: css('--surface'),
          borderWidth: 1.5,
          borderSkipped: false,
          categoryPercentage: 0.7,
          barPercentage: 0.95
        }))
      },
      options: {
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              title: items => `${items[0].label} · ${items[0].dataset.stack === 'cat' ? 'cationes' : 'aniones'}`,
              label: c => ` ${c.dataset.label}: ${c.raw} mEq/L`
            }
          }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, title: { display: true, text: 'mEq/L (izq.: cationes · der.: aniones)' } }
        }
      },
      plugins: [segmentLabels]
    }));

    document.querySelectorAll('#g-seg button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#g-seg button').forEach(b => b.classList.toggle('on', b === btn));
        const map = { all: [0, 1, 2], pl: [0], in: [1], ce: [2] };
        visible = map[btn.dataset.c];
        handle.rebuild();
      });
    });
  }

  /* ------------------------------------------------------------ 1.6 tracer dilution */
  function initTracer() {
    const canvas = document.getElementById('tracer-canvas');
    if (!canvas) return;
    const VOL = { cell: 25, inter: 12, plasma: 5 };
    const DOSE = 1000;
    const DOTS = 160;
    // Accessible volume in each compartment, expressed as "equivalent litres at plasma concentration".
    const TRACERS = {
      evans: { name: 'azul de Evans', eq: { cell: 0, inter: 0, plasma: 5 }, interReach: 1,
        msg: 'Se une a la albúmina, que no cruza el capilar: mide el <b>volumen plasmático</b> (≈ 5 L). Con el hematocrito se obtiene el volumen sanguíneo.' },
      inulin: { name: 'inulina', eq: { cell: 0, inter: 12 * 0.6, plasma: 5 }, interReach: 0.6,
        msg: 'Molécula grande (≈ 5500 Da): cuando se toma la muestra no ha alcanzado todo el intersticio. <b>Subestima</b> el volumen extracelular.' },
      mannitol: { name: 'manitol', eq: { cell: 0, inter: 12, plasma: 5 }, interReach: 1,
        msg: 'Cruza el capilar pero no la membrana celular y no se metaboliza: mide el <b>volumen extracelular</b> (≈ 17 L). Hay que descontar lo eliminado en la orina.' },
      sodium: { name: 'sodio radiactivo', eq: { cell: 25 * 10 / 144, inter: 12, plasma: 5 }, interReach: 1,
        msg: 'Una pequeña parte entra en las células (c<sub>i</sub>/c ≈ 0.07): el resultado es el <b>volumen de distribución del sodio</b>, algo mayor que el extracelular. <b>Sobreestima</b> V<sub>e</sub>.' },
      water: { name: 'agua tritiada', eq: { cell: 25, inter: 12, plasma: 5 }, interReach: 1,
        msg: 'Difunde libremente a toda el agua del organismo: mide el <b>agua total</b> (≈ 42 L).' },
      potassium: { name: 'potasio radiactivo', eq: { cell: 25 * 40, inter: 12, plasma: 5 }, interReach: 1,
        msg: 'Se concentra 40 veces más dentro de las células: m/c da un <b>volumen de distribución enorme</b>, muy superior al agua corporal. No corresponde a ningún compartimiento real.' }
    };
    const sel = document.getElementById('t-tracer');
    let view = null;
    let dots = [];
    let phase = 'idle';
    let t0 = 0;
    let finishTimer = 0;

    function layout(w, h) {
      const pad = 10;
      const total = VOL.cell + VOL.inter + VOL.plasma;
      const usable = w - pad * 2;
      const cw = usable * VOL.cell / total;
      const iw = usable * VOL.inter / total;
      const pw = usable * VOL.plasma / total;
      return {
        cell: { x: pad, y: 30, w: cw, h: h - 44 },
        inter: { x: pad + cw, y: 30, w: iw, h: h - 44 },
        plasma: { x: pad + cw + iw, y: 30, w: pw, h: h - 44 }
      };
    }

    function randomIn(box, fromRight) {
      const x0 = fromRight ? box.x + box.w * (1 - fromRight) : box.x;
      const wEff = fromRight ? box.w * fromRight : box.w;
      return { x: x0 + 6 + Math.random() * (wEff - 12), y: box.y + 6 + Math.random() * (box.h - 12) };
    }

    function draw(state) {
      view = state;
      render();
    }

    function render() {
      if (!view) return;
      const { ctx, w, h } = view;
      const L = layout(w, h);
      ctx.clearRect(0, 0, w, h);
      const tint = (box, color, label, vol) => {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.14;
        ctx.fillRect(box.x, box.y, box.w, box.h);
        ctx.globalAlpha = 1;
        ctx.fillStyle = css('--text-2');
        ctx.font = '600 12px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, box.x + box.w / 2, 18);
        ctx.fillStyle = css('--muted');
        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.fillText(vol, box.x + box.w / 2, h - 3);
      };
      tint(L.cell, css('--s1'), 'Agua celular', '25 L');
      tint(L.inter, css('--s3'), 'Intersticio', '12 L');
      tint(L.plasma, css('--s8'), 'Plasma', '5 L');
      ctx.strokeStyle = css('--text-2');
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(L.inter.x, L.inter.y);
      ctx.lineTo(L.inter.x, L.inter.y + L.inter.h);
      ctx.stroke();
      ctx.setLineDash([6, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(L.plasma.x, L.plasma.y);
      ctx.lineTo(L.plasma.x, L.plasma.y + L.plasma.h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = css('--border');
      ctx.lineWidth = 1;
      ctx.strokeRect(L.cell.x, L.cell.y, L.cell.w + L.inter.w + L.plasma.w, L.cell.h);
      ctx.fillStyle = css('--accent');
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function inject() {
      if (!view) return;
      const tr = TRACERS[sel.value];
      const L = layout(view.w, view.h);
      const total = tr.eq.cell + tr.eq.inter + tr.eq.plasma;
      const injX = L.plasma.x + L.plasma.w / 2;
      const injY = L.plasma.y + 10;
      dots = Array.from({ length: DOTS }, () => {
        const r = Math.random() * total;
        let target;
        if (r < tr.eq.plasma) target = randomIn(L.plasma);
        else if (r < tr.eq.plasma + tr.eq.inter) target = randomIn(L.inter, tr.interReach);
        else target = randomIn(L.cell);
        const sx = injX + (Math.random() - 0.5) * 8;
        const sy = injY + Math.random() * 8;
        return { x: sx, y: sy, sx, sy, tx: target.x, ty: target.y, delay: Math.random() * 0.5 };
      });
      phase = 'mixing';
      t0 = performance.now();
      document.getElementById('t-out').innerHTML = '';
      document.getElementById('t-verdict').innerHTML = 'Mezclando… el trazador difunde desde el plasma.';
      // Timer, not the animation loop: the result must appear even if the canvas scrolls out of view.
      clearTimeout(finishTimer);
      finishTimer = setTimeout(() => { phase = 'done'; finish(); }, 2800);
    }

    function finish() {
      const tr = TRACERS[sel.value];
      const V = tr.eq.cell + tr.eq.inter + tr.eq.plasma;
      const c = DOSE / V;
      document.getElementById('t-out').innerHTML =
        stat('Dosis m', DOSE, 'u') +
        stat('c plasmática', fmt(c, c < 10 ? 2 : 1), 'u/L') +
        stat('m / c', fmt(V, V > 100 ? 0 : 1), 'L');
      document.getElementById('t-verdict').innerHTML = `<b>${tr.name[0].toUpperCase() + tr.name.slice(1)}:</b> ${tr.msg}`;
    }

    function step() {
      if (phase === 'idle' || !view) return;
      const t = (performance.now() - t0) / 1000;
      dots.forEach(d => {
        const k = Math.min(1, Math.max(0, (t - d.delay) / 2.2));
        const e = 1 - Math.pow(1 - k, 3);
        d.x = d.sx + (d.tx - d.sx) * e + (Math.random() - 0.5) * 1.2;
        d.y = d.sy + (d.ty - d.sy) * e + (Math.random() - 0.5) * 1.2;
      });
      render();
    }

    setupCanvas(canvas, 0.38, draw, 220);
    visibleLoop(canvas, step);
    document.getElementById('t-inject').addEventListener('click', inject);
    document.getElementById('t-reset').addEventListener('click', () => {
      clearTimeout(finishTimer);
      dots = [];
      phase = 'idle';
      render();
      document.getElementById('t-out').innerHTML = '';
      document.getElementById('t-verdict').innerHTML = 'Elige un trazador y pulsa «Inyectar».';
    });
    sel.addEventListener('change', () => document.getElementById('t-reset').click());
  }

  /* ------------------------------------------------------------ 1.7 distribution volume */
  function initVD() {
    const ratioIn = document.getElementById('vd-ratio');
    if (!ratioIn) return;
    const veIn = document.getElementById('vd-ve');
    const viIn = document.getElementById('vd-vi');
    // Presets keep their exact ratio; the log slider alone would round 40 to 39.8.
    let exactRatio = null;
    ratioIn.addEventListener('input', e => { if (e.isTrusted) exactRatio = null; });
    const ratio = () => {
      if (exactRatio !== null) return exactRatio;
      return +ratioIn.value <= -1.99 ? 0 : Math.pow(10, +ratioIn.value);
    };
    let bars = [17, 42, 17];

    const handle = themedChart(document.getElementById('vd-chart'), () => ({
      type: 'bar',
      data: {
        labels: ['Volumen extracelular Ve', 'Agua total V', 'Volumen de distribución VD'],
        datasets: [{
          data: bars,
          backgroundColor: [css('--surface-3'), css('--surface-3'), css('--accent')],
          borderColor: [css('--axis'), css('--axis'), css('--accent')],
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${fmt(c.raw, 1)} L` } } },
        scales: { x: { type: 'logarithmic', min: 5, max: 2000, title: { display: true, text: 'litros (escala log)' } }, y: { grid: { display: false } } }
      }
    }));

    function update() {
      const r = ratio();
      const ve = +veIn.value, vi = +viIn.value;
      const vd = ve + vi * r;
      const V = ve + vi;
      bars = [ve, V, vd];
      handle.chart.data.datasets[0].data = bars;
      handle.chart.update();
      let cls;
      if (r === 0) cls = 'V<sub>D</sub> = V<sub>e</sub>: el soluto es exclusivamente extracelular (manitol).';
      else if (r < 0.999) cls = 'V<sub>e</sub> &lt; V<sub>D</sub> &lt; V: predominio extracelular (sodio).';
      else if (r <= 1.001) cls = 'V<sub>D</sub> = V: se reparte igual en toda el agua (urea).';
      else cls = 'V<sub>D</sub> &gt; V: predominio intracelular (potasio). ¡Mayor que toda el agua corporal!';
      document.getElementById('vd-verdict').innerHTML =
        `c<sub>i</sub>/c = <b>${r === 0 ? '0' : fmt(r, r < 1 ? 3 : 1)}</b> → V<sub>D</sub> = ${fmt(ve, 1)} + ${fmt(vi, 1)} × ${r === 0 ? '0' : fmt(r, 3)} = <b>${fmt(vd, 1)} L</b>. ${cls}`;
    }
    bindRange(ratioIn, update, () => { const r = ratio(); return r === 0 ? '0' : fmt(r, r < 1 ? 3 : 1); });
    bindRange(veIn, update, v => fmt(v, 1));
    bindRange(viIn, update, v => fmt(v, 1));
    document.querySelectorAll('[data-vd]').forEach(b => b.addEventListener('click', () => {
      const r = +b.dataset.vd;
      exactRatio = r;
      ratioIn.value = r === 0 ? -2 : Math.log10(r);
      ratioIn.dispatchEvent(new Event('input'));
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStates();
    initConc();
    initWatson();
    initGamble();
    initTracer();
    initVD();
  });
})();
