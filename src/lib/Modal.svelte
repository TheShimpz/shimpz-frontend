<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";
  type Props = HTMLDialogAttributes & { element?: HTMLDialogElement; labelledBy: string };
  let { children, element = $bindable(), labelledBy, class: className, ...attributes }: Props = $props();
</script>

<dialog bind:this={element} class={["shimpz-modal", className]} aria-labelledby={labelledBy} {...attributes}>{@render children?.()}</dialog>

<style>
  dialog { width: min(94vw, 54rem); max-height: min(90vh, 56rem); padding: 0; overflow: auto; color: var(--shimpz-color-text); background: transparent; border: 0; }
  dialog::backdrop { background: rgb(0 0 0 / 84%); backdrop-filter: blur(3px); }
  dialog:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  @media (forced-colors: active) { dialog { background: Canvas; border: 1px solid CanvasText; } dialog::backdrop { background: Canvas; } }
</style>
