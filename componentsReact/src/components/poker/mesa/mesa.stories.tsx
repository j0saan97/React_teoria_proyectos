import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mesa } from "./mesa";

const meta = {
  title: "Poker/Mesa",
  component: Mesa,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", background: "#0f0f0f", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Mesa>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Demostración de la premisa: 6 mesas en una rejilla 3x2 (monitor de 27"). */
export const SeisMesas: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px",
        overflow: "auto",
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Mesa key={i} />
      ))}
    </div>
  ),
};
