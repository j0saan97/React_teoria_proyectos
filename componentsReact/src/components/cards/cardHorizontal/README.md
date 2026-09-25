# CardHorizontal

Card horizontal de Bootstrap 5 como componente React reutilizable: **imagen a
la izquierda y texto a la derecha**.

## Responsive

- **≥ 768px:** imagen en 1/3 del ancho (`col-md-4`) y texto en 2/3 (`col-md-8`).
- **< 768px:** la imagen pasa arriba y el texto debajo, a ancho completo.
- La imagen se recorta (`object-fit: cover`) para llenar todo el alto de la
  card, sea cual sea su tamaño original.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<CardHorizontal
  titulo="Card title"
  texto="This is a wider card..."
  imagen="/img/foto.jpg"
  alt="Descripción de la foto"
  nota="Last updated 3 mins ago"
  boton={{ label: "Ver más", href: "/detalle" }}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `titulo` | `string` | Sí | Título. |
| `texto` | `ReactNode` | Sí | Contenido. |
| `imagen` | `string` | No | URL de la imagen. Sin ella se ve un hueco gris "Image". |
| `alt` | `string` | No | Texto alternativo de la imagen. |
| `nota` | `string` | No | Texto pequeño y gris (fecha, autor...). |
| `boton` | `{ label, href }` | No | Botón al pie. |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |
| `ancho` | `string` | No | Ancho máximo (por defecto `540px`; `100%` para listas). |
| `linkAs` | `ElementType` | No | Componente de enlace (por defecto `<a>`). Recibe `href` y `to`. |
