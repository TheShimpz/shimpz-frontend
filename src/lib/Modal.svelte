<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";
  type Props = HTMLDialogAttributes & {
    element?: HTMLDialogElement;
    labelledBy: string;
    size?: "sm" | "md" | "lg" | "xl";
  };
  let {
    children,
    element = $bindable(),
    labelledBy,
    size = "md",
    class: className,
    ...attributes
  }: Props = $props();
</script>

<dialog
  bind:this={element}
  class={["shimpz-modal", `shimpz-modal--${size}`, className]}
  aria-labelledby={labelledBy}
  {...attributes}
>{@render children?.()}</dialog>

<style>
  dialog {
    --modal-max-width: var(--shimpz-dialog-md);
    width: min(calc(100dvw - 2rem), var(--modal-max-width));
    max-height: calc(100dvh - 2rem);
    padding: 0;
    overflow: auto;
    color: var(--shimpz-color-text);
    background: transparent;
    border: 0;
  }
  .shimpz-modal--sm { --modal-max-width: var(--shimpz-dialog-sm); }
  .shimpz-modal--lg { --modal-max-width: var(--shimpz-dialog-lg); }
  .shimpz-modal--xl { --modal-max-width: var(--shimpz-dialog-xl); }
  dialog::backdrop { background: rgb(0 0 0 / 84%); backdrop-filter: blur(3px); }
  dialog:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  @media (max-width: 420px) { dialog { width: min(calc(100dvw - 1rem), var(--modal-max-width)); max-height: calc(100dvh - 1rem); } }
  @media (forced-colors: active) { dialog { background: Canvas; border: 1px solid CanvasText; } dialog::backdrop { background: Canvas; } }
</style>
