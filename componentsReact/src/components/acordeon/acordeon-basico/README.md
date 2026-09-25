# AcordeonBasico

El acordeón de Bootstrap 5 como componente React reutilizable. Lo abre y
cierra React con un estado, así que **no necesita el JS de Bootstrap**.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<AcordeonBasico
  items={[
    { titulo: "¿Cuánto tarda el envío?", contenido: "Entre 24 y 48 horas." },
    { titulo: "¿Puedo devolverlo?", contenido: <p>Sí, tienes <strong>30 días</strong>.</p> },
  ]}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `items` | `{ titulo, contenido }[]` | Sí | Secciones. Ambos aceptan texto o JSX. |
| `abiertosInicial` | `number[]` | No | Índices abiertos al cargar (por defecto `[0]`; `[]` = todos cerrados). |
| `variosAbiertos` | `boolean` | No | Abrir uno no cierra los demás ("always open" de Bootstrap). |
| `flush` | `boolean` | No | Sin bordes exteriores ("flush" de Bootstrap). |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |

## Diferencias con el HTML original

- `data-bs-toggle` / `data-bs-parent` se sustituyen por un estado de React
  con los índices abiertos.
- Los `id` se generan con `useId`, así se pueden poner varios acordeones en la
  misma página sin que choquen.
- La animación de apertura usa `grid-template-rows: 0fr → 1fr` en CSS, en
  lugar de medir alturas con JS como hace Bootstrap.
- Las secciones cerradas llevan `inert`: su contenido no recibe el foco con el teclado.
