import { expect, test } from "@playwright/test";

test("renders the built design-system showcase", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Shimpz Frontend");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shimpz Frontend");
  await expect(page.getByRole("heading", { name: "Core colors" })).toBeVisible();
});
