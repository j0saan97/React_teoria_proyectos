# NavbarBusqueda

La navbar de Bootstrap 5 con enlaces, desplegable y **barra de búsqueda**,
convertida en componente React reutilizable con **3 estilos de CSS** (prop
`estilo`). La controla React: no necesita el JS de Bootstrap.

## Estilos

| `estilo` | Aspecto |
| --- | --- |
| `clasico` (por defecto) | El ejemplo de Bootstrap tal cual: fondo gris claro, botón "Buscar" verde con borde. |
| `moderno` | Fondo blanco con sombra, enlaces en píldora (el activo relleno en índigo) y buscador redondo con la lupa dentro. |
| `oscuro` | Fondo azul noche, acento cian, marca en mayúsculas, buscador subrayado y enlace activo subrayado. |

## Responsive

- **≥ 992px:** todo en una fila.
- **< 992px:** botón hamburguesa; enlaces, desplegable y buscador uno debajo de otro.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<NavbarBusqueda
  brand="Mi web"
  estilo="moderno"
  items={[
    { label: "Inicio", href: "/", activo: true },
    { label: "Blog", href: "/blog" },
    {
      label: "Más",
      children: [
        { label: "Contacto", href: "/contacto" },
        "separador",
        { label: "Aviso legal", href: "/legal" },
      ],
    },
    { label: "Próximamente", deshabilitado: true },
  ]}
  onSearch={(texto) => console.log(texto)}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | Sí | Nombre o logo. |
| `logo` | `string` | No | URL del logo; se muestra a la izquierda del nombre. |
| `items` | `NavbarItem[]` | Sí | `{ label, href?, activo?, deshabilitado?, children? }`. Con `children` es un desplegable; `"separador"` pinta una línea. |
| `estilo` | `"clasico" \| "moderno" \| "oscuro"` | No | Aspecto (por defecto `clasico`). |
| `placeholder` | `string` | No | Texto del buscador (por defecto "Buscar"). |
| `onSearch` | `(texto) => void` | No | Se llama al enviar la búsqueda. |
| `linkAs` | `ElementType` | No | Componente de enlace (por defecto `<a>`). Recibe `href` y `to`. |

El desplegable se cierra al elegir una opción o al hacer clic fuera.
