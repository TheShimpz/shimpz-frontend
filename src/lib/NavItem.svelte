<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  type Props = HTMLAnchorAttributes & { active?: boolean; index?: string };
  let { children, active = false, index, class: className, ...attributes }: Props = $props();
</script>
<a class={["shimpz-nav-item", active && "is-active", className]} aria-current={active ? "page" : undefined} {...attributes}>
  <span class="label">{@render children?.()}</span>{#if index}<span class="index" aria-hidden="true">// {index}</span>{/if}
</a>
<style>
  a { position: relative; display: flex; min-height: 3.25rem; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem 0.9rem; color: var(--shimpz-color-text); font: 700 0.72rem/1 var(--shimpz-font-mono); letter-spacing: 0.09em; text-decoration: none; text-transform: uppercase; background: transparent; border: 1px solid var(--shimpz-color-border-subtle); }
  a::before { position: absolute; inset-block: 0; inset-inline-start: 0; width: 2px; background: var(--shimpz-color-cyan); content: ""; opacity: 0; }
  a:hover,.is-active { color: var(--shimpz-color-cyan); border-color: color-mix(in srgb,var(--shimpz-color-cyan) 48%,var(--shimpz-color-border)); background: linear-gradient(90deg,rgb(0 240 255 / 5%),transparent 62%); }
  a:hover::before,.is-active::before { opacity: 1; } .index { color: var(--shimpz-color-text-dim); font-size: 0.65rem; }
  a:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  @media (pointer: coarse) { a { min-height: 3.5rem; } }
</style>
