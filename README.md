# Tutorial Tailwind CSS v4.1 — Guía completa del proyecto

Colección de 10 partes para aprender Tailwind CSS 4.x (este proyecto usa v4.1) con Vite, desde los fundamentos hasta un encargo realista. Al final construirás una landing de videojuegos lista para publicar.

## ¿Qué es Tailwind y para qué sirve?
- Utility‑first: Tailwind propone componer interfaces con utilidades atómicas como `p-4`, `text-xl`, `bg-blue-500` en lugar de escribir CSS a mano por componente.
- Productividad y consistencia: te mueves dentro de escalas bien pensadas (espaciado, tipografía, colores), reduces “números mágicos” y evitas CSS muerto.
- Variantes y responsive: estados (`hover`, `focus`, `active`), modo oscuro (`dark:`) y breakpoints (`sm`, `md`, `lg`) sin crear hojas separadas.
- Tokens y capas en v4.x: con `@theme` defines paletas/escala y con `@layer` creas componentes reusables con `@apply`.
- Play CDN y build: puedes probar en el navegador con `@tailwindcss/browser@4`, y en proyectos usas el plugin oficial `@tailwindcss/vite` para generar el CSS a medida.

## Versión usada
- Este tutorial está preparado con Tailwind CSS v4.1 y el plugin oficial `@tailwindcss/vite`.
- Incluye `@theme` para tokens (p. ej., `--color-brand`) y `@layer components` para patrones como `.btn` y `.card`.
- En `src/style.css` verás un `@custom-variant dark` para que `dark:` dependa de la clase `.dark` (útil si ofreces un toggle manual).

## Requisitos
- Node.js 18 o superior
- npm 9+
- Git (opcional, para publicar y versionar)

## Estructura del proyecto
- `index.html`: índice navegable de las partes.
- `parte1.html … parte10.html`: cada lección con ejemplos y ejercicios.
- `src/style.css`: importa Tailwind, tokens en `@layer theme` y componentes en `@layer components`.
- `vite.config.mjs`: Vite con `@tailwindcss/vite`.
- `tailwind.config.js`: `darkMode: 'class'` y globs de archivos.

## Puesta en marcha (este repo)
```bash
npm install
npm run dev
```
Abre `http://localhost:5173/` y navega por los archivos `parteX.html` desde el índice.

## Instalar Tailwind + Vite (si empiezas de cero)
```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install tailwindcss @tailwindcss/vite

# vite.config.mjs
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [tailwindcss()] })

# src/style.css
@import "tailwindcss";
@layer theme { @theme { --color-brand: #2563eb; } }
@layer components {
  .btn { @apply inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow-sm transition; }
  .btn-brand { @apply bg-brand text-white hover:bg-brand/90; }
  .card { @apply p-4 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700; }
  .card-title { @apply text-lg font-semibold mb-2; }
}
```

## Índice y resumen de cada parte
- Parte 1 — Fundamentos y Play CDN (`parte1.html`)
  - Qué es utility‑first, cómo funcionan las utilidades y los tokens `@theme` (ej.: `text-brand`).
  - Play CDN para pruebas rápidas con `@tailwindcss/browser@4`.
  - Mini hero con `dark:` para comprobar el tema.

- Parte 2 — Setup con Vite y `@apply` (`parte2.html`)
  - Instalar `tailwindcss` + `@tailwindcss/vite` y enlazar `/src/style.css`.
  - Definir `.btn` y `.btn-brand` en `@layer components` con `@apply`.
  - Tarjeta comentada con utilidades de layout, color y sombra.

- Parte 3 — Variantes clave (`parte3.html`)
  - Estados de interacción: `hover`, `focus`, `active` con anillos accesibles.
  - Breakpoints `sm`, `md`, `lg` (mobile‑first).
  - Modo oscuro con `dark:` y valores arbitrarios como `w-[90%]`, `max-h-[calc(100dvh-50px)]`.

- Parte 4 — Motor y capas (`parte4.html`)
  - Cómo Tailwind genera sólo el CSS usado; organización con `@layer`.
  - Composición de utilidades (filtros `blur`, `grayscale`) y `hover` inverso.
  - Arbitrarios con funciones (`calc()`, `--spacing()`), y ejemplo JSX para cadenas escaneables.

- Parte 5 — Pseudoclases avanzadas (`parte5.html`)
  - `group`/`group-hover`, `peer` + validación (`peer-invalid:visible`).
  - `before`/`after` para efectos sin JS.
  - Variantes ARIA y consultas por contenedor con `@container` (`@sm:`, `@md:` sobre contenedores).

- Parte 6 — Utility‑first en profundidad (`parte6.html`)
  - Construir componentes desde utilidades: tarjeta “ChitChat”, estados y responsive.
  - Cuándo evitar estilos en línea y preferir utilidades.
  - Composición, `dark:`, y resolución de conflictos comunes.

- Parte 7 — Modo oscuro y temas (`parte7.html`)
  - Respetar `prefers-color-scheme` y evitar parpadeos aplicando el tema antes del paint.
  - Toggle de tema guardado en `localStorage` + `.dark` en `<html>`.
  - Recomendaciones de contraste y reutilización de tokens de marca.

- Parte 8 — Utilidades más usadas (`parte8.html`)
  - Espaciado (`p/m`, `gap`, `space-*`), layout (`flex/grid`), tamaños (`w/h/size`).
  - Tipografía (`text-*`, `font-*`, `leading`, `tracking`) y color (`bg-*`, `text-*`, `border-*`).
  - Ejemplos comentados para que veas “qué clase hace qué”.

- Parte 9 — Tipografía y colores (`parte9.html`)
  - Escalas de texto, jerarquías y legibilidad (`leading-relaxed`, `max-w-prose`).
  - Paleta por tonos (50→950) y opacidades (`bg-rose-500/90`), variantes `dark:`.
  - Mini ejercicio editorial.

- Parte 10 — Encargo final: landing de videojuegos (`parte10.html`)
  - Brief detallado con objetivos, restricciones y secciones (hero, catálogo, calendario, formulario, FAQ…).
  - Roadmap y criterios de accesibilidad/rendimiento.
  - Implementación guiada sólo con utilidades y componentes definidos en `src/style.css`.

## Accesibilidad y buenas prácticas
- Usa `focus-visible`/`focus` para anillos accesibles en enlaces y botones.
- Mantén un contraste suficiente en claro y oscuro; prueba `dark:` en tarjetas y texto.
- Evita “texto invisible” al inicializar el tema aplicando `.dark` antes del render (ver `parte7.html` y `part0.html`).

## Publicar el proyecto
- Desarrollo: `npm run dev`.
- Producción (si configuras build con Vite): `npm run build` y publica los archivos estáticos.
- GitHub Pages (opcional): sirve el contenido estático desde la rama elegida en Settings → Pages.

## Notas y detalles del repo
- Este tutorial enlaza `src/style.css` desde todas las páginas HTML.
- `tailwind.config.js` establece `darkMode: 'class'` y globs (`part*.html`).
- En `index.html` hay un enlace a `part7.html`; el archivo real es `parte7.html`.

---

Siente libertad para extender cada parte, añadir ejemplos en React/JSX o crear tus propios componentes en `@layer components`. El objetivo es que interiorices el enfoque utility‑first de Tailwind y domines v4.1 en un proyecto real.

