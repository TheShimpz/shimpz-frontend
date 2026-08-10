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
    class?: string;
  };

  let {
    kicker,
    title,
    lead,
    titleId,
    media,
    meta,
    actions,
    class: className,
  }: Props = $props();
</script>

<section data-slot="editorial-hero" class={["shimpz-editorial-hero", className]}>
  <header>
    {#if kicker}<p class="kicker">{kicker}</p>{/if}
    <h1 id={titleId}>{title}</h1>
  </header>

  <div class:has-media={Boolean(media)} class="body">
    <div class="copy">
      {#if lead}<p class="lead">{lead}</p>{/if}
      {#if meta}<div data-slot="editorial-hero-meta" class="meta">{@render meta()}</div>{/if}
      {#if actions}<div data-slot="editorial-hero-actions" class="actions">{@render actions()}</div>{/if}
    </div>
    {#if media}<div data-slot="editorial-hero-media" class="media">{@render media()}</div>{/if}
  </div>
</section>

<style>
  section { display: grid; min-width: 0; gap: clamp(var(--shimpz-space-8), 5vw, var(--shimpz-space-16)); }
  header, .copy { min-width: 0; }
  .kicker { margin: 0 0 var(--shimpz-space-4); color: var(--shimpz-color-cyan); font: 600 .68rem/1.4 var(--shimpz-font-mono); letter-spacing: .16em; text-transform: uppercase; }
  h1 { max-inline-size: var(--shimpz-type-display-measure); margin: 0; color: var(--shimpz-color-text); font: 680 var(--shimpz-type-display-size)/var(--shimpz-type-display-leading) var(--shimpz-font-sans); letter-spacing: var(--shimpz-type-display-tracking); text-wrap: balance; }
  .body { display: grid; min-width: 0; gap: clamp(var(--shimpz-space-8), 6vw, var(--shimpz-space-16)); align-items: center; }
  .body.has-media { grid-template-columns: minmax(18rem, .72fr) minmax(0, 1.28fr); }
  .lead { max-inline-size: var(--shimpz-type-copy-measure); margin: 0; color: var(--shimpz-color-text-muted); font-size: clamp(1rem, 1.5vw, 1.2rem); line-height: 1.65; }
  .meta { margin-block-start: var(--shimpz-space-6); }
  .actions { display: flex; flex-wrap: wrap; gap: var(--shimpz-space-3); margin-block-start: var(--shimpz-space-4); }
  .media { min-width: 0; }
  @media (max-width: 760px) { section { gap: var(--shimpz-space-8); } .body.has-media { grid-template-columns: 1fr; } }
  @media (forced-colors: active) { h1 { color: CanvasText; } }
</style>
