<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import type { ControlSize } from "./control";
  import "./control-glitch.css";

  type Props = HTMLButtonAttributes & {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: ControlSize;
    icon?: Snippet;
    iconOnly?: boolean;
    glitch?: boolean;
    element?: HTMLButtonElement;
  };

  let {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconOnly = false,
    glitch = false,
    type = "button",
    element = $bindable(),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<button
  bind:this={element}
  {type}
  data-shimpz-glitch={glitch || undefined}
  class={["shimpz-button", `shimpz-button--${variant}`, `shimpz-button--${size}`, iconOnly && "shimpz-button--icon-only", className]}
  {...attributes}
>
  <span class="button-content">
    {#if icon}<span class="button-icon" aria-hidden="true">{@render icon()}</span>{/if}
    {@render children?.()}
  </span>
</button>

<style>
  button {
    --button-color: var(--shimpz-color-bg);
    --button-bg: var(--shimpz-color-cyan);
    --button-border: var(--shimpz-color-cyan);
    --button-hover-color: var(--shimpz-color-bg);
    --button-hover-bg: var(--shimpz-color-text);

    --button-scale-height: var(--shimpz-control-height-md);
    --button-height: var(--button-scale-height);
    --button-padding-inline: 0.9rem;
    --button-font-size: 0.72rem;
    --button-content-gap: var(--shimpz-space-2);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--button-height);
    padding: 0 var(--button-padding-inline);
    color: var(--button-color);
    font: 700 var(--button-font-size)/1 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-decoration: none;
    text-transform: uppercase;
    background: var(--button-bg);
    border: 1px solid var(--button-border);
    border-radius: 0;
    clip-path: var(--shimpz-control-shape);
    cursor: pointer;
    transition:
      color var(--shimpz-duration-fast) var(--shimpz-ease),
      background var(--shimpz-duration-fast) var(--shimpz-ease),
      border-color var(--shimpz-duration-fast) var(--shimpz-ease),
      box-shadow var(--shimpz-duration-fast) var(--shimpz-ease);
  }

  .shimpz-button--secondary {
    --button-color: var(--shimpz-color-cyan);
    --button-bg: var(--shimpz-color-surface-raised);
    --button-hover-color: var(--shimpz-color-bg);
  }

  .shimpz-button--danger {
    --button-color: var(--shimpz-color-bg);
    --button-bg: var(--shimpz-color-danger);
    --button-border: var(--shimpz-color-danger);
    --button-hover-bg: var(--shimpz-color-text);
  }

  .shimpz-button--ghost {
    --button-color: var(--shimpz-color-text-muted);
    --button-bg: transparent;
    --button-border: var(--shimpz-color-border);
    --button-hover-color: var(--shimpz-color-cyan);
    --button-hover-bg: var(--shimpz-color-surface-raised);
  }

  .shimpz-button--xs {
    --button-scale-height: var(--shimpz-control-height-xs);
    --button-padding-inline: 0.5rem;
    --button-font-size: 0.62rem;
    --button-content-gap: 0.375rem;
  }

  .shimpz-button--sm {
    --button-scale-height: var(--shimpz-control-height-sm);
    --button-padding-inline: 0.65rem;
    --button-font-size: 0.66rem;
  }

  .shimpz-button--lg {
    --button-scale-height: var(--shimpz-control-height-lg);
    --button-padding-inline: 1.1rem;
    --button-font-size: 0.78rem;
    --button-content-gap: 0.625rem;
  }

  .shimpz-button--xl {
    --button-scale-height: var(--shimpz-control-height-xl);
    --button-padding-inline: 1.3rem;
    --button-font-size: 0.84rem;
    --button-content-gap: var(--shimpz-space-3);
  }

  .shimpz-button--icon-only {
    width: var(--button-height);
    padding: 0;
  }

  button:hover:not(:disabled) {
    color: var(--button-hover-color);
    background: var(--button-hover-bg);
    border-color: var(--button-hover-bg);
    box-shadow: var(--shimpz-glow-cyan);
  }

  button:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
    box-shadow: var(--shimpz-focus-ring);
  }

  button:disabled {
    cursor: not-allowed;
    filter: grayscale(0.55);
    opacity: 0.5;
    transition: none;
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-content-gap);
  }

  .button-icon {
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
  }

  @media (forced-colors: active) {
    button {
      color: ButtonText;
      background: ButtonFace;
      border-color: ButtonText;
      clip-path: none;
      forced-color-adjust: auto;
    }
  }

  @media (pointer: coarse) {
    button {
      --button-height: max(var(--button-scale-height), 2.75rem);
    }
  }
</style>
