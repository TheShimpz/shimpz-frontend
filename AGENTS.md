# Repository working rules

These rules apply to every contributor and coding agent in this repository.

## Delivery

- Work in the smallest independently reviewable task that produces a useful result.
- After a microtask succeeds, run the smallest relevant local checks, commit it immediately, and push it immediately.
- Never batch unrelated successful microtasks into one commit.
- Write English conventional commit messages with a clear imperative subject.

## Validation

- Use Node.js 24 and frozen pnpm installs for every workload.
- Use exactly half of the processors reported by the machine when a test runner supports workers.
- Exercise user-visible behavior through Playwright against the built showcase.
- Do not claim rendered layout, interaction, accessibility, or responsive behavior from source-text assertions.

## Engineering

- Keep the implementation KISS: the smallest safe design that satisfies the current contract.
- This public package contains no credentials, authentication, API calls, or business rules.
- Export only design tokens, brand assets, and presentation or accessibility primitives.
- Do not add compatibility layers while there are no production users unless a current contract requires them.
