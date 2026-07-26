<script lang="ts">
  import thinkingUrl from "./assets/shimpz-thinking.svg";

  type Props = {
    variant?: "compact" | "hero" | "symbol";
    product?: string;
    href?: string;
    ariaLabel?: string;
    class?: string;
  };

  let {
    variant = "compact",
    product,
    href,
    ariaLabel,
    class: className,
  }: Props = $props();

  const label = $derived(ariaLabel ?? (product ? `Shimpz ${product}` : "Shimpz"));
</script>

{#snippet content()}
  <img src={thinkingUrl} alt="" aria-hidden="true" />
  {#if variant !== "symbol"}
    <span class="wordmark">Shimpz</span>
    {#if product}
      <span class="product">{product}</span>
    {/if}
  {/if}
{/snippet}

{#if href}
  <a class={["shimpz-brand", `shimpz-brand--${variant}`, className]} {href} aria-label={label}>
    {@render content()}
  </a>
{:else}
  <div class={["shimpz-brand", `shimpz-brand--${variant}`, className]} aria-label={label}>
    {@render content()}
  </div>
{/if}

<style>
  .shimpz-brand {
    display: inline-grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: start;
    gap: 0.45rem 0.65rem;
    color: var(--shimpz-color-text);
    font-family: var(--shimpz-font-mono);
    text-decoration: none;
  }

  img {
    grid-row: 1 / span 2;
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }

  .wordmark {
    align-self: end;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    line-height: 1;
    text-transform: uppercase;
  }

  .product {
    align-self: start;
    color: var(--shimpz-color-cyan);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1;
    text-transform: uppercase;
  }

  .shimpz-brand--hero {
    gap: 0.5rem 1rem;
  }

  .shimpz-brand--hero img {
    width: clamp(4.5rem, 10vw, 7rem);
    height: clamp(4.5rem, 10vw, 7rem);
  }

  .shimpz-brand--hero .wordmark {
    font-size: clamp(1.75rem, 5vw, 3.75rem);
    letter-spacing: 0.13em;
  }

  .shimpz-brand--hero .product {
    font-size: clamp(0.7rem, 1.8vw, 1rem);
  }

  .shimpz-brand--symbol {
    display: inline-flex;
  }

  .shimpz-brand--symbol img {
    width: 2.75rem;
    height: 2.75rem;
  }

  a:focus-visible {
    outline: 2px solid var(--shimpz-color-yellow);
    outline-offset: 4px;
    box-shadow: var(--shimpz-focus-ring);
  }

  @media (forced-colors: active) {
    .product {
      color: LinkText;
    }
  }
</style>
