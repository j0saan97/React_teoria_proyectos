import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactFormBasic } from "./ContactFormBasic";

const meta = {
  title: "Components/ContactFormBasic",
  component: ContactFormBasic,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactFormBasic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("ContactFormBasic submit:", data),
  },
};
