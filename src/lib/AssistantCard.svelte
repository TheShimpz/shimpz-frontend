<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import AssistantIcon from "./AssistantIcon.svelte";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    name: string;
    meta: string;
    summary: string;
    iconSrc?: string;
    iconLoading?: "eager" | "lazy";
    badge: string;
    badgeTone?: "free" | "local";
    href?: string;
    installed?: boolean;
    actionLabel?: string;
    actionDisabled?: boolean;
    actionTone?: "install" | "danger";
    actionIcon?: "add" | "uninstall";
    actionPersistent?: boolean;
    actionStatus?: string;
    actionError?: boolean;
    onaction?: () => void;
    element?: HTMLElement;
  };

  let {
    name,
    meta,
    summary,
    iconSrc,
    iconLoading = "eager",
    badge,
    badgeTone = "free",
    href,
    installed = false,
    actionLabel,
    actionDisabled = false,
    actionTone = "install",
    actionIcon = "add",
    actionPersistent = false,
    actionStatus,
    actionError = false,
    onaction,
    element = $bindable(),
    class: className,
    ...attributes
  }: Props = $props();
</script>

<article
  bind:this={element}
  data-slot="assistant-card"
  class={["shimpz-assistant-card", installed && "is-installed", className]}
  {...attributes}
>
  <div class="assistant-details">
    <div class="assistant-heading">
      <AssistantIcon assistant={name} size={64} src={iconSrc} loading={iconLoading} />
      <div class="assistant-identity">
        <h2 title={name}>
          {#if href}
            <a class="assistant-link" {href}>{name}</a>
          {:else}
            {name}
          {/if}
        </h2>
        <p>{meta}</p>
      </div>
      <span class:local={badgeTone === "local"} class="assistant-badge">{badge}</span>
    </div>
    <p class="assistant-summary">{summary}</p>
  </div>

  {#if actionLabel}
    <div class:persistent={actionPersistent} class="assistant-action">
      <button
        class:danger={actionTone === "danger"}
        class="assistant-action-button"
        type="button"
        disabled={actionDisabled}
        onclick={onaction}
      >
        <svg
          aria-hidden="true"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="square"
          stroke-linejoin="miter"
        >
          {#if actionIcon === "uninstall"}
            <path d="M5 4h9v16H5zM14 9h5v6h-5M10 12h9M16.5 9.5 19 12l-2.5 2.5" />
          {:else}
            <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M12 7v10M7 12h10" />
          {/if}
        </svg>
        {actionLabel}
      </button>

      {#if actionStatus}
        <p class:error={actionError} class="assistant-action-status" role={actionError ? "alert" : "status"}>
          {actionStatus}
        </p>
      {/if}
    </div>
  {/if}
</article>

<style>
  article {
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background: linear-gradient(180deg, var(--shimpz-color-surface-raised), var(--shimpz-color-surface));
    clip-path: polygon(
      var(--shimpz-cut-lg) 0,
      100% 0,
      100% calc(100% - var(--shimpz-cut-lg)),
      calc(100% - var(--shimpz-cut-lg)) 100%,
      0 100%,
      0 var(--shimpz-cut-lg)
    );
    box-shadow: inset 0 0 0 1px var(--shimpz-color-border-subtle);
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s var(--shimpz-ease);
  }

  article:hover,
  article:focus-within {
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--shimpz-color-cyan) 5%, var(--shimpz-color-surface-raised)),
      var(--shimpz-color-surface)
    );
    transform: translateY(-2px);
  }

  article.is-installed {
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--shimpz-color-green) 58%, var(--shimpz-color-border));
  }

  article.is-installed:hover,
  article.is-installed:focus-within {
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--shimpz-color-green) 5%, var(--shimpz-color-surface-raised)),
      var(--shimpz-color-surface)
    );
  }

  .assistant-details {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    padding: 1rem;
  }

  .assistant-heading {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
  }

  .assistant-identity { min-width: 0; }
  .assistant-identity h2 {
    overflow: hidden;
    margin: 0;
    font: 600 1.05rem/1.2 var(--shimpz-font-mono);
    letter-spacing: -0.04em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .assistant-link { color: inherit; text-decoration: none; }
  .assistant-link::after { position: absolute; z-index: 1; content: ""; inset: 0; }
  .assistant-identity p {
    overflow: hidden;
    margin: 0.25rem 0 0;
    color: var(--shimpz-color-text-dim);
    font: 400 0.62rem/1.5 var(--shimpz-font-mono);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .assistant-badge {
    align-self: start;
    border: 1px solid color-mix(in oklab, var(--shimpz-color-green) 38%, var(--shimpz-color-border));
    padding: 0.22rem 0.4rem;
    color: var(--shimpz-color-green);
    font: 700 0.54rem/1.5 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .assistant-badge.local {
    border-color: color-mix(in oklab, var(--shimpz-color-yellow) 45%, var(--shimpz-color-border));
    color: var(--shimpz-color-yellow);
  }

  .assistant-summary {
    display: -webkit-box;
    margin: 0.5rem 0 0;
    overflow: hidden;
    color: var(--shimpz-color-text-muted);
    font-size: 0.84rem;
    line-height: 1.55;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .assistant-action {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 2.5rem 1rem 1rem;
    background: linear-gradient(180deg, transparent, rgb(0 0 0 / 96%) 42%);
    opacity: 0;
    pointer-events: none;
    transform: translateY(0.4rem);
    transition: opacity 0.16s ease, transform 0.16s var(--shimpz-ease);
  }

  article:hover .assistant-action,
  article:focus-within .assistant-action,
  .assistant-action.persistent {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .assistant-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 2.5rem;
    gap: 0.5rem;
    border: 0;
    padding: 0.6rem 0.75rem;
    background: linear-gradient(100deg, var(--shimpz-color-cyan), var(--shimpz-color-magenta));
    color: var(--shimpz-color-bg);
    cursor: pointer;
    font: 700 0.62rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    clip-path: var(--shimpz-control-shape);
    transition: filter var(--shimpz-duration-fast) var(--shimpz-ease);
  }

  .assistant-action-button:hover:not(:disabled) {
    filter: brightness(1.08) drop-shadow(0 0 12px color-mix(in oklab, var(--shimpz-color-cyan) 45%, transparent));
  }

  .assistant-action-button.danger {
    background: var(--shimpz-color-bg);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--shimpz-color-danger) 48%, var(--shimpz-color-border));
    color: var(--shimpz-color-danger);
  }

  .assistant-action-button.danger:hover:not(:disabled) {
    background: color-mix(in oklab, var(--shimpz-color-danger) 7%, var(--shimpz-color-bg));
    filter: drop-shadow(0 0 8px color-mix(in oklab, var(--shimpz-color-danger) 36%, transparent));
  }

  .assistant-action-button:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
  }

  .assistant-action-button:disabled { cursor: not-allowed; filter: grayscale(0.5); opacity: 0.5; }
  .assistant-action-button svg { display: block; flex: none; overflow: visible; }
  .assistant-action-button path { vector-effect: non-scaling-stroke; }
  .assistant-action-status { margin: 0.55rem 0 0; color: var(--shimpz-color-green); font-size: 0.68rem; line-height: 1.45; }
  .assistant-action-status.error { color: var(--shimpz-color-danger); }

  @media (hover: none), (pointer: coarse) {
    .assistant-action {
      position: static;
      padding: 0.25rem 1rem 1rem;
      background: transparent;
      opacity: 1;
      pointer-events: auto;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    article,
    .assistant-action { transition: none; }
    article:hover,
    article:focus-within { transform: none; }
  }

  @media (forced-colors: active) {
    article { border: 1px solid CanvasText; clip-path: none; }
    .assistant-action-button { border: 1px solid ButtonText; clip-path: none; forced-color-adjust: auto; }
  }
</style>
