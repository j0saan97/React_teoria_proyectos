import "./timebank_holdem.css";

const formatSegundos = (totalSegundos: number) =>
  Math.max(0, Math.floor(totalSegundos));

export interface TimebankHoldemProps {
  /** Segundos restantes que se muestran en el display. */
  segundos: number;
  /** Time bank extra disponible (el badge "+Ns"). 0 lo oculta. */
  extraTimebank?: number;
  /** El contador en curso es el tiempo extra: display en rojo + etiqueta. */
  enExtra?: boolean;
  /** Muestra el aviso "Siguiente turno" ocupando toda la tarjeta. */
  avisoFinTurno?: boolean;
}

/**
 * Timebank de mesa de cash game. Componente **presentacional**: solo pinta
 * lo que recibe por props. La cuenta atrás, la fase extra y el aviso de fin
 * de turno se manejan fuera (ver el hook `useTimebankHoldem`), igual que la
 * "programación" del tiempo.
 */
export function TimebankHoldem({
  segundos,
  extraTimebank = 30,
  enExtra = false,
  avisoFinTurno = false,
}: TimebankHoldemProps) {
  return (
    <div className="timebank-holdem">
      <div className="timebank-holdem__header">
        <span className="timebank-holdem__title">TIMEBANK</span>
        {extraTimebank > 0 && (
          <span
            className="timebank-holdem__extra-badge"
            title="Timebank extra disponible"
            aria-label={`Timebank extra: ${extraTimebank} segundos`}
          >
            +{extraTimebank}s
          </span>
        )}
      </div>

      <div
        className={
          "timebank-holdem__display" +
          (enExtra ? " timebank-holdem__display--extra" : "")
        }
      >
        {formatSegundos(segundos)}
      </div>

      {enExtra && (
        <div className="timebank-holdem__extra-label">
          TIME EXTRA · {extraTimebank}s
        </div>
      )}

      {avisoFinTurno && (
        <div className="timebank-holdem__toast" role="status">
          Siguiente turno
        </div>
      )}
    </div>
  );
}

export default TimebankHoldem;
