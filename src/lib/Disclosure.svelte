<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = { summary: Snippet; children: Snippet; open?: boolean; class?: string };
  let { summary, children, open = $bindable(false), class: className }: Props = $props();
</script>

<details data-slot="disclosure" class={["shimpz-disclosure", className]} bind:open>
  <summary data-slot="disclosure-trigger">{@render summary()}</summary>
  <div data-slot="disclosure-content" class="content">{@render children()}</div>
</details>

<style>
  details { min-width: 0; border-block-start: 1px solid var(--shimpz-color-border); padding-block-start: 0.65rem; }
  summary { width: fit-content; color: var(--shimpz-color-text-dim); cursor: pointer; font: 600 0.7rem/1.4 var(--shimpz-font-mono); letter-spacing: 0.075em; text-transform: uppercase; }
  summary:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: 3px; }
  .content { margin-block-start: 0.7rem; }
</style>
