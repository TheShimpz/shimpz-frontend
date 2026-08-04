<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLDivElement> & {
    variant?: "info" | "success" | "warning" | "error";
    title?: string;
  };

  let {
    children,
    variant = "info",
    title,
    class: className,
    ...attributes
  }: Props = $props();

  const role = $derived(variant === "error" ? "alert" : "status");
</script>

<div class={["shimpz-notice", `shimpz-notice--${variant}`, className]} {role} {...attributes}>
  {#if title}
    <p class="title">{title}</p>
  {/if}
  <div class="content">{@render children?.()}</div>
</div>

<style>
  .shimpz-notice {
    --notice-color: var(--shimpz-color-cyan);

    display: grid;
    gap: var(--shimpz-space-2);
    padding: var(--shimpz-space-3);
    color: var(--shimpz-color-text-muted);
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--notice-color) 8%, transparent),
        transparent 45%
      ),
      var(--shimpz-color-surface-raised);
    border: 1px solid var(--shimpz-color-border);
    border-inline-start: 2px solid var(--notice-color);
  }

  .shimpz-notice--success {
    --notice-color: var(--shimpz-color-green);
  }

  .shimpz-notice--warning {
    --notice-color: var(--shimpz-color-yellow);
  }

  .shimpz-notice--error {
    --notice-color: var(--shimpz-color-danger);

    box-shadow: var(--shimpz-glow-danger);
  }

  .title {
    margin: 0;
    color: var(--notice-color);
    font: 700 0.7rem/1.3 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .content {
    font-size: 0.85rem;
    line-height: 1.55;
  }

  .content :global(p) {
    margin: 0;
  }

  @media (forced-colors: active) {
    .shimpz-notice {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
      box-shadow: none;
    }
  }
</style>
