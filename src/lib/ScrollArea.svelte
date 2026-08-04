<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { maxHeight?: string };
  let { children, maxHeight, class: className, style, ...attributes }: Props = $props();
</script>
<div class={["shimpz-scroll-area", className]} style={maxHeight ? `max-height:${maxHeight};${style ?? ""}` : style} {...attributes}>{@render children?.()}</div>
<style>
  div { min-width: 0; min-height: 0; overflow: auto; overscroll-behavior: contain; scrollbar-color: var(--shimpz-color-border) transparent; scrollbar-width: thin; }
  div::-webkit-scrollbar { width: 0.45rem; height: 0.45rem; }
  div::-webkit-scrollbar-thumb { background: var(--shimpz-color-border); }
</style>
