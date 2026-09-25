import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardBasica } from "./card-basica";

const meta = {
  title: "Cards/CardBasica",
  component: CardBasica,
  tags: ["autodocs"],
  args: {
    titulo: "Card title",
    texto: "Some quick example text to build on the card title and make up the bulk of the card’s content.",
    boton: { label: "Go somewhere", href: "#" },
    variant: "dark",
  },
} satisfies Meta<typeof CardBasica>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Réplica del ejemplo de Bootstrap. */
export const Default: Story = {};

export const Clara: Story = { args: { variant: "light" } };

export const ConImagen: Story = {
  args: {
    imagen: "https://picsum.photos/id/1015/600/400",
    alt: "Río entre montañas",
  },
};

/** Varias cards en una rejilla responsive de Bootstrap: 1 columna en móvil, hasta 4 en pantallas grandes. */
export const Rejilla: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-4">
      {[1, 2, 3, 4].map((n) => (
        <div className="col" key={n}>
          <CardBasica {...args} titulo={`Card ${n}`} ancho="100%" imagen={`https://picsum.photos/id/${1010 + n}/600/400`} />
        </div>
      ))}
    </div>
  ),
};
