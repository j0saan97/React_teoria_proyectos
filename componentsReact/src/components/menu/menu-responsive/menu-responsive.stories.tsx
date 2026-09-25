import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuResponsive } from "./menu-responsive";
import logo from "../logo-ejemplo.svg";

const meta = {
  title: "Menu/MenuResponsive",
  component: MenuResponsive,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    brand: "Empresa S.L.",
    logo,
    items: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Proyectos", href: "#proyectos" },
    ],
    cta: { label: "Contacto", href: "#contacto" },
  },
} satisfies Meta<typeof MenuResponsive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Oscuro: Story = { args: { variant: "dark" } };

export const SinBotonContacto: Story = { args: { cta: undefined } };
