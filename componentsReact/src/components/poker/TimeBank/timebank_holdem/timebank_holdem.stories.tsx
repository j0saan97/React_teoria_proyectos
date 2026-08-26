import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimebankHoldem } from "./timebank_holdem";

const meta = {
  title: "Poker/TimebankHoldem",
  component: TimebankHoldem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimebankHoldem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titulo: "TIMEBANK - CASH GAME",
  },
};
