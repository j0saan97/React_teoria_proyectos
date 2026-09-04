import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimebankHoldem } from "./timebank_holdem";
import { useTimebankHoldem } from "./useTimebankHoldem";

const meta = {
  title: "Poker/TimebankHoldem",
  component: TimebankHoldem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    segundos: { control: { type: "number", min: 0 } },
    extraTimebank: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof TimebankHoldem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* --- Estados estáticos: el componente solo pinta lo que recibe --- */

export const EnCurso: Story = {
  args: {
    segundos: 12,
    extraTimebank: 30,
    enExtra: false,
    avisoFinTurno: false,
  },
};

export const TiempoExtra: Story = {
  args: {
    segundos: 22,
    extraTimebank: 30,
    enExtra: true,
    avisoFinTurno: false,
  },
};

export const FinDeTurno: Story = {
  args: {
    segundos: 0,
    extraTimebank: 30,
    enExtra: false,
    avisoFinTurno: true,
  },
};

/* --- Demo funcional: la "programación" del tiempo vive FUERA del componente --- */

function DemoConControles({ extraTimebank = 30 }: { extraTimebank?: number }) {
  const { segundos, enExtra, avisoFinTurno, programar, reiniciar } =
    useTimebankHoldem({ extraTimebank });
  const [valor, setValor] = useState(16);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: 320,
      }}
    >
      <TimebankHoldem
        segundos={segundos}
        extraTimebank={extraTimebank}
        enExtra={enExtra}
        avisoFinTurno={avisoFinTurno}
      />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="number"
          min={1}
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          aria-label="Segundos a programar"
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button
          type="button"
          onClick={() => programar(valor)}
          style={{ padding: "0.5rem 1rem" }}
        >
          Programar
        </button>
        <button
          type="button"
          onClick={reiniciar}
          style={{ padding: "0.5rem 1rem" }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export const ConControlesExternos: Story = {
  args: { segundos: 0 },
  render: () => <DemoConControles extraTimebank={30} />,
};
