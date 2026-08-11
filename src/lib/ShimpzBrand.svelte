<script lang="ts">
  import thinkingUrl from "./assets/shimpz-thinking.svg";

  type Props = {
    variant?: "compact" | "hero" | "symbol";
    product?: string;
    href?: string;
    ariaLabel?: string;
    decorative?: boolean;
    class?: string;
  };

  let {
    variant = "compact",
    product,
    href,
    ariaLabel,
    decorative = false,
    class: className,
  }: Props = $props();

  const label = $derived(ariaLabel ?? (product ? `Shimpz ${product}` : "Shimpz"));
</script>

{#snippet content()}
  <img data-slot="shimpz-brand-mark" src={thinkingUrl} alt="" aria-hidden="true" />
  {#if variant !== "symbol"}
    <span data-slot="shimpz-brand-wordmark" class="wordmark">Shimpz</span>
    {#if product}
      <span class="product">{product}</span>
    {/if}
  {/if}
{/snippet}

{#if href}
  <a class={["shimpz-brand", `shimpz-brand--${variant}`, product && "has-product", className]} {href} aria-label={label}>
    {@render content()}
  </a>
{:else}
  <div
    class={["shimpz-brand", `shimpz-brand--${variant}`, product && "has-product", className]}
    role={decorative ? undefined : "img"}
    aria-label={decorative ? undefined : label}
    aria-hidden={decorative ? "true" : undefined}
  >
    {@render content()}
  </div>
{/if}

<style>
  .shimpz-brand {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    gap: 0.55rem;
    color: var(--shimpz-color-text);
    font-family: var(--shimpz-font-mono);
    text-decoration: none;
  }

  img {
    width: 2.25rem;
    height: 2.25rem;
    flex: none;
    object-fit: contain;
  }

  .has-product {
    display: inline-grid;
    grid-template-columns: auto auto;
    gap: 0.35rem 0.55rem;
  }

  .has-product img {
    grid-row: 1 / span 2;
  }

  .has-product .wordmark {
    align-self: end;
  }

  .has-product .product {
    align-self: start;
  }

  .wordmark {
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    line-height: 1;
    text-transform: uppercase;
  }

  .product {
    align-self: start;
    color: var(--shimpz-color-cyan);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1;
    text-transform: uppercase;
  }

  .shimpz-brand--hero {
    gap: 0.5rem 1rem;
  }

  .shimpz-brand--hero img {
    width: var(--shimpz-brand-hero-mark-size, clamp(4.5rem, 10vw, 6rem));
    height: var(--shimpz-brand-hero-mark-size, clamp(4.5rem, 10vw, 6rem));
  }

  .shimpz-brand--hero .wordmark {
    font-size: var(--shimpz-brand-hero-word-size, clamp(1.75rem, 5vw, 2.75rem));
    letter-spacing: 0.13em;
  }

  .shimpz-brand--hero .product {
    font-size: clamp(0.7rem, 1.8vw, 1rem);
  }

  .shimpz-brand--symbol {
    display: inline-flex;
  }

  .shimpz-brand--symbol img {
    width: 2.5rem;
    height: 2.5rem;
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
