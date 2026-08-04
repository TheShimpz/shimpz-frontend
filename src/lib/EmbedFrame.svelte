<script lang="ts">
  import type { HTMLIframeAttributes } from "svelte/elements";
  type Props = HTMLIframeAttributes & { title: string; element?: HTMLIFrameElement };
  let { title, element = $bindable(), class: className, ...attributes }: Props = $props();
</script>
<iframe bind:this={element} class={["shimpz-embed", className]} {title} {...attributes}></iframe>
<style>
  iframe { display: block; width: 100%; border: 0; background: transparent; }
</style>
