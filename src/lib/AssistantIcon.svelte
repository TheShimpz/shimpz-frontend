<script lang="ts">
  type Props = {
    assistant?: string;
    src?: string;
    /** What the caller knows while it has no `src` yet: still fetching, or the icon could not be loaded. */
    status?: "loading" | "failed";
    size?: number;
    loading?: "eager" | "lazy";
    class?: string;
  };
  let {
    assistant = "assistant",
    src,
    status = "loading",
    size = 36,
    loading = "eager",
    class: className,
  }: Props = $props();
  let image = $state<HTMLImageElement>();
  // Before hydration, or without JavaScript, a given src is shown as a plain image; the client then tracks it.
  let phase = $state<"shown" | "pending" | "failed">("shown");

  $effect(() => {
    const current = src;
    const element = image;
    if (!current || !element) return;
    phase = element.complete ? (element.naturalWidth > 0 ? "shown" : "failed") : "pending";
  });

  function settle(event: Event, next: "shown" | "failed") {
    // A load or error event only settles the image that is still requested.
    if ((event.currentTarget as HTMLImageElement).getAttribute("src") === src) phase = next;
  }

  let iconState = $derived(src ? (phase === "shown" ? "loaded" : phase === "pending" ? "loading" : "failed") : status);
</script>
<span
  class={["shimpz-assistant-icon", iconState === "loaded" && "has-image", className]}
  style={`width:${size}px;height:${size}px`}
  data-state={iconState}
  data-assistant={assistant}
  aria-hidden="true"
>
  {#if src}
    <img
      bind:this={image}
      {src}
      alt=""
      decoding="async"
      {loading}
      onload={(event) => settle(event, "shown")}
      onerror={(event) => settle(event, "failed")}
    />
  {/if}
</span>
<style>
  /* The outer octagon is a visible frame; ::before paints the inner face one pixel in. */
  span { --icon-shape: polygon(12% 0,88% 0,100% 12%,100% 88%,88% 100%,12% 100%,0 88%,0 12%); position: relative; display: grid; flex: none; place-items: center; overflow: hidden; background: color-mix(in srgb, var(--shimpz-color-text-dim) 45%, var(--shimpz-color-surface-high)); clip-path: var(--icon-shape); }
  span:not(.has-image)::before { position: absolute; inset: 1px; background: var(--shimpz-color-surface-high); clip-path: var(--icon-shape); content: ""; }
  .has-image { overflow: visible; background: transparent; clip-path: none; }
  /* A loading icon carries a light band that sweeps while motion is allowed; a failed one is a still, hatched face.
     Neither ever borrows a substitute mark. */
  span[data-state="loading"]::after { position: absolute; inset: 1px; background: linear-gradient(100deg, transparent 20%, color-mix(in srgb, var(--shimpz-color-text) 18%, transparent) 50%, transparent 80%); background-position: 50% 0; background-size: 220% 100%; clip-path: var(--icon-shape); content: ""; animation: shimpz-assistant-icon-shimmer 1.4s ease-in-out infinite; }
  span[data-state="failed"]::before { background: repeating-linear-gradient(135deg, var(--shimpz-color-surface-high) 0 3px, color-mix(in srgb, var(--shimpz-color-text-dim) 30%, var(--shimpz-color-surface-high)) 3px 4px); }
  span:not([data-state="loaded"]) img { visibility: hidden; }
  img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: contain; }
  @keyframes shimpz-assistant-icon-shimmer { from { background-position: 120% 0; } to { background-position: -120% 0; } }
  @media (prefers-reduced-motion: reduce) { span[data-state="loading"]::after { animation: none; } }
  @media (forced-colors: active) { span:not(.has-image) { border: 1px solid CanvasText; clip-path: none; } span:not(.has-image)::before, span:not(.has-image)::after { clip-path: none; } }
</style>
