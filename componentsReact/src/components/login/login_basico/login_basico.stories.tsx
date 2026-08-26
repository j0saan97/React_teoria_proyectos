import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginBasico } from "./login_basico";

const meta = {
  title: "Login/LoginBasico",
  component: LoginBasico,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginBasico>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("LoginBasico submit:", data),
  },
};
