<script lang="ts">
  import type { Snippet } from "svelte";
  import ShimpzBrand from "./ShimpzBrand.svelte";

  type Props = {
    brandHref: string;
    navigationLabel: string;
    navigation: Snippet;
    actions?: Snippet;
    brandProduct?: string;
    brandAriaLabel?: string;
    skipLabel?: string;
    mainId?: string;
    class?: string;
  };

  let {
    brandHref,
    navigationLabel,
    navigation,
    actions,
    brandProduct,
    brandAriaLabel,
    skipLabel = "Skip to content",
    mainId = "main-content",
    class: className,
  }: Props = $props();
</script>

<a class="skip" href={`#${mainId}`}>{skipLabel}</a>
<header data-slot="site-header" class={["shimpz-site-header", className]}>
  <div class="inner">
    <ShimpzBrand href={brandHref} product={brandProduct} ariaLabel={brandAriaLabel} />
    <nav aria-label={navigationLabel}>
      {@render navigation()}
    </nav>
    {#if actions}
      <div data-slot="site-header-actions" class="actions">{@render actions()}</div>
    {/if}
  </div>
</header>

<style>
  .skip {
    position: fixed;
    z-index: 100;
    inset-block-start: 0.75rem;
    inset-inline-start: 1rem;
    padding: 0.65rem 0.9rem;
    color: var(--shimpz-color-bg);
    background: var(--shimpz-color-text);
    font: 700 0.72rem/1 var(--shimpz-font-mono);
    text-decoration: none;
    transform: translateY(-180%);
  }

  .skip:focus {
    transform: translateY(0);
  }

  .shimpz-site-header {
    position: sticky;
    z-index: 50;
    inset-block-start: 0;
    border-block-end: 1px solid var(--shimpz-color-border);
    background: color-mix(in srgb, var(--shimpz-color-bg) 88%, transparent);
    backdrop-filter: blur(18px);
  }

  .inner {
    display: grid;
    width: min(calc(100% - 2rem), var(--shimpz-content-width));
    min-height: 5.25rem;
    grid-template-columns: minmax(9rem, 1fr) auto minmax(9rem, 1fr);
    align-items: center;
    gap: 1rem;
    margin-inline: auto;
  }

  nav {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
  }

  .actions {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: flex-end;
    gap: 0.55rem;
  }

  @media (max-width: 960px) {
    .inner {
      grid-template-columns: minmax(0, 1fr) auto;
      padding-block-start: 0.7rem;
    }

    nav {
      grid-row: 2;
      grid-column: 1 / -1;
      justify-content: flex-start;
      overflow-x: auto;
      border-block-start: 1px solid var(--shimpz-color-border);
      scrollbar-width: none;
    }

    nav::-webkit-scrollbar {
      display: none;
    }

    .actions {
      grid-row: 1;
      grid-column: 2;
    }
  }

  @media (max-width: 520px) {
    .inner {
      width: min(calc(100% - 1rem), var(--shimpz-content-width));
      column-gap: 0.5rem;
    }

    nav {
      margin-inline: -0.25rem;
      padding-inline: 0.25rem;
    }

    .actions {
      gap: 0.25rem;
    }
  }

  @media (forced-colors: active) {
    .shimpz-site-header {
      border-color: CanvasText;
    }
  }
</style>
