<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLElement> & {
    title?: string;
    description?: string;
    header?: Snippet;
    action?: Snippet;
    footer?: Snippet;
    tone?: "default" | "accent" | "danger";
    padding?: "none" | "compact" | "default";
  };

  let {
    children,
    title,
    description,
    header,
    action,
    footer,
    tone = "default",
    padding = "default",
    class: className,
    ...attributes
  }: Props = $props();
</script>

<section class={["shimpz-card", `shimpz-card--${tone}`, `shimpz-card--${padding}`, className]} {...attributes}>
  {#if title || description || header || action}
    <header>
      <div class="heading">
        {#if header}{@render header()}{/if}
        {#if title}<h2>{title}</h2>{/if}
        {#if description}<p>{description}</p>{/if}
      </div>
      {#if action}<div class="action">{@render action()}</div>{/if}
    </header>
  {/if}
  <div class="content">{@render children?.()}</div>
  {#if footer}<footer>{@render footer()}</footer>{/if}
</section>

<style>
  section {
    --card-accent: var(--shimpz-color-border);
    display: grid;
    min-width: 0;
    color: var(--shimpz-color-text);
    background: var(--shimpz-color-surface);
    border: 1px solid var(--card-accent);
    clip-path: polygon(0 0, calc(100% - var(--shimpz-cut)) 0, 100% var(--shimpz-cut), 100% 100%, 0 100%);
  }
  .shimpz-card--accent { --card-accent: color-mix(in srgb, var(--shimpz-color-cyan) 52%, var(--shimpz-color-border)); }
  .shimpz-card--danger { --card-accent: color-mix(in srgb, var(--shimpz-color-danger) 68%, var(--shimpz-color-border)); }
  section > header { display: flex; min-width: 0; align-items: start; justify-content: space-between; gap: var(--shimpz-space-4); padding: var(--shimpz-card-padding); }
  .heading { display: grid; min-width: 0; gap: var(--shimpz-space-1); }
  h2 { margin: 0; font: 700 0.9rem/1.3 var(--shimpz-font-mono); letter-spacing: -0.015em; }
  p { margin: 0; color: var(--shimpz-color-text-muted); font-size: 0.82rem; line-height: 1.5; }
  .action { flex: 0 0 auto; }
  .content { min-width: 0; padding: 0 var(--shimpz-card-padding) var(--shimpz-card-padding); }
  section > footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: var(--shimpz-space-2); padding: var(--shimpz-space-3) var(--shimpz-card-padding); border-block-start: 1px solid var(--shimpz-color-border-subtle); }
  .shimpz-card--none > header { padding: 0; }
  .shimpz-card--none .content { padding: 0; }
  .shimpz-card--none > footer { padding-inline: 0; }
  .shimpz-card--compact { --shimpz-card-padding: var(--shimpz-space-3); }
  @media (max-width: 420px) { section { --shimpz-card-padding: var(--shimpz-space-4); } section > header { align-items: stretch; flex-direction: column; } }
  @media (forced-colors: active) { section { border-color: CanvasText; clip-path: none; } }
</style>
