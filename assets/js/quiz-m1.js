/* Question bank — Module 1. Each item: t = topic, q = stem, o = options, a = index of correct option, e = explanation. */
window.QUIZ = window.QUIZ || {};
window.QUIZ.m1 = [
  {
    t: '1.1',
    q: 'Según la comparación entre la energía cinética media (E<sub>c</sub>) y la energía de interacción (E<sub>I</sub>), el estado líquido es:',
    o: [
      'E<sub>c</sub> del mismo orden que E<sub>I</sub>: estado coherente y fluido.',
      'E<sub>I</sub> muy superior a E<sub>c</sub>: estado coherente y no fluido.',
      'E<sub>c</sub> muy superior a E<sub>I</sub>: estado no coherente y fluido.',
      'E<sub>c</sub> del mismo orden que E<sub>I</sub>: estado no coherente y no fluido.'
    ],
    a: 0,
    e: 'En el líquido una molécula puede dejar a sus vecinas, pero cae enseguida bajo la influencia de otras porque no tiene energía para escapar. Por eso no se dispersa (coherente) y a la vez carece de forma propia (fluido). E<sub>I</sub> ≫ E<sub>c</sub> describe el sólido y E<sub>c</sub> ≫ E<sub>I</sub>, el gas.'
  },
  {
    t: '1.1',
    q: 'Un gas real en un recipiente cerrado ejerce sobre la pared una presión que, comparada con la predicha por PV = nRT, es:',
    o: [
      'Mayor, porque la repulsión intermolecular (∝ 1/r¹²) acelera las moléculas hacia la pared.',
      'Menor, porque la atracción intermolecular frena las moléculas antes de que choquen con la pared.',
      'Igual, siempre que la temperatura se mantenga constante.',
      'Menor, porque parte de la energía cinética queda como rotación y vibración, que no se transmite a la pared.'
    ],
    a: 1,
    e: 'El modelo perfecto desprecia E<sub>I</sub>. En un gas real las fuerzas de atracción retienen a las moléculas que se acercan a la pared, de modo que los choques son menos violentos y la presión es menor. El gas real se acerca al perfecto al bajar la presión o subir la temperatura.'
  },
  {
    t: '1.1',
    q: 'Respecto a las fuerzas intermoleculares, señale la afirmación correcta:',
    o: [
      'Su energía de atracción decrece como 1/r⁶ y vale entre 0.5 y 20 kJ/mol, menos que un enlace covalente (400–800 kJ/mol).',
      'Su energía de atracción decrece como 1/r¹² y supera a la de los enlaces covalentes.',
      'La repulsión decrece como 1/r⁶, más lentamente que la atracción, y domina a largas distancias.',
      'Son fuerzas de naturaleza gravitatoria, proporcionales a la masa molar.'
    ],
    a: 0,
    e: 'La atracción (electrostática) decae como 1/r⁶ y solo actúa a distancias cortas. La repulsión decae aún más rápido (1/r¹²) y domina a distancias todavía menores: por eso las moléculas "rebotan". Ambas energías son mucho menores que las covalentes que mantienen unidos los átomos de una molécula.'
  },
  {
    t: '1.2',
    q: 'La sangre circulante se describe mejor como:',
    o: [
      'Una disolución verdadera, homogénea a escala molecular.',
      'Una suspensión de células en una disolución (el plasma), estable porque la circulación impide la sedimentación.',
      'Un gel, porque las proteínas plasmáticas forman una red que da forma propia.',
      'Una disolución coloidal cuyas células sedimentan in vivo a una velocidad constante, la VSG.'
    ],
    a: 1,
    e: 'Las células son agregados, no están dispersas a escala molecular, así que la sangre es una suspensión. In vivo la agitación de la circulación evita que sedimenten. La velocidad de sedimentación (mm/h) se mide in vitro, cuando la sangre está quieta en un tubo.'
  },
  {
    t: '1.2',
    q: '¿Por qué cualquier disolución tiende a comportarse como ideal cuando se diluye?',
    o: [
      'Porque al diluir desaparecen las interacciones solvente–solvente.',
      'Porque las interacciones soluto–soluto y soluto–solvente se vuelven despreciables frente a las solvente–solvente, mucho más numerosas.',
      'Porque la dilución aumenta la energía cinética media de las moléculas de soluto.',
      'Porque la fracción molar del soluto tiende a 1 y todas las interacciones se igualan.'
    ],
    a: 1,
    e: 'Una solución ideal es aquella en la que todas las energías de interacción son equivalentes. Al diluir, casi todos los "enlaces" son solvente–solvente, así que la heterogeneidad de las demás interacciones deja de pesar. La fracción molar del soluto tiende a 0, no a 1.'
  },
  {
    t: '1.3',
    q: 'Una disolución contiene 30 mmol/L de un ácido débil monoprótico AH disociado en un 10 %. Su osmolaridad es:',
    o: ['27 mOsm/L', '30 mOsm/L', '33 mOsm/L', '36 mOsm/L'],
    a: 2,
    e: 'Disociado: 3 mmol/L de A⁻ + 3 mmol/L de H⁺. Sin disociar: 27 mmol/L de AH. Total: 3 + 3 + 27 = 33 mOsm/L, es decir, c(1 + α) = 30 × 1.1.'
  },
  {
    t: '1.3',
    q: 'Se disuelven 5.85 g de NaCl (M = 58.5 g/mol) y 9 g de glucosa (M = 180 g/mol) en agua c.s.p. 1 L. Suponiendo disociación total e idealidad, la osmolaridad es:',
    o: ['150 mOsm/L', '200 mOsm/L', '250 mOsm/L', '300 mOsm/L'],
    a: 2,
    e: 'NaCl: 0.1 mol → 0.2 Osm (Na⁺ + Cl⁻). Glucosa: 0.05 mol → 0.05 Osm (no se disocia). Total: 0.25 Osm/L = 250 mOsm/L. Error típico: olvidar que el NaCl aporta dos unidades cinéticas (sale 150).'
  },
  {
    t: '1.3',
    q: 'Un paciente con mieloma tiene una proteinemia de 120 g/L y una natremia (molar) de 130 mmol/L. Estimando φ a partir de la proteinemia, ¿cuál es la molalidad plasmática del sodio?',
    o: ['114 mmol/kg de agua', '130 mmol/kg de agua', '140 mmol/kg de agua', '148 mmol/kg de agua'],
    a: 3,
    e: 'φ ≈ 1 − 0.001 × 120 = 0.88. Molalidad = molaridad / φ = 130 / 0.88 ≈ 148 mmol/kg. La concentración que "ven" las células es normal o alta: es una pseudohiponatremia. 140 sale de usar φ = 0.93 por costumbre y 114 de multiplicar en lugar de dividir.'
  },
  {
    t: '1.3',
    q: 'Dos disoluciones acuosas, una de glucosa y otra de NaCl, tienen exactamente la misma osmolalidad. Entonces necesariamente tienen igual:',
    o: [
      'Molalidad de soluto.',
      'Fracción molar del agua.',
      'Concentración equivalente.',
      'Concentración ponderal.'
    ],
    a: 1,
    e: 'Como c<sub>osmolal</sub> = (1/M₀)(1 − f<sub>H₂O</sub>)/f<sub>H₂O</sub>, la osmolalidad depende solo de la fracción molar del agua, no de qué solutos haya. La molalidad de NaCl sería la mitad de la de glucosa (2 partículas por fórmula), y sus cargas y masas difieren.'
  },
  {
    t: '1.3',
    q: 'La fracción molar del agua en una disolución de osmolalidad 0.300 Osm/kg (M₀ = 0.018 kg/mol) es aproximadamente:',
    o: ['0.9054', '0.9700', '0.9946', '0.9998'],
    a: 2,
    e: 'f<sub>H₂O</sub> = 1 / (1 + M₀·c<sub>osmolal</sub>) = 1 / (1 + 0.018 × 0.300) = 1/1.0054 ≈ 0.9946. Incluso un líquido "salado" como el plasma es > 99 % agua en términos de moles.'
  },
  {
    t: '1.3',
    q: 'Disolución A: 56 g/L de albúmina (M = 70 000). Disolución B: 350 g/L de globulina (M = 350 000). Ninguna se disocia y la masa específica de las proteínas es igual a la del agua. Señale la afirmación correcta:',
    o: [
      'A tiene mayor osmolaridad que B porque su masa molar es 5 veces menor.',
      'A y B tienen la misma osmolaridad, pero A tiene mayor osmolalidad.',
      'A tiene menor osmolaridad y menor osmolalidad que B, y por tanto mayor fracción molar de agua.',
      'A tiene menor osmolaridad que B, pero ambas tienen la misma osmolalidad.'
    ],
    a: 2,
    e: 'Molaridad: A = 56/70 000 = 0.8 mmol/L; B = 350/350 000 = 1 mmol/L, luego A &lt; B. Agua por litro: A ≈ 0.944 L y B ≈ 0.65 L (la proteína ocupa 350 mL), así que las molalidades son A ≈ 0.85 y B ≈ 1.54 mmol/kg. A es menor en ambas y, a menor osmolalidad, mayor f<sub>H₂O</sub>.'
  },
  {
    t: '1.3',
    q: 'Una disolución contiene 4 mmol/L de CaCl₂ y 3 mmol/L de Na₂SO₄, totalmente disociados. Señale la opción correcta:',
    o: [
      '11 mEq/L de aniones, 14 mEq/L de cationes y 21 mOsm/L.',
      '14 mEq/L de aniones, 14 mEq/L de cationes y 21 mOsm/L.',
      '14 mEq/L de aniones, 7 mEq/L de cationes y 21 mOsm/L.',
      '14 mEq/L de aniones, 14 mEq/L de cationes y 14 mOsm/L.'
    ],
    a: 1,
    e: 'Aniones: Cl⁻ 8 mEq + SO₄²⁻ 3 × 2 = 6 mEq → 14 mEq/L. Cationes: Ca²⁺ 4 × 2 = 8 mEq + Na⁺ 6 mEq → 14 mEq/L (electroneutralidad). Osmoles: CaCl₂ 4 × 3 = 12 + Na₂SO₄ 3 × 3 = 9 → 21 mOsm/L.'
  },
  {
    t: '1.3',
    q: 'Un frasco contiene 3 g de un antibiótico en polvo y se quiere un jarabe con 250 mg por cucharada de 5 mL. El procedimiento correcto es:',
    o: [
      'Añadir 60 mL de agua al polvo.',
      'Añadir agua c.s.p. 60 mL de disolución.',
      'Añadir agua c.s.p. 12 mL de disolución.',
      'Disolver el polvo en 60 g de agua para obtener una concentración molal exacta.'
    ],
    a: 1,
    e: 'Se necesitan 250 mg/5 mL = 50 g/L de disolución, y 3 g / 50 g/L = 0.060 L de disolución. Hay que enrasar el volumen de la disolución (concentración molar/ponderal), no añadir un volumen fijo de agua: el polvo y los excipientes ocupan volumen y la dosis por cucharada quedaría indeterminada.'
  },
  {
    t: '1.3',
    q: 'Dos disoluciones fisiológicas diluidas difieren en 10 mOsm/kg de osmolalidad. La diferencia de sus fracciones molares de agua es aproximadamente:',
    o: ['1.8 × 10⁻⁴', '5.6 × 10⁻⁴', '1.0 × 10⁻²', '1.8 × 10⁻²'],
    a: 0,
    e: 'Para disoluciones diluidas, Δf<sub>H₂O</sub> ≈ −M₀·Δc<sub>osmolal</sub> = 0.018 kg/mol × 0.010 mol/kg = 1.8 × 10⁻⁴. La diferencia es diminuta, pero basta para generar flujos osmóticos. Cuidado con las unidades: 10 mOsm/kg = 0.010 Osm/kg.'
  },
  {
    t: '1.4',
    q: 'Con la fórmula de Watson, un varón de 180 cm, 80 kg y 40 años tiene ≈ 44.9 L de agua total. ¿Cuál es su agua intersticial estimada?',
    o: ['5.4 L', '12.6 L', '17.9 L', '26.9 L'],
    a: 1,
    e: 'Intersticial = 28 % del agua total = 0.28 × 44.9 ≈ 12.6 L. 17.9 L es el agua extracelular (40 %), 26.9 L la celular (60 %) y 5.4 L la plasmática (12 %).'
  },
  {
    t: '1.4',
    q: '¿En cuál de estas personas es más bajo el porcentaje de agua corporal respecto al peso, y por qué?',
    o: [
      'En un varón musculado, porque el músculo esquelético es pobre en agua.',
      'En un lactante, porque su compartimiento extracelular es proporcionalmente pequeño.',
      'En una mujer anciana con obesidad, porque el tejido adiposo contiene solo ≈ 10 % de agua.',
      'En un varón joven y delgado, porque tiene poca grasa que retenga agua.'
    ],
    a: 2,
    e: 'El principal determinante individual es la proporción de tejido adiposo, muy pobre en agua. El porcentaje es menor en la mujer, en el anciano y en el obeso. El músculo es rico en agua y el lactante tiene un porcentaje alto (≈ 70 %).'
  },
  {
    t: '1.4',
    q: 'Un paciente tiene un volumen plasmático de 3.2 L y un hematocrito de 0.45. Su volumen sanguíneo es aproximadamente:',
    o: ['4.6 L', '5.8 L', '7.1 L', '3.2 L'],
    a: 1,
    e: 'Volumen sanguíneo = volumen plasmático / (1 − Hct) = 3.2 / 0.55 ≈ 5.8 L. Dividir por el hematocrito (7.1 L) o multiplicar por 1.45 (4.6 L) son errores frecuentes.'
  },
  {
    t: '1.4',
    q: 'El capilar es permeable al Cl⁻ y, sin embargo, su concentración es mayor en el intersticio (≈ 114 mEq/L) que en el plasma (≈ 103 mEq/L). La explicación es:',
    o: [
      'Un transporte activo de Cl⁻ desde el plasma hacia el intersticio a través del endotelio.',
      'El efecto Donnan: las proteínas aniónicas retenidas en el plasma crean un potencial negativo en el lado plasmático, que desplaza los aniones difusibles hacia el intersticio.',
      'Que el intersticio contiene más agua libre, lo que concentra el Cl⁻.',
      'Que una parte del Cl⁻ plasmático está unido a la albúmina y no se dosifica.'
    ],
    a: 1,
    e: 'Las proteínas plasmáticas, impermeantes y con carga negativa, generan un equilibrio de Donnan. El lado plasmático queda negativo: retiene cationes difusibles (algo más de Na⁺ en el plasma) y rechaza aniones difusibles (más Cl⁻ y HCO₃⁻ en el intersticio).'
  },
  {
    t: '1.4',
    q: 'Sobre los líquidos transcelulares, es correcto que:',
    o: [
      'Forman parte del compartimiento intersticial y representan el 28 % del agua total.',
      'Están separados del extracelular por un epitelio, suponen ≈ 2 % del agua total y pueden crecer mucho en patología ("tercer sector").',
      'Incluyen el plasma y la linfa, separados del intersticio por el endotelio.',
      'Tienen la misma composición que el plasma, porque derivan de él por ultrafiltración.'
    ],
    a: 1,
    e: 'LCR, secreciones digestivas y líquidos serosos (pleura, peritoneo, sinovial) están separados por epitelios. Por eso cada uno tiene una composición particular. Son cuantitativamente pequeños en condiciones normales, pero en patología (ascitis, derrames) forman el "tercer sector".'
  },
  {
    t: '1.5',
    q: 'La urea se considera un soluto osmóticamente ineficaz porque:',
    o: [
      'Su concentración plasmática normal (≈ 5 mmol/L) es demasiado baja.',
      'Atraviesa libremente capilares y membranas celulares, por lo que su concentración es igual en todos los compartimientos.',
      'Se elimina muy rápido por el riñón y no se acumula.',
      'Circula unida a las proteínas plasmáticas.'
    ],
    a: 1,
    e: 'Un soluto ineficaz se comporta como el agua: se reparte hasta igualar su concentración a ambos lados de la membrana y no genera diferencias de fracción molar de agua. La glucosa, con la misma concentración, sí es eficaz, porque solo entra en las células con insulina y allí se metaboliza.'
  },
  {
    t: '1.5',
    q: 'En el plasma, las proteínas suponen ≈ 1 mmol/L pero ≈ 16 mEq/L. De ello se deduce que:',
    o: [
      'Contribuyen poco a la osmolaridad pero mucho al balance de cargas (≈ 16 cargas negativas por molécula).',
      'Aportan ≈ 16 mOsm/L a la osmolaridad plasmática.',
      'Son cationes, porque su concentración equivalente supera a la molar.',
      'Su concentración equivalente depende de la fracción acuosa y no de su carga.'
    ],
    a: 0,
    e: 'Cada proteína es una sola unidad cinética (≈ 1 mOsm/L en total), pero al pH plasmático lleva ≈ 16 cargas negativas. Por eso pesa mucho entre los aniones "no dosificados" y en el efecto Donnan, y casi nada en la osmolaridad.'
  },
  {
    t: '1.5',
    q: 'La calcemia total es ≈ 2.5 mmol/L, de los que ≈ 1.5 mmol/L son calcio ionizado. El calcio no ionizado:',
    o: [
      'Participa en la electroneutralidad, pero no en la osmolaridad.',
      'No interviene en la electroneutralidad ni aporta osmoles propios, porque está unido a proteínas o formando complejos con citrato.',
      'Aporta 2 mEq/L por mmol a la electroneutralidad del plasma.',
      'Se incluye entre los cationes dosificados del ionograma sanguíneo rutinario.'
    ],
    a: 1,
    e: 'La fracción no ionizada no tiene carga libre y su contribución osmótica queda incluida en la de sus ligandos (proteínas, citrato), que forman parte de los aniones no dosificados. El ionograma rutinario solo dosifica Na⁺ y K⁺ como cationes.'
  },
  {
    t: '1.5',
    q: 'Ionograma: Na⁺ 140, K⁺ 4, Cl⁻ 100 y HCO₃⁻ 24 mmol/L. La cantidad Na⁺ + K⁺ − Cl⁻ − HCO₃⁻ vale y representa:',
    o: [
      '20 mEq/L: la diferencia entre aniones no dosificados y cationes no dosificados.',
      '20 mEq/L: exclusivamente las proteínas plasmáticas.',
      '16 mEq/L: la carga de las proteínas menos la del calcio.',
      '20 mOsm/L: la osmolaridad de la glucosa y la urea.'
    ],
    a: 0,
    e: '140 + 4 − 100 − 24 = 20 mEq/L. Por electroneutralidad, cationes dosificados + no dosificados = aniones dosificados + no dosificados, así que la diferencia de los dosificados es igual a aniones no dosificados (proteínas, fosfatos, sulfatos, orgánicos) menos cationes no dosificados (Ca²⁺, Mg²⁺). Son cargas (mEq), no osmoles.'
  },
  {
    t: '1.6',
    q: 'Se inyectan 2000 u de albúmina marcada. En equilibrio, el plasma contiene 0.8 u/mL. Con un hematocrito de 0.40, los volúmenes plasmático y sanguíneo son:',
    o: ['2.5 L y 4.2 L', '2.5 L y 3.5 L', '2.5 L y 6.3 L', '1.6 L y 2.5 L'],
    a: 0,
    e: 'Volumen plasmático = 2000 / 0.8 = 2500 mL. Volumen sanguíneo = 2.5 / (1 − 0.40) = 4.17 L. 6.3 L sale de dividir por el hematocrito y 3.5 L de multiplicar por 1.4.'
  },
  {
    t: '1.6',
    q: 'Sobre la medida del volumen extracelular con trazadores:',
    o: [
      'La inulina lo sobreestima porque entra en las células.',
      'El sodio radiactivo lo subestima porque se elimina por la orina durante la medida.',
      'La inulina lo subestima porque su gran masa molar (≈ 5500 Da) le impide difundir a todo el espacio a tiempo, y el sodio radiactivo lo sobreestima porque entra parcialmente en las células.',
      'El manitol y el sulfato-³⁵S lo sobreestiman porque se unen a la albúmina.'
    ],
    a: 2,
    e: 'Son los dos errores clásicos. Los trazadores adecuados son el manitol (180 Da, no metabolizable) y el sulfato-³⁵S, más cómodo porque apenas se elimina durante la medida. El que se une a la albúmina es el azul de Evans, trazador del plasma.'
  },
  {
    t: '1.6',
    q: 'Se inyectan 30 g de manitol. Durante el equilibrado se eliminan 4 g por la orina. La concentración plasmática en equilibrio es 1.5 g/L y φ = 0.94. El agua extracelular es:',
    o: ['16.3 L', '17.3 L', '18.8 L', '20.0 L'],
    a: 0,
    e: 'Cantidad restante: 30 − 4 = 26 g. Concentración por litro de agua plasmática: 1.5 / 0.94 = 1.60 g/L. Agua extracelular = 26 / 1.60 ≈ 16.3 L. Olvidar la corrección urinaria da 18.8–20 L; olvidar φ da 17.3 L.'
  },
  {
    t: '1.6',
    q: '¿Cuál de las siguientes NO es una condición necesaria para que m/c<sub>eq</sub> mida el volumen real de un compartimiento?',
    o: [
      'Que el trazador se reparta de forma homogénea en todo el compartimiento.',
      'Que el trazador no difunda fuera del compartimiento durante la medida.',
      'Que la cantidad de trazador no cambie, o que se corrija lo eliminado o metabolizado.',
      'Que el trazador tenga una masa molar parecida a la del agua.'
    ],
    a: 3,
    e: 'Las cuatro condiciones son: reparto homogéneo, no escapar del compartimiento, cantidad conocida y que la inyección no modifique el volumen (sin flujos de agua). La masa molar importa solo en la medida en que afecta a esas condiciones. La albúmina (≈ 70 000 Da) es un excelente trazador del plasma.'
  },
  {
    t: '1.7',
    q: 'El volumen de distribución del potasio es:',
    o: [
      'Igual al volumen extracelular, porque el potasio plasmático se mide en el plasma.',
      'Mayor que el volumen extracelular pero menor que el agua total.',
      'Igual al agua total, porque el K⁺ atraviesa libremente las membranas.',
      'Mayor que el agua corporal total, porque su concentración intracelular es muy superior a la plasmática.'
    ],
    a: 3,
    e: 'V<sub>D</sub> = V<sub>e</sub> + V<sub>i</sub>·c<sub>i</sub>/c. Para el K⁺, c<sub>i</sub>/c ≈ 160/4 = 40, así que V<sub>D</sub> ≫ V. Un volumen de distribución no tiene por qué corresponder a ningún compartimiento real.'
  },
  {
    t: '1.7',
    q: 'Se inyectan 1000 u de ²⁴Na. En equilibrio (sin pérdidas) el plasma contiene 55 u/L de ²⁴Na y la natremia es de 140 mmol/L. El sodio intercambiable es aproximadamente:',
    o: ['1400 mmol', '2100 mmol', '2545 mmol', '5880 mmol'],
    a: 2,
    e: 'V<sub>Na</sub> = m*/c* = 1000/55 ≈ 18.2 L. Contenido intercambiable M = c·V<sub>D</sub> = 140 × 18.2 ≈ 2545 mmol (equivalente a m*·c/c*). 2100 sale de usar un V<sub>e</sub> de 15 L y 5880 de usar toda el agua corporal (42 L).'
  },
  {
    t: '1.7',
    q: 'Un sujeto tiene una concentración molal de sodio de 150 mmol/kg, V<sub>Na</sub> = 19 L, agua extracelular 16 L y agua celular 25 L. La concentración media de sodio en el agua celular es:',
    o: ['6 mmol/L', '18 mmol/L', '30 mmol/L', '114 mmol/L'],
    a: 1,
    e: 'c<sub>i</sub> = c·(V<sub>D</sub> − V<sub>e</sub>)/V<sub>i</sub> = 150 × (19 − 16)/25 = 18 mmol/L. El resultado depende mucho de la diferencia V<sub>D</sub> − V<sub>e</sub>: con V<sub>e</sub> = 17 L saldría 12 mmol/L. Por eso hay que medir V<sub>e</sub> con un buen trazador (sulfato-³⁵S).'
  }
];
