<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = Omit<HTMLInputAttributes, "id" | "value"> & {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    value?: string;
    variant?: "text" | "code";
  };

  let {
    id,
    label,
    hint,
    error,
    value = $bindable(""),
    variant = "text",
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

<div class={["shimpz-field", `shimpz-field--${variant}`, className]}>
  <label for={id}>{label}</label>
  <input
    {id}
    bind:value
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : undefined}
    {...attributes}
  />
  {#if hint}
    <p id={hintId} class="hint">{hint}</p>
  {/if}
  {#if error}
    <p id={errorId} class="error">{error}</p>
  {/if}
</div>

<style>
  div {
    display: grid;
    gap: 0.4rem;
  }

  label {
    color: var(--shimpz-color-text);
    font: 600 0.7rem/1.2 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  input {
    min-height: var(--shimpz-control-height);
    padding: 0.55rem 0.7rem;
    color: var(--shimpz-color-text);
    font: 400 1rem/1.25 var(--shimpz-font-sans);
    background: var(--shimpz-color-surface-raised);
    border: 1px solid var(--shimpz-color-border);
    border-radius: 0;
    transition:
      border-color var(--shimpz-duration-fast) var(--shimpz-ease),
      box-shadow var(--shimpz-duration-fast) var(--shimpz-ease);
  }

  .shimpz-field--code input {
    font-family: var(--shimpz-font-mono);
    font-size: 0.92rem;
    letter-spacing: 0.025em;
  }

  input:hover:not(:disabled) {
    border-color: var(--shimpz-color-text-muted);
  }

  input:focus {
    border-color: var(--shimpz-color-cyan);
    outline: 2px solid color-mix(in srgb, var(--shimpz-color-cyan) 35%, transparent);
    outline-offset: 1px;
    box-shadow: var(--shimpz-focus-ring);
  }

  input[aria-invalid="true"] {
    border-color: var(--shimpz-color-danger);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .hint {
    color: var(--shimpz-color-text-muted);
  }

  .error {
    color: var(--shimpz-color-danger);
  }

  @media (forced-colors: active) {
    input,
    input:focus,
    input[aria-invalid="true"] {
      border-color: FieldText;
      outline-color: Highlight;
      box-shadow: none;
    }
  }

  @media (pointer: coarse) {
    input {
      min-height: 2.75rem;
    }
  }
</style>
