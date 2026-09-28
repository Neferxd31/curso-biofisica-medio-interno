# Biofísica del medio interno — curso interactivo

Curso práctico basado en los capítulos 1–3 de *Biofísica* (A. Aurengo y T. Petitclerc):

| Módulo | Tema | Destacados |
|---|---|---|
| 1 | Compartimientos líquidos del organismo | Simulador de estados de la materia, traductor de concentraciones, fórmula de Watson, gamblegrama, simulador de trazadores, volumen de distribución |
| 2 | Equilibrio del agua y del sodio | Clasificador de disnatremias, relación de Edelman, bucles de regulación animados, **diagrama de Pitts interactivo**, matriz diagnóstica |
| 3 | Equilibrio ácido-base | Escala de pH, curva de titulación exacta, coeficiente de disociación, tampones abiertos frente a cerrados, **diagrama de Davenport interactivo** |

Cada módulo termina con casos clínicos resueltos y una **evaluación de 30 preguntas** de opción múltiple (A–D) con explicación. El progreso y la mejor nota se guardan en el navegador (`localStorage`).

## Estructura

```
index.html              portada y hoja de valores normales
modulo-1.html … modulo-3.html
assets/css/styles.css   estilos (modo claro/oscuro, responsive)
assets/js/core.js       tema, índice lateral, progreso, motor de evaluaciones
assets/js/m1.js … m3.js simuladores de cada módulo
assets/js/quiz-m*.js    bancos de preguntas
netlify.toml            configuración de despliegue
```

Sitio 100 % estático, sin paso de compilación. Librerías por CDN: Chart.js (gráficas) y KaTeX (fórmulas).

## Ver en local

```bash
python -m http.server 8000
```

Luego abre <http://localhost:8000>.

## Publicar en Netlify

1. En Netlify: **Add new site → Import an existing project → GitHub** y elige este repositorio.
2. Deja **Build command** vacío y **Publish directory** en `.` (ya lo define `netlify.toml`).
3. Pulsa **Deploy**.
