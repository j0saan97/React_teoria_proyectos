import "./jugador.css";

export interface JugadorProps {
  /** Nombre visible del jugador. */
  nombre: string;
  /** Fichas / dinero del jugador en la mesa (en dólares). */
  dineroEnMesa: number;
  /**
   * Imagen que ocupa el hueco del jugador. Normalmente su foto de perfil,
   * pero ese mismo espacio servirá más adelante para mostrar sus cartas.
   */
  imagenPerfil: string;
  /** Time bank del jugador: el numerito que aparece a la izquierda. */
  timeBank: number;
  /** Código ISO 3166-1 alpha-2 del país, ej. "gb", "es". */
  pais: string;
}

const formateaDinero = (cantidad: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cantidad);

export function Jugador({
  nombre,
  dineroEnMesa,
  imagenPerfil,
  timeBank,
  pais,
}: JugadorProps) {
  return (
    <div className="jugador">
      <div className="jugador__hueco">
        <img className="jugador__imagen" src={imagenPerfil} alt={nombre} />

        <span className="jugador__timebank" title="Time bank">
          {timeBank}
        </span>

        {pais && (
          <span className="jugador__bandera">
            <img
              src={`https://flagcdn.com/${pais.toLowerCase()}.svg`}
              alt={pais}
            />
          </span>
        )}
      </div>

      <div className="jugador__info">
        <span className="jugador__nombre">{nombre}</span>
        <span className="jugador__dinero">{formateaDinero(dineroEnMesa)}</span>
      </div>
    </div>
  );
}

export default Jugador;
