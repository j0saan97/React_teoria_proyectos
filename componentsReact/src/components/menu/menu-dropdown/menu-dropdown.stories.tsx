import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuDropdown } from "./menu-dropdown";
import logo from "../logo-ejemplo.svg";

const meta = {
  title: "Menu/MenuDropdown",
  component: MenuDropdown,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    brand: "Empresa S.L.",
    logo,
    items: [
      { label: "Inicio", href: "#inicio" },
      {
        label: "Servicios",
        children: [
          { label: "Consultoría", href: "#consultoria" },
          { label: "Desarrollo web", href: "#desarrollo" },
          { label: "Marketing digital", href: "#marketing" },
        ],
      },
      {
        label: "Empresa",
        children: [
          { label: "Nosotros", href: "#nosotros" },
          { label: "Equipo", href: "#equipo" },
          { label: "Trabaja con nosotros", href: "#empleo" },
        ],
      },
      {
        label: "Recursos",
        children: [
          { label: "Blog", href: "#blog" },
          { label: "Casos de éxito", href: "#casos" },
          { label: "Preguntas frecuentes", href: "#faq" },
        ],
      },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  decorators: [(Story) => <div style={{ minHeight: "60vh" }}><Story /></div>],
} satisfies Meta<typeof MenuDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Oscuro: Story = { args: { variant: "dark" } };

export const ColorPersonalizado: Story = { args: { hoverColor: "#198754" } };
