<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    kicker?: string;
    title: string;
    lead?: string;
    titleId?: string;
    actions?: Snippet;
    actionsPosition?: "start" | "end";
    class?: string;
  };
  let { kicker, title, lead, titleId, actions, actionsPosition = "end", class: className }: Props = $props();
</script>

<header class={["shimpz-page-intro", `actions-${actionsPosition}`, className]}>
  <div>
    {#if kicker}<p class="kicker">{kicker}</p>{/if}
    <h1 id={titleId}>{title}</h1>
    {#if lead}<p class="lead">{lead}</p>{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</header>

<style>
  header { display: flex; min-width: 0; align-items: end; justify-content: space-between; gap: var(--shimpz-space-5); padding-block-end: var(--shimpz-space-4); border-block-end: 1px solid var(--shimpz-color-border); }
  header > div:first-child { min-width: 0; } .kicker { margin: 0 0 var(--shimpz-space-2); color: var(--shimpz-color-cyan); font: 600 0.68rem/1.4 var(--shimpz-font-mono); letter-spacing: 0.16em; text-transform: uppercase; }
  h1 { margin: 0; color: var(--shimpz-color-text); font: 700 clamp(1.65rem, 4vw, 3rem)/1.02 var(--shimpz-font-mono); letter-spacing: -0.045em; }
  .lead { max-width: 54rem; margin: var(--shimpz-space-2) 0 0; color: var(--shimpz-color-text-muted); font-size: 0.95rem; line-height: 1.55; }
  .actions { display: flex; flex: 0 0 auto; flex-wrap: wrap; gap: var(--shimpz-space-2); }
  header.actions-start > div:first-child { order: 2; text-align: end; }
  header.actions-start .actions { order: 1; }
  @media (max-width: 680px) { header { align-items: stretch; flex-direction: column; } }
</style>
