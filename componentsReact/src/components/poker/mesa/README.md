# Mesa

Mesa de póker **vacía** con el aspecto de la sala de GG Poker. Renderiza
únicamente el tapete, el raíl y la marca de agua central `GGPOKER`.

> Modelo visual: captura de una mesa de GG Poker aportada en el chat
> (tapete verde ovalado, raíl oscuro, logo `GGPOKER` tenue al centro).

---

## Especificaciones recibidas

1. **Debe ser responsive.** Usa un **tamaño mínimo**: en un monitor de 27"
   deben verse como mínimo **6 mesas**. El tamaño mínimo de una mesa se
   calcula a partir de esa premisa.
2. **Responsive hacia arriba:** en una pantalla de 40" la mesa se adapta al
   espacio disponible.
3. **No lleva ningún elemento dentro:** ni jugadores, ni time bank, ni nada.
   Solo la mesa.
4. **Premisa principal:** el diseño se guía por la imagen de referencia
   aportada en el chat (tapete verde ovalado, raíl oscuro, logo `GGPOKER`
   tenue en el centro, fondo oscuro alrededor).

---

## Cálculo del tamaño mínimo

| Paso | Valor |
| --- | --- |
| Ancho CSS de un monitor de 27" (2560×1440 nativo) | ~2560 px |
| Distribución de 6 mesas | rejilla de **3 columnas × 2 filas** |
| Ancho bruto por mesa | 2560 / 3 ≈ **853 px** |
| Descontando *gaps* y barra de scroll | **`min-width: 820 px`** |
| Alto por mesa (ratio de la imagen 674 / 423 ≈ 1.594) | 820 / 1.594 ≈ **515 px** |
| Alto de 2 filas | ≈ 1030 px < 1440 px → cabe con margen sobrante |

En un 27" caben 3 mesas por fila casi exactas (3 × 853 = 2559 ≤ 2560) y 2
filas completas ⇒ **6 mesas**.

---

## Cómo está diseñado

### Estructura

```
.mesa                 → raíl exterior (borde oscuro redondeado)
└── .mesa__tapete      → fieltro verde ovalado
    ├── ::before       → aro interior tenue
    └── .mesa__logo    → marca de agua "GGPOKER"
        ├── .mesa__logo-gg     → "GG" (blanco, peso 800)
        └── .mesa__logo-poker  → "POKER" (más pequeño y fino)
```

### Dimensionado y responsive

| Propiedad | Valor | Motivo |
| --- | --- | --- |
| `width` | `100%` | ocupa todo el ancho del contenedor (columna de la rejilla) |
| `min-width` | `var(--mesa-min-width, 820px)` | nunca baja del umbral de "6 mesas en un 27" |
| *(sin `max-width`)* | — | en pantallas grandes (40") crece y llena el espacio disponible |
| `aspect-ratio` | `674 / 423` | proporción exacta de la imagen de referencia; la altura se deriva sola |
| `padding` | `2.4%` | grosor del raíl **relativo**, así escala junto a la mesa |
| `container-type` | `inline-size` | permite medir el ancho de la mesa para el logo |
| `.mesa__logo` `font-size` | `7cqi` | el logo se escala con el ancho de la mesa, no con el viewport |

Todo el dimensionado es relativo (`%`, `cqi`, `aspect-ratio`), por lo que al
cambiar el ancho de la mesa **raíl, tapete y logo escalan de forma
proporcional** sin ajustes manuales.

### Personalización

- `--mesa-min-width`: ancho mínimo de la mesa. Bájalo si quieres más mesas
  por fila; súbelo si quieres menos.
- Prop `className`: clase extra para colocar la mesa dentro de una rejilla o
  layout externo (la mesa no se posiciona a sí misma).

---

## Uso

```tsx
import { Mesa } from "./mesa";

// Una mesa
<Mesa />

// 6 mesas en rejilla 3×2 (premisa del monitor de 27")
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
  {Array.from({ length: 6 }, (_, i) => <Mesa key={i} />)}
</div>
```

## API

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `className` | `string` | No | Clase extra para posicionar la mesa en un layout externo. |

## Stories

- **Default** — una única mesa.
- **SeisMesas** — rejilla 3×2 que demuestra la premisa del monitor de 27".
