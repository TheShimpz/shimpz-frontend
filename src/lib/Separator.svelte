<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical"; decorative?: boolean };
  let { orientation = "horizontal", decorative = true, class: className, ...attributes }: Props = $props();
</script>
<div class={["shimpz-separator", `shimpz-separator--${orientation}`, className]} role={decorative ? "none" : "separator"} aria-orientation={decorative ? undefined : orientation} {...attributes}></div>
<style>
  div { flex: 0 0 auto; background: var(--shimpz-color-border-subtle); }
  .shimpz-separator--horizontal { width: 100%; height: 1px; }
  .shimpz-separator--vertical { width: 1px; height: 100%; }
</style>
