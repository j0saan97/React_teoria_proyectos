import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./timebank_holdem.css";

function formatTiempo(totalSegundos: number) {
  const h = Math.floor(totalSegundos / 3600);
  const m = Math.floor((totalSegundos % 3600) / 60);
  const s = totalSegundos % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

type Fase = "idle" | "principal" | "extra";

export interface TimebankHoldemProps {
  titulo?: string;
  /**
   * Segundos del contador extra que arranca automáticamente al agotarse el
   * timebank principal. Por defecto 30, pero se puede modificar.
   */
  extraTimebank?: number;
}

export function TimebankHoldem({
  titulo = "TIMEBANK",
  extraTimebank = 30,
}: TimebankHoldemProps) {
  const [segundosInput, setSegundosInput] = useState(15);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [fase, setFase] = useState<Fase>("idle");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (fase === "idle") return;

    if (segundosRestantes <= 0) {
      // Al agotarse el timebank principal, se inicia un contador extra.
      if (fase === "principal" && extraTimebank > 0) {
        setFase("extra");
        setSegundosRestantes(extraTimebank);
      } else {
        // Se acabó el timebank (sin extra, o el extra ya ha terminado).
        setFase("idle");
        setToastVisible(true);
      }
      return;
    }

    const id = setTimeout(() => setSegundosRestantes((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [fase, segundosRestantes, extraTimebank]);

  useEffect(() => {
    if (!toastVisible) return;
    const id = setTimeout(() => setToastVisible(false), 3000);
    return () => clearTimeout(id);
  }, [toastVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSegundosInput(Number(e.target.value));
  };

  const handleProgramar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (segundosInput <= 0) return;
    setToastVisible(false);
    setSegundosRestantes(segundosInput);
    setFase("principal");
  };

  return (
    <div className="timebank-holdem">
      <div className="timebank-holdem__header">
        <span className="timebank-holdem__title">{titulo}</span>
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
          (fase === "extra" ? " timebank-holdem__display--extra" : "")
        }
      >
        {formatTiempo(segundosRestantes)}
      </div>

      {fase === "extra" && (
        <div className="timebank-holdem__extra-label">
          TIME EXTRA · {extraTimebank}s
        </div>
      )}

      <form className="timebank-holdem__form" onSubmit={handleProgramar}>
        <input
          className="timebank-holdem__input"
          type="number"
          min={1}
          value={segundosInput}
          onChange={handleInputChange}
          aria-label="Segundos a programar"
        />
        <button type="submit" className="timebank-holdem__button">
          Programar
        </button>
      </form>

      {toastVisible && (
        <div className="timebank-holdem__toast" role="status">
          Siguiente turno
        </div>
      )}
    </div>
  );
}

export default TimebankHoldem;
