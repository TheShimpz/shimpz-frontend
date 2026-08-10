<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes & { active?: boolean };
  let { children, active = false, class: className, ...attributes }: Props = $props();
</script>

<a
  class={["shimpz-site-nav-link", active && "is-active", className]}
  aria-current={active ? "page" : undefined}
  {...attributes}
>
  {@render children?.()}
</a>

<style>
  a {
    position: relative;
    display: inline-flex;
    min-height: 2.75rem;
    align-items: center;
    padding: 0.8rem 0.72rem;
    color: var(--shimpz-color-text-muted);
    font: 600 0.68rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
  }

  a::after {
    position: absolute;
    inset-inline: 0.72rem;
    inset-block-end: 0.35rem;
    height: 1px;
    background: transparent;
    content: "";
  }

  a:hover,
  a.is-active {
    color: var(--shimpz-color-text);
  }

  a.is-active::after {
    background: linear-gradient(90deg, var(--shimpz-color-cyan), var(--shimpz-color-magenta));
    box-shadow: 0 0 8px color-mix(in srgb, var(--shimpz-color-cyan) 45%, transparent);
  }

  a:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 2px;
  }

  @media (pointer: coarse) {
    a {
      min-height: 3rem;
    }
  }
</style>
