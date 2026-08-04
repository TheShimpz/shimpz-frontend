<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Button from "./Button.svelte";
  type Props = HTMLAttributes<HTMLElement> & {
    tone?: "info" | "success" | "error";
    label?: string;
    durationMs?: number;
    paused?: boolean;
    closeLabel: string;
    onClose: () => void;
    element?: HTMLElement;
  };
  let { children, tone = "info", label, durationMs = 5000, paused = false, closeLabel, onClose, element = $bindable(), class: className, ...attributes }: Props = $props();
</script>
<section
  bind:this={element}
  data-slot="toast"
  class={["shimpz-toast", `shimpz-toast--${tone}`, paused && "is-paused", className]}
  role={tone === "error" ? "alert" : "status"}
  aria-live={tone === "error" ? "assertive" : "polite"}
  aria-atomic="true"
  style={`--toast-duration:${durationMs}ms`}
  {...attributes}
>
  <span data-slot="toast-progress" class="progress" aria-hidden="true"></span>
  <div data-slot="toast-content" class="copy">{#if label}<span>{label}</span>{/if}<strong>{@render children?.()}</strong></div>
  <Button class="toast-close" variant="ghost" size="icon" onclick={onClose} aria-label={closeLabel}>×</Button>
</section>
<style>
  section { --toast-color: var(--shimpz-color-cyan); position: relative; z-index: 5; display: grid; min-height: 3.25rem; place-items: center; overflow: hidden; padding: var(--shimpz-space-2) 3.25rem; background: color-mix(in srgb, var(--toast-color) 5%, var(--shimpz-color-bg)); border-block-end: 1px solid var(--shimpz-color-border); isolation: isolate; }
  .shimpz-toast--success { --toast-color: var(--shimpz-color-green); }
  .shimpz-toast--error { --toast-color: var(--shimpz-color-danger); }
  .progress { position: absolute; z-index: -1; inset: 0; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--toast-color) 10%, transparent)); transform: scaleX(0); transform-origin: left; animation: progress var(--toast-duration) linear forwards; }
  .is-paused .progress { animation-play-state: paused; }
  .copy { display: flex; max-width: var(--shimpz-content-width); align-items: baseline; justify-content: center; gap: var(--shimpz-space-2); text-align: center; }
  .copy span { color: var(--toast-color); font: 700 0.62rem/1.3 var(--shimpz-font-mono); letter-spacing: 0.09em; text-transform: uppercase; }
  .copy strong { color: var(--shimpz-color-text); font-size: clamp(0.78rem, 1.1vw, 0.9rem); line-height: 1.4; }
  section :global(.toast-close) { position: absolute; top: 50%; inset-inline-end: var(--shimpz-space-4); width: 2rem; min-height: 2rem; transform: translateY(-50%); }
  @keyframes progress { to { transform: scaleX(1); } }
  @media (prefers-reduced-motion: reduce) { .progress { animation-name: none; transform: none; } }
  @media (max-width: 620px) { section { padding-inline: 2.8rem; } .copy { align-items: center; flex-direction: column; gap: var(--shimpz-space-1); } section :global(.toast-close) { inset-inline-end: var(--shimpz-space-2); } }
</style>
