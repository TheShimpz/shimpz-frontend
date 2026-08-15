<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import type { ControlSize } from "./control";
  import "./control-glitch.css";

  type Props = HTMLAnchorAttributes & {
    variant?: "primary" | "secondary" | "ghost";
    size?: ControlSize;
    icon?: Snippet;
    glitch?: boolean;
  };

  let {
    children,
    variant = "secondary",
    size = "md",
    icon,
    glitch = false,
    class: className,
    ...attributes
  }: Props = $props();
</script>

<a data-shimpz-glitch={glitch || undefined} class={["shimpz-action-link", `shimpz-action-link--${variant}`, `shimpz-action-link--${size}`, className]} {...attributes}>
  <span class="action-link-content">
    {#if icon}<span class="action-link-icon" aria-hidden="true">{@render icon()}</span>{/if}
    {@render children?.()}
  </span>
</a>

<style>
  a {
    --link-color: var(--shimpz-color-cyan);
    --link-bg: var(--shimpz-color-surface-raised);
    --link-border: var(--shimpz-color-cyan);
    --action-link-scale-height: var(--shimpz-control-height-md);
    --action-link-height: var(--action-link-scale-height);
    --action-link-padding-inline: 0.9rem;
    --action-link-font-size: 0.72rem;
    --action-link-content-gap: var(--shimpz-space-2);
    display: inline-flex;
    min-height: var(--action-link-height);
    align-items: center;
    justify-content: center;
    padding: 0 var(--action-link-padding-inline);
    color: var(--link-color);
    font: 700 var(--action-link-font-size)/1 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-decoration: none;
    text-transform: uppercase;
    background: var(--link-bg);
    border: 1px solid var(--link-border);
    clip-path: var(--shimpz-control-shape);
  }
  .shimpz-action-link--primary { --link-color: var(--shimpz-color-bg); --link-bg: var(--shimpz-color-cyan); }
  .shimpz-action-link--ghost { --link-color: var(--shimpz-color-text-muted); --link-bg: transparent; --link-border: var(--shimpz-color-border); }
  .shimpz-action-link--xs { --action-link-scale-height: var(--shimpz-control-height-xs); --action-link-padding-inline: 0.5rem; --action-link-font-size: 0.62rem; --action-link-content-gap: 0.375rem; }
  .shimpz-action-link--sm { --action-link-scale-height: var(--shimpz-control-height-sm); --action-link-padding-inline: 0.65rem; --action-link-font-size: 0.66rem; }
  .shimpz-action-link--lg { --action-link-scale-height: var(--shimpz-control-height-lg); --action-link-padding-inline: 1.1rem; --action-link-font-size: 0.78rem; --action-link-content-gap: 0.625rem; }
  .shimpz-action-link--xl { --action-link-scale-height: var(--shimpz-control-height-xl); --action-link-padding-inline: 1.3rem; --action-link-font-size: 0.84rem; --action-link-content-gap: var(--shimpz-space-3); }
  .action-link-content { display: inline-flex; align-items: center; justify-content: center; gap: var(--action-link-content-gap); }
  .action-link-icon { display: inline-grid; flex: 0 0 auto; place-items: center; }
  a:hover { color: var(--shimpz-color-bg); background: var(--shimpz-color-text); border-color: var(--shimpz-color-text); box-shadow: var(--shimpz-glow-cyan); }
  a:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; box-shadow: var(--shimpz-focus-ring); }
  @media (forced-colors: active) { a { color: LinkText; background: Canvas; border-color: LinkText; clip-path: none; } }
  @media (pointer: coarse) { a { --action-link-height: max(var(--action-link-scale-height), 2.75rem); } }
</style>
