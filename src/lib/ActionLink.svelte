<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "compact";
  };

  let {
    children,
    variant = "secondary",
    size = "default",
    class: className,
    ...attributes
  }: Props = $props();
</script>

<a class={["shimpz-action-link", `shimpz-action-link--${variant}`, `shimpz-action-link--${size}`, className]} {...attributes}>
  <span>{@render children?.()}</span>
</a>

<style>
  a {
    --link-color: var(--shimpz-color-cyan);
    --link-bg: var(--shimpz-color-surface-raised);
    --link-border: var(--shimpz-color-cyan);
    display: inline-flex;
    min-height: 2.875rem;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.125rem;
    color: var(--link-color);
    font: 700 0.8rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    background: var(--link-bg);
    border: 1px solid var(--link-border);
    clip-path: polygon(0 0, calc(100% - var(--shimpz-cut)) 0, 100% var(--shimpz-cut), 100% 100%, 0 100%);
  }
  .shimpz-action-link--primary { --link-color: var(--shimpz-color-bg); --link-bg: var(--shimpz-color-cyan); }
  .shimpz-action-link--ghost { --link-color: var(--shimpz-color-text-muted); --link-bg: transparent; --link-border: var(--shimpz-color-border); }
  .shimpz-action-link--compact { min-height: 2.25rem; padding: 0.55rem 0.75rem; font-size: 0.7rem; }
  a:hover { color: var(--shimpz-color-bg); background: var(--shimpz-color-text); border-color: var(--shimpz-color-text); box-shadow: var(--shimpz-glow-cyan); }
  a:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; box-shadow: var(--shimpz-focus-ring); }
  @media (forced-colors: active) { a { color: LinkText; background: Canvas; border-color: LinkText; clip-path: none; } }
</style>
