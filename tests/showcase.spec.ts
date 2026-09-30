import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("operates the design-system showcase controls", async ({ page }) => {
  await page.getByRole("button", { name: "Transmit signal" }).click();
  await expect(page.getByText("1 transmissions acknowledged")).toBeVisible();
  await expect(page.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  const assistantId = page.getByRole("textbox", { name: "Assistant ID" });
  await assistantId.fill("release-agent");
  await expect(assistantId).toHaveValue("release-agent");
  await expect(page.getByRole("textbox", { name: "Invalid example" })).toHaveAttribute("aria-invalid", "true");
});

test("has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("operates the public site shell language menu and skip link", async ({ page }) => {
  await page.goto("/site-kit/");
  await page.getByRole("button", { name: "Language: English" }).click();
  await expect(page.getByRole("menuitemradio", { name: "Português" })).toHaveAttribute(
    "href",
    "/site-kit/?language=pt",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.getByRole("link", { name: "Skip to content" }).click();
  await expect(page.locator("#main-content")).toBeFocused();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("opens crawlable language navigation declaratively", async ({ page }) => {
    await page.goto("/site-kit/");
    await page.getByRole("button", { name: "Language: English" }).click();
    await expect(page.getByRole("menuitemradio", { name: "Português" })).toBeVisible();
    await expect(page.getByRole("menuitemradio", { name: "Português" })).toHaveAttribute(
      "href",
      "/site-kit/?language=pt",
    );
  });
});

test("operates the reusable Admin component kit", async ({ page }) => {
  await page.goto("/admin-kit/");
  await expect(page.getByRole("menu")).toBeHidden();
  await page.getByRole("checkbox", { name: "Enable Assistant" }).check();
  await expect(page.getByRole("checkbox", { name: "Enable Assistant" })).toBeChecked();
  await page.getByRole("combobox", { name: "Destination" }).selectOption("marketing");
  await expect(page.getByRole("combobox", { name: "Destination" })).toHaveValue("marketing");
  await page.getByRole("radio", { name: "Fast" }).check();
  await expect(page.getByRole("radio", { name: "Fast" })).toBeChecked();
  await expect(page.getByText("Admin prepares the request")).toBeHidden();
  await page.getByText("Execution stages 3", { exact: true }).click();
  await expect(page.getByText("Admin prepares the request")).toBeVisible();
  await page.getByRole("button", { name: "Open dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Choose a Team" });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toBeVisible();
  await page.getByRole("button", { name: "Close drawer" }).click();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toBeHidden();
  await page.getByRole("button", { name: "Current language" }).click();
  await expect(page.getByRole("menuitemradio", { name: "Unavailable locale" })).toBeDisabled();
  await page.keyboard.press("Home");
  await expect(page.getByRole("menuitemradio", { name: "English" })).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("menuitemradio", { name: "Português" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitemradio", { name: "English" })).toBeFocused();
  await page.keyboard.press("End");
  await page.getByRole("menuitemradio", { name: "Português" }).click();
  await expect(page.getByRole("button", { name: "Current language" })).toContainText("Português");
  await page.getByRole("button", { name: "Current language" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await page.getByRole("heading", { name: "One sealed interface" }).click();
  await expect(page.getByRole("menu")).toBeHidden();
  await page.getByRole("button", { name: "Show toast" }).click();
  const toast = page.getByRole("status");
  await expect(toast).toContainText("Presentation contract synchronized.");
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await expect(toast).toBeHidden();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("keeps PromptDialog open state synchronized with native cancellation", async ({ page }) => {
  await page.goto("/admin-kit/");
  await page.getByRole("button", { name: "Open dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Choose a Team" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(dialog).toBeVisible();
});

test("renders and validates every reusable Action request field", async ({ page }) => {
  await page.goto("/action-requests/");
  const kind = page.getByRole("combobox", { name: "Request kind" });
  const output = page.locator("output");

  await page.getByRole("textbox", { name: /Reviewed value/ }).fill("reviewed");
  await expect(output).toContainText('Valid · "reviewed"');

  await kind.selectOption("input:textarea");
  await page.getByRole("textbox", { name: /Reviewed value/ }).fill("longer context");
  await expect(output).toContainText('Valid · "longer context"');

  await kind.selectOption("input:select");
  await page.getByRole("combobox", { name: /Reviewed value/ }).selectOption("one");
  await expect(output).toContainText('Valid · "one"');

  await kind.selectOption("input:choice");
  await page.getByRole("radio", { name: "Two" }).check();
  await expect(output).toContainText('Valid · "two"');

  await kind.selectOption("input:choices");
  await page.getByRole("checkbox", { name: "One" }).check();
  await expect(output).toContainText('Valid · ["one"]');

  for (const authKind of ["approval", "auth:passkey"]) {
    await kind.selectOption(authKind);
    await expect(output).toContainText("Valid · true");
  }
  await kind.selectOption("auth:password");
  await page.getByRole("textbox", { name: "Current password" }).fill("secret");
  await expect(output).toContainText('Valid · "secret"');
  await kind.selectOption("auth:totp");
  await page.getByRole("textbox", { name: "Authentication code" }).fill("123456");
  await expect(output).toContainText('Valid · "123456"');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

test.describe("Assistant icon states", () => {
  const icon = (page: Page, name: string) => page.locator(`[data-icon-case="${name}"] .shimpz-assistant-icon`);

  test("shows loading and failure without ever inventing a substitute mark", async ({ page }) => {
    await page.goto("/admin-kit/");
    await expect(icon(page, "pending")).toHaveAttribute("data-state", "loading");
    await expect(icon(page, "pending").locator("img")).toHaveCount(0);
    await expect(icon(page, "failed")).toHaveAttribute("data-state", "failed");
    await expect(icon(page, "broken")).toHaveAttribute("data-state", "failed");
    await expect(icon(page, "broken").locator("img")).toBeHidden();
    await expect(icon(page, "loaded")).toHaveAttribute("data-state", "loaded");
    await expect(page.locator(".shimpz-assistant-icon svg")).toHaveCount(0);
  });

  test("keeps shimmering until the requested image loads and ignores a replaced source", async ({ page }) => {
    let releaseSlow = () => {};
    const slowHeld = new Promise<void>((resolve) => { releaseSlow = resolve; });
    await page.route("https://assistant-icons.invalid/slow.png", async (route) => {
      await slowHeld;
      await route.fulfill({ contentType: "image/png", body: PNG });
    });
    let releaseSwapped = () => {};
    const swappedHeld = new Promise<void>((resolve) => { releaseSwapped = resolve; });
    await page.route("https://assistant-icons.invalid/swapped.png", async (route) => {
      await swappedHeld;
      await route.fulfill({ contentType: "image/png", body: PNG });
    });
    // The held images keep the load event pending, so wait only for the document.
    await page.goto("/admin-kit/", { waitUntil: "domcontentloaded" });
    const swap = icon(page, "swap");
    await expect(swap).toHaveAttribute("data-state", "loading");
    await expect(swap.locator("img")).toBeHidden();

    await page.getByRole("button", { name: "Swap icon source" }).click();
    releaseSlow();
    await expect(swap.locator("img")).toHaveAttribute("src", "https://assistant-icons.invalid/swapped.png");
    await expect(swap).toHaveAttribute("data-state", "loading");
    releaseSwapped();
    await expect(swap).toHaveAttribute("data-state", "loaded");
    await expect(swap.locator("img")).toBeVisible();
  });
});

test.describe("Assistant icons without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("a prerendered icon source is shown as an image", async ({ page }) => {
    await page.goto("/admin-kit/");
    const loaded = page.locator('[data-icon-case="loaded"] .shimpz-assistant-icon');
    await expect(loaded).toHaveAttribute("data-state", "loaded");
    await expect(loaded.locator("img")).toBeVisible();
    expect(await loaded.locator("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(
      true,
    );
  });
});
