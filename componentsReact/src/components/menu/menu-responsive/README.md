# MenuResponsive

Menú reutilizable para webs empresariales. Un solo archivo `.tsx`, sin CSS
propio: todo el responsive lo hacen las clases de **Bootstrap 5**.

## Llevarlo a otra web

1. Copia `menu-responsive.tsx`.
2. `npm install bootstrap` y carga su CSS **una vez** en la web (p. ej. `main.tsx`):
   ```tsx
   import "bootstrap/dist/css/bootstrap.min.css";
   ```

## Uso

```tsx
<MenuResponsive
  brand="Empresa S.L."
  items={[
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
  ]}
  cta={{ label: "Contacto", href: "/contacto" }}
/>

// Con el router de la web (navegación SPA)
<MenuResponsive brand="Empresa" items={items} linkAs={NavLink} /> // React Router
<MenuResponsive brand="Empresa" items={items} linkAs={Link} />    // Next.js
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | Sí | Nombre o logo de la empresa. |
| `logo` | `string` | No | URL del logo; se muestra a la izquierda del nombre. |
| `items` | `{ label, href }[]` | Sí | Enlaces del menú. |
| `cta` | `{ label, href }` | No | Botón de acción a la derecha. |
| `variant` | `"light" \| "dark"` | No | Tema de color (por defecto `light`). |
| `linkAs` | `ElementType` | No | Componente de enlace (por defecto `<a>`). Recibe `href` y `to`. |

## Responsive

- **Teléfono (< 992px):** hamburguesa; enlaces y botón a ancho completo.
- **Escritorio (≥ 992px):** enlaces en línea a la derecha.
- **Monitor de 30":** la fuente escala con `clamp()` entre 16px y 22px.
