<script lang="ts">
  type Props = {
    src: string;
    srcset?: string;
    sizes?: string;
    alt: string;
    width?: number;
    height?: number;
    aspect?: "landscape" | "wide" | "square";
    fit?: "cover" | "contain";
    priority?: boolean;
    class?: string;
  };

  let {
    src,
    srcset,
    sizes = "(max-width: 760px) 100vw, 60vw",
    alt,
    width = 1536,
    height = 1024,
    aspect = "landscape",
    fit = "cover",
    priority = false,
    class: className,
  }: Props = $props();
</script>

<figure
  data-slot="editorial-visual"
  class={["shimpz-editorial-visual", `aspect-${aspect}`, `fit-${fit}`, className]}
  role={alt ? undefined : "presentation"}
>
  <img
    {src}
    {srcset}
    {sizes}
    {alt}
    {width}
    {height}
    loading={priority ? "eager" : "lazy"}
    fetchpriority={priority ? "high" : "auto"}
    decoding="async"
  />
</figure>

<style>
  figure { position: relative; min-width: 0; margin: 0; overflow: hidden; isolation: isolate; background: var(--shimpz-color-surface); border: 1px solid var(--shimpz-color-border); clip-path: polygon(var(--shimpz-cut-lg) 0,100% 0,100% calc(100% - var(--shimpz-cut-lg)),calc(100% - var(--shimpz-cut-lg)) 100%,0 100%,0 var(--shimpz-cut-lg)); }
  figure::before { position: absolute; z-index: 1; inset: 0; pointer-events: none; content: ""; background: linear-gradient(180deg, transparent 72%, color-mix(in srgb, var(--shimpz-color-cyan) 8%, transparent)); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--shimpz-color-text) 4%, transparent); }
  figure::after { position: absolute; z-index: 1; inset: 0; pointer-events: none; content: ""; background: repeating-linear-gradient(180deg, transparent 0 5px, rgb(255 255 255 / 1.2%) 6px); mix-blend-mode: screen; }
  img { display: block; width: 100%; height: 100%; aspect-ratio: 3 / 2; object-fit: cover; }
  .aspect-wide img { aspect-ratio: 16 / 9; }
  .aspect-square img { aspect-ratio: 1; }
  .fit-contain img { object-fit: contain; }
  @media (forced-colors: active) { figure { border-color: CanvasText; clip-path: none; } figure::before, figure::after { display: none; } }
</style>
