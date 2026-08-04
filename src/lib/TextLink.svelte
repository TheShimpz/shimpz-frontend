<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes & { external?: boolean };

  let { external = false, class: className, children, ...attributes }: Props = $props();
</script>

<a
  class={["shimpz-text-link", className]}
  rel={external ? "noreferrer" : attributes.rel}
  target={external ? "_blank" : attributes.target}
  {...attributes}
>
  {@render children?.()}
</a>

<style>
  .shimpz-text-link {
    color: var(--shimpz-color-cyan);
    text-decoration-color: color-mix(in srgb, var(--shimpz-color-cyan) 48%, transparent);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  .shimpz-text-link:hover {
    color: var(--shimpz-color-text);
    text-decoration-color: var(--shimpz-color-cyan);
  }

  .shimpz-text-link:focus-visible {
    border-radius: 1px;
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
  }
</style>
