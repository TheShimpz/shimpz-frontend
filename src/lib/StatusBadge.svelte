<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "info" | "success" | "warning" | "danger" };
  let { children, tone = "neutral", class: className, ...attributes }: Props = $props();
</script>
<span class={["shimpz-status", `shimpz-status--${tone}`, className]} {...attributes}>{@render children?.()}</span>
<style>
  span { --status: var(--shimpz-color-text-muted); display: inline-flex; width: fit-content; align-items: center; padding: 0.28rem 0.45rem; color: var(--status); font: 700 0.61rem/1 var(--shimpz-font-mono); letter-spacing: 0.07em; text-transform: uppercase; background: color-mix(in srgb, var(--status) 6%, transparent); border: 1px solid color-mix(in srgb, var(--status) 45%, var(--shimpz-color-border)); }
  .shimpz-status--info { --status: var(--shimpz-color-cyan); } .shimpz-status--success { --status: var(--shimpz-color-green); } .shimpz-status--warning { --status: var(--shimpz-color-yellow); } .shimpz-status--danger { --status: var(--shimpz-color-danger); }
</style>
