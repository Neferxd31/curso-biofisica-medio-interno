/* Question bank — Module 3. Each item: t = topic, q = stem, o = options, a = index of correct option, e = explanation. */
window.QUIZ = window.QUIZ || {};
window.QUIZ.m3 = [
  {
    t: '3.1',
    q: 'A 37 °C la constante de disociación del agua es ≈ 2.5 × 10⁻¹⁴ (10⁻¹³·⁶). Una solución de pH 7.0 a 37 °C es:',
    o: [
      'Neutra, porque la neutralidad corresponde siempre a pH 7.',
      'Ácida, porque su pH es inferior al del plasma.',
      'Ligeramente básica, porque a 37 °C la neutralidad está en pH 6.8.',
      'Neutra, porque [H⁺] = [OH⁻] = 10⁻⁷ mol/L a cualquier temperatura.'
    ],
    a: 2,
    e: 'Neutralidad: [H⁺] = [OH⁻] = √K → pH = 13.6/2 = 6.8. Un pH de 7.0 está por encima: [OH⁻] > [H⁺]. El plasma (7.40) es 0.6 unidades más básico que la neutralidad. Que la solución sea más ácida que el plasma no la hace ácida.'
  },
  {
    t: '3.1',
    q: 'El pH arterial de un paciente cae de 7.40 a 7.10. Su concentración de H⁺ libres pasa de ≈ 40 nmol/L a aproximadamente:',
    o: ['≈ 44 nmol/L', '≈ 52 nmol/L', '≈ 80 nmol/L', '≈ 400 nmol/L'],
    a: 2,
    e: '[H⁺] = 10<sup>9−pH</sup> nmol/L: 10<sup>1.9</sup> ≈ 79 nmol/L. Bajar 0.3 unidades de pH duplica la [H⁺], porque 10<sup>0.3</sup> ≈ 2. Bajar 1 unidad la multiplicaría por 10 (≈ 400).'
  },
  {
    t: '3.2',
    q: 'Un ácido débil tiene un pK<sub>A</sub> de 4.8 a 25 °C. El pK<sub>B</sub> de su base conjugada es:',
    o: ['4.8', '9.2', '18.8', '−4.8'],
    a: 1,
    e: 'K<sub>A</sub>·K<sub>B</sub> = K<sub>H₂O</sub>, luego pK<sub>A</sub> + pK<sub>B</sub> = 14 → pK<sub>B</sub> = 9.2. Cuanto más fuerte es el ácido, más débil es su base conjugada.'
  },
  {
    t: '3.2',
    q: 'El pK del NH₄⁺ es 9.2 y el pH urinario es ≈ 6. Esto implica que:',
    o: [
      'El NH₄⁺ está prácticamente sin disociar en la orina: cada NH₃ que llega a ella fija un H⁺.',
      'El NH₄⁺ está disociado al 50 % y libera H⁺ que acidifican la orina.',
      'El NH₃ se comporta como un ácido fuerte en la orina.',
      'El amonio no participa en la excreción de H⁺ porque su pK está lejos del pH urinario.'
    ],
    a: 0,
    e: 'Con pK − pH ≈ 3, α ≈ 0.06 %: el NH₄⁺ casi no se disocia. Su base conjugada, el NH₃, se comporta como una base fuerte y capta un H⁺ por molécula. Precisamente porque su pK está lejos del pH urinario, el amonio "atrapa" los H⁺ de forma casi completa (≈ 2/3 del H⁺ excretado).'
  },
  {
    t: '3.3',
    q: 'Una solución contiene 12 mmol/L de AH (pK 6.8) y 48 mmol/L de su sal sódica NaA. Su pH es:',
    o: ['6.20', '6.80', '7.10', '7.40'],
    a: 3,
    e: 'Henderson-Hasselbalch: pH = 6.8 + log(48/12) = 6.8 + log 4 = 6.8 + 0.6 = 7.40. Es el mismo cociente A⁻/AH = 4 que tienen los tampones cerrados del organismo a pH 7.40.'
  },
  {
    t: '3.3',
    q: 'A 1 L de la solución anterior (48 mmol A⁻ / 12 mmol AH, pK 6.8) se le añaden 9 mmol de HCl. El pH final es aproximadamente:',
    o: ['2.05', '6.80', '7.07', '7.31'],
    a: 2,
    e: 'Los 9 mmol de H⁺ convierten 9 mmol de A⁻ en AH: pH = 6.8 + log(39/21) ≈ 6.8 + 0.27 = 7.07. 7.31 sale de olvidar que AH también aumenta. Sin tampón, el pH sería ≈ 2.05.'
  },
  {
    t: '3.3',
    q: 'Se diluye diez veces una solución tampón con agua pura. Entonces:',
    o: [
      'El pH no cambia y el poder tampón disminuye unas diez veces.',
      'El pH sube una unidad y el poder tampón no cambia.',
      'Ni el pH ni el poder tampón cambian.',
      'El pH no cambia y el poder tampón aumenta, porque hay más agua disociada.'
    ],
    a: 0,
    e: 'El pH depende del cociente [A⁻]/[AH], que la dilución no cambia. El poder tampón es proporcional a la concentración total del par, que se divide por diez. Además, el poder tampón es máximo cuando pH = pK.'
  },
  {
    t: '3.3',
    q: 'Se introduce un ácido débil de pK 5.4 en un medio tamponado a pH 7.4. Su grado de disociación es aproximadamente:',
    o: ['≈ 1 %', '≈ 50 %', '≈ 91 %', '≈ 99 %'],
    a: 3,
    e: 'α = 1/(1 + 10<sup>pK−pH</sup>) = 1/(1 + 10⁻²) ≈ 0.99. Si pK ≤ pH − 2, la disociación es casi total y el ácido se comporta como fuerte. Así se comportan los ácidos fijos orgánicos en el organismo (láctico, pK 4.8).'
  },
  {
    t: '3.4',
    q: 'A pH 7.40 y 37 °C, el cociente [HCO₃⁻]/[CO₂d] vale:',
    o: ['0.05', '1.3', '4', '20'],
    a: 3,
    e: '7.40 = 6.1 + log(cociente) → log(cociente) = 1.3 → cociente = 10<sup>1.3</sup> ≈ 20. Con [HCO₃⁻] = 24 mmol/L, [CO₂d] = 1.2 mmol/L. El 4 corresponde a A⁻/AH de los tampones cerrados (pK 6.8).'
  },
  {
    t: '3.4',
    q: 'Un paciente tiene una P<sub>CO₂</sub> arterial de 60 mmHg. Su concentración de CO₂ disuelto es:',
    o: ['0.6 mmol/L', '1.8 mmol/L', '2.0 mmol/L', '18 mmol/L'],
    a: 1,
    e: '[CO₂d] = a·P<sub>CO₂</sub> con a = 0.03 mmol·L⁻¹·mmHg⁻¹ → 0.03 × 60 = 1.8 mmol/L (normal: 1.2 mmol/L con 40 mmHg).'
  },
  {
    t: '3.4',
    q: 'Sobre los ácidos fijos, señale la afirmación correcta:',
    o: [
      'Los minerales (≈ 35 mmol/día) dan aniones no metabolizables; los orgánicos (≈ 2000–2500 mmol/día) dan aniones casi todos metabolizables.',
      'Los orgánicos, unos 35 mmol/día, se eliminan sobre todo por el pulmón.',
      'Como su pK es superior al pH del organismo, se comportan como ácidos débiles.',
      'El ácido sulfúrico procede sobre todo del metabolismo de los glúcidos.'
    ],
    a: 0,
    e: 'Fosfórico (caseína) y sulfúrico (aminoácidos azufrados) son minerales, ≈ 35 mmol/día, y sus aniones no se metabolizan. Láctico, pirúvico, cítrico y ácidos grasos son orgánicos, ≈ 2000–2500 mmol/día, y sus aniones se metabolizan salvo ≈ 35 mmol/día. Su pK es inferior al pH: se comportan como ácidos fuertes.'
  },
  {
    t: '3.5',
    q: '¿Qué vía de eliminación de la carga ácida lo hace SIN consumir bicarbonato?',
    o: [
      'El pulmón, al espirar CO₂.',
      'El riñón, que secreta H⁺ a la orina y devuelve HCO₃⁻ al plasma.',
      'El tampón bicarbonato plasmático.',
      'La hemoglobina eritrocitaria.'
    ],
    a: 1,
    e: 'El pulmón elimina H⁺ mediante H⁺ + HCO₃⁻ → CO₂: gasta bicarbonato. En la célula tubular (rica en anhidrasa carbónica), CO₂ + H₂O → HCO₃⁻ + H⁺: el H⁺ va a la orina y el HCO₃⁻ vuelve al plasma. Los tampones solo captan H⁺ transitoriamente; no eliminan nada.'
  },
  {
    t: '3.5',
    q: 'El H⁺ excretado en la orina se neutraliza aproximadamente:',
    o: [
      'Por completo como H⁺ libre, lo que explica un pH urinario de 4–7.',
      '≈ 1/3 por el tampón fosfato (acidez titulable) y ≈ 2/3 como NH₄⁺.',
      '≈ 2/3 por el tampón fosfato y ≈ 1/3 como NH₄⁺.',
      'Mitad por el bicarbonato urinario y mitad por las proteínas urinarias.'
    ],
    a: 1,
    e: 'Si el H⁺ fuera libre, la orina sería extremadamente ácida. Un tercio lo capta el HPO₄²⁻ (→ H₂PO₄⁻) y dos tercios el NH₃ sintetizado en el riñón (→ NH₄⁺). H⁺ eliminado = amoniuria + acidez titulable. En condiciones normales la orina no contiene proteínas.'
  },
  {
    t: '3.6',
    q: 'Al titular la sangre añadiendo CO₂ (subiendo la P<sub>CO₂</sub>) se mide:',
    o: [
      'El poder tampón total: bicarbonato + tampones cerrados.',
      'Solo el poder de los tampones cerrados, porque el H⁺ de cada CO₂ disociado solo pueden captarlo ellos.',
      'Solo el poder del tampón bicarbonato.',
      'El poder tampón de los ácidos fijos.'
    ],
    a: 1,
    e: 'Cada CO₂ que se disocia genera un HCO₃⁻ y un H⁺. Ese H⁺ no lo puede captar el bicarbonato (sería la reacción inversa), así que lo captan los tampones cerrados: Δ[HCO₃⁻] + Δ[A⁻] = 0. Con un ácido fijo (HCl) sí se mide el poder total.'
  },
  {
    t: '3.6',
    q: 'Un paciente tiene una hemoglobina de 10 g/dL. El poder tampón de su sangre in vitro es aproximadamente:',
    o: ['15.6 mEq·L⁻¹·pH⁻¹', '18.2 mEq·L⁻¹·pH⁻¹', '23.8 mEq·L⁻¹·pH⁻¹', '30 mEq·L⁻¹·pH⁻¹'],
    a: 2,
    e: 'Poder tampón de la sangre in vitro = 8.2 + 1.56 × Hb (g/dL) = 8.2 + 15.6 = 23.8. La anemia reduce el poder tampón y aplana las rectas de equilibrio del Davenport. Con Hb ≈ 14 g/dL se obtienen los ≈ 30 de referencia.'
  },
  {
    t: '3.6',
    q: 'A pH 7.40, el cociente [A⁻]/[AH] del conjunto de tampones cerrados (pK útil 6.8) es:',
    o: ['1', '4', '5', '20'],
    a: 1,
    e: '7.40 = 6.8 + log([A⁻]/[AH]) → 10<sup>0.6</sup> ≈ 4. En general [A⁻]/[AH] = (1/5)·[HCO₃⁻]/[CO₂d]: al controlar CO₂d y HCO₃⁻, pulmón y riñón fijan el estado de todos los tampones cerrados. El 5 es el factor 10<sup>0.7</sup>, no el cociente.'
  },
  {
    t: '3.6',
    q: 'El poder tampón de la sangre in vivo (≈ 22) es menor que el de la sangre in vitro (≈ 30) porque:',
    o: [
      'In vivo, los tampones cerrados están de media menos concentrados en el conjunto de los líquidos corporales que en la sangre.',
      'In vivo el bicarbonato deja de actuar como tampón.',
      'A 37 °C los tampones se disocian menos que en el laboratorio.',
      'El riñón elimina tampones cerrados durante la medida.'
    ],
    a: 0,
    e: 'Al respirar CO₂, el ácido volátil se titula frente a todos los tampones cerrados del organismo, diluidos en todos los compartimientos. La sangre es especialmente rica en ellos (hemoglobina). Aun así, la capacidad total in vivo es mucho mayor, porque el volumen es mucho mayor.'
  },
  {
    t: '3.6',
    q: 'Aunque su pK (6.1) está lejos del pH plasmático, el bicarbonato es el tampón más eficaz frente a los ácidos fijos porque:',
    o: [
      'Su concentración plasmática es la más alta de todos los tampones.',
      'Es un sistema abierto: el CO₂ formado al captar H⁺ se elimina por el pulmón y no se acumula.',
      'Su pK aumenta con la temperatura hasta acercarse a 7.4.',
      'Es intracelular y está protegido por la membrana.'
    ],
    a: 1,
    e: 'En un bicarbonato cerrado (1 L con 24/1.2), 9 mmol de HCl bajarían el pH a ≈ 6.27. Con P<sub>CO₂</sub> constante (abierto), solo a ≈ 7.20, y bajando la P<sub>CO₂</sub> se vuelve a 7.40. El carácter abierto, controlado por pulmón y riñón, le da una eficacia muy superior a la que predice su pK.'
  },
  {
    t: '3.7',
    q: 'En un adulto de 70 kg, la carga de ácidos fijos que el riñón debe eliminar cada día es aproximadamente:',
    o: ['35 mmol', '70 mmol', '2000 mmol', '20 000 mmol'],
    a: 1,
    e: '≈ 1 mmol/kg/día: 35 mmol de ácidos minerales + 35 mmol de orgánicos no metabolizables. Los ≈ 2000 mmol de orgánicos metabolizables los neutraliza el metabolismo y los ≈ 20 000 mmol de CO₂ los elimina el pulmón.'
  },
  {
    t: '3.7',
    q: 'Los tampones no bastan para mantener el pH estable a largo plazo porque:',
    o: [
      'Son saturables: cada H⁺ captado consume un A⁻ o un HCO₃⁻, y solo amortiguan (efecto inercial) sin eliminar la carga ácida.',
      'Solo funcionan a 25 °C.',
      'Actúan demasiado despacio (horas) frente a la producción de ácido.',
      'Liberan más H⁺ de los que captan cuando el pH es normal.'
    ],
    a: 0,
    e: 'Los tampones actúan de inmediato, pero solo desplazan el problema: fijan H⁺ a costa de gastar su base. La estabilidad exige que la eliminación (pulmón, riñón, metabolismo) iguale a la producción. De lo contrario, el bicarbonato y los tampones se irían agotando.'
  },
  {
    t: '3.8',
    q: 'Un paciente tiene P<sub>CO₂</sub> 30 mmHg (hipocapnia) y pH 7.30. Es correcto que:',
    o: [
      'Es imposible: una alcalosis respiratoria siempre produce alcalemia.',
      'Tiene una alcalosis respiratoria y acidemia, lo que indica una acidosis metabólica que predomina sobre ella.',
      'Tiene una acidosis respiratoria, porque el pH es bajo.',
      'Es una alcalosis respiratoria aguda pura.'
    ],
    a: 1,
    e: 'Acidemia (pH < 7.38) no es lo mismo que acidosis (el proceso). La hipocapnia es un proceso alcalinizante; si el pH es bajo, domina una acidosis metabólica. Con pH 7.30 y P<sub>CO₂</sub> 30, es la acidosis metabólica con compensación respiratoria esperada.'
  },
  {
    t: '3.8',
    q: 'En una acidosis respiratoria aguda pura, antes de cualquier compensación renal, la [HCO₃⁻] plasmática:',
    o: [
      'Disminuye, porque se consume al tamponar el CO₂.',
      'No cambia, porque el riñón aún no ha actuado.',
      'Aumenta moderadamente, porque el CO₂ se disocia en HCO₃⁻ + H⁺ y los tampones cerrados captan el H⁺.',
      'Aumenta mucho, porque el riñón compensa de inmediato.'
    ],
    a: 2,
    e: 'CO₂d → HCO₃⁻ + H⁺. Los H⁺ los captan los tampones cerrados (A⁻ + H⁺ → AH), lo que desplaza el equilibrio y sube el HCO₃⁻. El punto recorre la RNE. La compensación renal tarda 12–48 h y, cuando llega, sube el HCO₃⁻ todavía más.'
  },
  {
    t: '3.8',
    q: 'Un trastorno ácido-base "mixto" se define como:',
    o: [
      'La alteración de una clase de ácidos compensada por un cambio opuesto de la otra.',
      'La alteración simultánea de ácidos fijos y volátil en el mismo sentido (ambos aumentados o ambos disminuidos).',
      'Cualquier trastorno debido a más de una enfermedad.',
      'Un trastorno con pH normal y bicarbonato anormal.'
    ],
    a: 1,
    e: 'Mixto: ambas clases se desvían en el mismo sentido (acidosis mixta: ↑ ácidos fijos y ↑ CO₂), con una gran desviación del pH. La opción A es la compensación. Un trastorno debido a varias enfermedades es "complejo".'
  },
  {
    t: '3.9',
    q: 'En el diagrama de Davenport, un trastorno respiratorio puro (solo cambia la P<sub>CO₂</sub>) desplaza el punto del paciente a lo largo de:',
    o: [
      'Su isóbara.',
      'La recta de equilibrio del CO₂ que pasa por el punto (la RNE si parte de N).',
      'Una vertical, porque el pH no cambia.',
      'Una horizontal, porque el bicarbonato no cambia.'
    ],
    a: 1,
    e: 'Si los ácidos fijos no cambian, la variación de CO₂ se titula frente a los tampones cerrados: el punto recorre la recta de equilibrio, de pendiente −s. Las isóbaras son el camino de los trastornos metabólicos puros (P<sub>CO₂</sub> constante).'
  },
  {
    t: '3.9',
    q: 'En un paciente con anemia grave, las rectas de equilibrio del CO₂ en el Davenport:',
    o: [
      'Se vuelven más verticales, porque aumenta el poder tampón.',
      'Se vuelven más horizontales, porque disminuye el poder tampón de los tampones cerrados.',
      'No cambian, porque dependen solo del bicarbonato.',
      'Se convierten en isóbaras.'
    ],
    a: 1,
    e: 'La pendiente de la recta de equilibrio es −s, y s es el poder tampón de los cerrados, del que la hemoglobina es una parte esencial. Con menos Hb baja s y la recta se aplana. De la pendiente se puede deducir la concentración de tampones cerrados.'
  },
  {
    t: '3.9',
    q: 'Un paciente tiene pH 7.20 y HCO₃⁻ 12 mmol/L. Con un poder tampón de los cerrados s = 20 mmol·L⁻¹·pH⁻¹, su exceso de ácidos fijos es:',
    o: ['8 mmol/L', '12 mmol/L', '16 mmol/L', '20 mmol/L'],
    a: 2,
    e: 'Distancia vertical a la RNE: RNE a pH 7.20 = 24 − 20 × (7.20 − 7.40) = 28 mmol/L → exceso = 28 − 12 = 16 mmol/L (BE = −16). La simple caída de HCO₃⁻ (24 − 12 = 12) lo subestima, porque no cuenta los H⁺ captados por los tampones cerrados.'
  },
  {
    t: '3.10',
    q: 'Un paciente con acidosis metabólica tiene pH 7.28 y P<sub>CO₂</sub> 40 mmHg. La interpretación más adecuada es:',
    o: [
      'Acidosis metabólica simple bien compensada.',
      'Acidosis metabólica con compensación respiratoria insuficiente: trastorno complejo con componente respiratorio asociado.',
      'Acidosis metabólica con alcalosis respiratoria sobreañadida.',
      'Acidosis respiratoria pura, porque la P<sub>CO₂</sub> es normal.'
    ],
    a: 1,
    e: 'Regla práctica: en una acidosis metabólica simple, P<sub>CO₂</sub> ≈ decimales del pH ≈ 28 mmHg. Una P<sub>CO₂</sub> de 40 significa que el paciente no hiperventila como debería (agotamiento, depresión respiratoria, coma): se suma una acidosis respiratoria relativa.'
  },
  {
    t: '3.10',
    q: 'En una acidosis respiratoria crónica, la compensación renal desplaza el punto del paciente en el Davenport:',
    o: [
      'Hacia abajo por la recta normal de equilibrio.',
      'Hacia arriba por su isóbara, hacia pH más normales, al bajar los ácidos fijos y subir el HCO₃⁻.',
      'Hacia abajo por su isóbara, al bajar el HCO₃⁻.',
      'Directamente al punto N: la compensación equivale a la curación.'
    ],
    a: 1,
    e: 'El riñón no puede cambiar la P<sub>CO₂</sub>: el punto se mueve por la isóbara y sube, porque aumenta el HCO₃⁻ al disminuir los ácidos fijos. Compensar acerca el pH a la normalidad, pero solo la curación (normalizar ambos ácidos) devuelve el punto a N.'
  },
  {
    t: '3.10',
    q: 'El volumen de distribución aparente del bicarbonato sódico que se administra para corregir una acidosis metabólica es mayor cuanto más grave es la acidemia porque:',
    o: [
      'El bicarbonato entra en las células a pH bajo.',
      'Parte del bicarbonato debe regenerar los tampones cerrados, que habían captado H⁺, además de normalizar el propio HCO₃⁻.',
      'La acidemia aumenta el volumen extracelular.',
      'El pulmón elimina más CO₂ cuanto más grave es la acidemia.'
    ],
    a: 1,
    e: 'Dosis = exceso de ácidos fijos × volumen. Con pH 7.40 (tampones cerrados ya regenerados), el exceso es igual a la caída de HCO₃⁻. Con pH 7.20 el exceso es mayor que esa caída, porque los tampones cerrados captaron más H⁺. Por eso V<sub>D</sub> aparente = dosis/ΔHCO₃⁻ crece (18 → 26 L en el ejemplo del módulo).'
  },
  {
    t: '3.11',
    q: 'Método clásico: una muestra arterial tiene pH 7.10 y CO₂ total 13 mmol/L. La P<sub>CO₂</sub> y la interpretación son:',
    o: [
      '≈ 39 mmHg: acidosis metabólica sin compensación respiratoria (hay que sospechar un problema respiratorio asociado).',
      '≈ 10 mmHg: alcalosis respiratoria primaria.',
      '≈ 25 mmHg: acidosis metabólica simple bien compensada.',
      '≈ 65 mmHg: acidosis respiratoria aguda.'
    ],
    a: 0,
    e: '[CO₂d] = CO₂ total/(1 + 10<sup>pH−6.1</sup>) = 13/(1 + 10) ≈ 1.18 mmol/L → P<sub>CO₂</sub> = 1.18/0.03 ≈ 39 mmHg; HCO₃⁻ ≈ 11.8. Es una acidosis metabólica con P<sub>CO₂</sub> normal, cuando se esperarían ≈ 10 mmHg por la regla: falta la compensación respiratoria.'
  }
];
