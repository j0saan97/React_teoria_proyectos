# Jugador

Ficha de un jugador con el aspecto del asiento de **GG Poker**: hueco con la
foto (o, más adelante, sus cartas), time bank a la izquierda, bandera del
país a la derecha y una placa con el nombre y el dinero en mesa.

> Modelo visual: captura de un asiento de GG Poker aportada en el chat
> (asiento granate redondeado, "20" en un círculo oscuro a la izquierda,
> bandera a la derecha, nombre y `$10,000` en verde debajo).

---

## Especificaciones recibidas

Propiedades del jugador:

1. **`nombre`** — nombre visible.
2. **`dineroEnMesa`** — fichas / dinero del jugador en la mesa.
3. **`imagenPerfil`** — la imagen del hueco (la de la referencia).
4. **`timeBank`** — el numerito que aparece a la izquierda (el "20" de la
   imagen); es el time bank que tiene configurado cada jugador.
5. **`pais`** — bandera del país, en el lado derecho, a la misma altura que
   el time bank pero a la derecha.

Consideraciones:

- El hueco de la imagen **podrá mostrar la foto del jugador o sus cartas**.
  Eso todavía no se implementa, pero el espacio ya está preparado para
  ambos casos.
- **Responsive**, con los elementos indispensables y limpio.

Dudas resueltas:

- **¿Es responsive?** Sí: es fluido (`width: 100%`) y escala desde fuera con
  la variable CSS `--jugador-ancho`.
- **Colocar 6 o 9 jugadores en posiciones exactas** NO es cosa de este
  componente: va en un componente `Mesa` que posiciona cada `<Jugador />`
  en su asiento.

---

## Cómo está diseñado

### Estructura

```
.jugador                       → contenedor fluido (max-width: var(--jugador-ancho, 150px))
├── .jugador__hueco            → marco "asiento" granate (position: relative)
│   ├── .jugador__imagen       → foto / cartas (object-fit: cover)
│   ├── .jugador__timebank     → círculo oscuro, esquina inferior izquierda, "20"
│   └── .jugador__bandera      → bandera, esquina inferior derecha (misma altura)
└── .jugador__info             → placa oscura
    ├── .jugador__nombre       → nombre (truncado con "…" si no cabe)
    └── .jugador__dinero       → dinero formateado, verde GG
```

### Detalles

| Elemento | Decisión de diseño |
| --- | --- |
| `.jugador__hueco` | `aspect-ratio: 4 / 3` para que el espacio de la imagen sea estable tanto si muestra la foto como las cartas. Marco granate (`#7a2f2f`) con `border-radius` mayor arriba que abajo, imitando el asiento. |
| `.jugador__imagen` | `object-fit: cover` + `width/height: 100%`: rellena el hueco sin deformarse. |
| `.jugador__timebank` / `.jugador__bandera` | `position: absolute` en las esquinas inferiores del hueco, con `z-index` por encima de la placa; solapan ligeramente la placa de info (como en la referencia). La bandera se renderiza solo si `pais` tiene valor. |
| Bandera | Se pinta con `https://flagcdn.com/{pais}.svg` a partir del código ISO 3166-1 alpha-2. |
| `.jugador__dinero` | `Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })` → `$10,000`. Color verde `#37d67a` estilo GG. |
| `.jugador__nombre` | `white-space: nowrap` + `text-overflow: ellipsis` para nombres largos. |

### Responsive

- `width: 100%` y `max-width: var(--jugador-ancho, 150px)`: el contenedor
  (la mesa) puede escalar **todos los asientos a la vez** cambiando esa
  variable, p. ej.:

  ```css
  .mesa { --jugador-ancho: clamp(90px, 12vw, 150px); }
  ```

- El resto de medidas (`rem`, `%`, `aspect-ratio`) acompañan al ancho.
- El componente **no se posiciona a sí mismo**: eso es responsabilidad del
  contenedor.

---

## Uso

```tsx
import { Jugador } from "./jugador";

<Jugador
  nombre="Dex_0"
  dineroEnMesa={10000}
  imagenPerfil="https://i.pravatar.cc/200?img=12"
  timeBank={20}
  pais="gb"
/>
```

## API

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `nombre` | `string` | Sí | Nombre visible del jugador. |
| `dineroEnMesa` | `number` | Sí | Dinero en mesa (USD); se formatea como `$10,000`. |
| `imagenPerfil` | `string` | Sí | URL de la imagen del hueco (foto o, en el futuro, cartas). |
| `timeBank` | `number` | Sí | Time bank del jugador: el numerito de la izquierda. |
| `pais` | `string` | Sí | Código ISO 3166-1 alpha-2 (`"gb"`, `"es"`…). Vacío = sin bandera. |

## Stories

- **Default** — Dex_0 / `$10,000` / GB / time bank 20.
- **NombreLargo** — comprueba el truncado del nombre y un importe grande.
- **SinFichas** — `dineroEnMesa: 0`.
