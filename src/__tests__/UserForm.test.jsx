import { render, screen } from "@testing-library/react"
import { UserForm } from "../components/UserForm"
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

test("The text should be visible only after a user presses the Submit button", async () => {
    render(<UserForm/>);
    const button = screen.getByText('Submit');
    const input = screen.getByPlaceholderText("Input your name");

    await userEvent.type(input, "John");
    await userEvent.click(button);

    const text = screen.getByText("John");
    expect(text).toBeInTheDocument();
})