# MenuDropdown

Menú reutilizable con **desplegables**, hecho con clases de **Bootstrap 5**.

## Especificaciones recibidas

1. Responsive.
2. Usar Bootstrap.
3. Resaltar el elemento donde está el ratón (hover) o el foco, cambiando su color.
4. Varios elementos que se despliegan al hacer clic en su botón.

## Llevarlo a otra web

1. Copia `menu-dropdown.tsx` y `menu-dropdown.css`.
2. `npm install bootstrap` y carga su CSS **una vez** en la web (p. ej. `main.tsx`):
   ```tsx
   import "bootstrap/dist/css/bootstrap.min.css";
   ```

## Uso

```tsx
<MenuDropdown
  brand="Empresa S.L."
  items={[
    { label: "Inicio", href: "/" },
    {
      label: "Servicios",
      children: [
        { label: "Consultoría", href: "/consultoria" },
        { label: "Desarrollo web", href: "/desarrollo" },
      ],
    },
  ]}
  hoverColor="#198754"
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | Sí | Nombre o logo de la empresa. |
| `logo` | `string` | No | URL del logo; se muestra a la izquierda del nombre. |
| `items` | `{ label, href?, children? }[]` | Sí | Con `children` es un desplegable; sin ellos, un enlace. |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |
| `hoverColor` | `string` | No | Color de resaltado (por defecto el primario de Bootstrap). |
| `linkAs` | `ElementType` | No | Componente de enlace (por defecto `<a>`). Recibe `href` y `to`. |

## Comportamiento

- **Clic** en un botón con flecha: abre su desplegable (solo uno a la vez). Se cierra al volver a pulsarlo, al elegir una opción o al hacer clic fuera.
- **Hover / foco:** el elemento cambia al color `hoverColor`. El botón del desplegable abierto también queda resaltado.
- **Teléfono (< 992px):** hamburguesa; los desplegables se abren debajo, a ancho completo.
- **Escritorio (≥ 992px):** los desplegables flotan bajo su botón.
- **Monitor de 30":** la fuente escala con `clamp()` entre 16px y 22px.
