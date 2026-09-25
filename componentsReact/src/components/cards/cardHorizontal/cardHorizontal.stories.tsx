import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardHorizontal } from "./cardHorizontal";

const meta = {
  title: "Cards/CardHorizontal",
  component: CardHorizontal,
  tags: ["autodocs"],
  args: {
    titulo: "Card title",
    texto: "This is a wider card with supporting text below as a natural lead-in to additional content.",
    nota: "Last updated 3 mins ago",
    variant: "dark",
  },
} satisfies Meta<typeof CardHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Réplica del ejemplo "Horizontal" de Bootstrap. */
export const Default: Story = {};

export const Clara: Story = { args: { variant: "light" } };

export const ConImagenYBoton: Story = {
  args: {
    imagen: "https://picsum.photos/id/1025/600/600",
    alt: "Perro con manta",
    boton: { label: "Ver más", href: "#" },
  },
};

/** Lista de cards a ancho completo; en móvil la imagen pasa arriba. */
export const Lista: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="d-flex flex-column gap-3">
      {[1, 2, 3].map((n) => (
        <CardHorizontal {...args} key={n} titulo={`Card ${n}`} ancho="100%" imagen={`https://picsum.photos/id/${1040 + n}/600/600`} />
      ))}
    </div>
  ),
};
