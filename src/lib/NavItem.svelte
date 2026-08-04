<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  type Props = HTMLAnchorAttributes & { active?: boolean; index?: string };
  let { children, active = false, index, class: className, ...attributes }: Props = $props();
</script>
<a class={["shimpz-nav-item", active && "is-active", className]} aria-current={active ? "page" : undefined} {...attributes}>
  <span class="label">{@render children?.()}</span>{#if index}<span class="index" aria-hidden="true">// {index}</span>{/if}
</a>
<style>
  a { position: relative; display: flex; min-height: 4.25rem; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.2rem; color: var(--shimpz-color-text); font: 700 0.8rem/1 var(--shimpz-font-mono); letter-spacing: 0.12em; text-decoration: none; text-transform: uppercase; background: var(--shimpz-color-surface); border: 1px solid var(--shimpz-color-border); }
  a::before { position: absolute; inset-block: 0; inset-inline-start: 0; width: 3px; background: var(--shimpz-color-cyan); content: ""; opacity: 0; }
  a:hover,.is-active { color: var(--shimpz-color-cyan); border-color: color-mix(in srgb,var(--shimpz-color-cyan) 65%,var(--shimpz-color-border)); background: linear-gradient(90deg,rgb(0 240 255 / 8%),transparent 65%),var(--shimpz-color-surface); }
  a:hover::before,.is-active::before { opacity: 1; } .index { color: var(--shimpz-color-text-dim); font-size: 0.65rem; }
  a:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
</style>
