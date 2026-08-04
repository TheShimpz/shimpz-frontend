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
  import { Button, Notice, Panel, ShimpzBrand, TextField } from "@shimpz/frontend";

  let assistantId = "hello-world";
</script>

<ShimpzBrand product="Developers" />
<Panel>
  <TextField id="assistant-id" label="Assistant ID" bind:value={assistantId} />
  <Button>Publish</Button>
  <Notice variant="success" title="Ready">Assistant validated.</Notice>
</Panel>
```

Lower-level consumers can import only the token contract:

```css
@import "@shimpz/frontend/tokens.css";
```

The package includes workspace shells, navigation, panels, actions, links,
fields, status, modal, drawer, disclosure, embedded-frame, and Assistant-icon
primitives. The showcase at `/admin-kit` is the rendered interaction and
accessibility contract for the complete application surface.

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
