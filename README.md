# @shimpz/frontend

The public Shimpz design system for Svelte applications.

This package will provide design tokens, brand assets, and presentation or
accessibility primitives without coupling consumers to Shimpz business logic.

## Release trust

The first public package version must be published interactively with account
2FA because npm only accepts a trusted-publisher configuration for a package
that already exists.

After that bootstrap, configure the package's npm trusted publisher with:

- GitHub organization: `TheShimpz`
- repository: `shimpz-frontend`
- workflow: `release.yml`
- environment: `release`
- permission: staged publishing only

Then disallow token publishing in the npm package settings. Publishing a GitHub
release stages the matching package version with OIDC and provenance; a
maintainer reviews and approves that stage with npm 2FA.
