import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { AcordeonBasico } from "./acordeon-basico";

const cuerpo = (n: string, estado: string) => (
  <>
    <strong>This is the {n} item’s accordion body.</strong> It is {estado} by default, until the collapse plugin adds the
    appropriate classes that we use to style each element. These classes control the overall appearance, as well as the
    showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
    It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition
    does limit overflow.
  </>
);

const meta = {
  title: "Acordeon/AcordeonBasico",
  component: AcordeonBasico,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    items: [
      { titulo: "Accordion Item #1", contenido: cuerpo("first", "shown") },
      { titulo: "Accordion Item #2", contenido: cuerpo("second", "hidden") },
      { titulo: "Accordion Item #3", contenido: cuerpo("third", "hidden") },
    ],
  },
} satisfies Meta<typeof AcordeonBasico>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Réplica del ejemplo de Bootstrap: solo uno abierto a la vez. */
export const Default: Story = {};

export const Oscuro: Story = { args: { variant: "dark" } };

/** Abrir uno no cierra los demás. */
export const VariosAbiertos: Story = { args: { variosAbiertos: true } };

/** Sin bordes exteriores, todos cerrados al inicio. */
export const Flush: Story = { args: { flush: true, abiertosInicial: [] } };
