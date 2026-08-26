import type { Meta, StoryObj } from "@storybook/react-vite";
import { AdvancedFormRegistrer } from "./advanced_form-registrer";

const meta = {
  title: "Registrer/AdvancedFormRegistrer",
  component: AdvancedFormRegistrer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedFormRegistrer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("AdvancedFormRegistrer submit:", data),
  },
};
