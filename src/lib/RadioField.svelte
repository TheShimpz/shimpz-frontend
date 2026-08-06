<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = Omit<HTMLInputAttributes, "type" | "id" | "value" | "checked"> & {
    id: string;
    label: string;
    description?: string;
    optionValue: string;
    value?: string;
  };

  let {
    id,
    label,
    description,
    optionValue,
    value = $bindable(""),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<label class={["shimpz-radio-field", className]} for={id}>
  <input {id} type="radio" value={optionValue} bind:group={value} {...attributes} />
  <span class="mark" aria-hidden="true"></span>
  <span class="copy">
    <strong>{label}</strong>
    {#if description}<small>{description}</small>{/if}
  </span>
</label>

<style>
  label { position: relative; display: grid; min-height: 3.25rem; grid-template-columns: 1.125rem minmax(0, 1fr); align-items: center; gap: var(--shimpz-space-3); padding: 0.65rem var(--shimpz-space-3); cursor: pointer; background: var(--shimpz-color-surface-raised); border: 1px solid var(--shimpz-color-border-subtle); }
  input { position: absolute; z-index: 1; inset-block-start: 50%; inset-inline-start: var(--shimpz-space-3); width: 1.15rem; height: 1.15rem; margin: 0; opacity: 0; cursor: pointer; transform: translateY(-50%); }
  .mark { display: grid; width: 1.15rem; height: 1.15rem; place-items: center; border: 1px solid var(--shimpz-color-border); border-radius: 50%; }
  input:checked + .mark { border-color: var(--shimpz-color-cyan); box-shadow: var(--shimpz-glow-cyan); }
  input:checked + .mark::after { width: 0.55rem; height: 0.55rem; background: var(--shimpz-color-cyan); border-radius: 50%; box-shadow: 0 0 0.7rem color-mix(in srgb, var(--shimpz-color-cyan) 55%, transparent); content: ""; }
  input:checked ~ .copy strong { color: var(--shimpz-color-cyan); }
  input:focus-visible + .mark { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  input:disabled ~ * { cursor: not-allowed; opacity: 0.45; }
  .copy { display: grid; min-width: 0; gap: 0.15rem; }
  strong { color: var(--shimpz-color-text); font: 700 0.76rem/1.3 var(--shimpz-font-mono); letter-spacing: 0.035em; }
  small { color: var(--shimpz-color-text-dim); font: 500 0.7rem/1.4 var(--shimpz-font-sans); }
  label:hover:not(:has(input:disabled)) { background: color-mix(in srgb, var(--shimpz-color-cyan) 6%, var(--shimpz-color-surface-raised)); border-color: color-mix(in srgb, var(--shimpz-color-cyan) 55%, var(--shimpz-color-border)); }
  @media (pointer: coarse) { label { min-height: 3.5rem; } }
  @media (forced-colors: active) { label { color: ButtonText; background: ButtonFace; border-color: ButtonText; } .mark { border-color: ButtonText; } input:checked + .mark::after { background: Highlight; } }
</style>
