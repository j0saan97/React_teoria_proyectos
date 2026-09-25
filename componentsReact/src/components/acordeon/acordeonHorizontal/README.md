# AcordeonHorizontal

Acordeón de Bootstrap 5 con los **botones en filas** (como un acordeón normal)
y el **contenido abierto a la derecha**, en un panel que se expande en ancho.
Lo controla React con un estado (no necesita el JS de Bootstrap).

## Responsive

- **≥ 768px:** columna de botones (`anchoBotones`) + panel a la derecha con el
  texto del abierto (ancho máximo `anchoTexto`). El panel se abre y cierra
  animando su ancho. La flecha apunta a la derecha (cerrado) o a la izquierda (abierto).
  El panel tiene el alto de la lista de botones; si el texto no cabe, hace scroll.
- **< 768px:** acordeón vertical normal: el texto se abre debajo del botón.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<AcordeonHorizontal
  items={[
    { titulo: "Diseño", contenido: "Creamos la identidad visual..." },
    { titulo: "Desarrollo", contenido: <p>Webs rápidas y <strong>accesibles</strong>.</p> },
  ]}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `items` | `{ titulo, contenido }[]` | Sí | Secciones. Ambos aceptan texto o JSX. |
| `abiertoInicial` | `number \| null` | No | Índice abierto al cargar (por defecto `0`; `null` = todos cerrados). |
| `anchoBotones` | `string` | No | Ancho de la columna de botones (por defecto `18rem`). |
| `anchoTexto` | `string` | No | Ancho máximo del texto (por defecto `32rem`, nunca más del 60% de la pantalla). |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |

Pulsar el botón abierto lo cierra (y el panel lateral se recoge).
