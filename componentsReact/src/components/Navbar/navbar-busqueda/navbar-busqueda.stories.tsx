import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarBusqueda } from "./navbar-busqueda";
import logo from "../../menu/logo-ejemplo.svg";

const meta = {
  title: "Navbar/NavbarBusqueda",
  component: NavbarBusqueda,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    brand: "Empresa S.L.",
    logo,
    placeholder: "Buscar en la web",
    items: [
      { label: "Inicio", href: "#inicio", activo: true },
      {
        label: "Servicios",
        children: [
          { label: "Consultoría", href: "#consultoria" },
          { label: "Desarrollo web", href: "#desarrollo" },
          { label: "Marketing digital", href: "#marketing" },
          "separador",
          { label: "Todos los servicios", href: "#servicios" },
        ],
      },
      {
        label: "Proyectos",
        children: [
          { label: "Proyectos destacados", href: "#destacados" },
          { label: "Casos de éxito", href: "#casos" },
          "separador",
          { label: "Todos los proyectos", href: "#proyectos" },
        ],
      },
      { label: "Conócenos", href: "#conocenos" },
      { label: "Contacto", href: "#contacto" },
    ],
    onSearch: (texto) => console.log("Buscar:", texto),
  },
  decorators: [(Story) => <div style={{ minHeight: "18rem" }}><Story /></div>],
} satisfies Meta<typeof NavbarBusqueda>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Aspecto del ejemplo de Bootstrap. */
export const Clasico: Story = { args: { estilo: "clasico" } };

export const Moderno: Story = { args: { estilo: "moderno" } };

export const Oscuro: Story = { args: { estilo: "oscuro" } };
