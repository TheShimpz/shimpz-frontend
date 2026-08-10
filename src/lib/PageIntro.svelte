<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    kicker?: string;
    title: string;
    lead?: string;
    titleId?: string;
    media?: Snippet;
    meta?: Snippet;
    actions?: Snippet;
    actionsPosition?: "start" | "end";
    class?: string;
  };
  let { kicker, title, lead, titleId, media, meta, actions, actionsPosition = "end", class: className }: Props = $props();
</script>

<header class={["shimpz-page-intro", media && "has-media", `actions-${actionsPosition}`, className]}>
  {#if media}<div data-slot="page-intro-media" class="media">{@render media()}</div>{/if}
  <div class="copy">
    {#if kicker}<p class="kicker">{kicker}</p>{/if}
    <h1 id={titleId}>{title}</h1>
    {#if lead}<p class="lead">{lead}</p>{/if}
    {#if meta}<div data-slot="page-intro-meta" class="meta">{@render meta()}</div>{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</header>

<style>
  header { display: flex; min-width: 0; align-items: end; justify-content: space-between; gap: var(--shimpz-space-5); padding-block-end: var(--shimpz-space-4); border-block-end: 1px solid var(--shimpz-color-border); }
  .copy { min-width: 0; } .kicker { margin: 0 0 var(--shimpz-space-2); color: var(--shimpz-color-cyan); font: 600 0.68rem/1.4 var(--shimpz-font-mono); letter-spacing: 0.16em; text-transform: uppercase; }
  h1 { margin: 0; color: var(--shimpz-color-text); font: 700 clamp(1.65rem, 4vw, 3rem)/1.02 var(--shimpz-font-mono); letter-spacing: -0.045em; }
  .lead { max-width: 54rem; margin: var(--shimpz-space-2) 0 0; color: var(--shimpz-color-text-muted); font-size: 0.95rem; line-height: 1.55; }
  .media { display: grid; flex: 0 0 auto; place-items: center; align-self: start; padding: var(--shimpz-space-3); color: var(--shimpz-color-text); background: var(--shimpz-color-bg); border: 1px solid var(--shimpz-color-border); clip-path: polygon(var(--shimpz-cut) 0,100% 0,100% calc(100% - var(--shimpz-cut)),calc(100% - var(--shimpz-cut)) 100%,0 100%,0 var(--shimpz-cut)); }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--shimpz-space-2) var(--shimpz-space-3); margin-block-start: var(--shimpz-space-3); }
  .actions { display: flex; flex: 0 0 auto; flex-wrap: wrap; gap: var(--shimpz-space-2); }
  header.actions-start .copy { order: 2; text-align: end; }
  header.actions-start .actions { order: 1; }
  @media (max-width: 680px) { header { align-items: stretch; flex-direction: column; } }
</style>
