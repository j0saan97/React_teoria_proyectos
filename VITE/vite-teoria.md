## ¿Qué es Vite?

Vite (se pronuncia "vit", del francés "rápido") es una **herramienta de build y servidor de desarrollo** para proyectos web modernos. Creado por Evan You (el mismo creador de Vue.js) en 2020. No es un framework como React — es la herramienta que envuelve tu proyecto React (o Vue, Svelte, etc.) y se encarga de todo el trabajo "sucio" de desarrollo y producción.

## El problema que resuelve

Para entender Vite hay que entender el problema anterior. Herramientas como Webpack (que usa CRA por debajo) funcionan así:

1. Cuando arrancas el servidor, **bundlean absolutamente todo tu proyecto de una vez** — cada archivo, cada dependencia — antes de poder mostrarte algo en el navegador
2. En un proyecto pequeño no se nota, pero en un proyecto con cientos de componentes, esto puede tardar 30 segundos, un minuto, o más
3. Cada vez que guardas un cambio, aunque sea en un solo archivo, tiene que re-bundlear buena parte del árbol de dependencias

Esto se vuelve insoportable a medida que el proyecto crece.

## Cómo lo resuelve Vite: dos motores distintos

**En desarrollo (`npm run dev`):**
Vite no bundlea nada de entrada. Aprovecha que los navegadores modernos ya soportan **ES Modules nativos** (`import`/`export` directo en el navegador). Cuando pides una página:

- Vite sirve tus archivos tal cual, sin empaquetarlos
- El navegador mismo va pidiendo cada `import` que encuentra, uno por uno, bajo demanda
- Solo se procesa/transforma el archivo que realmente se está usando en ese momento

Resultado: el servidor arranca casi instantáneamente, sin importar si tu proyecto tiene 10 o 10.000 archivos, porque no tiene que compilar todo de antemano.

**Hot Module Replacement (HMR) ultra rápido:**
Cuando guardas un cambio en un componente, Vite no recompila todo el proyecto — solo actualiza ese módulo específico en el navegador, manteniendo el estado de la app (por ejemplo, si tenías un formulario a medio rellenar, no se pierde). Esto es prácticamente instantáneo, incluso en proyectos grandes.

**En producción (`npm run build`):**
Aquí Vite cambia de estrategia. Servir cientos de archivos sueltos por HTTP en producción sería ineficiente (muchas peticiones), así que para el build final usa **Rollup** por debajo, que sí bundlea y optimiza todo: minifica, hace tree-shaking (elimina código no usado), divide en chunks inteligentes, etc.

Esta es la clave de Vite: **dev rápido con ESM nativo, producción optimizada con bundling tradicional.**

## Pre-bundling de dependencias

Un detalle técnico interesante: las dependencias de `node_modules` (como React mismo) sí las pre-procesa Vite al arrancar, usando **esbuild** (escrito en Go, órdenes de magnitud más rápido que herramientas basadas en JavaScript). Esto es porque muchas librerías no están empaquetadas de forma amigable para ESM nativo, y porque hacer una sola petición para React en vez de decenas de archivos internos mejora el rendimiento.

## Estructura de un proyecto Vite

```
mi-proyecto/
├── index.html          ← en la RAÍZ (diferencia clave vs CRA)
├── src/
│   ├── main.jsx         ← punto de entrada
│   └── App.jsx
├── public/               ← archivos estáticos sin procesar
├── vite.config.js        ← configuración
└── package.json
```

El `index.html` en la raíz (no dentro de `public/`) es intencional: Vite lo trata como parte del grafo de módulos, no como un archivo estático suelto.

## Configuración (`vite.config.js`)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

El plugin `@vitejs/plugin-react` es el que le enseña a Vite a entender JSX y a habilitar Fast Refresh (el HMR específico de componentes React).

## Variables de entorno

Solo las variables prefijadas con `VITE_` se exponen al código del cliente (por seguridad, para no filtrar accidentalmente secretos del servidor):

```
VITE_API_URL=https://api.ejemplo.com
```

Se acceden así: `import.meta.env.VITE_API_URL` (no `process.env` como en CRA).

## Ecosistema de plugins

Vite tiene un sistema de plugins compatible en gran parte con Rollup, y hay plugins para casi todo: SVG como componentes, PWA, compresión de imágenes, TypeScript paths, etc. `@vitejs/plugin-react` cubre lo esencial para React.

## En resumen

| | CRA (Webpack) | Vite |
|---|---|---|
| Arranque dev | Bundlea todo primero | Sirve al instante (ESM nativo) |
| HMR | Lento en proyectos grandes | Casi instantáneo |
| Build producción | Webpack | Rollup |
| Mantenimiento | Descontinuado | Activo, es el estándar actual |
| Entry point | `src/index.js`, `public/index.html` | `src/main.jsx`, `index.html` en raíz |

Vite no cambia cómo escribes React — sigues usando JSX, hooks, componentes igual. Cambia **cómo se sirve y se construye** tu proyecto, haciendo que el ciclo de desarrollo (guardar → ver el cambio) sea casi instantáneo.