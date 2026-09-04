import type { Meta, StoryObj } from "@storybook/react-vite";
import { Jugador } from "./jugador";

const meta = {
  title: "Poker/Jugador",
  component: Jugador,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    timeBank: { control: { type: "number", min: 0 } },
    dineroEnMesa: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof Jugador>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nombre: "Dex_0",
    dineroEnMesa: 10000,
    imagenPerfil: "https://i.pravatar.cc/200?img=12",
    timeBank: 20,
    pais: "gb",
  },
};

export const NombreLargo: Story = {
  args: {
    ...Default.args,
    nombre: "JugadorConNombreMuyLargo",
    dineroEnMesa: 1250000,
    pais: "es",
  },
};

export const SinFichas: Story = {
  args: {
    ...Default.args,
    nombre: "AllInKid",
    dineroEnMesa: 0,
    timeBank: 8,
    pais: "us",
  },
};
