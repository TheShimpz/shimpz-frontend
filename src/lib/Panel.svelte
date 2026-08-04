<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { tone?: "default" | "accent" | "danger"; padding?: "none" | "compact" | "default" };
  let { children, tone = "default", padding = "default", class: className, ...attributes }: Props = $props();
</script>

<div class={["shimpz-panel", `shimpz-panel--${tone}`, `shimpz-panel--${padding}`, className]} {...attributes}>{@render children?.()}</div>

<style>
  .shimpz-panel { min-width: 0; color: var(--shimpz-color-text); background: var(--shimpz-color-surface); border: 1px solid var(--shimpz-color-border); clip-path: polygon(0 0, calc(100% - var(--shimpz-cut-lg)) 0, 100% var(--shimpz-cut-lg), 100% 100%, var(--shimpz-cut-sm) 100%, 0 calc(100% - var(--shimpz-cut-sm))); }
  .shimpz-panel--default { box-shadow: var(--shimpz-glow-cyan); }
  .shimpz-panel--accent { border-color: color-mix(in srgb, var(--shimpz-color-cyan) 60%, var(--shimpz-color-border)); box-shadow: var(--shimpz-glow-cyan); }
  .shimpz-panel--danger { border-color: var(--shimpz-color-danger); box-shadow: var(--shimpz-glow-danger); }
  .shimpz-panel--default { padding: var(--shimpz-space-5); } .shimpz-panel--compact { padding: var(--shimpz-space-3); } .shimpz-panel--none { padding: 0; }
  @media (forced-colors: active) { .shimpz-panel { border-color: CanvasText; box-shadow: none; clip-path: none; } }
</style>
