<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    title: string;
    description?: string;
    meta?: string;
    selected?: boolean;
    element?: HTMLButtonElement;
  };

  let {
    title,
    description,
    meta,
    selected = false,
    element = $bindable(),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<button
  bind:this={element}
  class={["shimpz-choice-item", selected && "is-selected", className]}
  type="button"
  aria-pressed={selected}
  {...attributes}
>
  <span class="marker" aria-hidden="true"></span>
  <span class="copy">
    <strong>{title}</strong>
    {#if description}<small>{description}</small>{/if}
  </span>
  {#if meta}<span class="meta">{meta}</span>{/if}
</button>

<style>
  button {
    display: grid;
    width: 100%;
    min-width: 0;
    min-height: 3.25rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--shimpz-space-3);
    padding: 0.65rem var(--shimpz-space-3);
    color: var(--shimpz-color-text);
    text-align: start;
    background: var(--shimpz-color-surface-raised);
    border: 1px solid var(--shimpz-color-border-subtle);
    border-radius: 0;
    cursor: pointer;
    transition:
      color var(--shimpz-duration-fast) var(--shimpz-ease),
      background var(--shimpz-duration-fast) var(--shimpz-ease),
      border-color var(--shimpz-duration-fast) var(--shimpz-ease);
  }

  button:hover:not(:disabled),
  .is-selected {
    background: color-mix(in srgb, var(--shimpz-color-cyan) 6%, var(--shimpz-color-surface-raised));
    border-color: color-mix(in srgb, var(--shimpz-color-cyan) 55%, var(--shimpz-color-border));
  }

  .marker {
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid var(--shimpz-color-cyan);
    transform: rotate(45deg);
  }

  .is-selected .marker {
    background: var(--shimpz-color-cyan);
    box-shadow: 0 0 0.7rem color-mix(in srgb, var(--shimpz-color-cyan) 55%, transparent);
  }

  .copy { display: grid; min-width: 0; gap: 0.15rem; }
  strong, small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  strong { font: 700 0.76rem/1.3 var(--shimpz-font-mono); letter-spacing: 0.035em; }
  small { color: var(--shimpz-color-text-dim); font: 500 0.62rem/1.35 var(--shimpz-font-mono); }
  .meta {
    margin-inline-start: auto;
    color: var(--shimpz-color-cyan);
    font: 700 0.6rem/1.2 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  button:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 2px; }
  button:disabled { cursor: not-allowed; opacity: 0.5; }

  @media (pointer: coarse) { button { min-height: 3.5rem; } }
  @media (forced-colors: active) {
    button { color: ButtonText; background: ButtonFace; border-color: ButtonText; }
    .marker { border-color: ButtonText; }
    .is-selected .marker { background: Highlight; }
  }
</style>
