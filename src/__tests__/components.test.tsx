import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge, Button, Input, Select, Textarea } from "@/components/ui";

describe("Reusable UI Components", () => {
  describe("Badge", () => {
    it("renders children with correct text", () => {
      render(<Badge variant="default">React Native</Badge>);
      expect(screen.getByText("React Native")).toBeInTheDocument();
    });
  });

  describe("Button", () => {
    it("renders primary variant and triggers onClick", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("displays loading state and disables button when isLoading is true", () => {
      render(<Button isLoading>Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });

  describe("Input", () => {
    it("renders label, placeholder, and handles value change", () => {
      render(<Input label="Full Name" placeholder="Enter your name" />);
      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      const input = screen.getByPlaceholderText("Enter your name");
      fireEvent.change(input, { target: { value: "Tasya" } });
      expect((input as HTMLInputElement).value).toBe("Tasya");
    });

    it("renders error message if error prop is provided", () => {
      render(<Input label="Email" error="Invalid email address" />);
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  describe("Select", () => {
    it("renders options correctly", () => {
      const options = [
        { value: "web", label: "Web App" },
        { value: "mobile", label: "Mobile App" },
      ];
      render(<Select label="Project Type" options={options} />);
      expect(screen.getByText("Web App")).toBeInTheDocument();
      expect(screen.getByText("Mobile App")).toBeInTheDocument();
    });
  });

  describe("Textarea", () => {
    it("renders label and textarea with text input", () => {
      render(<Textarea label="Project Details" placeholder="Tell us more" />);
      expect(screen.getByLabelText("Project Details")).toBeInTheDocument();
      const textarea = screen.getByPlaceholderText("Tell us more");
      fireEvent.change(textarea, { target: { value: "Design a serene dashboard" } });
      expect((textarea as HTMLTextAreaElement).value).toBe("Design a serene dashboard");
    });
  });
});
