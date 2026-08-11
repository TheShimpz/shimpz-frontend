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
    contentWidth?: "content" | "editorial";
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
    contentWidth = "content",
    class: className,
  }: Props = $props();
</script>

<footer data-slot="site-footer" class={["shimpz-site-footer", `width-${contentWidth}`, className]}>
  <div data-slot="site-footer-inner" class="inner">
    <div data-slot="site-footer-monument" class="monument" dir="ltr" aria-hidden="true">
      {#each [..."SHIMPZ"] as letter}<span>{letter}</span>{/each}
    </div>
    <div class="utility">
      <div class="brand">
        <ShimpzBrand href={brandHref} product={brandProduct} ariaLabel={brandAriaLabel} />
        {#if statement}<p>{statement}</p>{/if}
      </div>
      <nav aria-label={linksLabel}>{@render links()}</nav>
    </div>
    {#if meta}<div data-slot="site-footer-meta" class="meta">{@render meta()}</div>{/if}
  </div>
</footer>

<style>
  .shimpz-site-footer {
    margin-block-start: clamp(5rem, 10vw, 8rem);
    background: var(--shimpz-color-surface);
  }

  .inner {
    width: min(calc(100% - 2rem), var(--shimpz-content-width));
    min-height: clamp(24rem, 44vw, 36rem);
    padding-block: clamp(3rem, 7vw, 6rem) 2rem;
    margin-inline: auto;
    container-type: inline-size;
  }

  .width-editorial .inner {
    width: min(calc(100% - 2rem), var(--shimpz-editorial-width));
  }

  .monument {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: var(--shimpz-color-text);
    font: 760 clamp(4rem, 18cqi, 15rem)/0.78 var(--shimpz-font-sans);
    letter-spacing: -0.08em;
  }

  .utility {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.8fr);
    align-items: start;
    gap: clamp(2rem, 8vw, 8rem);
    margin-block-start: clamp(4rem, 8vw, 7rem);
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
    gap: 2rem clamp(2rem, 5vw, 4rem);
  }

  nav :global([data-slot="site-footer-group"]) {
    display: grid;
    min-width: 9rem;
    align-content: start;
    gap: 0.75rem;
  }

  nav :global([data-slot="site-footer-group-title"]) {
    margin: 0 0 0.35rem;
    color: var(--shimpz-color-text-dim);
    font: 600 0.62rem/1.4 var(--shimpz-font-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
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
    margin-block-start: clamp(2rem, 5vw, 4rem);
    text-transform: uppercase;
  }

  @media (max-width: 620px) {
    .inner {
      min-height: 30rem;
      padding-block-start: 3rem;
    }

    .utility {
      grid-template-columns: minmax(0, 1fr);
      margin-block-start: 3rem;
    }

    .brand {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.75rem;
    }

    nav {
      justify-content: flex-start;
    }
  }
</style>
