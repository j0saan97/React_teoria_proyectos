import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { AcordeonHorizontal } from "./acordeonHorizontal";

const cuerpo = (n: string) => (
  <>
    <strong>This is the {n} item’s accordion body.</strong> These classes control the overall appearance, as well as the
    showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
    It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>.
  </>
);

const meta = {
  title: "Acordeon/AcordeonHorizontal",
  component: AcordeonHorizontal,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    items: [
      { titulo: "Accordion Item #1", contenido: cuerpo("first") },
      { titulo: "Accordion Item #2", contenido: cuerpo("second") },
      { titulo: "Accordion Item #3", contenido: cuerpo("third") },
    ],
  },
} satisfies Meta<typeof AcordeonHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Como la captura de referencia: tema oscuro. */
export const Oscuro: Story = {
  args: { variant: "dark" },
  decorators: [(Story) => <div data-bs-theme="dark" className="bg-body p-4"><Story /></div>],
};

export const TodosCerrados: Story = { args: { abiertoInicial: null } };
