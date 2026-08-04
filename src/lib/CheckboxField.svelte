<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = Omit<HTMLInputAttributes, "type" | "id" | "checked"> & { id: string; label: string; hint?: string; checked?: boolean };
  let { id, label, hint, checked = $bindable(false), class: className, ...attributes }: Props = $props();
</script>

<label class={["shimpz-checkbox", className]} for={id}>
  <input {id} type="checkbox" bind:checked {...attributes} />
  <span class="mark" aria-hidden="true"></span>
  <span class="copy"><strong>{label}</strong>{#if hint}<small>{hint}</small>{/if}</span>
</label>

<style>
  label { position: relative; display: grid; grid-template-columns: 1.25rem minmax(0, 1fr); align-items: start; gap: 0.7rem; cursor: pointer; }
  input { position: absolute; z-index: 1; inset-block-start: 0.1rem; inset-inline-start: 0; width: 1.15rem; height: 1.15rem; margin: 0; opacity: 0; cursor: pointer; }
  .mark { display: grid; width: 1.15rem; height: 1.15rem; place-items: center; margin-top: 0.1rem; pointer-events: none; background: var(--shimpz-color-surface-raised); border: 1px solid var(--shimpz-color-border); }
  input:checked + .mark { background: var(--shimpz-color-cyan); border-color: var(--shimpz-color-cyan); box-shadow: var(--shimpz-glow-cyan); }
  input:checked + .mark::after { color: var(--shimpz-color-bg); font: 700 0.8rem/1 var(--shimpz-font-mono); content: "✓"; }
  input:focus-visible + .mark { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  .copy { display: grid; gap: 0.2rem; } strong { color: var(--shimpz-color-text); font: 600 0.85rem/1.35 var(--shimpz-font-mono); } small { color: var(--shimpz-color-text-muted); font-size: 0.78rem; line-height: 1.4; }
  input:disabled ~ * { cursor: not-allowed; opacity: 0.45; }
</style>
