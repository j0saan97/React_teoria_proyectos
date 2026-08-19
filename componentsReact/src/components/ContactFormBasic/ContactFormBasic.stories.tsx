import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactForm } from "./ContactForm";

const meta = {
  title: "Components/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("ContactForm submit:", data),
  },
};
