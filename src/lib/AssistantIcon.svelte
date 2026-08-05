<script lang="ts">
  type Props = { assistant?: string; src?: string; size?: number; class?: string };
  let { assistant = "assistant", src, size = 36, class: className }: Props = $props();
  let imageFailed = $state(false);

  $effect(() => {
    src;
    imageFailed = false;
  });
</script>
<span class={["shimpz-assistant-icon", src && !imageFailed && "has-image", className]} style={`width:${size}px;height:${size}px`} aria-hidden="true">
  {#if src && !imageFailed}
    <img {src} alt="" decoding="async" onerror={() => (imageFailed = true)} />
  {:else}
    <svg viewBox="0 0 48 48" fill="none" role="presentation" data-assistant={assistant}>
      <path class="frame" d="M8 8h32v32H8z" /><circle cx="24" cy="24" r="7" class="core" /><path class="nodes" d="M24 4v13M24 31v13M4 24h13M31 24h13" />
    </svg>
  {/if}
</span>
<style>
  span { position: relative; display: grid; flex: none; place-items: center; overflow: hidden; color: #fff; background: linear-gradient(145deg, color-mix(in srgb, var(--shimpz-color-cyan) 72%, white), var(--shimpz-color-magenta)); clip-path: polygon(12% 0,88% 0,100% 12%,100% 88%,88% 100%,12% 100%,0 88%,0 12%); }
  .has-image { overflow: visible; background: transparent; clip-path: none; }
  .has-image::after { content: none; }
  span::after { position: absolute; inset: 0; background: linear-gradient(180deg,rgb(255 255 255 / 20%),transparent 48%); content: ""; }
  img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: contain; }
  svg { position: relative; z-index: 1; width: 68%; height: 68%; filter: drop-shadow(0 0 5px rgb(0 240 255 / 42%)); }
  .frame,.core { stroke: currentColor; stroke-width: 1.4; opacity: 0.38; } .nodes { stroke: currentColor; stroke-width: 2.2; stroke-linecap: square; stroke-linejoin: bevel; }
</style>
