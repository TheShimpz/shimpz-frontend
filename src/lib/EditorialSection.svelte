<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    kicker?: string;
    title: string;
    lead?: string;
    titleId?: string;
    media?: Snippet;
    actions?: Snippet;
    children?: Snippet;
    mediaPosition?: "start" | "end";
    class?: string;
  };

  let {
    kicker,
    title,
    lead,
    titleId,
    media,
    actions,
    children,
    mediaPosition = "end",
    class: className,
  }: Props = $props();
</script>

<section
  data-slot="editorial-section"
  class={["shimpz-editorial-section", media && "has-media", `media-${mediaPosition}`, className]}
>
  <div class="copy">
    <header>
      {#if kicker}<p class="kicker">{kicker}</p>{/if}
      <h2 id={titleId}>{title}</h2>
      {#if lead}<p class="lead">{lead}</p>{/if}
    </header>
    {#if children}<div data-slot="editorial-section-content" class="content">{@render children()}</div>{/if}
    {#if actions}<div data-slot="editorial-section-actions" class="actions">{@render actions()}</div>{/if}
  </div>
  {#if media}<div data-slot="editorial-section-media" class="media">{@render media()}</div>{/if}
</section>

<style>
  section { display: grid; min-width: 0; align-items: center; gap: clamp(var(--shimpz-space-8), 7vw, var(--shimpz-space-16)); }
  section.has-media { grid-template-columns: minmax(18rem, .82fr) minmax(0, 1.18fr); }
  section.media-start .copy { order: 2; }
  section.media-start .media { order: 1; }
  .copy, .media, header { min-width: 0; }
  .kicker { margin: 0 0 var(--shimpz-space-4); color: var(--shimpz-color-cyan); font: 600 .68rem/1.4 var(--shimpz-font-mono); letter-spacing: .16em; text-transform: uppercase; }
  h2 { max-inline-size: var(--shimpz-type-section-measure); margin: 0; color: var(--shimpz-color-text); font: 650 var(--shimpz-type-section-size)/var(--shimpz-type-section-leading) var(--shimpz-font-sans); letter-spacing: var(--shimpz-type-section-tracking); text-wrap: balance; }
  .lead { max-inline-size: var(--shimpz-type-copy-measure); margin: var(--shimpz-space-5) 0 0; color: var(--shimpz-color-text-muted); line-height: 1.7; }
  .content { margin-block-start: var(--shimpz-space-6); }
  .actions { display: flex; flex-wrap: wrap; gap: var(--shimpz-space-3); margin-block-start: var(--shimpz-space-6); }
  @media (max-width: 760px) { section.has-media { grid-template-columns: 1fr; } section.media-start .copy, section.media-start .media { order: initial; } }
  @media (forced-colors: active) { h2 { color: CanvasText; } }
</style>
