import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimebankHoldem } from "./timebank_holdem";

const meta = {
  title: "Poker/TimebankHoldem",
  component: TimebankHoldem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    extraTimebank: {
      control: { type: "number", min: 0 },
      description:
        "Segundos del contador extra que arranca al agotarse el timebank principal.",
    },
  },
} satisfies Meta<typeof TimebankHoldem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titulo: "TIMEBANK - CASH GAME",
    extraTimebank: 30,
  },
};

export const ExtraCorto: Story = {
  args: {
    titulo: "TIMEBANK - TORNEO",
    extraTimebank: 10,
  },
};

export const SinExtra: Story = {
  args: {
    titulo: "TIMEBANK - SIN EXTRA",
    extraTimebank: 0,
  },
};
