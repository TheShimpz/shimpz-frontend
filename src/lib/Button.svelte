<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "default" | "compact" | "icon";
    element?: HTMLButtonElement;
  };

  let {
    children,
    variant = "primary",
    size = "default",
    type = "button",
    element = $bindable(),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<button
  bind:this={element}
  {type}
  class={["shimpz-button", `shimpz-button--${variant}`, `shimpz-button--${size}`, className]}
  {...attributes}
>
  <span>{@render children?.()}</span>
</button>

<style>
  button {
    --button-color: var(--shimpz-color-bg);
    --button-bg: var(--shimpz-color-cyan);
    --button-border: var(--shimpz-color-cyan);
    --button-hover-color: var(--shimpz-color-bg);
    --button-hover-bg: var(--shimpz-color-text);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--shimpz-control-height);
    padding: 0.6rem 0.9rem;
    color: var(--button-color);
    font: 700 0.72rem/1 var(--shimpz-font-mono);
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

  .shimpz-button--compact {
    min-height: var(--shimpz-control-height-compact);
    padding: 0.45rem 0.65rem;
    font-size: 0.66rem;
  }

  .shimpz-button--icon {
    width: var(--shimpz-control-height);
    min-height: var(--shimpz-control-height);
    padding: 0;
    clip-path: none;
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

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
      min-height: 2.75rem;
    }

    .shimpz-button--icon {
      width: 2.75rem;
    }
  }
</style>
