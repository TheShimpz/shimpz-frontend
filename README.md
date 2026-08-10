# @shimpz/frontend

The public Shimpz design system for Svelte 5 applications.

It provides design tokens, canonical brand assets, and accessible presentation
primitives without coupling consumers to Shimpz authentication, APIs, or
business rules.

## Install

```sh
pnpm add @shimpz/frontend
```

Private applications may consume a reviewed GitHub commit directly, without
waiting for an npm release. Pin the complete commit SHA so the build remains
reproducible:

```json
{
  "dependencies": {
    "@shimpz/frontend": "https://codeload.github.com/TheShimpz/shimpz-frontend/tar.gz/FULL_COMMIT_SHA"
  }
}
```

The repository exports its Svelte sources directly. The consuming application
compiles them in its own build; no separate package build is required.

Import the complete theme once at the application boundary:

```ts
import "@shimpz/frontend/theme.css";
```

Then use the presentation primitives from the package root:

```svelte
<script lang="ts">
  import { Button, Card, Notice, ShimpzBrand, TextField } from "@shimpz/frontend";

  let assistantId = "hello-world";
</script>

<ShimpzBrand product="Developers" />
<Card title="Assistant publication">
  <TextField id="assistant-id" label="Assistant ID" bind:value={assistantId} />
  <Button>Publish</Button>
  <Notice variant="success" title="Ready">Assistant validated.</Notice>
</Card>
```

## Editorial surfaces

Public marketing and institutional pages use the editorial primitives instead
of inventing local display scales or image frames:

- `EditorialHero` owns the page display heading and its copy/media hierarchy.
- `EditorialSection` owns bounded section headings and alternating media layout.
- `EditorialVisual` reserves image space, applies the canonical frame, and
  closes loading priority to one explicit hero image.
- `PageIntro` remains the compact heading for application and catalog routes;
  it is not a marketing hero.

Display copy should be concise enough to balance at about two lines on a
reference desktop viewport and no more than three to four lines on narrow
screens. Do not force an exact line count with manual `<br>` elements: all
supported scripts must reflow naturally. Chinese, Japanese, and Arabic use the
component's script-aware leading and tracking.

Product illustrations belong to the consuming product repository. They must
contain no embedded copy, fake interface, or unverified product evidence. Pass
an empty `alt` when adjacent text already communicates the full meaning; use
descriptive alternative text only when the image contributes unique content.
Only the first-fold visual may set `priority`; every later visual stays lazy.
Provide explicit dimensions and responsive WebP or AVIF sources.

```svelte
<script lang="ts">
  import { EditorialHero, EditorialVisual } from "@shimpz/frontend";
</script>

{#snippet media()}
  <EditorialVisual
    src="/illustration-1536.webp"
    srcset="/illustration-768.webp 768w, /illustration-1536.webp 1536w"
    alt=""
    priority
  />
{/snippet}

<EditorialHero
  kicker="Open source // human authority"
  title="Delegate without losing control."
  lead="Keep consequential access and decisions attributable."
  {media}
/>
```

Lower-level consumers can import only the token contract:

```css
@import "@shimpz/frontend/tokens.css";
```

The package follows shadcn's compositional component anatomy for workspace
shells, navigation, cards, actions, links, fields, status, modal, drawer,
disclosure, embedded-frame, and Assistant-icon primitives. Cyberpunk tokens
change the visual language without changing those interaction contracts. The
showcase at `/admin-kit` is the rendered interaction and accessibility contract
for the complete application surface.

The canonical thinking asset is exported at
`@shimpz/frontend/assets/shimpz-thinking.svg`.

## Package boundary

The package intentionally contains no credentials, network clients,
authentication state, or product-specific business logic. Consumers own those
concerns and compose them around these presentation primitives.

## Release trust

The npm trusted publisher is scoped to:

- GitHub organization: `TheShimpz`
- repository: `shimpz-frontend`
- workflow: `release.yml`
- environment: `release`
- permission: staged publishing only

Publishing a matching GitHub release stages the package with short-lived OIDC
credentials and npm provenance. A maintainer must inspect and approve that
stage with npm 2FA before the version becomes public. Long-lived npm publishing
tokens are not part of the release path.
