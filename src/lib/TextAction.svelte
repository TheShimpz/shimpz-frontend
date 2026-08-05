<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    icon?: Snippet;
    element?: HTMLButtonElement;
  };

  let {
    children,
    icon,
    type = "button",
    element = $bindable(),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<button bind:this={element} {type} class={["shimpz-text-action", className]} {...attributes}>
  {#if icon}
    <span class="icon" data-slot="text-action-icon" aria-hidden="true">{@render icon()}</span>
  {/if}
  <span class="label" data-slot="text-action-label">{@render children?.()}</span>
</button>

<style>
  button {
    display: inline-flex;
    min-height: var(--shimpz-control-height-compact);
    align-items: center;
    gap: var(--shimpz-space-2);
    padding: 0.4rem 0.25rem;
    color: var(--shimpz-color-cyan);
    font: 700 0.68rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-align: start;
    text-transform: uppercase;
    background: transparent;
    border: 0;
    border-radius: 0;
    cursor: pointer;
    transition: color var(--shimpz-duration-fast) var(--shimpz-ease);
  }

  button:hover:not(:disabled) {
    color: var(--shimpz-color-text);
  }

  button:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .icon,
  .label {
    display: inline-flex;
    align-items: center;
  }

  .icon {
    flex: none;
    justify-content: center;
    color: currentColor;
    font-size: 1rem;
    line-height: 1;
  }

  @media (forced-colors: active) {
    button {
      color: ButtonText;
      forced-color-adjust: auto;
    }
  }

  @media (pointer: coarse) {
    button {
      min-height: 2.75rem;
    }
  }
</style>
