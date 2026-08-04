<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    kicker?: string;
    title: string;
    titleId: string;
    lead?: string;
    children: Snippet;
    footer?: Snippet;
  };

  let {
    kicker,
    title,
    titleId,
    lead,
    children,
    footer,
    class: className,
    ...attributes
  }: Props = $props();
</script>

<div class={["shimpz-dialog-frame", className]} {...attributes}>
  <header>
    {#if kicker}<p class="kicker">{kicker}</p>{/if}
    <h2 id={titleId}>{title}</h2>
    {#if lead}<p class="lead">{lead}</p>{/if}
  </header>
  <div class="body">{@render children()}</div>
  {#if footer}<footer>{@render footer()}</footer>{/if}
</div>

<style>
  .shimpz-dialog-frame {
    display: grid;
    max-height: calc(100dvh - 2rem);
    grid-template-rows: auto minmax(0, 1fr) auto;
    color: var(--shimpz-color-text);
    background: var(--shimpz-color-surface);
    border: 1px solid color-mix(in srgb, var(--shimpz-color-cyan) 60%, var(--shimpz-color-border));
    box-shadow: 0 1.5rem 5rem rgb(0 0 0 / 68%), var(--shimpz-glow-cyan);
    clip-path: polygon(
      0 0,
      calc(100% - var(--shimpz-cut-lg)) 0,
      100% var(--shimpz-cut-lg),
      100% 100%,
      var(--shimpz-cut-sm) 100%,
      0 calc(100% - var(--shimpz-cut-sm))
    );
  }

  header {
    display: grid;
    gap: var(--shimpz-space-2);
    padding: var(--shimpz-space-5) var(--shimpz-space-5) var(--shimpz-space-4);
  }

  .kicker {
    margin: 0;
    color: var(--shimpz-color-cyan);
    font: 600 0.68rem/1.35 var(--shimpz-font-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font: 700 clamp(1.25rem, 4vw, 1.65rem)/1.08 var(--shimpz-font-mono);
    letter-spacing: -0.035em;
  }

  .lead {
    max-width: 58ch;
    margin: 0;
    color: var(--shimpz-color-text-muted);
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .body {
    display: grid;
    min-height: 0;
    align-content: start;
    gap: var(--shimpz-space-3);
    padding: 0 var(--shimpz-space-5) var(--shimpz-space-5);
    overflow: auto;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--shimpz-space-2);
    padding: var(--shimpz-space-3) var(--shimpz-space-5) var(--shimpz-space-5);
  }

  footer :global(.shimpz-button),
  footer :global(.shimpz-action-link) {
    min-width: 7.5rem;
  }

  @media (max-width: 520px) {
    .shimpz-dialog-frame { max-height: calc(100dvh - 1rem); }
    header { padding: var(--shimpz-space-4) var(--shimpz-space-4) var(--shimpz-space-3); }
    .body { padding: 0 var(--shimpz-space-4) var(--shimpz-space-4); }
    footer { padding: var(--shimpz-space-3) var(--shimpz-space-4) var(--shimpz-space-4); }
  }

  @media (max-width: 380px) {
    footer { flex-direction: column-reverse; }
    footer :global(.shimpz-button),
    footer :global(.shimpz-action-link) { width: 100%; }
  }

  @media (forced-colors: active) {
    .shimpz-dialog-frame { border-color: CanvasText; box-shadow: none; clip-path: none; }
  }
</style>
