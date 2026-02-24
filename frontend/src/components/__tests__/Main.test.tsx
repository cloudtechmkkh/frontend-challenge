import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MainForm from "@/components/Main";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: (_action: unknown, initialState: unknown) => [
      initialState,
      vi.fn(),
    ],
  };
});

describe("MainForm", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders initial content values", () => {
    render(
      <MainForm
        content={{ title: "Title A", body: "Body A" }}
        showEditButton={false}
      />
    );

    const titleInput = screen.getByPlaceholderText(
      "タイトルを入力してください"
    ) as HTMLInputElement;
    const bodyInput = screen.getByPlaceholderText(
      "内容を入力してください"
    ) as HTMLTextAreaElement;

    expect(titleInput).toHaveValue("Title A");
    expect(bodyInput).toHaveValue("Body A");
  });

  it("renders hidden id input when provided", () => {
    const { container } = render(
      <MainForm content={{ title: "T", body: "B" }} id={7} showEditButton={false} />
    );

    const hiddenInput = container.querySelector(
      "input[name=\"id\"]"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput).toHaveValue("7");
  });

  it("disables fields when save button is hidden", () => {
    render(
      <MainForm content={{ title: "T", body: "B" }} showSaveButton={false} />
    );

    const titleInput = screen.getByPlaceholderText(
      "タイトルを入力してください"
    );
    const bodyInput = screen.getByPlaceholderText("内容を入力してください");

    expect(titleInput).toBeDisabled();
    expect(bodyInput).toBeDisabled();
  });
});
