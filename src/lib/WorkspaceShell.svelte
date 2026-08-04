<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = { sidebar: Snippet; header?: Snippet; children: Snippet; skipLabel?: string; mainId?: string; class?: string };
  let { sidebar, header, children, skipLabel = "Skip to content", mainId = "shimpz-main", class: className }: Props = $props();
</script>
<a class="skip" href={`#${mainId}`}>{skipLabel}</a>
<div class={["shimpz-workspace-shell", className]}>
  <aside>{@render sidebar()}</aside>
  <div class="stage">
    {#if header}<header>{@render header()}</header>{/if}
    <main id={mainId} tabindex="-1">{@render children()}</main>
  </div>
</div>
<style>
  .skip { position: fixed; z-index: 100; inset-block-start: 0.75rem; inset-inline-start: 0.75rem; padding: 0.65rem 0.8rem; color: var(--shimpz-color-bg); background: var(--shimpz-color-yellow); font: 700 0.75rem/1 var(--shimpz-font-mono); transform: translateY(-200%); }
  .skip:focus { transform: none; }
  .shimpz-workspace-shell { display: grid; min-height: 100vh; grid-template-columns: minmax(16rem, 21rem) minmax(0, 1fr); background: var(--shimpz-color-bg); }
  aside { position: sticky; top: 0; height: 100vh; overflow: auto; background: var(--shimpz-color-surface); border-inline-end: 1px solid var(--shimpz-color-border); }
  .stage { min-width: 0; } header { position: sticky; z-index: 20; top: 0; min-height: 4.25rem; background: rgb(0 0 0 / 92%); border-block-end: 1px solid var(--shimpz-color-border); backdrop-filter: blur(12px); }
  main { min-width: 0; min-height: 100vh; }
  @media (max-width: 820px) { .shimpz-workspace-shell { grid-template-columns: 1fr; } aside { position: relative; height: auto; border-inline-end: 0; border-block-end: 1px solid var(--shimpz-color-border); } }
</style>
