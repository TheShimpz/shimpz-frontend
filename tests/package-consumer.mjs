import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(repositoryRoot, "package.json"), "utf8"));
const pnpmEntry = process.env.npm_execpath;

if (!pnpmEntry) {
  throw new Error("Run this contract through pnpm so the pinned package manager is used.");
}

const workspace = mkdtempSync(join(tmpdir(), "shimpz-frontend-consumer-"));
const packageDirectory = join(workspace, "package");
const consumerDirectory = join(workspace, "consumer");

function runPnpm(arguments_, cwd) {
  execFileSync(process.execPath, [pnpmEntry, ...arguments_], {
    cwd,
    env: process.env,
    stdio: "inherit",
  });
}

try {
  mkdirSync(packageDirectory);
  mkdirSync(consumerDirectory);
  runPnpm(["pack", "--pack-destination", packageDirectory], repositoryRoot);

  const tarballs = readdirSync(packageDirectory).filter((name) => name.endsWith(".tgz"));
  if (tarballs.length !== 1) {
    throw new Error(`Expected one package tarball, found ${tarballs.length}.`);
  }

  const tarball = join(packageDirectory, tarballs[0]);
  const consumerManifest = {
    name: "shimpz-frontend-consumer-contract",
    version: "0.0.0",
    private: true,
    type: "module",
    dependencies: {
      "@shimpz/frontend": `file:${tarball}`,
      svelte: manifest.devDependencies.svelte,
    },
    devDependencies: {
      "@sveltejs/vite-plugin-svelte": manifest.devDependencies["@sveltejs/vite-plugin-svelte"],
      vite: manifest.devDependencies.vite,
    },
  };

  writeFileSync(
    join(consumerDirectory, "package.json"),
    `${JSON.stringify(consumerManifest, null, 2)}\n`,
  );
  writeFileSync(
    join(consumerDirectory, "index.html"),
    '<!doctype html><html lang="en"><body><div id="app"></div><script type="module" src="/src.js"></script></body></html>\n',
  );
  writeFileSync(
    join(consumerDirectory, "src.js"),
    `import { mount } from "svelte";
import App from "./App.svelte";
import "@shimpz/frontend/theme.css";

mount(App, { target: document.getElementById("app") });
`,
  );
  writeFileSync(
    join(consumerDirectory, "App.svelte"),
    `<script>
  import { ActionLink, AssistantIcon, Button, Card, CheckboxField, DialogFrame, Disclosure, EditorialHero, EditorialSection, EditorialVisual, EmbedFrame, FileInput, Modal, NavItem, Notice, PageIntro, ActionRequestFields, PromptDialog, RadioField, SelectField, ShimpzBrand, SignalList, SiteFooter, SiteHeader, SiteNavLink, StatusBadge, TextAreaField, TextField, TextLink, WorkspaceShell } from "@shimpz/frontend";
  import logoUrl from "@shimpz/frontend/assets/shimpz-thinking.svg";

  let assistantId = "hello-world";
  let destination = "marketing";
  let mode = "safe";
  let publishButton;
  let storeFrame;
  let messageField;
  let actionValue;
  let actionValid = false;
  const signals = [{ id: "consumer-signal", status: "ready" }];
</script>

{#snippet navigation()}<SiteNavLink href="/">Home</SiteNavLink>{/snippet}
{#snippet signal(item)}<code>{item.id}</code>{/snippet}
{#snippet signalMeta(item)}<span>{item.status}</span>{/snippet}
<SiteHeader brandHref="/" navigationLabel="Primary" contentWidth="editorial" {navigation} />
<main>
  <ShimpzBrand product="Consumer" />
  <ShimpzBrand variant="hero" decorative />
  <img src={logoUrl} alt="Shimpz thinking" />
  <EditorialHero title="A bounded display heading" lead="A concise editorial introduction." />
  <EditorialSection title="A bounded section heading"><p>Consumer-owned content.</p></EditorialSection>
  <EditorialVisual src={logoUrl} alt="" width={640} height={426} aspect="flow" fit="cover" treatment="unframed" />
  <TextField id="assistant-id" label="Assistant ID" bind:value={assistantId} />
  <SelectField id="destination" label="Destination" options={[{ value: "marketing", label: "Marketing" }]} bind:value={destination} />
  <RadioField id="mode-safe" name="mode" optionValue="safe" label="Safe" bind:value={mode} />
  <Button bind:element={publishButton}>Publish</Button>
  <Notice variant="success" title="Ready">Package exports resolve.</Notice>
  <SignalList items={signals} getKey={(item) => item.id} {signal} meta={signalMeta} aria-label="Consumer signals" />
  <EmbedFrame bind:element={storeFrame} title="Store" srcdoc="<!doctype html><html><body>Store</body></html>" />
  <TextAreaField id="message" label="Message" bind:element={messageField} />
  <ActionRequestFields
    request={{ kind: "input:text", label: "Value", required: true, placeholder: null, min_length: 1, max_length: 80 }}
    resetKey="consumer"
    labels={{ required: "Required", optional: "Optional", chooseOption: "Choose", selectionHint: "Choose one", passwordLabel: "Password", totpLabel: "Code", totpPlaceholder: "123456" }}
    bind:value={actionValue}
    bind:valid={actionValid}
  />
  <DialogFrame title="Nested proof" titleId="nested-proof-title" titleLevel={3}><p>Consumer-owned proof.</p></DialogFrame>
</main>
{#snippet links()}<a href="/">Home</a>{/snippet}
<SiteFooter brandHref="/" linksLabel="Footer" contentWidth="editorial" {links} />
`,
  );
  writeFileSync(
    join(consumerDirectory, "vite.config.js"),
    `import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({ plugins: [svelte()] });
`,
  );
  writeFileSync(
    join(consumerDirectory, "lean.html"),
    '<!doctype html><html lang="en"><body><div id="app"></div><script type="module" src="/lean.js"></script></body></html>\n',
  );
  writeFileSync(
    join(consumerDirectory, "lean.js"),
    `import { mount } from "svelte";
import Lean from "./Lean.svelte";
import "@shimpz/frontend/tokens.css";

mount(Lean, { target: document.getElementById("app") });
`,
  );
  writeFileSync(
    join(consumerDirectory, "Lean.svelte"),
    `<script>
  import ActionRequestFields from "@shimpz/frontend/components/ActionRequestFields";
  import Button from "@shimpz/frontend/components/Button";
  import DialogFrame from "@shimpz/frontend/components/DialogFrame";
  import SelectField from "@shimpz/frontend/components/SelectField";
  import { themeClass } from "@shimpz/frontend/theme";

  let selected = "approval";
  let value;
  let valid = false;
</script>

<main class={themeClass}>
  <SelectField id="kind" label="Kind" options={[{ value: "approval", label: "Approval" }]} bind:value={selected} />
  <DialogFrame title="Approve" titleId="approve-title" titleLevel={2}>
    <ActionRequestFields request={{ kind: "approval" }} resetKey="lean" bind:value bind:valid />
    {#snippet footer()}<Button disabled>Approve</Button>{/snippet}
  </DialogFrame>
</main>
`,
  );
  writeFileSync(
    join(consumerDirectory, "lean.vite.config.js"),
    `import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  build: { outDir: "lean-dist", rollupOptions: { input: "lean.html" } },
});
`,
  );

  runPnpm(
    ["install", "--ignore-scripts", "--no-frozen-lockfile", "--prefer-offline"],
    consumerDirectory,
  );
  runPnpm(["exec", "vite", "build"], consumerDirectory);

  const assetsDirectory = join(consumerDirectory, "dist", "assets");
  const assets = readdirSync(assetsDirectory);
  if (
    !existsSync(join(consumerDirectory, "dist", "index.html")) ||
    !assets.some((name) => name.endsWith(".svg")) ||
    !assets.some((name) => name.endsWith(".woff2"))
  ) {
    throw new Error("The consumer build did not emit the expected HTML, brand asset, and local fonts.");
  }

  runPnpm(["exec", "vite", "build", "--config", "lean.vite.config.js"], consumerDirectory);
  const leanFiles = readdirSync(join(consumerDirectory, "lean-dist"), { recursive: true });
  if (leanFiles.some((name) => name.toString().includes("shimpz-thinking"))) {
    throw new Error("Component subpath imports emitted the unused Shimpz thinking asset.");
  }
} finally {
  rmSync(workspace, { force: true, recursive: true });
}
