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
  import { ActionLink, AssistantIcon, Button, CheckboxField, Disclosure, EmbedFrame, FileInput, Modal, NavItem, Notice, PageIntro, Panel, ShimpzBrand, StatusBadge, TextAreaField, TextField, TextLink, WorkspaceShell } from "@shimpz/frontend";
  import logoUrl from "@shimpz/frontend/assets/shimpz-thinking.svg";

  let assistantId = "hello-world";
</script>

<main>
  <ShimpzBrand product="Consumer" />
  <img src={logoUrl} alt="Shimpz thinking" />
  <TextField id="assistant-id" label="Assistant ID" bind:value={assistantId} />
  <Button>Publish</Button>
  <Notice variant="success" title="Ready">Package exports resolve.</Notice>
</main>
`,
  );
  writeFileSync(
    join(consumerDirectory, "vite.config.js"),
    `import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({ plugins: [svelte()] });
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
} finally {
  rmSync(workspace, { force: true, recursive: true });
}
