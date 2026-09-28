/* Module 3 widgets: pH scale, buffer titration, dissociation curves, open vs closed buffers, Davenport diagram. */
(function () {
  'use strict';
  const { css, fmt, setupCanvas, themedChart, bindRange } = window.Bio;
  const log10 = Math.log10;

  function stat(k, v, u) {
    return `<div class="stat"><div class="k">${k}</div><div class="v">${v} <span class="u">${u || ''}</span></div></div>`;
  }

  /* Bisection on a monotonic increasing function f over [lo, hi]. */
  function bisect(f, lo, hi, iterations) {
    for (let i = 0; i < (iterations || 80); i++) {
      const mid = (lo + hi) / 2;
      if (f(mid) > 0) hi = mid;
      else lo = mid;
    }
    return (lo + hi) / 2;
  }

  /* ------------------------------------------------------------ 3.1 pH scale */
  function initPH() {
    const input = document.getElementById('ph-in');
    if (!input) return;
    const bar = document.getElementById('ph-bar');
    const MIN = 6.6, MAX = 8.0;
    const pos = v => (v - MIN) / (MAX - MIN) * 100;
    const ZONES = [
      [6.6, 6.8, '--bad', 'incompatible'],
      [6.8, 7.38, '--warn', 'acidemia'],
      [7.38, 7.42, '--good', 'normal'],
      [7.42, 7.8, '--s1', 'alcalemia'],
      [7.8, 8.0, '--bad', 'incompatible']
    ];
    bar.innerHTML = ZONES.map(([a, b, c, label]) =>
      `<div title="${label}" style="position:absolute;top:0;bottom:0;left:${pos(a)}%;width:${pos(b) - pos(a)}%;background:var(${c});opacity:.28"></div>`).join('') +
      [6.8, 7.0, 7.2, 7.4, 7.6, 7.8].map(v =>
        `<div style="position:absolute;left:${pos(v)}%;bottom:-22px;transform:translateX(-50%);font-size:.75rem;color:var(--muted)">${v.toFixed(1)}</div>`).join('') +
      '<div id="ph-marker" style="position:absolute;top:-4px;bottom:-4px;width:4px;border-radius:2px;background:var(--text);transform:translateX(-50%);transition:left .15s"></div>';

    bindRange(input, v => {
      document.getElementById('ph-marker').style.left = pos(v) + '%';
      const h = Math.pow(10, 9 - v);
      document.getElementById('ph-out').innerHTML =
        stat('[H⁺] libre', fmt(h, h < 100 ? 1 : 0), 'nmol/L') +
        stat('Frente a 7.40', `× ${fmt(h / 39.8, 2)}`, '') +
        stat('Frente al neutro a 37 °C', `${v > 6.8 ? '+' : ''}${fmt(v - 6.8, 2)}`, 'pH');
      let zone;
      if (v < 6.8 || v > 7.8) zone = '<b>Incompatible con la vida</b> (fuera de 6.8–7.8).';
      else if (v < 7.38) zone = '<b>Acidemia.</b>';
      else if (v > 7.42) zone = '<b>Alcalemia.</b>';
      else zone = '<b>pH arterial normal</b> (7.38–7.42).';
      document.getElementById('ph-verdict').innerHTML = `${zone} A 37 °C la neutralidad está en 6.8: incluso con este pH, el plasma ${v > 6.8 ? 'es básico' : 'no es básico'} en sentido estricto.`;
    }, v => v.toFixed(2));
  }

  /* ------------------------------------------------------------ 3.3 titration curve */
  function titrationPH(C, f, pK, net) {
    // Exact charge balance (mol/L): Na − Cl + H = A⁻ + OH⁻, with Na − Cl = f·C − net.
    const Ka = Math.pow(10, -pK), Kw = 1e-14;
    const c = C / 1000, n = net / 1000;
    const logH = bisect(lh => {
      const H = Math.pow(10, lh);
      return f * c - n + H - c * Ka / (Ka + H) - Kw / H;
    }, -14, 0);
    return -logH;
  }

  function initTitration() {
    const canvas = document.getElementById('titr-chart');
    if (!canvas) return;
    const pkIn = document.getElementById('ti-pk');
    const cIn = document.getElementById('ti-c');
    const rIn = document.getElementById('ti-r');
    let data = [];
    let pK = 6.8;

    const bandPlugin = {
      id: 'band',
      beforeDatasetsDraw(chart) {
        const { ctx, chartArea: a, scales: { y } } = chart;
        ctx.save();
        ctx.fillStyle = css('--accent');
        ctx.globalAlpha = 0.1;
        const top = y.getPixelForValue(pK + 1), bottom = y.getPixelForValue(pK - 1);
        ctx.fillRect(a.left, top, a.right - a.left, bottom - top);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = css('--accent-strong');
        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.fillText('zona tampón (pK ± 1)', a.left + 8, top + 14);
        ctx.restore();
      }
    };

    const handle = themedChart(canvas, () => ({
      type: 'line',
      data: {
        datasets: [
          { label: 'pH', data, borderColor: css('--s1'), borderWidth: 2, pointRadius: 0, tension: 0 },
          { label: 'Estado inicial', data: [], borderColor: css('--s2'), backgroundColor: css('--s2'), pointRadius: 6, pointBorderColor: css('--surface'), pointBorderWidth: 2, showLine: false }
        ]
      },
      options: {
        parsing: false,
        animation: false,
        interaction: { mode: 'nearest', intersect: false, axis: 'x' },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { title: i => `${i[0].parsed.x >= 0 ? 'Ácido' : 'Base'} añadido: ${fmt(Math.abs(i[0].parsed.x), 1)} mmol/L`, label: c => ` pH ${fmt(c.parsed.y, 2)}` } }
        },
        scales: {
          x: { type: 'linear', title: { display: true, text: '← base fuerte · mmol/L añadidos · ácido fuerte →' } },
          y: { min: 1, max: 13, title: { display: true, text: 'pH' } }
        }
      },
      plugins: [bandPlugin]
    }));

    function update() {
      pK = +pkIn.value;
      const C = +cIn.value, f = +rIn.value;
      data = [];
      const span = C * 1.3;
      for (let i = 0; i <= 260; i++) {
        const x = -span + 2 * span * i / 260;
        data.push({ x, y: titrationPH(C, f, pK, x) });
      }
      const pH0 = titrationPH(C, f, pK, 0);
      const H = Math.pow(10, -pH0), Ka = Math.pow(10, -pK);
      const beta = 2.303 * (C / 1000 * Ka * H / Math.pow(Ka + H, 2) + H + 1e-14 / H) * 1000;
      handle.chart.data.datasets[0].data = data;
      handle.chart.data.datasets[1].data = [{ x: 0, y: pH0 }];
      handle.chart.update();
      document.getElementById('ti-out').innerHTML =
        stat('pH inicial', fmt(pH0, 2), '') +
        stat('Poder tampón inicial', fmt(beta, 1), 'mEq/L/pH') +
        stat('Capacidad frente a ácido', fmt(f * C, 0), 'mmol/L') +
        stat('Capacidad frente a base', fmt((1 - f) * C, 0), 'mmol/L');
    }
    bindRange(pkIn, update, v => fmt(v, 1));
    bindRange(cIn, update, v => fmt(v, 0));
    bindRange(rIn, update, v => fmt(v, 2));
  }

  /* ------------------------------------------------------------ 3.3 alpha curves */
  function initAlpha() {
    const canvas = document.getElementById('alpha-chart');
    if (!canvas) return;
    const pkIn = document.getElementById('al-pk');
    const curve = pk => Array.from({ length: 141 }, (_, i) => {
      const pH = i / 10;
      return { x: pH, y: 1 / (1 + Math.pow(10, pk - pH)) };
    });

    const vline = {
      id: 'vline',
      afterDatasetsDraw(chart) {
        const { ctx, chartArea: a, scales: { x } } = chart;
        const px = x.getPixelForValue(7.4);
        ctx.save();
        ctx.strokeStyle = css('--muted');
        ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(px, a.top); ctx.lineTo(px, a.bottom); ctx.stroke();
        ctx.fillStyle = css('--text-2');
        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.fillText('pH 7.4', px + 4, a.top + 12);
        ctx.restore();
      }
    };

    const handle = themedChart(canvas, () => ({
      type: 'line',
      data: {
        datasets: [
          { label: 'CO₂d/HCO₃⁻ (pK 6.1)', data: curve(6.1), borderColor: css('--s1'), borderWidth: 2, pointRadius: 0 },
          { label: 'HCO₃⁻/CO₃²⁻ (pK 10.3)', data: curve(10.3), borderColor: css('--s2'), borderWidth: 2, pointRadius: 0 },
          { label: 'Ácido problema', data: curve(+pkIn.value), borderColor: css('--s3'), borderWidth: 2.5, pointRadius: 0 }
        ]
      },
      options: {
        parsing: false,
        animation: false,
        interaction: { mode: 'nearest', intersect: false, axis: 'x' },
        plugins: { tooltip: { callbacks: { title: i => `pH ${fmt(i[0].parsed.x, 1)}`, label: c => ` ${c.dataset.label}: α = ${fmt(c.parsed.y, 3)}` } } },
        scales: {
          x: { type: 'linear', min: 0, max: 14, title: { display: true, text: 'pH' } },
          y: { min: 0, max: 1, title: { display: true, text: 'coeficiente de disociación α' } }
        }
      },
      plugins: [vline]
    }));

    bindRange(pkIn, v => {
      handle.chart.data.datasets[2].data = curve(v);
      handle.chart.data.datasets[2].label = `Ácido problema (pK ${fmt(v, 1)})`;
      handle.chart.update();
      const a = 1 / (1 + Math.pow(10, v - 7.4));
      let kind = a > 0.99 ? 'se comporta como un <b>ácido fuerte</b> (totalmente disociado)' : a < 0.01 ? 'está <b>prácticamente sin disociar</b>' : 'está <b>parcialmente disociado</b> (útil como tampón si pK ≈ pH)';
      document.getElementById('al-verdict').innerHTML = `A pH 7.4, un ácido de pK ${fmt(v, 1)} tiene α = <b>${fmt(a * 100, 1)} %</b>: ${kind}. Ejemplos: láctico 4.8 → 99.7 %; NH₄⁺ 9.2 → 1.6 %.`;
    }, v => fmt(v, 1));
  }

  /* ------------------------------------------------------------ 3.6 open vs closed */
  function initOpen() {
    const input = document.getElementById('op-x');
    if (!input) return;
    const closed = (base, acid, pK, x) => pK + log10((base - x) / (acid + x));
    const SOL = [
      { name: 'A · sin tampón', f: x => -log10(x / 1000) },
      { name: 'B · HCO₃⁻ cerrado', f: x => closed(24, 1.2, 6.1, x) },
      { name: 'C · A⁻/AH cerrado', f: x => closed(48, 12, 6.8, x) },
      { name: 'D · HCO₃⁻ abierto', f: x => 6.1 + log10((24 - x) / 1.2) },
      { name: 'E · abierto + cerrado', f: x => bisect(pH => (24 - 1.2 * Math.pow(10, pH - 6.1)) + (48 - 60 / (1 + Math.pow(10, 6.8 - pH))) - x > 0 ? -1 : 1, 5, 8) }
    ];
    let drops = SOL.map(() => 1);

    const handle = themedChart(document.getElementById('open-chart'), () => ({
      type: 'bar',
      data: {
        labels: SOL.map(s => s.name),
        datasets: [{
          data: drops,
          backgroundColor: [css('--s8'), css('--s4'), css('--s3'), css('--s1'), css('--s7')],
          borderRadius: 4,
          barPercentage: 0.7
        }]
      },
      options: {
        indexAxis: 'y',
        animation: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` caída de pH: ${fmt(c.raw, 3)}` } } },
        scales: { x: { type: 'logarithmic', min: 0.01, max: 10, title: { display: true, text: 'caída de pH (escala logarítmica)' } }, y: { grid: { display: false } } }
      }
    }));

    bindRange(input, x => {
      const rows = SOL.map(s => {
        const pH = s.f(x);
        return { name: s.name, pH, drop: 7.4 - pH, power: x / (7.4 - pH) };
      });
      drops = rows.map(r => Math.max(0.01, r.drop));
      handle.chart.data.datasets[0].data = drops;
      handle.chart.update();
      document.getElementById('op-table').innerHTML =
        '<thead><tr><th>Solución</th><th class="num">pH final</th><th class="num">ΔpH</th><th class="num">Poder tampón (mEq/L/pH)</th></tr></thead><tbody>' +
        rows.map(r => `<tr><td>${r.name}</td><td class="num">${fmt(r.pH, 2)}</td><td class="num">${fmt(-r.drop, 2)}</td><td class="num">${fmt(r.power, 1)}</td></tr>`).join('') + '</tbody>';
    }, v => fmt(v, 1));
  }

  /* ------------------------------------------------------------ 3.9 Davenport */
  function initDavenport() {
    const canvas = document.getElementById('dav-canvas');
    if (!canvas) return;
    const pIn = document.getElementById('d-p');
    const eIn = document.getElementById('d-e');
    const sIn = document.getElementById('d-s');
    const tip = document.getElementById('dav-tip');
    const X0 = 6.9, X1 = 7.8, Y0 = 0, Y1 = 56;
    let view = null;
    let trail = [];
    let anim = null;
    const state = { P: 40, exc: 0, s: 22 };

    const iso = (P, pH) => 0.03 * P * Math.pow(10, pH - 6.1);
    const line = (exc, pH) => 24 - exc - state.s * (pH - 7.4);
    const solvePH = (P, exc) => bisect(pH => iso(P, pH) - line(exc, pH), 6.4, 8.4);

    function geom() {
      const { w, h } = view;
      const pad = { l: 46, r: 14, t: 14, b: 38 };
      return {
        pad,
        X: pH => pad.l + (pH - X0) / (X1 - X0) * (w - pad.l - pad.r),
        Y: v => h - pad.b - (v - Y0) / (Y1 - Y0) * (h - pad.t - pad.b),
        invX: px => X0 + (px - pad.l) / (w - pad.l - pad.r) * (X1 - X0),
        invY: py => Y0 + (h - pad.b - py) / (h - pad.t - pad.b) * (Y1 - Y0)
      };
    }

    function draw(st) {
      view = st;
      render();
    }

    function render() {
      if (!view) return;
      const { ctx, w, h } = view;
      const g = geom();
      const { X, Y, pad } = g;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.rect(pad.l, pad.t, w - pad.l - pad.r, h - pad.t - pad.b);
      ctx.clip();

      // Grid
      ctx.strokeStyle = css('--grid');
      ctx.lineWidth = 1;
      for (let pH = 7.0; pH <= 7.8001; pH += 0.1) { ctx.beginPath(); ctx.moveTo(X(pH), pad.t); ctx.lineTo(X(pH), h - pad.b); ctx.stroke(); }
      for (let v = 0; v <= 56; v += 8) { ctx.beginPath(); ctx.moveTo(pad.l, Y(v)); ctx.lineTo(w - pad.r, Y(v)); ctx.stroke(); }

      // Normal zone
      ctx.fillStyle = css('--good');
      ctx.globalAlpha = 0.14;
      ctx.fillRect(X(7.38), Y(27), X(7.42) - X(7.38), Y(21) - Y(27));
      ctx.globalAlpha = 1;

      // Region labels
      ctx.fillStyle = css('--muted');
      ctx.font = '600 11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Ac. respiratoria + alc. metabólica', X(7.33), Y(52));
      ctx.fillText('Acidosis mixta', X(7.05), Y(24));
      ctx.fillText('Ac. metabólica + alc. respiratoria', X(7.4), Y(4));
      ctx.fillText('Alcalosis mixta', X(7.7), Y(24));

      // Isobars
      [20, 30, 40, 60, 80, 100].forEach(P => {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const pH = X0 + (X1 - X0) * i / 120;
          const v = iso(P, pH);
          if (i === 0) ctx.moveTo(X(pH), Y(v)); else ctx.lineTo(X(pH), Y(v));
        }
        ctx.strokeStyle = css('--s1');
        ctx.globalAlpha = P === 40 ? 1 : 0.45;
        ctx.lineWidth = P === 40 ? 2.2 : 1.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
        // Label where the isobar leaves the plot (top edge or right edge).
        const pHtop = 6.1 + log10(Y1 / (0.03 * P));
        const lx = pHtop < X1 ? X(pHtop) - 4 : X(X1) - 4;
        const ly = pHtop < X1 ? Y(Y1) + 12 : Y(iso(P, X1)) - 4;
        ctx.fillStyle = css('--s1');
        ctx.textAlign = 'right';
        ctx.font = '600 10.5px Inter, system-ui, sans-serif';
        ctx.fillText(`${P}`, lx, ly);
      });

      // RNE
      ctx.strokeStyle = css('--s3');
      ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(X(X0), Y(line(0, X0))); ctx.lineTo(X(X1), Y(line(0, X1))); ctx.stroke();

      // Patient equilibrium line + isobar
      if (Math.abs(state.exc) > 0.25) {
        ctx.strokeStyle = css('--accent');
        ctx.setLineDash([7, 5]);
        ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(X(X0), Y(line(state.exc, X0))); ctx.lineTo(X(X1), Y(line(state.exc, X1))); ctx.stroke();
        ctx.setLineDash([]);
      }
      if (Math.abs(state.P - 40) > 0.5) {
        ctx.strokeStyle = css('--accent');
        ctx.globalAlpha = 0.55;
        ctx.setLineDash([2, 4]);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const pH = X0 + (X1 - X0) * i / 120;
          if (i === 0) ctx.moveTo(X(pH), Y(iso(state.P, pH))); else ctx.lineTo(X(pH), Y(iso(state.P, pH)));
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Fixed-acid excess segment M–N at pH 7.40
      if (Math.abs(state.exc) > 0.5) {
        const yM = line(state.exc, 7.4);
        ctx.strokeStyle = css('--text-2');
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(7.4), Y(24)); ctx.lineTo(X(7.4), Y(yM)); ctx.stroke();
        ctx.fillStyle = css('--text-2');
        ctx.beginPath(); ctx.arc(X(7.4), Y(yM), 4, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'left';
        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.fillText(`M · exceso ${state.exc > 0 ? '+' : ''}${fmt(state.exc, 1)}`, X(7.4) + 6, (Y(24) + Y(yM)) / 2 + 4);
      }

      // Trail
      if (trail.length > 1) {
        ctx.strokeStyle = css('--accent');
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        trail.forEach((p, i) => { if (i === 0) ctx.moveTo(X(p[0]), Y(p[1])); else ctx.lineTo(X(p[0]), Y(p[1])); });
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // N and patient point
      ctx.fillStyle = css('--text');
      ctx.beginPath(); ctx.arc(X(7.4), Y(24), 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = '700 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('N', X(7.4) + 7, Y(24) + 15);
      const pH = solvePH(state.P, state.exc);
      const hco3 = iso(state.P, pH);
      ctx.beginPath();
      ctx.arc(X(pH), Y(hco3), 8, 0, Math.PI * 2);
      ctx.fillStyle = css('--accent');
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = css('--surface');
      ctx.stroke();
      ctx.restore();

      // Axes
      ctx.fillStyle = css('--muted');
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      for (let p = 7.0; p <= 7.8001; p += 0.1) ctx.fillText(p.toFixed(1), X(p), h - pad.b + 16);
      ctx.fillText('pH', (pad.l + w - pad.r) / 2, h - 4);
      ctx.textAlign = 'right';
      for (let v = 0; v <= 56; v += 8) ctx.fillText(v, pad.l - 6, Y(v) + 4);
      ctx.save();
      ctx.translate(12, (pad.t + h - pad.b) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('[HCO₃⁻] mmol/L', 0, 0);
      ctx.restore();

      report(pH, hco3);
    }

    function classify(pH, P, exc) {
      const resp = P > 42 ? 'acid' : P < 36 ? 'alk' : null;
      const met = exc > 3 ? 'acid' : exc < -3 ? 'alk' : null;
      const R = { acid: 'acidosis respiratoria', alk: 'alcalosis respiratoria' };
      const Mt = { acid: 'acidosis metabólica', alk: 'alcalosis metabólica' };
      const status = pH < 7.38 ? 'Acidemia' : pH > 7.42 ? 'Alcalemia' : 'pH normal';
      let text;
      if (!resp && !met) {
        text = 'Estado ácido-base <b>normal</b> (dentro de los márgenes).';
      } else if (resp && !met) {
        text = `<b>${R[resp][0].toUpperCase() + R[resp].slice(1)} pura</b>: típica de la fase <b>aguda</b>. El riñón aún no ha compensado (12–48 h) y el punto está sobre la RNE.`;
      } else if (met && !resp) {
        text = `<b>${Mt[met][0].toUpperCase() + Mt[met].slice(1)} pura</b> (P<sub>CO₂</sub> normal): falta la compensación respiratoria.`;
        if (met === 'acid' && pH <= 7.0) text += ' Como la compensación respiratoria de la acidosis metabólica es inmediata, sospecha un <b>problema respiratorio asociado</b> (trastorno complejo).';
      } else if (resp === met) {
        text = `<b>Trastorno mixto: ${resp === 'acid' ? 'acidosis' : 'alcalosis'} mixta</b> (${R[resp]} + ${Mt[met]}). El pH se desvía mucho; ejemplo: ${resp === 'acid' ? 'parada cardiorrespiratoria (hipoventilación + acidosis láctica)' : 'vómitos + hiperventilación'}.`;
      } else {
        const primary = pH < 7.38 ? 'acid' : pH > 7.42 ? 'alk' : null;
        if (!primary) {
          text = `<b>Trastorno totalmente compensado</b>: ${R[resp]} + ${Mt[met]} con pH normal. El contexto clínico dice cuál es el primario.`;
        } else if (resp === primary) {
          text = `<b>${R[resp][0].toUpperCase() + R[resp].slice(1)} parcialmente compensada</b> por el riñón (${Mt[met]} compensadora): cuadro de evolución <b>crónica</b>.`;
        } else {
          text = `<b>${Mt[met][0].toUpperCase() + Mt[met].slice(1)} parcialmente compensada</b> por el pulmón (${R[resp]} compensadora).`;
        }
      }
      // The decimals rule describes the expected response to acidemia; with a normal pH the disorder is simply fully compensated.
      if (met === 'acid' && resp !== 'acid' && pH < 7.38 && pH > 7.0) {
        const expected = 100 * (pH - 7);
        const diff = P - expected;
        if (Math.abs(diff) <= 3) text += ` P<sub>CO₂</sub> ≈ ${fmt(expected, 0)} esperada (regla de los decimales): <b>compensación adecuada → simple</b>.`;
        else if (diff > 3) text += ` P<sub>CO₂</sub> esperada ≈ ${fmt(expected, 0)} mmHg y medida ${fmt(P, 0)}: <b>compensación insuficiente → componente respiratorio añadido</b>.`;
        else text += ` P<sub>CO₂</sub> esperada ≈ ${fmt(expected, 0)} mmHg y medida ${fmt(P, 0)}: <b>hiperventilación excesiva → alcalosis respiratoria añadida</b>.`;
      }
      return `<b>${status}.</b> ${text}`;
    }

    function report(pH, hco3) {
      document.getElementById('dav-out').innerHTML =
        stat('pH', fmt(pH, 2), '') +
        stat('[HCO₃⁻]', fmt(hco3, 1), 'mmol/L') +
        stat('P<sub>CO₂</sub>', fmt(state.P, 1), 'mmHg') +
        stat('[CO₂d]', fmt(0.03 * state.P, 2), 'mmol/L') +
        stat('[H⁺]', fmt(Math.pow(10, 9 - pH), 0), 'nmol/L') +
        stat('Exceso ác. fijos', `${state.exc > 0.05 ? '+' : ''}${fmt(Number(state.exc.toFixed(1)) || 0, 1)}`, `mmol/L · BE ${fmt(Number((-state.exc).toFixed(1)) || 0, 1)}`);
      document.getElementById('dav-verdict').innerHTML = classify(pH, state.P, state.exc);
    }

    function syncSliders() {
      pIn.value = state.P;
      eIn.value = state.exc;
      document.querySelector('output[for="d-p"]').textContent = fmt(state.P, 1);
      document.querySelector('output[for="d-e"]').textContent = (state.exc > 0 ? '+' : '') + fmt(state.exc, 1);
    }

    function setPoint(P, exc, keepTrail) {
      state.P = Math.min(110, Math.max(15, P));
      state.exc = Math.min(25, Math.max(-20, exc));
      if (!keepTrail) trail = [];
      syncSliders();
      render();
    }

    function fromPoint(pH, hco3) {
      const P = hco3 / (0.03 * Math.pow(10, pH - 6.1));
      const exc = line(0, pH) - hco3;
      setPoint(P, exc);
    }

    // Presets: sequence of (P, exc) targets; path interpolates one variable at a time.
    function excForPH(P, pH) {
      return line(0, pH) - iso(P, pH);
    }
    function compensatedP(exc) {
      return bisect(P => P - 100 * (solvePH(P, exc) - 7), 10, 40);
    }
    const PRESETS = {
      normal: () => [[40, 0]],
      ra_a: () => [[65, 0]],
      ra_c: () => [[60, 0], [60, excForPH(60, 7.37)]],
      rk_a: () => [[25, 0]],
      rk_c: () => [[25, 0], [25, excForPH(25, 7.44)]],
      ma_p: () => [[40, 12]],
      ma_c: () => [[40, 12], [compensatedP(12), 12]],
      mk: () => [[40, -12], [47, -12]],
      mix_a: () => [[70, 0], [70, 10]],
      mix_k: () => [[28, 0], [28, -10]]
    };

    function playPath(targets) {
      if (anim) cancelAnimationFrame(anim);
      trail = [];
      const pts = [[40, 0], ...targets];
      let seg = 0, t0 = performance.now();
      const DUR = 1300;
      function frame(now) {
        const [P0, e0] = pts[seg];
        const [P1, e1] = pts[seg + 1];
        const t = Math.min(1, (now - t0) / DUR);
        const P = P0 + (P1 - P0) * t, exc = e0 + (e1 - e0) * t;
        state.P = P;
        state.exc = exc;
        const pH = solvePH(P, exc);
        trail.push([pH, iso(P, pH)]);
        syncSliders();
        render();
        if (t >= 1) {
          seg++;
          t0 = now;
          if (seg >= pts.length - 1) { anim = null; return; }
        }
        anim = requestAnimationFrame(frame);
      }
      if (pts.length < 2) { setPoint(40, 0); return; }
      anim = requestAnimationFrame(frame);
    }

    setupCanvas(canvas, 0.62, draw, 320);
    bindRange(pIn, v => { state.P = v; trail = []; render(); }, v => fmt(v, 1));
    bindRange(eIn, v => { state.exc = v; trail = []; render(); }, v => (v > 0 ? '+' : '') + fmt(v, 1));
    bindRange(sIn, v => { state.s = v; render(); }, v => fmt(v, 0));

    document.querySelectorAll('#dav-presets [data-d]').forEach(b => b.addEventListener('click', () => {
      playPath(PRESETS[b.dataset.d]());
    }));

    document.getElementById('g-go').addEventListener('click', () => {
      const pH = parseFloat(document.getElementById('g-ph').value);
      const P = parseFloat(document.getElementById('g-p').value);
      if (!isFinite(pH) || !isFinite(P) || P <= 0) return;
      setPoint(P, line(0, pH) - iso(P, pH));
    });

    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      const g = geom();
      const pH = g.invX(e.clientX - r.left), v = g.invY(e.clientY - r.top);
      if (pH < X0 || pH > X1 || v <= 0.5 || v > Y1) return;
      fromPoint(pH, v);
    });
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      const g = geom();
      const pH = g.invX(e.clientX - r.left), v = g.invY(e.clientY - r.top);
      if (pH < X0 || pH > X1 || v <= 0.5 || v > Y1) { tip.style.opacity = 0; return; }
      const P = v / (0.03 * Math.pow(10, pH - 6.1));
      tip.innerHTML = `pH ${fmt(pH, 2)} · HCO₃⁻ ${fmt(v, 1)} · P<sub>CO₂</sub> ${fmt(P, 0)} mmHg`;
      tip.style.left = Math.min(e.clientX - r.left + 12, r.width - 220) + 'px';
      tip.style.top = (e.clientY - r.top + 12) + 'px';
      tip.style.opacity = 1;
    });
    canvas.addEventListener('mouseleave', () => { tip.style.opacity = 0; });
    canvas.style.cursor = 'crosshair';
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPH();
    initTitration();
    initAlpha();
    initOpen();
    initDavenport();
  });
})();
