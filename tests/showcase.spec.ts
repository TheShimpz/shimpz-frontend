import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const visualContract = {
  animations: "disabled",
  fullPage: true,
  maxDiffPixels: 100,
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

  const notices = page.locator('[data-slot="notice"]');
  await expect(notices).toHaveCount(4);
  for (const notice of await notices.all()) {
    expect(await notice.evaluate((element) => (
      Math.abs(element.getBoundingClientRect().width - element.parentElement!.getBoundingClientRect().width) < 1
    ))).toBe(true);
    await expect(notice).toHaveCSS("border-top-width", "0px");
    await expect(notice).toHaveCSS("border-right-width", "0px");
    await expect(notice).toHaveCSS("border-bottom-width", "0px");
    await expect(notice).toHaveCSS("border-left-width", "3px");
    const iconBox = await notice.locator('[data-slot="notice-icon"]').boundingBox();
    const bodyBox = await notice.locator('[data-slot="notice-body"]').boundingBox();
    if (!iconBox || !bodyBox) throw new Error("Notice has no rendered icon or body");
    expect(iconBox.width).toBeGreaterThanOrEqual(24);
    expect(bodyBox.x).toBeGreaterThan(iconBox.x + iconBox.width);
    expect(Math.abs(
      (iconBox.y + iconBox.height / 2) - (bodyBox.y + bodyBox.height / 2),
    )).toBeLessThan(1);
  }
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

test("renders the public site shell with crawlable language links", async ({ page }) => {
  await page.goto("/site-kit/");
  await expect(page).toHaveTitle("Public site kit — Shimpz Frontend");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "Language: English" }).click();
  await expect(page.getByRole("menuitemradio", { name: "Português" })).toHaveAttribute(
    "href",
    "/site-kit/?language=pt",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
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

test("keeps public navigation usable at different item counts on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  for (const path of ["/site-kit/", "/site-kit/?short=1"]) {
    await page.goto(path);
    const header = page.locator('[data-slot="site-header"]');
    const actions = page.locator('[data-slot="site-header-actions"]');
    await expect(header).toBeVisible();
    await expect(actions).toBeVisible();
    const [headerBox, actionsBox] = await Promise.all([header.boundingBox(), actions.boundingBox()]);
    if (!headerBox || !actionsBox) throw new Error("Public header has no rendered bounds");
    expect(actionsBox.x).toBeGreaterThanOrEqual(headerBox.x);
    expect(actionsBox.x + actionsBox.width).toBeLessThanOrEqual(headerBox.x + headerBox.width + 1);
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
  }
});

test("has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("renders and operates the reusable Admin component kit", async ({ page }) => {
  await page.goto("/admin-kit/");
  await expect(page).toHaveTitle("Admin kit — Shimpz Frontend");
  await expect(page.getByRole("heading", { name: "One sealed interface" })).toBeVisible();
  const intro = page.locator(".shimpz-page-intro");
  const [introActionBox, introHeadingBox] = await Promise.all([
    intro.getByRole("button", { name: "Change destination Team" }).boundingBox(),
    intro.getByRole("heading", { name: "One sealed interface" }).boundingBox(),
  ]);
  if (!introActionBox || !introHeadingBox) throw new Error("Page intro has no rendered utility or heading");
  expect(introActionBox.x).toBeLessThan(introHeadingBox.x);
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
  await expect(page.locator('[data-slot="disclosure-trigger"]')).toHaveCount(1);
  await expect(page.locator('[data-slot="disclosure-content"]')).toHaveCount(1);
  await page.getByRole("button", { name: "Open dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Choose a Team" });
  await expect(dialog).toBeVisible();
  const dialogBox = await dialog.boundingBox();
  if (!dialogBox) throw new Error("Dialog has no rendered bounds");
  expect(dialogBox.width).toBeLessThanOrEqual(512);
  const currentChoice = dialog.getByRole("button", { name: /Marketing marketing Current/ });
  const [markerBox, copyBox, metaBox] = await Promise.all([
    currentChoice.locator(".marker").boundingBox(),
    currentChoice.locator(".copy").boundingBox(),
    currentChoice.locator(".meta").boundingBox(),
  ]);
  if (!markerBox || !copyBox || !metaBox) throw new Error("Choice item has no rendered bounds");
  expect(copyBox.x - (markerBox.x + markerBox.width)).toBeGreaterThanOrEqual(10);
  expect(metaBox.x).toBeGreaterThan(copyBox.x + copyBox.width);
  const dialogAxe = await new AxeBuilder({ page }).include("dialog[open]").analyze();
  expect(dialogAxe.violations).toEqual([]);
  await expect(dialog).toHaveScreenshot("admin-kit-dialog.png", {
    animations: "disabled",
    maxDiffPixels: 100,
  });
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "System drawer" })).toHaveAttribute("data-slot", "drawer");
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
  await expect(page.getByText("No pending operations")).toBeVisible();
  await expect(page.locator(".skeleton-demo .shimpz-skeleton")).toHaveCount(3);
  await page.getByRole("button", { name: "Show toast" }).click();
  const toast = page.getByRole("status");
  await expect(toast).toContainText("Presentation contract synchronized.");
  await expect(toast).toHaveCSS("position", "relative");
  expect(await toast.evaluate((element) => getComputedStyle(element).clipPath)).not.toBe("none");
  const [toastBox, workspaceBox, viewport] = await Promise.all([
    toast.boundingBox(),
    page.locator('[data-slot="workspace-shell"]').boundingBox(),
    page.evaluate(() => ({ width: innerWidth })),
  ]);
  if (!toastBox) throw new Error("Toast has no rendered bounds");
  if (!workspaceBox) throw new Error("Workspace has no rendered bounds");
  expect(Math.abs(toastBox.width - viewport.width)).toBeLessThan(1);
  expect(Math.abs(toastBox.x)).toBeLessThan(1);
  expect(workspaceBox.y).toBeGreaterThanOrEqual(toastBox.y + toastBox.height);
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await expect(toast).toBeHidden();
  await expect(page.getByLabel("You")).toContainText("List active DNS records.");
  await expect(page.getByLabel("You")).toHaveAttribute("data-slot", "message");
  await expect(page.getByLabel("You").locator('[data-slot="message-content"]')).toBeVisible();
  await expect(page.locator(".shimpz-scroll-area")).toHaveAttribute("tabindex", "0");
  await expect(page.locator(".shimpz-scroll-area")).not.toHaveAttribute("role");
  await expect(page.locator('input[type="file"]')).toHaveCount(1);
  await expect(page.getByRole("toolbar")).toHaveCount(0);
  const embed = page.getByTitle("Embedded Store preview");
  await expect(embed).toHaveCSS("border-top-width", "0px");
  await expect(embed).toHaveCSS("min-height", "512px");
  await expect(page.locator('.embed-card [data-slot="card-content"]')).toHaveCSS("padding-top", "0px");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("renders Assistant selection as text actions and pressed choices", async ({ page }) => {
  await page.goto("/admin-kit/");
  const assistantIcon = page.locator(".shimpz-assistant-icon.has-image").first();
  await expect(assistantIcon).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(assistantIcon).toHaveCSS("background-image", "none");
  await expect(assistantIcon).toHaveCSS("clip-path", "none");
  await expect(assistantIcon.locator("img")).toHaveCSS("object-fit", "contain");
  expect(await assistantIcon.evaluate((element) => getComputedStyle(element, "::after").content)).toBe("none");
  const selectAll = page.getByRole("button", { name: "Select all Assistants", exact: true });
  await expect(selectAll).toBeVisible();
  await expect(selectAll).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(selectAll).toHaveCSS("border-top-width", "0px");

  const choice = page.getByRole("button", { name: "Shimpz Cloudflare" });
  await expect(choice).toHaveAttribute("aria-pressed", "true");
  await expect(choice.getByRole("checkbox")).toHaveCount(0);
  await expect(choice.locator('[data-slot="choice-leading"]')).toBeVisible();
  await expect(choice.locator('[data-slot="choice-trailing"]')).toContainText("✓");

  const [iconBox, labelBox] = await Promise.all([
    selectAll.locator('[data-slot="text-action-icon"]').boundingBox(),
    selectAll.locator('[data-slot="text-action-label"]').boundingBox(),
  ]);
  if (!iconBox || !labelBox) throw new Error("Text action has no rendered icon or label bounds");
  expect(labelBox.x).toBeGreaterThan(iconBox.x + iconBox.width);
});

test("keeps long dialog actions visible while only its body scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 470, height: 600 });
  await page.goto("/admin-kit/");
  await page.getByRole("button", { name: "Open tall dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Review a long Team list" });
  const body = dialog.locator(".body");
  const footer = dialog.locator("footer");
  const [scroll, footerBox] = await Promise.all([
    body.evaluate((element) => ({ client: element.clientHeight, scroll: element.scrollHeight })),
    footer.boundingBox(),
  ]);
  if (!footerBox) throw new Error("Dialog footer has no rendered bounds");
  expect(scroll.scroll).toBeGreaterThan(scroll.client);
  expect(footerBox.y).toBeGreaterThanOrEqual(0);
  expect(footerBox.y + footerBox.height).toBeLessThanOrEqual(600);
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

test("renders and validates every reusable Power request field", async ({ page }) => {
  await page.goto("/power-requests/");
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

  for (const authKind of ["approval", "auth:phishing-resistant"]) {
    await kind.selectOption(authKind);
    await expect(output).toContainText("Valid · true");
  }
  await kind.selectOption("auth:reauth");
  await page.getByRole("textbox", { name: "Current password" }).fill("secret");
  await expect(output).toContainText('Valid · "secret"');
  await kind.selectOption("auth:second-factor");
  await page.getByRole("textbox", { name: "Authentication code" }).fill("123456");
  await expect(output).toContainText('Valid · "123456"');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("stacks narrow dialog actions at full width in safe visual order", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto("/admin-kit/");
  await page.getByRole("button", { name: "Open dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Choose a Team" });
  const [closeBox, confirmBox] = await Promise.all([
    dialog.getByRole("button", { name: "Close" }).boundingBox(),
    dialog.getByRole("button", { name: "Confirm" }).boundingBox(),
  ]);
  if (!closeBox || !confirmBox) throw new Error("Dialog actions have no rendered bounds");
  expect(Math.abs(closeBox.width - confirmBox.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(closeBox.x - confirmBox.x)).toBeLessThanOrEqual(1);
  expect(confirmBox.y).toBeLessThan(closeBox.y);
});

test("keeps fixed workspace headers visible while main content scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 720 });
  await page.goto("/admin-kit/");
  await page.locator('[data-slot="workspace-shell"]').evaluate((element) => element.classList.add("is-fixed"));
  const header = page.locator('[data-slot="workspace-header"]');
  const main = page.locator('[data-slot="workspace-main"]');
  const [headerBox, mainBox, mainScroll] = await Promise.all([
    header.boundingBox(),
    main.boundingBox(),
    main.evaluate((element) => ({ clientHeight: element.clientHeight, scrollHeight: element.scrollHeight })),
  ]);
  if (!headerBox || !mainBox) throw new Error("Fixed workspace regions have no rendered bounds");
  expect(headerBox.y).toBe(0);
  expect(mainBox.y).toBe(headerBox.height);
  expect(mainBox.y + mainBox.height).toBeLessThanOrEqual(720);
  expect(mainScroll.scrollHeight).toBeGreaterThan(mainScroll.clientHeight);
});

test("constrains a fixed workspace that has no header", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 720 });
  await page.goto("/admin-kit/");
  const shell = page.locator('[data-slot="workspace-shell"]');
  const stage = page.locator('[data-slot="workspace-stage"]');
  await shell.evaluate((element) => element.classList.add("is-fixed"));
  await stage.evaluate((element) => {
    element.classList.add("without-header");
    element.querySelector('[data-slot="workspace-header"]')?.remove();
  });
  const main = page.locator('[data-slot="workspace-main"]');
  await main.evaluate((element) => {
    element.classList.remove("padding-default");
    element.classList.add("padding-none");
  });
  const box = await main.boundingBox();
  if (!box) throw new Error("Headerless fixed workspace has no rendered main bounds");
  expect(box.y).toBe(0);
  expect(box.height).toBe(720);
  expect(await page.locator('[data-slot="workspace-viewport"]').evaluate((element) => element.clientHeight)).toBe(720);
  expect(await main.evaluate((element) => element.scrollHeight)).toBeGreaterThan(720);
});

test("honors reduced motion and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.reload();

  const button = page.getByRole("button", { name: "Transmit signal" });
  await expect(button).toHaveCSS("transition-duration", "1e-05s");
  await expect(page.locator(".shimpz-card").first()).toHaveCSS("clip-path", "none");
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

test("matches the desktop Admin kit visual contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/admin-kit/");
  await expect(page).toHaveScreenshot("admin-kit-desktop.png", visualContract);
});

test("matches the mobile Admin kit visual contract without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin-kit/");
  const intro = page.locator(".shimpz-page-intro");
  const [introActionBox, introHeadingBox] = await Promise.all([
    intro.getByRole("button", { name: "Change destination Team" }).boundingBox(),
    intro.getByRole("heading", { name: "One sealed interface" }).boundingBox(),
  ]);
  if (!introActionBox || !introHeadingBox) throw new Error("Mobile page intro has no rendered utility or heading");
  expect(introActionBox.y).toBeLessThan(introHeadingBox.y);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true);
  await expect(page).toHaveScreenshot("admin-kit-mobile.png", visualContract);
});
