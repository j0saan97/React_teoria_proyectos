import type { Meta, StoryObj } from "@storybook/react-vite";
import "bootstrap/dist/css/bootstrap.min.css";
import { VisualizadorReseñas } from "./visualizadorReseñas";

const meta = {
  title: "Reseñas/VisualizadorReseñas",
  component: VisualizadorReseñas,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    reseñas: [
      { autor: "María López", puntuacion: 5, fecha: "hace 2 semanas", texto: "Atención de 10. Resolvieron todas mis dudas y el proyecto se entregó antes de lo previsto." },
      { autor: "Javier Ruiz", puntuacion: 5, fecha: "hace 1 mes", texto: "Muy profesionales. La web quedó exactamente como la imaginábamos y el soporte posterior es excelente." },
      { autor: "Laura Martín", puntuacion: 4, fecha: "hace 1 mes", texto: "Buen trabajo en general. Algún pequeño retraso, pero la comunicación fue clara en todo momento." },
      { autor: "Carlos Gómez", puntuacion: 5, fecha: "hace 3 meses", texto: "Repetiremos seguro. Precio justo, equipo cercano y resultados que se notan desde el primer mes." },
      { autor: "Ana Torres", puntuacion: 5, fecha: "hace 4 meses", texto: "Nos ayudaron a digitalizar todo el negocio. Muy recomendables para pymes que empiezan en lo online." },
      { autor: "Pedro Sánchez", puntuacion: 3, fecha: "hace 6 meses", texto: "Correcto. Cumplieron con lo acordado, aunque esperaba algo más de iniciativa en el diseño." },
    ],
  },
  decorators: [(Story) => <div className="bg-body-tertiary py-5"><Story /></div>],
} satisfies Meta<typeof VisualizadorReseñas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rapido: Story = { args: { duracion: 15 } };
