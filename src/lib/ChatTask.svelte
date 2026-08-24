<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type State = "pending" | "working" | "complete" | "cancelled" | "failed";
  type Props = HTMLAttributes<HTMLElement> & {
    label: string;
    title: string;
    description?: string;
    state?: State;
    status: string;
    details?: Snippet;
  };

  let {
    label,
    title,
    description,
    state = "pending",
    status,
    details,
    class: className,
    ...attributes
  }: Props = $props();
</script>

<section
  data-slot="chat-task"
  data-state={state}
  class={["shimpz-chat-task", `shimpz-chat-task--${state}`, className]}
  aria-label={title}
  {...attributes}
>
  <header data-slot="chat-task-header">
    <span class="label">{label}</span>
    <span data-slot="chat-task-status" class="status" aria-live="polite">{status}</span>
  </header>
  <div data-slot="chat-task-body" class="body">
    <span class="signal" aria-hidden="true"></span>
    <div>
      <strong>{title}</strong>
      {#if description}<p>{description}</p>{/if}
    </div>
  </div>
  {#if details}<div data-slot="chat-task-details" class="details">{@render details()}</div>{/if}
</section>

<style>
  .shimpz-chat-task {
    --task-color: var(--shimpz-color-cyan);

    position: relative;
    display: grid;
    width: min(100%, 38rem);
    box-sizing: border-box;
    gap: var(--shimpz-space-3);
    padding: var(--shimpz-space-3) var(--shimpz-space-4);
    overflow: hidden;
    color: var(--shimpz-color-text);
    background:
      linear-gradient(110deg, color-mix(in srgb, var(--task-color) 9%, transparent), transparent 55%),
      var(--shimpz-color-surface-raised);
    border: 1px solid color-mix(in srgb, var(--task-color) 42%, var(--shimpz-color-border));
    clip-path: polygon(
      var(--shimpz-cut) 0,
      100% 0,
      100% calc(100% - var(--shimpz-cut)),
      calc(100% - var(--shimpz-cut)) 100%,
      0 100%,
      0 var(--shimpz-cut)
    );
  }

  .shimpz-chat-task::after {
    position: absolute;
    inset: auto 0 0;
    height: 2px;
    content: "";
    background: var(--task-color);
    transform: scaleX(0.32);
    transform-origin: left;
    opacity: 0.8;
  }

  .shimpz-chat-task--working { --task-color: var(--shimpz-color-yellow); }
  .shimpz-chat-task--complete { --task-color: var(--shimpz-color-green); }
  .shimpz-chat-task--cancelled { --task-color: var(--shimpz-color-text-dim); }
  .shimpz-chat-task--failed { --task-color: var(--shimpz-color-danger); }

  .shimpz-chat-task--working::after {
    animation: shimpz-chat-task-progress 1.6s ease-in-out infinite alternate;
  }

  header {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: var(--shimpz-space-3);
    color: var(--task-color);
    font: 700 0.62rem/1.3 var(--shimpz-font-mono);
    letter-spacing: 0.075em;
    text-transform: uppercase;
  }

  .label,
  .status {
    min-width: 0;
  }

  .status {
    text-align: end;
  }

  .body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: var(--shimpz-space-3);
  }

  .signal {
    width: 0.65rem;
    height: 0.65rem;
    margin-top: 0.32rem;
    background: var(--task-color);
    box-shadow: 0 0 16px color-mix(in srgb, var(--task-color) 65%, transparent);
  }

  strong {
    display: block;
    font: 650 0.92rem/1.4 var(--shimpz-font-sans);
  }

  p {
    margin: var(--shimpz-space-1) 0 0;
    color: var(--shimpz-color-text-muted);
    font-size: 0.83rem;
    line-height: 1.55;
  }

  .details {
    min-width: 0;
    padding-top: var(--shimpz-space-2);
    color: var(--shimpz-color-text-dim);
    font: 500 0.68rem/1.5 var(--shimpz-font-mono);
    border-top: 1px solid var(--shimpz-color-border-subtle);
  }

  @keyframes shimpz-chat-task-progress {
    from { transform: scaleX(0.18); }
    to { transform: scaleX(0.82); }
  }

  @media (prefers-reduced-motion: reduce) {
    .shimpz-chat-task--working::after {
      animation: none;
      transform: scaleX(0.6);
    }
  }

  @media (forced-colors: active) {
    .shimpz-chat-task {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
    }

    .shimpz-chat-task::after,
    .signal { background: CanvasText; box-shadow: none; }
    header, p, .details { color: CanvasText; }
  }
</style>
