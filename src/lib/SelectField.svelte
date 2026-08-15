<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = Omit<HTMLSelectAttributes, "id" | "value"> & {
    id: string;
    label: string;
    options: readonly SelectOption[];
    placeholder?: string;
    hint?: string;
    error?: string;
    value?: string;
    visuallyHiddenLabel?: boolean;
  };

  let {
    id,
    label,
    options,
    placeholder,
    hint,
    error,
    value = $bindable(""),
    visuallyHiddenLabel = false,
    class: className,
    "aria-describedby": externalDescription,
    ...attributes
  }: Props = $props();

  const hintId = $derived(hint ? `${id}-hint` : undefined);
  const errorId = $derived(error ? `${id}-error` : undefined);
  const describedBy = $derived(
    [externalDescription, hintId, errorId].filter(Boolean).join(" ") || undefined,
  );
</script>

<div class={["shimpz-select-field", className]}>
  <label for={id} class:visually-hidden={visuallyHiddenLabel}>{label}</label>
  <span class="control">
    <select
      {id}
      bind:value
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : undefined}
      {...attributes}
    >
      {#if placeholder}<option value="" disabled>{placeholder}</option>{/if}
      {#each options as option (option.value)}
        <option value={option.value} disabled={option.disabled}>{option.label}</option>
      {/each}
    </select>
  </span>
  {#if hint}<p id={hintId} class="hint">{hint}</p>{/if}
  {#if error}<p id={errorId} class="error">{error}</p>{/if}
</div>

<style>
  div { display: grid; gap: 0.4rem; }
  label { color: var(--shimpz-color-text); font: 600 0.7rem/1.2 var(--shimpz-font-mono); letter-spacing: 0.07em; text-transform: uppercase; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); }
  .control { position: relative; display: grid; }
  .control::after { position: absolute; inset-block-start: 50%; inset-inline-end: 0.8rem; color: var(--shimpz-color-cyan); font: 700 0.75rem/1 var(--shimpz-font-mono); content: "⌄"; pointer-events: none; transform: translateY(-55%); }
  select { width: 100%; min-height: var(--shimpz-control-height); padding: 0.55rem 2.2rem 0.55rem 0.7rem; color: var(--shimpz-color-text); font: 400 1rem/1.25 var(--shimpz-font-sans); appearance: none; background: var(--shimpz-color-surface-raised); border: 1px solid var(--shimpz-color-border); border-radius: 0; clip-path: var(--shimpz-control-shape); }
  select:hover:not(:disabled) { border-color: var(--shimpz-color-text-muted); }
  select:focus { border-color: var(--shimpz-color-cyan); outline: 2px solid color-mix(in srgb, var(--shimpz-color-cyan) 35%, transparent); outline-offset: 1px; box-shadow: var(--shimpz-focus-ring); }
  select[aria-invalid="true"] { border-color: var(--shimpz-color-danger); }
  select:disabled { cursor: not-allowed; opacity: 0.45; }
  p { margin: 0; font-size: 0.8rem; line-height: 1.4; }
  .hint { color: var(--shimpz-color-text-muted); }
  .error { color: var(--shimpz-color-danger); }
  @media (pointer: coarse) { select { min-height: 2.75rem; } }
  @media (forced-colors: active) { .control::after { color: ButtonText; } select, select:focus, select[aria-invalid="true"] { border-color: FieldText; outline-color: Highlight; box-shadow: none; } }
</style>
