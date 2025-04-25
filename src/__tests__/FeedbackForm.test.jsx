import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FeedbackForm } from "../components/FeedbackForm";
import { expect, test } from "vitest";

test("Checking the title", () => {
  render(<FeedbackForm />);
  const heading = screen.getByText("Обратная связь");
  expect(heading).toBeInTheDocument();
});

test("Passing a name and a message", async () => {
  render(<FeedbackForm />);
  const nameInput = screen.getByPlaceholderText("Ваше имя");
  const messageInput = screen.getByPlaceholderText("Ваше сообщение");

  await userEvent.type(nameInput, "Santa Claus");
  await userEvent.type(messageInput, "Message");

  expect(nameInput).toHaveValue("Santa Claus");
  expect(messageInput).toHaveValue("Message");
});

test("Sending form with valid inputs", async () => {
  render(<FeedbackForm />);
  const nameInput = screen.getByPlaceholderText("Ваше имя");
  const messageInput = screen.getByPlaceholderText("Ваше сообщение");
  const submitButton = screen.getByText("Отправить");

  await userEvent.type(nameInput, "Michael Jackson");
  await userEvent.type(messageInput, "Message");
  await userEvent.click(submitButton);

  await new Promise((r) => setTimeout(r, 1500));
  const confirmation = await screen.findByText("Спасибо, Michael Jackson! Ваше сообщение отправлено.");
  expect(confirmation).toBeInTheDocument();
});

test("Test whether form gets sent with blank fields", async () => {
  render(<FeedbackForm />);
  const submitButton = screen.getByText("Отправить");

  await userEvent.click(submitButton);

  const confirmation = screen.queryByText("Ваше сообщение отправлено.");
  expect(confirmation).not.toBeInTheDocument();
});

test("Button exists and it is active", () => {
  render(<FeedbackForm />);
  const submitButton = screen.getByText("Отправить");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
});

test("Testing trim function", async () => {
  render(<FeedbackForm />);
  const nameInput = screen.getByPlaceholderText("Ваше имя");
  const messageInput = screen.getByPlaceholderText("Ваше сообщение");
  const submitButton = screen.getByText("Отправить");

  await userEvent.type(nameInput, "   ");
  await userEvent.type(messageInput, "   ");
  await userEvent.click(submitButton);

  const confirmation = screen.queryByText("Ваше сообщение отправлено.");
  expect(confirmation).not.toBeInTheDocument();
});
