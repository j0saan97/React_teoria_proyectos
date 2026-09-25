import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectorPais } from "./SelectorPais";
import { buscarPais } from "./paises";

const meta = {
  title: "Selectores/SelectorPais",
  component: SelectorPais,
  tags: ["autodocs"],
  args: { id: "pais", modo: "pais", value: "es", onChange: () => {} },
  // El componente es controlado: la story guarda el país elegido en un estado.
  render: function Render(args) {
    const [codigo, setCodigo] = useState(args.value);
    const pais = buscarPais(codigo);
    return (
      <div style={{ width: args.modo === "pais" ? "20rem" : "8rem", minHeight: "22rem", fontFamily: "system-ui, sans-serif" }}>
        <SelectorPais {...args} value={codigo} onChange={setCodigo} />
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666", whiteSpace: "nowrap" }}>
          Elegido: <code>{codigo}</code> · {pais?.nombre} · {pais?.prefijo}
        </p>
      </div>
    );
  },
} satisfies Meta<typeof SelectorPais>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bandera + nombre del país. */
export const Pais: Story = {};

/** Bandera + prefijo telefónico, para ponerlo delante de un campo de teléfono. */
export const Prefijo: Story = { args: { id: "prefijo", modo: "prefijo", "aria-label": "Prefijo telefónico" } };

export const EmpiezaEnMexico: Story = { args: { value: "mx" } };
