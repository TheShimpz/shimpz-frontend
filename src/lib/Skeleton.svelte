<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  type Props = HTMLAttributes<HTMLDivElement> & { width?: string; height?: string };
  let { width = "100%", height = "1rem", class: className, style, ...attributes }: Props = $props();
</script>
<div class={["shimpz-skeleton", className]} style={`width:${width};height:${height};${style ?? ""}`} aria-hidden="true" {...attributes}></div>
<style>
  div { max-width: 100%; background: linear-gradient(90deg, var(--shimpz-color-surface-raised), var(--shimpz-color-surface-high), var(--shimpz-color-surface-raised)); background-size: 200% 100%; animation: pulse 1.8s ease-in-out infinite; }
  @keyframes pulse { to { background-position: -200% 0; } }
</style>
