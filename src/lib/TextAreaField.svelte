<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = Omit<HTMLTextareaAttributes, "id" | "value"> & {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    value?: string;
    element?: HTMLTextAreaElement;
    visuallyHiddenLabel?: boolean;
  };

  let { id, label, hint, error, value = $bindable(""), element = $bindable(), visuallyHiddenLabel = false, class: className, ...attributes }: Props = $props();
  const hintId = $derived(hint ? `${id}-hint` : undefined);
  const errorId = $derived(error ? `${id}-error` : undefined);
  const describedBy = $derived([hintId, errorId].filter(Boolean).join(" ") || undefined);
</script>

<div class={["shimpz-field", className]}>
  <label for={id} class:visually-hidden={visuallyHiddenLabel}>{label}</label>
  <textarea bind:this={element} {id} bind:value aria-describedby={describedBy} aria-invalid={error ? "true" : undefined} {...attributes}></textarea>
  {#if hint}<p id={hintId} class="hint">{hint}</p>{/if}
  {#if error}<p id={errorId} class="error">{error}</p>{/if}
</div>

<style>
  div { display: grid; gap: 0.4rem; }
  label { color: var(--shimpz-color-text); font: 600 0.7rem/1.2 var(--shimpz-font-mono); letter-spacing: 0.07em; text-transform: uppercase; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); }
  textarea { width: 100%; min-height: 5.5rem; resize: vertical; padding: 0.65rem 0.7rem; color: var(--shimpz-color-text); font: 400 1rem/1.5 var(--shimpz-font-sans); background: var(--shimpz-color-surface-raised); border: 1px solid var(--shimpz-color-border); border-radius: 0; clip-path: var(--shimpz-control-shape); }
  textarea:focus { border-color: var(--shimpz-color-cyan); outline: 2px solid color-mix(in srgb, var(--shimpz-color-cyan) 35%, transparent); outline-offset: 1px; box-shadow: var(--shimpz-focus-ring); }
  textarea[aria-invalid="true"] { border-color: var(--shimpz-color-danger); }
  textarea:disabled { cursor: not-allowed; opacity: 0.45; }
  p { margin: 0; font-size: 0.8rem; } .hint { color: var(--shimpz-color-text-muted); } .error { color: var(--shimpz-color-danger); }
</style>
