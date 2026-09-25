# DropdownButton

Botón con menú desplegable hecho con clases de Bootstrap 5, con **3 estilos
de CSS** que se eligen con la prop `estilo`. Lo abre y cierra React (no
necesita el JS de Bootstrap).

## Estilos

| `estilo` | Botón | Menú |
| --- | --- | --- |
| `solido` (por defecto) | Azul de Bootstrap con sombra | Sin borde, sombra suave; la opción bajo el ratón se pinta de azul |
| `contorno` | Borde fino, texto en mayúsculas | Borde fino; la opción bajo el ratón muestra una barra azul a la izquierda y se desplaza |
| `degradado` | Píldora con degradado morado-rosa | Muy redondeado; la opción bajo el ratón toma el mismo degradado |

En los tres, el menú aparece con una pequeña animación hacia abajo.

## Comportamiento

- Clic en el botón: abre o cierra el menú.
- Se cierra al elegir una opción, al hacer clic fuera o con `Escape`.
- Opción con `href` → enlace. Sin `href` → botón que llama a `onSelect`.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<DropdownButton
  label="Opciones"
  estilo="degradado"
  opciones={[{ label: "Editar" }, { label: "Borrar" }, { label: "Ayuda", href: "/ayuda" }]}
  onSelect={(opcion) => console.log(opcion.label)}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | Sí | Texto del botón. |
| `opciones` | `{ label, href? }[]` | Sí | Opciones del menú. |
| `estilo` | `"solido" \| "contorno" \| "degradado"` | No | Aspecto (por defecto `solido`). |
| `onSelect` | `(opcion, indice) => void` | No | Se llama al elegir una opción. |
