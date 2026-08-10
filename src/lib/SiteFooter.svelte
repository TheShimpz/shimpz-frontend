<script lang="ts">
  import type { Snippet } from "svelte";
  import ShimpzBrand from "./ShimpzBrand.svelte";

  type Props = {
    brandHref: string;
    linksLabel: string;
    links: Snippet;
    statement?: string;
    meta?: Snippet;
    brandProduct?: string;
    brandAriaLabel?: string;
    class?: string;
  };

  let {
    brandHref,
    linksLabel,
    links,
    statement,
    meta,
    brandProduct,
    brandAriaLabel,
    class: className,
  }: Props = $props();
</script>

<footer data-slot="site-footer" class={["shimpz-site-footer", className]}>
  <div class="inner">
    <div class="brand">
      <ShimpzBrand href={brandHref} product={brandProduct} ariaLabel={brandAriaLabel} />
      {#if statement}<p>{statement}</p>{/if}
    </div>
    <nav aria-label={linksLabel}>{@render links()}</nav>
    {#if meta}<div data-slot="site-footer-meta" class="meta">{@render meta()}</div>{/if}
  </div>
</footer>

<style>
  .shimpz-site-footer {
    margin-block-start: clamp(5rem, 10vw, 8rem);
    border-block-start: 1px solid var(--shimpz-color-border);
  }

  .inner {
    display: grid;
    width: min(calc(100% - 2rem), var(--shimpz-content-width));
    min-height: 8.5rem;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
    margin-inline: auto;
  }

  .brand {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 1.5rem;
  }

  .brand p {
    max-width: 34rem;
    margin: 0;
    color: var(--shimpz-color-text-dim);
    font-size: 0.78rem;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.65rem 1rem;
  }

  nav :global(a) {
    color: var(--shimpz-color-text-muted);
    font: 600 0.68rem/1.4 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
  }

  nav :global(a:hover) {
    color: var(--shimpz-color-cyan);
  }

  nav :global(a:focus-visible) {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 3px;
  }

  .meta {
    display: flex;
    grid-column: 1 / -1;
    align-items: center;
    gap: 0.45rem;
    padding-block: 0.85rem;
    color: var(--shimpz-color-text-dim);
    font: 400 0.6rem/1.4 var(--shimpz-font-mono);
    letter-spacing: 0.1em;
    border-block-start: 1px solid var(--shimpz-color-border);
    text-transform: uppercase;
  }

  @media (max-width: 620px) {
    .inner {
      grid-template-columns: minmax(0, 1fr);
      padding-block: 1.5rem;
    }

    .brand {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.75rem;
    }

    nav {
      justify-content: flex-start;
    }

    .meta {
      grid-column: 1;
    }
  }
</style>
