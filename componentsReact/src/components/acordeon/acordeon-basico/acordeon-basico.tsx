import { useId, useState, type ReactNode } from "react";

export interface AcordeonItem {
  titulo: ReactNode;
  contenido: ReactNode;
}

export interface AcordeonBasicoProps {
  items: AcordeonItem[];
  /** Índices abiertos al cargar. Por defecto el primero. */
  abiertosInicial?: number[];
  /** Si es `true`, abrir uno no cierra los demás ("always open" de Bootstrap). */
  variosAbiertos?: boolean;
  /** Sin bordes ni fondo exterior ("flush" de Bootstrap). */
  flush?: boolean;
  variant?: "light" | "dark";
}

/**
 * Acordeón de Bootstrap 5 controlado con React (no necesita el JS de Bootstrap).
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function AcordeonBasico({ items, abiertosInicial = [0], variosAbiertos = false, flush = false, variant = "light" }: AcordeonBasicoProps) {
  const [abiertos, setAbiertos] = useState(abiertosInicial);
  const id = useId();

  const alternar = (i: number) =>
    setAbiertos(abiertos.includes(i) ? abiertos.filter((a) => a !== i) : variosAbiertos ? [...abiertos, i] : [i]);

  return (
    <div className={`accordion ${flush ? "accordion-flush" : ""}`} data-bs-theme={variant}>
      {items.map(({ titulo, contenido }, i) => {
        const abierto = abiertos.includes(i);
        return (
          <div className="accordion-item" key={i}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${abierto ? "" : "collapsed"}`}
                type="button"
                aria-expanded={abierto}
                aria-controls={`${id}-${i}`}
                onClick={() => alternar(i)}
              >
                {titulo}
              </button>
            </h2>
            {/* Animación de apertura con grid (0fr → 1fr), sin medir alturas con JS. */}
            <div
              id={`${id}-${i}`}
              className="accordion-collapse"
              inert={!abierto}
              style={{ display: "grid", gridTemplateRows: abierto ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}
            >
              <div className="overflow-hidden">
                <div className="accordion-body">{contenido}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AcordeonBasico;
