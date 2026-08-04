import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const visualContract = {
  animations: "disabled",
  fullPage: true,
  maxDiffPixelRatio: 0.01,
} as const;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("renders and operates the built design-system showcase", async ({ page }) => {
  await expect(page).toHaveTitle("Shimpz Frontend");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Signal over noise.");
  await expect(page.getByRole("heading", { name: "Core signals" })).toBeVisible();
  const button = page.getByRole("button", { name: "Transmit signal" });
  await button.click();
  await expect(page.getByText("1 transmissions acknowledged")).toBeVisible();
  await expect(page.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  const assistantId = page.getByRole("textbox", { name: "Assistant ID" });
  await assistantId.fill("release-agent");
  await expect(assistantId).toHaveValue("release-agent");
  await expect(page.getByRole("textbox", { name: "Invalid example" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByText("Use lowercase ASCII characters.")).toBeVisible();
});

test("loads local fonts and exposes keyboard focus", async ({ page }) => {
  const fonts = await page.evaluate(() => ({
    sans: document.fonts.check('16px "Inter Variable"'),
    mono: document.fonts.check('16px "IBM Plex Mono"'),
  }));
  expect(fonts).toEqual({ sans: true, mono: true });

  await page.getByRole("button", { name: "Transmit signal" }).focus();
  await expect(page.getByRole("button", { name: "Transmit signal" })).toBeFocused();
  const outline = await page
    .getByRole("button", { name: "Transmit signal" })
    .evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).toBe("solid");
});

test("has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("renders and operates the reusable Admin component kit", async ({ page }) => {
  await page.goto("/admin-kit/");
  await expect(page).toHaveTitle("Admin kit — Shimpz Frontend");
  await expect(page.getByRole("heading", { name: "One sealed interface" })).toBeVisible();
  await page.getByRole("checkbox", { name: "Enable Assistant" }).check();
  await expect(page.getByRole("checkbox", { name: "Enable Assistant" })).toBeChecked();
  await expect(page.getByText("Admin prepares the request")).toBeHidden();
  await page.getByText("Execution stages 3", { exact: true }).click();
  await expect(page.getByText("Admin prepares the request")).toBeVisible();
  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(page.getByRole("dialog", { name: "Confirm operation" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toBeVisible();
  await page.getByRole("button", { name: "Close drawer" }).click();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toBeHidden();
  await expect(page.locator('input[type="file"]')).toHaveCount(1);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("honors reduced motion and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.reload();

  const button = page.getByRole("button", { name: "Transmit signal" });
  await expect(button).toHaveCSS("transition-duration", "1e-05s");
  await expect(page.locator(".shimpz-panel").first()).toHaveCSS("clip-path", "none");
});

test("matches the desktop visual contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page).toHaveScreenshot("showcase-desktop.png", visualContract);
});

test("matches the mobile visual contract without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true);
  await expect(page).toHaveScreenshot("showcase-mobile.png", visualContract);
});
