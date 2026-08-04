<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  type Props = HTMLAttributes<HTMLElement> & { title: string; description?: string; icon?: Snippet; actions?: Snippet; compact?: boolean };
  let { children, title, description, icon, actions, compact = false, class: className, ...attributes }: Props = $props();
</script>

<section class={["shimpz-empty-state", compact && "is-compact", className]} {...attributes}>
  {#if icon}<div class="icon" aria-hidden="true">{@render icon()}</div>{/if}
  <div class="copy"><h2>{title}</h2>{#if description}<p>{description}</p>{/if}</div>
  {#if children}<div class="content">{@render children()}</div>{/if}
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</section>

<style>
  section { display: grid; width: min(100%, var(--shimpz-content-width-narrow)); min-width: 0; justify-items: center; gap: var(--shimpz-space-4); padding: var(--shimpz-space-10) var(--shimpz-space-6); margin: auto; text-align: center; }
  .is-compact { gap: var(--shimpz-space-3); padding: var(--shimpz-space-6) var(--shimpz-space-4); }
  .icon { display: grid; width: 3rem; height: 3rem; place-items: center; color: var(--shimpz-color-cyan); background: color-mix(in srgb, var(--shimpz-color-cyan) 7%, transparent); border: 1px solid color-mix(in srgb, var(--shimpz-color-cyan) 48%, var(--shimpz-color-border)); clip-path: polygon(var(--shimpz-cut) 0, 100% 0, 100% calc(100% - var(--shimpz-cut)), calc(100% - var(--shimpz-cut)) 100%, 0 100%, 0 var(--shimpz-cut)); }
  .copy { display: grid; gap: var(--shimpz-space-2); }
  h2 { margin: 0; font: 700 clamp(1rem, 3vw, 1.35rem)/1.2 var(--shimpz-font-mono); letter-spacing: -0.025em; }
  p { max-width: 42rem; margin: 0; color: var(--shimpz-color-text-muted); font-size: 0.9rem; line-height: 1.6; }
  .content { width: 100%; min-width: 0; }
  .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--shimpz-space-2); }
</style>
