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

<div data-slot="notice" class={["shimpz-notice", `shimpz-notice--${variant}`, className]} {role} {...attributes}>
  <svg data-slot="notice-icon" class="icon" viewBox="0 0 24 24" aria-hidden="true">
    {#if variant === "success"}
      <circle cx="12" cy="12" r="10" />
      <path class="glyph" d="m7.6 12.2 2.8 2.8 6-6" />
    {:else if variant === "warning"}
      <path d="M10.3 3.1a2 2 0 0 1 3.4 0l8.1 14.1A2 2 0 0 1 20.1 20H3.9a2 2 0 0 1-1.7-2.8z" />
      <path class="glyph" d="M12 8v5.5M12 17h.01" />
    {:else if variant === "error"}
      <path d="m12 1.8 7.2 3 3 7.2-3 7.2-7.2 3-7.2-3-3-7.2 3-7.2z" />
      <path class="glyph" d="M12 7.5v6M12 17h.01" />
    {:else}
      <circle cx="12" cy="12" r="10" />
      <path class="glyph" d="M12 10v7M12 7h.01" />
    {/if}
  </svg>
  <div data-slot="notice-body" class="body">
    {#if title}
      <p class="title">{title}</p>
    {/if}
    <div class="content">{@render children?.()}</div>
  </div>
</div>

<style>
  .shimpz-notice {
    --notice-color: var(--shimpz-color-cyan);

    display: grid;
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: var(--shimpz-space-3);
    padding: var(--shimpz-space-3);
    color: var(--shimpz-color-text-muted);
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--notice-color) 8%, transparent),
        transparent 45%
      ),
      var(--shimpz-color-surface-raised);
    border: 0;
    border-inline-start: 3px solid var(--notice-color);
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

  .icon {
    width: 1.65rem;
    height: 1.65rem;
    flex: 0 0 auto;
    color: var(--notice-color);
    fill: currentColor;
  }

  .glyph {
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.2;
  }

  .body {
    display: grid;
    min-width: 0;
    gap: var(--shimpz-space-2);
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
      border-inline-start-color: CanvasText;
      box-shadow: none;
    }

    .icon { color: CanvasText; }
    .glyph { stroke: Canvas; }
  }
</style>
