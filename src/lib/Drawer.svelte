<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLElement> & { open?: boolean; labelledBy: string; side?: "left" | "right" };
  let { children, open = false, labelledBy, side = "right", class: className, ...attributes }: Props = $props();
</script>

<aside class={["shimpz-drawer", `shimpz-drawer--${side}`, className]} aria-labelledby={labelledBy} hidden={!open} {...attributes}>{@render children?.()}</aside>

<style>
  aside { position: fixed; z-index: 70; inset-block: 0; width: min(92vw, 27rem); overflow: auto; padding: var(--shimpz-space-5); color: var(--shimpz-color-text); background: var(--shimpz-color-surface); box-shadow: -1.5rem 0 4rem rgb(0 0 0 / 68%); }
  .shimpz-drawer--right { inset-inline-end: 0; border-inline-start: 1px solid var(--shimpz-color-border); }
  .shimpz-drawer--left { inset-inline-start: 0; border-inline-end: 1px solid var(--shimpz-color-border); box-shadow: 2rem 0 5rem rgb(0 0 0 / 70%); }
  aside[hidden] { display: none !important; }
</style>
