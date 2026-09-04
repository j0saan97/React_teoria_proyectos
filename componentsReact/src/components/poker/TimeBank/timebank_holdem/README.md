# TimebankHoldem

Reloj de **time bank** para mesas de cash game. Muestra la cuenta atrás como
**segundos totales restantes** (un número, sin `HH:MM:SS`, para que el
componente sea lo más pequeño posible), un badge con el time bank extra
disponible, la variante de tiempo extra y un aviso de fin de turno.

Es un **componente presentacional**: solo pinta lo que recibe por props. La
lógica (cuenta atrás, salto al tiempo extra, aviso) y la **programación del
tiempo** viven fuera —en el hook `useTimebankHoldem` o en quien lo use—.

> Modelo visual: reloj de timebank de una mesa de cash game (cabecera verde,
> dígitos monoespaciados con glow sobre fondo negro).

---

## Especificaciones recibidas

1. **Base:** reloj de time bank de mesa de cash game con la cuenta atrás en
   grande.
2. **`extraTimebank`:** al acabarse el time bank arranca automáticamente un
   contador nuevo con **30 segundos** (valor por defecto, configurable).
3. **Visualización del extra:** un **pequeño número** (badge `+30s`) que
   indica el time bank extra disponible.
4. **Aviso de fin:** al acabar el time bank sin extra sale un *toast*
   **"Siguiente turno"**. Con extra, lo mismo cuando el extra termina.
5. **Toast limpio:** el aviso **ocupa exactamente la misma área que el
   componente**, no es un aviso flotante suelto.
6. **La programación del tiempo va FUERA del componente.** El componente
   final es un timebank limpio, sin formulario ni estado propio.

---

## Arquitectura

```
useTimebankHoldem(hook)            <TimebankHoldem /> (presentacional)
─────────────────────             ──────────────────────────────────
segundos            ───────────▶  segundos      → número de segundos restantes
enExtra             ───────────▶  enExtra       → display rojo + etiqueta
avisoFinTurno       ───────────▶  avisoFinTurno → overlay "Siguiente turno"
programar(s)  ◀── input / juego / valor fijo
```

- **`timebank_holdem.tsx`** — render puro. Sin `useState` / `useEffect`.
- **`useTimebankHoldem.ts`** — `setTimeout` de 1 s, transición a fase extra,
  auto-ocultado del aviso (3 s). Expone `{ segundos, enExtra, avisoFinTurno,
  programar, reiniciar }`.
- **La "programación"** (elegir los segundos y lanzar la cuenta) la hace
  quien consume el hook: un `<input>` propio, un valor fijo, el motor del
  juego… En Storybook lo hace la story `ConControlesExternos`.

### Máquina de estados (dentro del hook)

```
idle ──programar(s)──▶ principal ──llega a 0──┬─ extraTimebank > 0 ─▶ extra ──llega a 0─▶ idle + aviso
                                              └─ sin extra ────────────────────────────▶ idle + aviso
```

La rama que vuelve a `idle` es la única en la que el turno termina de
verdad → ahí se muestra el aviso y se llama a `onFinTurno`. Cubre los dos
casos del requisito 4.

### El aviso ocupa la misma área (requisito 5)

- `.timebank-holdem` es `position: relative` con `overflow: hidden`.
- `.timebank-holdem__toast` es `position: absolute; inset: 0` → cubre
  exactamente la tarjeta, recortado a sus bordes redondeados, `z-index: 10`,
  fondo casi opaco y *fade-in* de 0.2 s.

### Tamaño

- `width: 100%` con tope `max-width: 180px` (el número en segundos permite
  una tarjeta mucho más estrecha que el formato `HH:MM:SS`).
- Número con `font-size: 2.25rem`, `line-height: 1` y `tabular-nums`.

---

## Uso

### Con el hook (recomendado)

```tsx
import { TimebankHoldem } from "./timebank_holdem";
import { useTimebankHoldem } from "./useTimebankHoldem";

function AsientoConTimebank() {
  const { segundos, enExtra, avisoFinTurno, programar } = useTimebankHoldem({
    extraTimebank: 30,
    onFinTurno: () => console.log("siguiente turno"),
  });

  return (
    <>
      <TimebankHoldem
        segundos={segundos}
        extraTimebank={30}
        enExtra={enExtra}
        avisoFinTurno={avisoFinTurno}
      />
      {/* la programación del tiempo vive aquí, fuera del componente */}
      <button onClick={() => programar(16)}>Programar 16 s</button>
    </>
  );
}
```

### Solo presentacional (estado controlado por ti)

```tsx
<TimebankHoldem segundos={12} extraTimebank={30} enExtra={false} avisoFinTurno={false} />
```

## API

### `<TimebankHoldem />`

La cabecera muestra siempre el texto fijo `TIMEBANK`.

| Prop | Tipo | Defecto | Descripción |
| --- | --- | --- | --- |
| `segundos` | `number` | — (requerido) | Segundos restantes que se muestran. |
| `extraTimebank` | `number` | `30` | Valor del badge `+Ns`. `0` lo oculta. |
| `enExtra` | `boolean` | `false` | Pinta el display en rojo y muestra la etiqueta de tiempo extra. |
| `avisoFinTurno` | `boolean` | `false` | Muestra el overlay "Siguiente turno". |

### `useTimebankHoldem(options)`

| Opción | Tipo | Defecto | Descripción |
| --- | --- | --- | --- |
| `extraTimebank` | `number` | `30` | Segundos del contador extra. `0` = sin extra. |
| `onFinTurno` | `() => void` | — | Callback al terminar el turno. |

Devuelve: `{ segundos, enExtra, avisoFinTurno, programar(s), reiniciar() }`.

## Stories

- **EnCurso** — estado estático, cuenta en marcha.
- **TiempoExtra** — estado estático, fase extra (display rojo + etiqueta).
- **FinDeTurno** — estado estático, overlay "Siguiente turno".
- **ConControlesExternos** — demo funcional con el hook; el input y el botón
  "Programar" están **fuera** del componente.
