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

export interface TimebankHoldemProps {
  titulo?: string;
}

export function TimebankHoldem({ titulo = "TIMEBANK" }: TimebankHoldemProps) {
  const [segundosInput, setSegundosInput] = useState(15);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    if (!activo) return;
    if (segundosRestantes <= 0) {
      setActivo(false);
      return;
    }
    const id = setTimeout(() => setSegundosRestantes((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [activo, segundosRestantes]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSegundosInput(Number(e.target.value));
  };

  const handleProgramar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (segundosInput <= 0) return;
    setSegundosRestantes(segundosInput);
    setActivo(true);
  };

  return (
    <div className="timebank-holdem">
      <div className="timebank-holdem__header">{titulo}</div>

      <div className="timebank-holdem__display">
        {formatTiempo(segundosRestantes)}
      </div>

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
    </div>
  );
}

export default TimebankHoldem;
