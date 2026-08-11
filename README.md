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
- `EditorialVisual` reserves image space, applies the canonical frame by
  default, offers an explicit `unframed` treatment for transparent editorial
  illustrations, closes loading priority to one explicit hero image, and
  provides a `flow` aspect for wide, directional architecture diagrams.
- `PageIntro` remains the compact heading for application and catalog routes;
  it is not a marketing hero.

Display copy should be concise enough to balance at about two lines on a
reference desktop viewport and no more than three to four lines on narrow
screens. Do not force an exact line count with manual `<br>` elements: all
supported scripts must reflow naturally. Chinese, Japanese, and Arabic inherit
script-aware leading and tracking from the shared typography tokens, including
when a consumer composes a custom editorial section.

The shared display scale tops out at 4.5rem (72px), and editorial copy aligns to
the top of adjacent media. A tall illustration must never push a hero lead away
from its headline or vertically center explanatory copy in otherwise empty
space.

Public site chrome uses the `content` width by default. Institutional consumers
may select `contentWidth="editorial"` on `SiteHeader` and `SiteFooter` when their
page grid uses the editorial width; that mode preserves the same one-rem gutter
on every viewport. `SiteFooter` supports consumer-owned link groups through
`data-slot="site-footer-group"`, with no more than three related links per group.
Its giant footer wordmark is decorative; the compact linked brand remains the
accessible home destination.

Product illustrations belong to the consuming product repository. Prefer one
directional architectural flows with few large stages over radial, orbital, or
decorative node clusters. Keep
localized explanatory labels in semantic consumer-owned HTML rather than
baking one language into the asset. They must contain no simulated product
interface or unverified product evidence. Abstract capability diagrams are
acceptable when they are clearly illustrative and cannot be mistaken for the
actual product surface. Use `treatment="unframed"` for transparent diagrams
that should sit directly on the page. Pass an empty `alt` when adjacent text or
a semantic legend already communicates the full meaning; use descriptive
alternative text only when the image contributes unique content.
Only the first-fold visual may set `priority`; every later visual stays lazy.
Provide explicit dimensions and responsive WebP or AVIF sources.

The `data-slot` values emitted by editorial primitives are stable semantic
hooks for rendered accessibility, loading, and layout contracts. Consumers
must not style against the components' internal class names.

```svelte
<script lang="ts">
  import { EditorialHero, EditorialVisual } from "@shimpz/frontend";
</script>

{#snippet media()}
  <EditorialVisual
    src="/illustration-1536.webp"
    srcset="/illustration-768.webp 768w, /illustration-1536.webp 1536w"
    alt=""
    treatment="unframed"
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
