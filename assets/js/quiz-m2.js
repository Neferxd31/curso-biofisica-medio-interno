/* Question bank — Module 2. Each item: t = topic, q = stem, o = options, a = index of correct option, e = explanation. */
window.QUIZ = window.QUIZ || {};
window.QUIZ.m2 = [
  {
    t: '2.1',
    q: 'Un paciente desnutrido ha perdido masa celular (tiene menos células). Respecto a su compartimiento celular, lo correcto es:',
    o: [
      'Tiene deshidratación celular, porque su volumen celular ha disminuido.',
      'Su volumen celular ha disminuido sin deshidratación celular: K y V<sub>i</sub> bajan en proporción y K/V<sub>i</sub> no cambia.',
      'Tiene hiperhidratación celular, porque pierde osmoles celulares más rápido que agua.',
      'Tiene deshidratación celular, que se detecta por una hipernatremia.'
    ],
    a: 1,
    e: 'El volumen es una variable extensiva: disminuye con el número de células. La hidratación es intensiva: depende de la osmolalidad efectiva K/V<sub>i</sub>. Si se pierden células completas, se pierden sus osmoles y su agua en proporción y la hidratación no cambia.'
  },
  {
    t: '2.1',
    q: '¿Qué variable regula realmente el bucle de control del balance de sodio?',
    o: [
      'El contenido corporal de sodio.',
      'La natremia.',
      'La volemia efectiva, que el organismo interpreta como hidratación extracelular.',
      'La hidratación extracelular, que detectan directamente los osmorreceptores.'
    ],
    a: 2,
    e: 'El organismo no puede medir ni la hidratación extracelular ni el contenido de sodio. Solo detecta la volemia efectiva (baro y volorreceptores) y ajusta el contenido de sodio para mantenerla. La natremia refleja la hidratación celular, que es el objetivo del otro bucle.'
  },
  {
    t: '2.2',
    q: '¿En cuál de estas situaciones hay hipovolemia efectiva SIN disminución del volumen extracelular total?',
    o: [
      'Diarrea aguda coleriforme.',
      'Síndrome nefrótico con hipoalbuminemia grave.',
      'Hemorragia digestiva.',
      'Sudoración profusa sin reposición.'
    ],
    a: 1,
    e: 'Al bajar la presión oncótica, el líquido pasa del plasma al intersticio (Starling): cae la volemia, y con ella la volemia efectiva, sin que cambie el volumen extracelular total. En los demás casos hay una pérdida real de líquido extracelular.'
  },
  {
    t: '2.2',
    q: 'En la cirrosis hepática descompensada, la hipovolemia efectiva se debe fundamentalmente a:',
    o: [
      'Una caída del gasto cardíaco que las resistencias periféricas no pueden compensar.',
      'Una caída de las resistencias vasculares periféricas que el gasto cardíaco no puede compensar.',
      'Una pérdida real de sodio por vía renal.',
      'Un aumento de la presión oncótica del plasma.'
    ],
    a: 1,
    e: 'La presión arterial depende del gasto cardíaco y de las resistencias periféricas. En la cirrosis las resistencias caen mucho: hipotensión → hipovolemia efectiva sin cambios en la volemia real ni en la hidratación extracelular. El bajo gasto no compensado corresponde a la insuficiencia cardíaca.'
  },
  {
    t: '2.2',
    q: 'Un déficit hídrico puro (deshidratación celular) ¿modifica la volemia efectiva?',
    o: [
      'Sí, la disminuye, porque los eritrocitos pierden volumen.',
      'No, porque un cambio de volumen de las células sanguíneas se compensa con un cambio opuesto del plasma y el volumen sanguíneo total no varía.',
      'Sí, la aumenta, porque el agua sale de las células hacia el plasma.',
      'Solo si la natremia supera los 160 mmol/L.'
    ],
    a: 1,
    e: 'Según el modelo, las variaciones de la hidratación celular no influyen en la volemia efectiva: el volumen de las células sanguíneas solo cambia a expensas del volumen plasmático. Por eso el bucle del sodio no "ve" los trastornos del balance hídrico.'
  },
  {
    t: '2.3',
    q: 'Un paciente con insuficiencia renal tiene: urea 45 mmol/L, osmolalidad medida 335 mOsm/kg y natremia 140 mmol/L. Su hidratación celular es:',
    o: [
      'Deshidratación celular, por la hiperosmolalidad plasmática.',
      'Normal: la osmolalidad efectiva es ≈ 290 mOsm/kg, porque la urea es ineficaz.',
      'Hiperhidratación celular, porque la urea arrastra agua hacia las células.',
      'Imposible de estimar sin medir la osmolalidad intracelular.'
    ],
    a: 1,
    e: 'osM<sub>ef</sub> = osM total − urea = 335 − 45 = 290 mOsm/kg, normal. La urea atraviesa libremente las membranas y su concentración sube por igual en todos los compartimientos, sin cambiar la hidratación. La natremia normal lo confirma.'
  },
  {
    t: '2.3',
    q: 'Solo un cambio de la osmolalidad efectiva puede mover agua a través de la membrana celular porque:',
    o: [
      'Los solutos ineficaces cambian su concentración igual en todos los compartimientos y no crean diferencias de fracción molar del agua.',
      'Los solutos ineficaces son siempre neutros y los eficaces siempre iónicos.',
      'La osmolalidad total no puede medirse por crioscopía.',
      'La membrana celular es impermeable al agua en presencia de urea.'
    ],
    a: 0,
    e: 'El flujo de agua se debe a una diferencia de fracción molar del agua. Si varía un soluto que se equilibra a ambos lados, la fracción molar del agua cambia igual en todas partes y no aparece gradiente. La glucosa es neutra y es eficaz; la opción B es falsa.'
  },
  {
    t: '2.3',
    q: '¿Por qué un cambio patológico de un anión extracelular no altera la osmolalidad efectiva, mientras que el de un catión la altera en el doble de su magnitud?',
    o: [
      'Porque el Cl⁻ varía en sentido opuesto a cualquier otro anión y en el mismo sentido que cualquier catión, para mantener la electroneutralidad.',
      'Porque los aniones son osmóticamente ineficaces.',
      'Porque los cationes arrastran agua de hidratación y los aniones no.',
      'Porque el riñón regula de forma específica la concentración de Cl⁻.'
    ],
    a: 0,
    e: 'El Cl⁻ no tiene regulación propia: está en la concentración necesaria para la electroneutralidad. Si sube el HCO₃⁻, baja el Cl⁻ (osmoles constantes). Si sube un catión, sube el Cl⁻ con él (Δosmoles = 2 × Δcatión).'
  },
  {
    t: '2.3',
    q: 'Un sujeto sano toma un natriurético que elimina osmoles extracelulares sin agua. ANTES de que actúe el bucle del balance hídrico, su hidratación celular:',
    o: [
      'No cambia, porque el sodio es extracelular.',
      'Aumenta (hiperhidratación celular): baja la osmolalidad efectiva extracelular y entra agua en las células.',
      'Disminuye (deshidratación celular), porque se pierde volumen extracelular.',
      'Es imposible de predecir sin conocer la natremia.'
    ],
    a: 1,
    e: 'Perder Na sin agua baja la altura del rectángulo extracelular en el diagrama de Pitts. El agua pasa del compartimiento menos concentrado (extracelular) al más concentrado (célula): hiperhidratación celular. Después, el bucle hídrico eliminará agua y la pérdida quedará isotónica.'
  },
  {
    t: '2.3',
    q: 'La hipótesis de que el contenido celular de osmoles eficaces es constante (hipótesis b) deja de ser válida sobre todo en:',
    o: [
      'La hiperglucemia importante.',
      'La insuficiencia renal grave.',
      'La depleción intensa de potasio.',
      'La desnutrición.'
    ],
    a: 2,
    e: 'El K⁺ supone más del 95 % de los cationes celulares. Si se pierde mucho, baja K y la osmolalidad efectiva ya no refleja solo la hidratación celular. La hiperglucemia rompe otra hipótesis: la proporcionalidad entre osmolalidad efectiva extracelular y natremia (hipótesis c).'
  },
  {
    t: '2.4',
    q: 'Paciente con hipertrigliceridemia grave: natremia (fotometría de llama) 126 mmol/L, osmolalidad medida 288 mOsm/kg, urea 5 mmol/L. La interpretación correcta es:',
    o: [
      'Hiponatremia hipotónica: hay que restringir el agua.',
      'Hiponatremia isotónica por descenso de la fracción acuosa del plasma, con hidratación celular normal.',
      'Hiponatremia hipertónica por un soluto eficaz no sódico.',
      'Déficit de sodio grave con hiperhidratación celular.'
    ],
    a: 1,
    e: 'osM<sub>ef</sub> = 288 − 5 = 283, normal. Los lípidos ocupan volumen y reducen φ: hay menos sodio por litro de plasma, pero la molalidad (lo que ven las células) es normal. Es una pseudohiponatremia: tratarla con restricción hídrica sería un error.'
  },
  {
    t: '2.4',
    q: 'Un diabético descompensado tiene glucemia de 50 mmol/L y natremia de 128 mmol/L. Su hidratación celular es probablemente:',
    o: [
      'Hiperhidratación celular, como indica la hiponatremia.',
      'Deshidratación celular: es una hiponatremia hipertónica.',
      'Normal: la glucosa compensa exactamente la hiponatremia.',
      'Hiperhidratación celular, porque la glucosa entra en las células arrastrando agua.'
    ],
    a: 1,
    e: 'Osmolalidad efectiva estimada ≈ 2 × 128 + 50 = 306 mOsm/kg: hipertonía. Sin insulina, la glucosa es un soluto eficaz extracelular: saca agua de las células y ese agua diluye el Na⁺. La natremia baja engaña: las células están deshidratadas.'
  },
  {
    t: '2.4',
    q: '¿Por qué una hipernatremia corresponde siempre a un estado hipertónico?',
    o: [
      'Porque ningún otro soluto eficaz extracelular puede disminuir lo bastante como para compensar el aumento de osmolalidad que produce.',
      'Porque el Na⁺ es un soluto osmóticamente ineficaz.',
      'Porque la hipernatremia siempre se debe a una pérdida de sodio.',
      'Porque siempre se acompaña de hiperglucemia.'
    ],
    a: 0,
    e: 'Para que una hipernatremia fuera isotónica, otro soluto eficaz tendría que bajar decenas de mOsm, y no existe ninguno con esa capacidad (la glucosa normal es ≈ 5 mmol/L). Por eso la hipernatremia equivale siempre a deshidratación celular.'
  },
  {
    t: '2.5',
    q: 'Se administran 420 mmol de Na⁺ (sin agua) a un paciente con 42 L de agua total y natremia de 140 mmol/L. Con las hipótesis del modelo y sin actuar los bucles, la natremia tras el equilibrio será:',
    o: ['141 mmol/L', '145 mmol/L', '150 mmol/L', '165 mmol/L'],
    a: 2,
    e: 'Δc = Δm / V = 420 / 42 = 10 mmol/L → 150 mmol/L. Repartirlo solo en el volumen extracelular (≈ 17 L) daría ≈ 165, un error típico: el agua que sale de las células diluye el sodio añadido.'
  },
  {
    t: '2.5',
    q: 'El volumen de distribución APARENTE de una carga de sodio administrada sin agua es el agua total y no el volumen extracelular porque:',
    o: [
      'El sodio entra rápidamente en las células.',
      'La subida de la natremia saca agua de las células hacia el extracelular y esa agua, sin osmoles, diluye la carga de sodio.',
      'El riñón elimina parte del sodio durante el equilibrado.',
      'El sodio óseo intercambiable capta parte de la carga.'
    ],
    a: 1,
    e: 'Es la "paradoja" del modelo. El sodio queda en el extracelular (un trazador radiactivo lo confirmaría), pero ese compartimiento crece al recibir agua de las células. Por eso Δm = V·Δc y no V<sub>e</sub>·Δc: V<sub>e</sub> no es constante.'
  },
  {
    t: '2.5',
    q: 'Según la relación de Edelman, un paciente con Na<sub>e</sub> = 2800 mmol, K<sub>e</sub> = 3150 mmol y 42 L de agua pierde 400 mmol de potasio sin otros cambios. Su natremia pasa de ≈ 141.7 a:',
    o: ['≈ 122.6 mmol/L', '≈ 132.1 mmol/L', '≈ 138.1 mmol/L', '≈ 141.7 mmol/L: el K⁺ es intracelular y no afecta a la natremia'],
    a: 1,
    e: 'Natremia = (Na<sub>e</sub> + K<sub>e</sub>)/V = (2800 + 2750)/42 ≈ 132.1 mmol/L. El K⁺ es un determinante de la natremia: al perderlo, sale agua de las células y diluye el Na⁺ extracelular. 122.6 sale de restar 800 (contar el K⁺ dos veces).'
  },
  {
    t: '2.5',
    q: 'Un paciente con un agua celular normal de 24 L (natremia normal 140) tiene ahora una natremia de 125 mmol/L. Si se cumplen las hipótesis del modelo, su agua celular actual es:',
    o: ['21.4 L', '24.0 L', '26.9 L', '28.8 L'],
    a: 2,
    e: 'cV<sub>i</sub> = constante → V<sub>i</sub> = 140 × 24 / 125 ≈ 26.9 L: hiperhidratación celular de ≈ 2.9 L. Si se invierte la proporción sale 21.4 L. La natremia varía en sentido inverso a la hidratación celular.'
  },
  {
    t: '2.6',
    q: 'Una persona sana aumenta mucho su consumo de sal durante semanas. Lo correcto es:',
    o: [
      'Su contenido hídrico y su peso aumentan de forma adaptada, sin hiperhidratación celular.',
      'Desarrolla una hipernatremia persistente.',
      'Presenta deshidratación celular crónica.',
      'Su contenido hídrico no cambia, porque el organismo lo mantiene en un valor fijo.'
    ],
    a: 0,
    e: 'El bucle hídrico retiene agua para mantener la isotonía (hidratación celular normal) y el bucle del sodio ajusta el Na al volumen extracelular. El peso sube, pero no es un trastorno. No existe un contenido hídrico "normal", sino uno adaptado.'
  },
  {
    t: '2.6',
    q: 'En hemodiálisis, la hidratación celular se corrige ajustando:',
    o: [
      'La cantidad de agua retirada (ultrafiltración).',
      'La concentración de sodio del dializado, es decir, el contenido de osmoles eficaces.',
      'La concentración de urea del dializado.',
      'La concentración de potasio del dializado, para modificar K.'
    ],
    a: 1,
    e: 'El riñón artificial funciona al revés que el natural: corrige la hidratación celular con el sodio del dializado (osmoles eficaces) y la extracelular con el volumen de agua retirado. El riñón natural ajusta el agua para la célula y el sodio para el extracelular.'
  },
  {
    t: '2.6',
    q: 'La hipovolemia efectiva intensa altera el balance hídrico porque:',
    o: [
      'Inhibe la ADH y provoca poliuria.',
      'Estimula la ADH y la angiotensina (dipsógena), lo que causa retención de agua y tendencia a la hipotonía.',
      'Aumenta la natriuresis y, con ella, la pérdida de agua.',
      'Estimula directamente los osmorreceptores al disminuir la osmolalidad.'
    ],
    a: 1,
    e: 'Es la única interacción importante entre los bucles. Si la hipovolemia efectiva supera un umbral, la ADH y la sed se estimulan aunque la osmolalidad sea normal o baja. El resultado es una sobrecarga hídrica secundaria con hiponatremia.'
  },
  {
    t: '2.7',
    q: 'En el diagrama de Pitts, el área del rectángulo extracelular representa:',
    o: [
      'El volumen extracelular.',
      'El contenido de osmoles eficaces extracelulares, proporcional al sodio intercambiable.',
      'La osmolalidad efectiva extracelular.',
      'El agua corporal total.'
    ],
    a: 1,
    e: 'Anchura = volumen, altura = osmolalidad efectiva, área = volumen × concentración = cantidad de osmoles eficaces. En el extracelular es proporcional al sodio y en la célula, al potasio.'
  },
  {
    t: '2.7',
    q: 'Tras añadir únicamente sodio al compartimiento extracelular (sin agua ni bucles), en el nuevo equilibrio osmótico:',
    o: [
      'V<sub>i</sub> disminuye, V<sub>e</sub> aumenta y la osmolalidad efectiva aumenta.',
      'V<sub>i</sub> no cambia, V<sub>e</sub> aumenta y la osmolalidad efectiva no cambia.',
      'V<sub>i</sub> y V<sub>e</sub> aumentan y la osmolalidad efectiva disminuye.',
      'V<sub>i</sub> disminuye, V<sub>e</sub> no cambia y la osmolalidad efectiva aumenta.'
    ],
    a: 0,
    e: 'El sodio sube la altura extracelular. El agua sale de la célula hacia el extracelular hasta igualar alturas: deshidratación celular, hiperhidratación extracelular e hipernatremia, con más área extracelular.'
  },
  {
    t: '2.7',
    q: 'A un sujeto con 25 L de agua celular y 17 L de extracelular se le añaden 3 L de agua pura (sin bucles). En el equilibrio, el agua añadida se reparte aproximadamente así:',
    o: [
      '3 L en el extracelular y 0 L en la célula.',
      '1.5 L en cada compartimiento.',
      '≈ 1.8 L en la célula y ≈ 1.2 L en el extracelular.',
      '3 L en la célula y 0 L en el extracelular.'
    ],
    a: 2,
    e: 'Sin cambiar los osmoles, la osmolalidad cae por igual en ambos compartimientos y cada uno crece en proporción a su volumen: 3 × 25/42 ≈ 1.8 L y 3 × 17/42 ≈ 1.2 L. Hiperhidratación celular y extracelular con hiponatremia (≈ 130 mmol/L).'
  },
  {
    t: '2.8',
    q: 'Un paciente pierde rápidamente 3 kg y su natremia se mantiene en 140 mmol/L. Su déficit de sodio es aproximadamente:',
    o: ['0 mmol: la natremia es normal', '140 mmol', '420 mmol', '1260 mmol'],
    a: 2,
    e: 'Natremia normal → hidratación celular normal → la pérdida fue isotónica y extracelular (déficit de Na). Δm = c·ΔV = 140 × 3 = 420 mmol. Se corrige con ≈ 3 L de suero salino isotónico. Una natremia normal no excluye un déficit de sodio.'
  },
  {
    t: '2.8',
    q: 'Sobre la llamada "hiponatremia por déficit" (déficit grave de sodio), es correcto que:',
    o: [
      'Su magnitud mide la magnitud del déficit de sodio.',
      'Refleja la sobrecarga hídrica secundaria a la hipovolemia efectiva, y esa retención de agua minimiza la pérdida de peso.',
      'Se corrige aportando solo agua (glucosa isotónica).',
      'Se acompaña de una hidratación celular normal.'
    ],
    a: 1,
    e: 'La hipovolemia efectiva intensa estimula la ADH: se retiene agua y aparece hiperhidratación celular. La hiponatremia indica esa sobrecarga hídrica, no el tamaño del déficit de Na. El tratamiento combina NaCl isotónico y restricción hídrica, y el déficit se calcula sobre el agua total.'
  },
  {
    t: '2.8',
    q: 'En una sobrecarga PRIMARIA de sodio con el bucle hídrico intacto, ¿qué descripción es correcta?',
    o: [
      'Hiperhidratación extracelular pura, natremia normal y ≈ 1 kg de aumento de peso por cada 140 mmol de Na retenido.',
      'Deshidratación celular con hipernatremia persistente.',
      'Hiperhidratación global con hiponatremia.',
      'Hidratación extracelular normal, porque el bucle hídrico elimina el exceso.'
    ],
    a: 0,
    e: 'El bucle hídrico retiene agua para que la sobrecarga de Na sea isotónica: natremia e hidratación celular normales, edemas (hiperhidratación extracelular) e hipervolemia efectiva. Como Δm = c·ΔV con c ≈ 140, cada kg ganado corresponde a ≈ 140 mmol de Na.'
  },
  {
    t: '2.8',
    q: 'Un paciente con insuficiencia cardíaca descompensada tiene edemas e hiponatremia. La hiponatremia:',
    o: [
      'Indica una sobrecarga hídrica secundaria a la hipovolemia efectiva y no guarda relación directa con la sobrecarga de sodio.',
      'Indica un déficit de sodio que hay que corregir con suero salino.',
      'Es una pseudohiponatremia por hiperproteinemia.',
      'Es consecuencia directa de la sobrecarga de sodio.'
    ],
    a: 0,
    e: 'El bajo gasto cardíaco produce hipovolemia efectiva sin falta de volumen: se retiene Na (edemas) y, si es intensa, también agua (ADH). La hiponatremia refleja esa agua (hiperhidratación celular). Dar sodio empeoraría los edemas.'
  },
  {
    t: '2.9',
    q: 'Un paciente en coma tiene una deshidratación celular pura (natremia 158 mmol/L) con el extracelular normal. El tratamiento más adecuado es:',
    o: [
      'Agua destilada por vía intravenosa.',
      'Suero glucosado isotónico por vía intravenosa.',
      'Suero salino isotónico por vía intravenosa.',
      'Agua por vía oral.'
    ],
    a: 1,
    e: 'Hay que aportar agua. Por vía oral no, porque en coma hay riesgo de aspiración. Agua pura IV tampoco, porque produce hemólisis. La glucosa isotónica no hemoliza y, una vez metabolizada, equivale a agua pura. El suero salino no corrige un déficit hídrico puro.'
  },
  {
    t: '2.9',
    q: 'Los diuréticos aumentan la diuresis en la sobrecarga de sodio. El mecanismo de la pérdida de agua es:',
    o: [
      'Una acción directa del fármaco sobre la reabsorción de agua libre en el colector.',
      'Aumentan la natriuresis; el agua se pierde después por el bucle hídrico, que baja la ADH para evitar la hiperhidratación celular.',
      'Un aumento de la presión oncótica que atrae agua al riñón.',
      'Una inhibición de la sed.'
    ],
    a: 1,
    e: 'Los diuréticos son en realidad natriuréticos. Al perder Na baja la osmolalidad efectiva; el bucle hídrico responde reduciendo la ADH y se elimina agua. Así el contenido hídrico se adapta al nuevo contenido de sodio.'
  },
  {
    t: '2.9',
    q: 'Un paciente tiene sed intensa y mucosas secas, sin pliegue cutáneo, taquicardia ni edemas. Lo más probable es:',
    o: [
      'Un déficit hídrico con hipernatremia.',
      'Un déficit de sodio con natremia normal.',
      'Un déficit de sodio grave con hiponatremia.',
      'Una sobrecarga hídrica con hiponatremia.'
    ],
    a: 0,
    e: 'Sed y sequedad de mucosas son signos de deshidratación celular, que indica un balance hídrico alterado (déficit) y se refleja en una hipernatremia. La ausencia de pliegue y taquicardia sugiere un extracelular normal, es decir, un balance de Na adaptado.'
  }
];
