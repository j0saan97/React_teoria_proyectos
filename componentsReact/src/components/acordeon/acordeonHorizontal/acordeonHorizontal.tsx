import { useId, useState, type CSSProperties, type ReactNode } from "react";
import "./acordeonHorizontal.css";

export interface AcordeonHorizontalItem {
  titulo: ReactNode;
  contenido: ReactNode;
}

export interface AcordeonHorizontalProps {
  items: AcordeonHorizontalItem[];
  /** Índice abierto al cargar. Por defecto el primero; `null` = todos cerrados. */
  abiertoInicial?: number | null;
  /** Ancho de la columna de botones. Por defecto 18rem. */
  anchoBotones?: string;
  /** Ancho máximo del texto expandido. Por defecto 32rem. */
  anchoTexto?: string;
  variant?: "light" | "dark";
}

/**
 * Acordeón de Bootstrap 5 con los botones en filas y el contenido abierto a su derecha.
 * En móvil (< 768px) el contenido se abre debajo del botón, como un acordeón normal.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function AcordeonHorizontal({ items, abiertoInicial = 0, anchoBotones = "18rem", anchoTexto = "32rem", variant = "light" }: AcordeonHorizontalProps) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  // Último abierto: su texto se sigue viendo mientras el panel se cierra.
  const [mostrado, setMostrado] = useState(abiertoInicial ?? 0);
  const id = useId();

  const alternar = (i: number) => {
    setAbierto(i === abierto ? null : i);
    setMostrado(i);
  };

  return (
    <div className="acordeon-horizontal d-md-flex align-items-stretch" data-bs-theme={variant} style={{ "--ancho-botones": anchoBotones } as CSSProperties}>
      <div className="accordion flex-shrink-0">
        {items.map(({ titulo, contenido }, i) => (
          <div className="accordion-item" key={i}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${i === abierto ? "" : "collapsed"}`}
                type="button"
                aria-expanded={i === abierto}
                aria-controls={id}
                onClick={() => alternar(i)}
              >
                {titulo}
              </button>
            </h2>
            {/* Solo móvil: contenido debajo del botón. */}
            <div className="acordeon-horizontal__abrir d-md-none" data-abierto={i === abierto}>
              <div className="overflow-hidden">
                <div className="accordion-body">{contenido}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Escritorio: panel a la derecha que se expande en ancho. */}
      <div id={id} className="acordeon-horizontal__abrir acordeon-horizontal__lateral d-none d-md-grid" data-abierto={abierto !== null} inert={abierto === null}>
        <div className="overflow-hidden">
          <div className="h-100 px-4 py-3 overflow-auto border rounded bg-body text-body ms-3" style={{ width: `min(${anchoTexto}, 60vw)` }}>
            {items[mostrado]?.contenido}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcordeonHorizontal;
