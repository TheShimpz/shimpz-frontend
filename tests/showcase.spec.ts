import { expect, test } from "@playwright/test";

test("renders the built design-system showcase", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Shimpz Frontend");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shimpz Frontend");
  await expect(page.getByRole("heading", { name: "Core colors" })).toBeVisible();
  const button = page.getByRole("button", { name: "Interactive button" });
  await button.click();
  await expect(page.getByRole("status")).toHaveText("1 activations");
  await expect(page.getByRole("button", { name: "Disabled button" })).toBeDisabled();
});
