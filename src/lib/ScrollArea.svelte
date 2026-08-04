<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { maxHeight?: string; element?: HTMLDivElement };
  let { children, maxHeight, element = $bindable(), class: className, style, ...attributes }: Props = $props();
</script>
<!-- svelte-ignore a11y_no_noninteractive_tabindex (overflow regions must be keyboard-scrollable) -->
<div bind:this={element} class={["shimpz-scroll-area", className]} role="region" tabindex="0" style={maxHeight ? `max-height:${maxHeight};${style ?? ""}` : style} {...attributes}>{@render children?.()}</div>
<style>
  div { min-width: 0; min-height: 0; overflow: auto; overscroll-behavior: contain; scrollbar-color: var(--shimpz-color-border) transparent; scrollbar-width: thin; }
  div::-webkit-scrollbar { width: 0.45rem; height: 0.45rem; }
  div::-webkit-scrollbar-thumb { background: var(--shimpz-color-border); }
</style>
