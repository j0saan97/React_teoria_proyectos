import type { Meta, StoryObj } from "@storybook/react-vite";
import { FooterBasico } from "./footer_basico";

const meta = {
  title: "Footer/FooterBasico",
  component: FooterBasico,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterBasico>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    empresa: "Mi Empresa",
    email: "contacto@miempresa.com",
    telefono: "+34 600 123 456",
    whatsapp: "34600123456",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    direccion: "Puerta del Sol, Madrid, España",
  },
};
