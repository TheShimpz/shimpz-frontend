<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { align?: "start" | "between" | "end"; wrap?: boolean };
  let { children, align = "start", wrap = true, class: className, ...attributes }: Props = $props();
</script>
<div class={["shimpz-toolbar", `shimpz-toolbar--${align}`, wrap && "can-wrap", className]} role="toolbar" {...attributes}>{@render children?.()}</div>
<style>
  div { display: flex; min-width: 0; align-items: center; gap: var(--shimpz-space-2); }
  .can-wrap { flex-wrap: wrap; }
  .shimpz-toolbar--between { justify-content: space-between; }
  .shimpz-toolbar--end { justify-content: flex-end; }
</style>
