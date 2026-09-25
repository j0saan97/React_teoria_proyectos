import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton } from "./dropdown-button";

const meta = {
  title: "Buttons/DropdownButton",
  component: DropdownButton,
  tags: ["autodocs"],
  args: {
    label: "Opciones",
    opciones: [{ label: "Editar" }, { label: "Duplicar" }, { label: "Compartir" }, { label: "Ir a la web", href: "#" }],
  },
  decorators: [(Story) => <div style={{ minHeight: "14rem" }}><Story /></div>],
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solido: Story = { args: { estilo: "solido" } };

export const Contorno: Story = { args: { estilo: "contorno" } };

export const Degradado: Story = { args: { estilo: "degradado" } };

/** Los tres estilos juntos para compararlos. */
export const LosTres: Story = {
  render: (args) => (
    <div className="d-flex flex-wrap gap-3">
      <DropdownButton {...args} estilo="solido" label="Sólido" />
      <DropdownButton {...args} estilo="contorno" label="Contorno" />
      <DropdownButton {...args} estilo="degradado" label="Degradado" />
    </div>
  ),
};
