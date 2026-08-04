<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = Omit<HTMLInputAttributes, "type"> & { element?: HTMLInputElement };
  let { element = $bindable(), class: className, ...attributes }: Props = $props();
</script>

<input bind:this={element} type="file" class={["shimpz-file-input", className]} {...attributes} />

<style>
  input { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); }
</style>
