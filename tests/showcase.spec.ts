import { expect, test } from "@playwright/test";

test("renders the built design-system showcase", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Shimpz Frontend");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shimpz Frontend");
  await expect(page.getByRole("heading", { name: "Core colors" })).toBeVisible();
  const button = page.getByRole("button", { name: "Interactive button" });
  await button.click();
  await expect(page.getByText("1 activations")).toBeVisible();
  await expect(page.getByRole("button", { name: "Disabled button" })).toBeDisabled();
  const assistantId = page.getByRole("textbox", { name: "Assistant ID" });
  await assistantId.fill("hello-world");
  await expect(page.getByText("ID: hello-world")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Invalid example" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByText("Use lowercase ASCII characters.")).toBeVisible();
});
