import "./mesa.css";

export interface MesaProps {
  /** Clase extra para colocar la mesa dentro de una rejilla o layout. */
  className?: string;
}

/**
 * Mesa de póker vacía: solo el tapete y el raíl, con el aspecto de la sala
 * de GG Poker de la imagen de referencia. No contiene jugadores, time bank
 * ni ningún otro elemento.
 *
 * Responsive: crece con su contenedor (`width: 100%`) y se adapta al espacio
 * disponible (p. ej. en un monitor de 40"), pero nunca baja de
 * `--mesa-min-width` (820px), el ancho con el que caben 6 mesas en una
 * rejilla de 3x2 sobre un monitor de 27" (~2560px de ancho CSS).
 */
export function Mesa({ className }: MesaProps) {
  return (
    <div
      className={className ? `mesa ${className}` : "mesa"}
      role="img"
      aria-label="Mesa de póker"
    >
      <div className="mesa__tapete">
        <span className="mesa__logo" aria-hidden="true">
          <span className="mesa__logo-gg">GG</span>
          <span className="mesa__logo-poker">POKER</span>
        </span>
      </div>
    </div>
  );
}

export default Mesa;
