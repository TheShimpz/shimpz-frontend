<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { children, class: className, ...attributes }: HTMLButtonAttributes = $props();
</script>

<button class={className} {...attributes}>
  <span>{@render children?.()}</span>
</button>

<style>
  button {
    min-height: 2.75rem;
    padding: 0.7rem 1rem;
    color: var(--shimpz-color-bg);
    font: 700 0.8rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--shimpz-color-cyan);
    border: 1px solid var(--shimpz-color-cyan);
    border-radius: 0;
    clip-path: polygon(0 0, calc(100% - var(--shimpz-cut)) 0, 100% var(--shimpz-cut), 100% 100%, 0 100%);
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: var(--shimpz-color-text);
    border-color: var(--shimpz-color-text);
  }

  button:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
