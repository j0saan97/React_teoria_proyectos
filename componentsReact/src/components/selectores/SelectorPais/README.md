# SelectorPais

Desplegable para elegir un país, con **bandera** y **buscador**. Tiene dos modos:
país (bandera + nombre) y prefijo telefónico (bandera + prefijo).

Lo usan `ContactFormBasic` y `advanced_form-registrer`.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `SelectorPais.tsx` | El componente. |
| `SelectorPais.css` | Sus estilos. |
| `paises.ts` | Lista de ~200 países (`PAISES`) con código ISO y prefijo, y la función `buscarPais(codigo)`. |

## Uso

Es un componente **controlado**: quien lo usa guarda el código del país en su estado.

```tsx
import { SelectorPais } from "../selectores/SelectorPais/SelectorPais";
import { buscarPais } from "../selectores/SelectorPais/paises";

const [pais, setPais] = useState("es");

<label htmlFor="pais">País</label>
<SelectorPais id="pais" modo="pais" value={pais} onChange={setPais} />

buscarPais(pais); // → { codigo: "es", nombre: "España", prefijo: "+34" }
```

Para un teléfono, en modo `prefijo` delante del input:

```tsx
<SelectorPais id="prefijo" modo="prefijo" aria-label="Prefijo telefónico" value={pais} onChange={setPais} />
<input type="tel" />
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `id` | `string` | Sí | Id del botón (para enlazarlo con un `<label htmlFor>`). |
| `value` | `string` | Sí | Código ISO del país elegido, en minúsculas (`"es"`, `"mx"`...). |
| `onChange` | `(codigo: string) => void` | Sí | Se llama con el código del país elegido. |
| `modo` | `"pais" \| "prefijo"` | Sí | Muestra el nombre del país o su prefijo telefónico. |
| `aria-label` | `string` | No | Nombre accesible si no hay `<label>` (p. ej. en el prefijo). |

## Comportamiento

- El buscador filtra por nombre (sin tildes ni mayúsculas: "mex" encuentra "México")
  y, en modo prefijo, también por número ("+44").
- Se cierra al elegir un país, al hacer clic fuera o con `Escape`.
- Las opciones se pueden elegir con el teclado (`Tab` + `Enter`).

## Decisiones

- **Banderas con `flag-icons`** (SVG), no con emojis: Windows no muestra las
  banderas emoji (salen letras, "ES").
- **No es un `<select>` nativo** porque sus opciones no pueden mostrar imágenes.
- **Nombres con `Intl.DisplayNames`**: los da el navegador en español, así que
  `paises.ts` solo guarda código y prefijo.

## Dependencias

`flag-icons` (`npm install flag-icons`). El componente importa su CSS.
