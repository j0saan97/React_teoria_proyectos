import type { Meta, StoryObj } from "@storybook/react-vite";
import { BasicRegistrer } from "./basicRegistrer";

const meta = {
  title: "Registrer/BasicRegistrer",
  component: BasicRegistrer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BasicRegistrer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("BasicRegistrer submit:", data),
  },
};
