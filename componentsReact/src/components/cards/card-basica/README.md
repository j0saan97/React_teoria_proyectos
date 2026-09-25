# CardBasica

La card básica de la documentación de Bootstrap 5 convertida en componente
React reutilizable: imagen arriba, título, texto y botón.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<CardBasica
  titulo="Card title"
  texto="Some quick example text..."
  imagen="/img/foto.jpg"
  alt="Descripción de la foto"
  boton={{ label: "Go somewhere", href: "/detalle" }}
/>

// En una rejilla responsive: que ocupe toda la columna
<div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col"><CardBasica ancho="100%" ... /></div>
</div>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `titulo` | `string` | Sí | Título de la card. |
| `texto` | `ReactNode` | Sí | Contenido. |
| `imagen` | `string` | No | URL de la imagen. Sin ella se ve un hueco gris "Image cap". |
| `alt` | `string` | No | Texto alternativo de la imagen. |
| `boton` | `{ label, href }` | No | Botón al pie de la card. |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |
| `ancho` | `string` | No | Ancho (por defecto `18rem`; `100%` para rejillas). |
| `linkAs` | `ElementType` | No | Componente de enlace (por defecto `<a>`). Recibe `href` y `to`. |

## Diferencias con el HTML original

- La imagen tiene proporción fija 16:10 (`object-fit: cover`), así todas las
  cards de una rejilla quedan alineadas aunque las fotos tengan otro tamaño.
- El botón se pega abajo (`mt-auto`) y la card ocupa todo el alto (`h-100`):
  en una fila, los botones quedan a la misma altura aunque los textos midan distinto.
- `max-width: 100%`: en un móvil estrecho la card nunca se sale de la pantalla.
