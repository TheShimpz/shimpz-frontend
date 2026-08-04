<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  type Props = HTMLAttributes<HTMLElement> & { variant?: "user" | "assistant" | "system"; author?: string; meta?: Snippet; actions?: Snippet };
  let { children, variant = "assistant", author, meta, actions, class: className, ...attributes }: Props = $props();
</script>
<article class={["shimpz-message", `shimpz-message--${variant}`, className]} aria-label={author} {...attributes}>
  {#if author || meta}<header>{#if author}<strong>{author}</strong>{/if}{#if meta}<div>{@render meta()}</div>{/if}</header>{/if}
  <div class="content">{@render children?.()}</div>
  {#if actions}<footer>{@render actions()}</footer>{/if}
</article>
<style>
  article { display: grid; width: fit-content; max-width: min(48rem, 92%); min-width: 0; gap: var(--shimpz-space-2); color: var(--shimpz-color-text); }
  .shimpz-message--user { justify-self: end; padding: var(--shimpz-space-3) var(--shimpz-space-4); background: var(--shimpz-color-surface-high); border: 1px solid var(--shimpz-color-border); clip-path: polygon(var(--shimpz-cut) 0, 100% 0, 100% calc(100% - var(--shimpz-cut)), calc(100% - var(--shimpz-cut)) 100%, 0 100%, 0 var(--shimpz-cut)); }
  .shimpz-message--assistant { width: 100%; max-width: 100%; }
  .shimpz-message--system { max-width: 100%; padding: var(--shimpz-space-3); color: var(--shimpz-color-text-muted); background: var(--shimpz-color-surface-raised); border-inline-start: 2px solid var(--shimpz-color-cyan); }
  header { display: flex; min-width: 0; align-items: center; justify-content: space-between; gap: var(--shimpz-space-3); color: var(--shimpz-color-text-dim); font: 600 0.65rem/1.4 var(--shimpz-font-mono); letter-spacing: 0.05em; text-transform: uppercase; }
  .content { min-width: 0; font-size: 0.95rem; line-height: 1.65; }
  footer { display: flex; flex-wrap: wrap; gap: var(--shimpz-space-2); }
</style>
