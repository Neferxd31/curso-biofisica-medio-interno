/* Module 2 widgets: dysnatremia classifier, Edelman, regulation loops stepper, Pitts diagram, diagnostic matrix. */
(function () {
  'use strict';
  const { css, fmt, setupCanvas, bindRange } = window.Bio;

  function stat(k, v, u) {
    return `<div class="stat"><div class="k">${k}</div><div class="v">${v} <span class="u">${u || ''}</span></div></div>`;
  }
  function signed(v, d) {
    // Round first so tiny float residues never print as "+0,0" or "-0,0".
    const r = Number(v.toFixed(d)) || 0;
    return (r > 0 ? '+' : '') + fmt(r, d);
  }

  /* ------------------------------------------------------------ 2.4 classifier */
  function initHypo() {
    const root = document.getElementById('w-hypo');
    if (!root) return;
    const ids = ['h-na', 'h-osm', 'h-urea', 'h-glu'];
    const [na, osm, urea, glu] = ids.map(id => document.getElementById(id));
    const REF = 285;

    function update() {
      const cNa = +na.value, cOsm = +osm.value, cUrea = +urea.value, cGlu = +glu.value;
      const osmEf = cOsm - cUrea;
      const estimated = 2 * cNa + cGlu;
      root.querySelector('#h-out').innerHTML =
        stat('Osm. efectiva', fmt(osmEf, 0), 'mOsm/kg') +
        stat('2·Na + glucosa', fmt(estimated, 0), 'mOsm/kg') +
        stat('Desvío vs 285', signed(osmEf - REF, 0), 'mOsm/kg');
      let msg;
      if (cNa < 135) {
        if (osmEf < REF - 10) msg = '<b>Hiponatremia hipotónica.</b> La osmolalidad efectiva es baja: hay un exceso relativo de agua → <b>hiperhidratación celular</b>. Es el caso más frecuente (≈ 95 %).';
        else if (osmEf <= REF + 10) msg = '<b>Hiponatremia isotónica (pseudohiponatremia).</b> La osmolalidad efectiva es normal: baja la fracción acuosa del plasma (hiperproteinemia o hiperlipidemia). Hidratación celular <b>normal</b>; la potenciometría directa daría una molalidad normal.';
        else msg = `<b>Hiponatremia hipertónica.</b> Un soluto eficaz no sódico (glucosa ${cGlu > 15 ? 'muy elevada aquí' : 'o manitol'}) saca agua de las células y diluye el Na⁺ → <b>deshidratación celular</b> a pesar de la natremia baja.`;
      } else if (cNa > 145) {
        msg = '<b>Hipernatremia: siempre hipertónica.</b> Indica <b>deshidratación celular</b> y, en la práctica, un déficit hídrico.';
      } else if (osmEf > REF + 10) {
        msg = '<b>Hipertonía no sódica</b> (hiperglucemia, manitol): deshidratación celular con natremia normal.';
      } else if (osmEf < REF - 10) {
        msg = 'Osmolalidad efectiva baja con natremia normal: revisa los datos (situación poco coherente).';
      } else {
        msg = `<b>Tonicidad normal</b> → hidratación celular normal.${cUrea > 15 ? ' La osmolalidad total está alta solo por la urea, que es ineficaz: no mueve agua.' : ''}`;
      }
      root.querySelector('#h-verdict').innerHTML = msg;
    }
    [na, osm, urea, glu].forEach(i => i.addEventListener('input', update));
    root.querySelectorAll('[data-hypo]').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.hypo.split(',');
      [na, osm, urea, glu].forEach((inp, i) => { inp.value = v[i]; });
      update();
    }));
    update();
  }

  /* ------------------------------------------------------------ 2.5 Edelman */
  function initEdelman() {
    const root = document.getElementById('w-edel');
    if (!root) return;
    const na = document.getElementById('e-na');
    const k = document.getElementById('e-k');
    const v = document.getElementById('e-v');
    function update() {
      const c = (+na.value + +k.value) / +v.value;
      root.querySelector('#e-out').innerHTML =
        stat('Natremia estimada', fmt(c, 1), 'mmol/L') +
        stat('Na<sub>e</sub> + K<sub>e</sub>', fmt(+na.value + +k.value, 0), 'mmol') +
        stat('Osm. efectiva ≈ 2c', fmt(2 * c, 0), 'mOsm/kg');
      let msg = c < 135 ? '<b>Hiponatremia.</b> ' : c > 145 ? '<b>Hipernatremia.</b> ' : '<b>Natremia normal.</b> ';
      msg += 'Prueba a bajar solo el potasio: la natremia cae aunque el sodio y el agua no cambien. El potasio es un determinante de la natremia.';
      root.querySelector('#e-verdict').innerHTML = msg;
    }
    bindRange(na, update, x => fmt(x, 0));
    bindRange(k, update, x => fmt(x, 0));
    bindRange(v, update, x => fmt(x, 1));
  }

  /* ------------------------------------------------------------ 2.6 loops stepper */
  function initLoops() {
    const svg = document.getElementById('loops-svg');
    if (!svg) return;
    const SCEN = {
      water: [
        { hl: ['w4'], t: 'Se beben 2 L de agua: aumenta el <b>contenido hídrico V</b>.' },
        { hl: ['wa4', 'w1'], t: 'El agua se reparte entre célula y extracelular. Baja la osmolalidad efectiva → <b>hiperhidratación celular</b> transitoria (hiponatremia leve).' },
        { hl: ['wa1', 'w2'], t: 'Los <b>osmorreceptores</b> hipotalámicos detectan el aumento de volumen celular.' },
        { hl: ['wa2', 'w3'], t: 'Se <b>inhibe la ADH</b>: el riñón elimina una orina muy diluida. No hay sed.' },
        { hl: ['wa3', 'w4'], t: 'Se pierde el exceso de agua: V vuelve a su valor y la <b>hidratación celular se normaliza</b>.' },
        { hl: ['n1', 'na1', 'n2', 'na2', 'n3'], t: 'En paralelo, la ligera hipervolemia efectiva aumenta un poco la natriuresis: el contenido de Na se <b>adapta</b> mientras dura el exceso de agua.' }
      ],
      salt: [
        { hl: ['n4'], t: 'Comida muy salada: aumentan los osmoles eficaces extracelulares (<b>M</b>).' },
        { hl: ['w1'], t: 'Sube la osmolalidad efectiva: sale agua de las células (<b>deshidratación celular</b>) y se expande el extracelular.' },
        { hl: ['wa1', 'w2', 'wa2', 'w3'], t: 'Osmorreceptores → <b>ADH ↑ y sed</b>: se retiene y se bebe agua.' },
        { hl: ['wa3', 'w4'], t: 'Aumenta el contenido hídrico (sube el peso) hasta que la sobrecarga de sal es <b>isotónica</b>: la hidratación celular se normaliza.' },
        { hl: ['n4', 'na4', 'n1'], t: 'Pero el volumen extracelular ha aumentado → <b>hipervolemia efectiva</b>.' },
        { hl: ['na1', 'n2', 'na2', 'n3'], t: 'Los baro y volorreceptores estimulan la <b>natriuresis</b> (hormonas natriuréticas).' },
        { hl: ['na3', 'n4', 'w4'], t: 'Se elimina el exceso de Na y, con él, el agua retenida (el bucle hídrico mantiene la isotonía). Todo vuelve a la normalidad.' }
      ],
      hypo: [
        { hl: ['n1'], t: 'Cae la <b>volemia efectiva</b>: hemorragia o déficit real de Na, pero también bajo gasto cardíaco, cirrosis o síndrome nefrótico.' },
        { hl: ['na1', 'n2'], t: 'Los <b>barorreceptores</b> detectan la caída de presión.' },
        { hl: ['na2', 'n3', 'na3', 'n4'], t: 'Desde el principio y de forma continua <b>disminuye la natriuresis</b>: el riñón retiene sodio.' },
        { hl: ['x1', 'w3'], t: 'Si la hipovolemia efectiva es <b>intensa</b>, se estimulan la ADH y la angiotensina (sed) <b>aunque la osmolalidad sea normal o baja</b>.' },
        { hl: ['wa3', 'w4', 'wa4', 'w1'], t: 'Se retiene agua → baja la osmolalidad efectiva → <b>hiperhidratación celular e hiponatremia</b>, "por déficit" o "por sobrecarga".' },
        { hl: ['n1', 'n4'], t: 'Si no hay falta real de volumen (insuficiencia cardíaca, cirrosis), la volemia efectiva no se corrige, el Na sigue acumulándose y aparecen <b>edemas</b>: sobrecarga secundaria de Na.' }
      ]
    };
    let scen = 'water';
    let idx = 0;

    function paint() {
      const step = SCEN[scen][idx];
      svg.querySelectorAll('.box').forEach(b => b.classList.remove('hl', 'pulse'));
      svg.querySelectorAll('.arrow').forEach(a => a.classList.remove('hl', 'flow'));
      step.hl.forEach(id => {
        const el = svg.getElementById ? svg.getElementById(id) : svg.querySelector('#' + id);
        if (!el) return;
        if (el.tagName === 'g') el.querySelector('.box').classList.add('hl', 'pulse');
        else el.classList.add('hl', 'flow');
      });
      document.getElementById('loop-text').innerHTML = `<b>Paso ${idx + 1}.</b> ${step.t}`;
      document.getElementById('loop-count').textContent = `${idx + 1} / ${SCEN[scen].length}`;
    }
    document.getElementById('loop-next').addEventListener('click', () => {
      idx = (idx + 1) % SCEN[scen].length;
      paint();
    });
    document.getElementById('loop-prev').addEventListener('click', () => {
      idx = (idx - 1 + SCEN[scen].length) % SCEN[scen].length;
      paint();
    });
    document.querySelectorAll('#loop-scen button').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('#loop-scen button').forEach(x => x.classList.toggle('on', x === b));
      scen = b.dataset.scen;
      idx = 0;
      paint();
    }));
    paint();
  }

  /* ------------------------------------------------------------ 2.7 Pitts */
  function initPitts() {
    const canvas = document.getElementById('pitts-canvas');
    if (!canvas) return;
    const VI0 = 25, VE0 = 17, OSM0 = 280;
    const K0 = OSM0 * VI0, M0 = OSM0 * VE0;
    const wIn = document.getElementById('p-water');
    const nIn = document.getElementById('p-na');
    const kIn = document.getElementById('p-k');
    const bW = document.getElementById('p-loopW');
    const bN = document.getElementById('p-loopN');
    let loopW = false, loopN = false;
    let view = null;
    let shown = { vi: VI0, ve: VE0, hi: OSM0, he: OSM0 };
    let caption = 'Estado normal';
    let flowDir = 0;
    let anim = null;
    let presetNote = '';

    function stages() {
      const dV = +wIn.value, dNa = +nIn.value, dK = +kIn.value;
      const K = K0 + 2 * dK;
      let M = M0 + 2 * dNa;
      let V = VI0 + VE0 + dV;
      const A = { vi: VI0, ve: Math.max(0.5, VE0 + dV), hi: K / VI0, he: 0 };
      A.he = M / A.ve;
      let osm = (K + M) / V;
      const B = { vi: K / osm, ve: M / osm, hi: osm, he: osm, V, M, K };
      let C = null;
      if (loopW || loopN) {
        if (loopW && loopN) {
          osm = K / VI0;
          M = osm * VE0;
          V = VI0 + VE0;
        } else if (loopW) {
          osm = K / VI0;
          V = (K + M) / osm;
        } else {
          M = K * VE0 / (V - VE0);
          osm = (K + M) / V;
        }
        C = { vi: K / osm, ve: M / osm, hi: osm, he: osm, V, M, K };
      }
      return { A, B, C };
    }

    function draw(state) {
      view = state;
      render();
    }

    function render() {
      if (!view) return;
      const { ctx, w, h } = view;
      ctx.clearRect(0, 0, w, h);
      const padL = 44, padR = 52, padT = 34, padB = 34;
      const maxVi = 36, maxVe = 30, maxOsm = 380;
      const s = (w - padL - padR) / (maxVi + maxVe);
      const x0 = padL + maxVi * s;
      const yb = h - padB;
      const Y = o => yb - o / maxOsm * (h - padT - padB);
      const text2 = css('--text-2'), muted = css('--muted');

      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.strokeStyle = css('--grid');
      ctx.lineWidth = 1;
      [100, 200, 280, 360].forEach(o => {
        ctx.beginPath(); ctx.moveTo(padL, Y(o)); ctx.lineTo(w - padR, Y(o)); ctx.stroke();
        ctx.fillStyle = muted; ctx.textAlign = 'right'; ctx.fillText(o, padL - 6, Y(o) + 4);
        ctx.textAlign = 'left'; ctx.fillText(o / 2, w - padR + 6, Y(o) + 4);
      });
      ctx.save();
      ctx.fillStyle = text2;
      ctx.font = '600 11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('osM ef (mOsm/kg)', 4, 16);
      ctx.textAlign = 'right';
      ctx.fillText('Natremia (mmol/L)', w - 4, 16);
      ctx.restore();

      ctx.strokeStyle = css('--axis');
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(padL, yb); ctx.lineTo(w - padR, yb); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, yb + 6); ctx.lineTo(x0, padT - 8); ctx.stroke();
      ctx.fillStyle = muted; ctx.textAlign = 'center';
      ctx.fillText('← VIC (L)', x0 - 60, yb + 22);
      ctx.fillText('VEC (L) →', x0 + 60, yb + 22);
      ctx.fillText('0', x0, yb + 22);

      const rect = (x, wd, top, color, alpha) => {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x, Y(top), wd, yb - Y(top));
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, Y(top), wd, yb - Y(top));
      };
      rect(x0 - shown.vi * s, shown.vi * s, shown.hi, css('--s1'), 0.28);
      rect(x0, shown.ve * s, shown.he, css('--s3'), 0.28);

      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x0 - VI0 * s, Y(OSM0), VI0 * s, yb - Y(OSM0));
      ctx.strokeRect(x0, Y(OSM0), VE0 * s, yb - Y(OSM0));
      ctx.setLineDash([]);

      ctx.fillStyle = css('--text');
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`VIC ${fmt(shown.vi, 1)} L`, x0 - shown.vi * s / 2, Y(shown.hi) + 18);
      ctx.fillText(`VEC ${fmt(shown.ve, 1)} L`, x0 + shown.ve * s / 2, Y(shown.he) + 18);
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.fillStyle = text2;
      ctx.fillText(`${fmt(shown.hi, 0)} mOsm/kg`, x0 - shown.vi * s / 2, Y(shown.hi) + 34);
      ctx.fillText(`${fmt(shown.he, 0)} mOsm/kg`, x0 + shown.ve * s / 2, Y(shown.he) + 34);

      if (flowDir !== 0) {
        const yA = Y(Math.min(shown.hi, shown.he) * 0.5);
        const len = 46;
        ctx.strokeStyle = css('--accent');
        ctx.fillStyle = css('--accent');
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x0 - flowDir * len / 2, yA);
        ctx.lineTo(x0 + flowDir * len / 2, yA);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x0 + flowDir * (len / 2 + 8), yA);
        ctx.lineTo(x0 + flowDir * (len / 2 - 4), yA - 7);
        ctx.lineTo(x0 + flowDir * (len / 2 - 4), yA + 7);
        ctx.fill();
        ctx.font = '700 11px Inter, system-ui, sans-serif';
        ctx.fillText('H₂O', x0, yA - 12);
      }

      ctx.fillStyle = css('--accent');
      ctx.font = '700 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(caption, padL + 4, padT - 12);
    }

    function lerp(a, b, t) {
      return { vi: a.vi + (b.vi - a.vi) * t, ve: a.ve + (b.ve - a.ve) * t, hi: a.hi + (b.hi - a.hi) * t, he: a.he + (b.he - a.he) * t };
    }

    function play() {
      if (anim) cancelAnimationFrame(anim);
      const { A, B, C } = stages();
      const N = { vi: VI0, ve: VE0, hi: OSM0, he: OSM0 };
      const segs = [
        { from: N, to: A, dur: 800, cap: 'A · Perturbación inicial', flow: 0 },
        { from: A, to: A, dur: 700, cap: 'A · Perturbación inicial', flow: 0 },
        { from: A, to: B, dur: 1300, cap: 'B · Flujo osmótico hasta el equilibrio', flow: Math.sign(A.he - A.hi) },
        { from: B, to: B, dur: 500, cap: 'B · Equilibrio osmótico', flow: 0 }
      ];
      if (C) segs.push({ from: B, to: C, dur: 1400, cap: 'C · Tras actuar los bucles de regulación', flow: 0 });
      let i = 0, t0 = performance.now();
      function frame(now) {
        const seg = segs[i];
        const t = Math.min(1, (now - t0) / seg.dur);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        shown = lerp(seg.from, seg.to, e);
        caption = seg.cap;
        flowDir = Math.abs(seg.from.hi - seg.from.he) > 0.5 ? seg.flow : 0;
        render();
        if (t >= 1) {
          i++;
          t0 = now;
          if (i >= segs.length) { flowDir = 0; render(); anim = null; return; }
        }
        anim = requestAnimationFrame(frame);
      }
      anim = requestAnimationFrame(frame);
    }

    function hydration(v, ref) {
      const r = (v - ref) / ref;
      if (r > 0.02) return 1;
      if (r < -0.02) return -1;
      return 0;
    }

    function report() {
      const { B, C } = stages();
      const F = C || B;
      const natremia = F.hi / 2;
      const dW = F.V - (VI0 + VE0);
      const dNa = (F.M - M0) / 2;
      const dK = +kIn.value;
      document.getElementById('p-out').innerHTML =
        stat('Natremia', fmt(natremia, 1), 'mmol/L') +
        stat('VIC', fmt(F.vi, 1), `L (${signed(F.vi - VI0, 1)})`) +
        stat('VEC', fmt(F.ve, 1), `L (${signed(F.ve - VE0, 1)})`) +
        stat('Δ peso (agua)', signed(dW, 1), 'kg') +
        stat('Δ contenido Na', signed(dNa, 0), 'mmol') +
        stat('Δ contenido K', signed(dK, 0), 'mmol');

      const cell = hydration(F.vi, VI0), ec = hydration(F.ve, VE0);
      const NAMES = {
        '1,1': 'Hiperhidratación global (celular + extracelular)',
        '1,0': 'Hiperhidratación celular pura',
        '1,-1': 'Hiperhidratación celular + deshidratación extracelular',
        '0,1': 'Hiperhidratación extracelular pura',
        '0,0': 'Hidratación celular y extracelular normales',
        '0,-1': 'Deshidratación extracelular pura',
        '-1,1': 'Deshidratación celular + hiperhidratación extracelular',
        '-1,0': 'Deshidratación celular pura',
        '-1,-1': 'Deshidratación global (celular + extracelular)'
      };
      let msg = `<b>${NAMES[cell + ',' + ec]}.</b> `;
      if (natremia < 135) msg += 'Hiponatremia. ';
      else if (natremia > 145) msg += 'Hipernatremia. ';
      else msg += 'Natremia normal. ';
      if (dK < 0 && natremia < 135 && cell <= 0) msg += 'Ojo: aquí la hiponatremia <b>no</b> indica hiperhidratación celular, sino el déficit de K⁺ (se incumple la hipótesis b). ';
      if (loopW && Math.abs(dW - +wIn.value) > 0.05) msg += `El bucle hídrico ha ajustado el agua (${signed(dW - +wIn.value, 1)} L). `;
      if (loopN && Math.abs(dNa - +nIn.value) > 1) msg += `El bucle del sodio ha ajustado el Na (${signed(dNa - +nIn.value, 0)} mmol). `;
      if (presetNote) msg += presetNote;
      else if (!loopW && !loopN) msg += '<span class="muted">Bucles desactivados: solo física (equilibrio osmótico).</span>';
      document.getElementById('p-verdict').innerHTML = msg;
    }

    function showFinal() {
      presetNote = '';
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      const { B, C } = stages();
      shown = { ...(C || B) };
      caption = C ? 'Estado final (tras los bucles)' : 'Estado final (equilibrio osmótico)';
      flowDir = 0;
      render();
      report();
    }

    const PRESETS = {
      water: [3, 0, 0, false, false],
      salt: [0, 420, 0, false, false],
      potassium: [0, 0, -420, false, false],
      waterOverload: [3, 0, 0, false, true],
      waterDeficit: [-3, 0, 0, false, true],
      naOverload: [0, 420, 0, true, false],
      naDeficit: [0, -420, 0, true, false],
      naDeficitSevere: [-2, -700, 0, false, false],
      naSecondary: [7, 700, 0, false, false],
      saline: [1, 140, 0, false, false]
    };
    const NOTES = {
      naDeficitSevere: 'La ADH que estimula la hipovolemia efectiva intensa impide que el bucle hídrico corrija: la retención de agua secundaria produce la «hiponatremia por déficit».',
      naSecondary: 'El bajo gasto cardíaco causa hipovolemia efectiva sin falta de volumen: se retienen Na y agua («hiponatremia por sobrecarga», edemas).',
      saline: 'El suero salino isotónico se queda en el extracelular: expande el VEC sin tocar la hidratación celular.'
    };

    function setLoop(btn, on, name) {
      btn.classList.toggle('on', on);
      btn.textContent = `${name}: ${on ? 'ON' : 'OFF'}`;
    }

    bW.addEventListener('click', () => { loopW = !loopW; setLoop(bW, loopW, 'Bucle hídrico'); showFinal(); });
    bN.addEventListener('click', () => { loopN = !loopN; setLoop(bN, loopN, 'Bucle del sodio'); showFinal(); });
    document.getElementById('p-run').addEventListener('click', () => { report(); play(); });
    document.querySelectorAll('#p-presets [data-p]').forEach(b => b.addEventListener('click', () => {
      const [dV, dNa, dK, lw, ln] = PRESETS[b.dataset.p];
      wIn.value = dV; nIn.value = dNa; kIn.value = dK;
      loopW = lw; loopN = ln;
      setLoop(bW, loopW, 'Bucle hídrico');
      setLoop(bN, loopN, 'Bucle del sodio');
      [wIn, nIn, kIn].forEach(i => { document.querySelector(`output[for="${i.id}"]`).textContent = signed(+i.value, i === wIn ? 1 : 0); });
      presetNote = NOTES[b.dataset.p] || '';
      report();
      play();
    }));

    setupCanvas(canvas, 0.5, draw, 300);
    bindRange(wIn, showFinal, v => signed(v, 1));
    bindRange(nIn, showFinal, v => signed(v, 0));
    bindRange(kIn, showFinal, v => signed(v, 0));
  }

  /* ------------------------------------------------------------ 2.9 matrix */
  function initMatrix() {
    const out = document.getElementById('mx-out');
    if (!out) return;
    const M = {
      'hi-de': ['Déficit hídrico + déficit de sodio', 'Deshidratación global (celular y extracelular)', 'Pérdidas hipotónicas (diarrea profusa, sudoración, diuresis osmótica) sin reponer el agua.', 'Aportar agua (oral o glucosa isotónica) y NaCl isotónico.'],
      'hi-no': ['Déficit hídrico puro (Na adaptado al alza)', 'Deshidratación celular pura', 'Diabetes insípida o imposibilidad de beber (coma, lactante, anciano, falta de agua).', 'Aportar agua: oral o glucosa isotónica IV, nunca agua pura IV.'],
      'hi-ed': ['Déficit hídrico + sobrecarga de sodio', 'Deshidratación celular + hiperhidratación extracelular', 'Aporte excesivo de sal o de soluciones sódicas hipertónicas a alguien que no puede beber.', 'Aportar agua y restringir sal (diuréticos si hace falta).'],
      'no-de': ['Déficit de sodio (agua adaptada a la baja)', 'Deshidratación extracelular pura', 'Pérdidas digestivas o renales de Na con el bucle hídrico funcionando; insuficiencia suprarrenal.', 'NaCl isotónico: tantos litros como kg perdidos.'],
      'no-no': ['Balances adaptados', 'Hidratación normal', 'Sin trastorno hidrosódico (o trastornos completamente adaptados).', 'Nada que corregir desde el punto de vista hidrosódico.'],
      'no-ed': ['Sobrecarga primaria de sodio (agua adaptada al alza)', 'Hiperhidratación extracelular pura', 'Exceso de hormonas suprarrenales o aporte de sal mayor que la capacidad de excreción.', 'Dieta sin sal y, si no basta, diuréticos. Δm ≈ 140 mmol por kg ganado.'],
      'lo-de': ['Déficit de sodio grave + sobrecarga hídrica secundaria', 'Deshidratación extracelular + hiperhidratación celular ("hiponatremia por déficit")', 'Déficit de Na intenso: la hipovolemia efectiva estimula la ADH y se retiene agua.', 'NaCl isotónico + restricción hídrica. El déficit de Na se calcula sobre el agua total.'],
      'lo-no': ['Sobrecarga hídrica primaria (Na adaptado a la baja)', 'Hiperhidratación celular pura ("hiponatremia de dilución")', 'Secreción excesiva de ADH o aporte excesivo de líquidos (trastorno de la sed).', 'Restricción hídrica.'],
      'lo-ed': ['Sobrecarga hídrica + sobrecarga de sodio', 'Hiperhidratación global ("hiponatremia por sobrecarga")', 'Hipovolemia efectiva sin déficit de volumen: insuficiencia cardíaca, síndrome nefrótico, cirrosis descompensada.', 'Restricción hídrica + dieta sin sal + diuréticos (con cuidado: agravan la hipovolemia).']
    };
    document.querySelectorAll('[data-mx]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-mx]').forEach(x => x.classList.toggle('on', x === b));
      const [bal, hyd, cause, tx] = M[b.dataset.mx];
      out.innerHTML = `<b>${bal}</b><br>${hyd}.<br><span class="small"><b>Causas típicas:</b> ${cause}<br><b>Tratamiento:</b> ${tx}</span>${b.dataset.mx.startsWith('lo') ? '<br><span class="small muted">Antes, confirma que la hiponatremia es hipotónica (descarta pseudohiponatremia e hiperglucemia).</span>' : ''}`;
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHypo();
    initEdelman();
    initLoops();
    initPitts();
    initMatrix();
  });
})();
