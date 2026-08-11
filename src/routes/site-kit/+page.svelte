<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import {
    DropdownMenu,
    PageIntro,
    ShimpzBrand,
    SiteFooter,
    SiteHeader,
    SiteNavLink,
  } from "$lib";

  const short = $derived(browser && $page.url.searchParams.has("short"));
  const languages = [
    { value: "en", label: "English", href: "/site-kit/" },
    { value: "pt", label: "Português", href: "/site-kit/?language=pt" },
    { value: "ar", label: "العربية", href: "/site-kit/?language=ar" },
  ];
</script>

<svelte:head>
  <title>Public site kit — Shimpz Frontend</title>
</svelte:head>

{#snippet navigation()}
  <SiteNavLink href="/site-kit/" active>Overview</SiteNavLink>
  <SiteNavLink href="/site-kit/#services">Services</SiteNavLink>
  {#if !short}
    <SiteNavLink href="/site-kit/#assistants">Assistants</SiteNavLink>
    <SiteNavLink href="/site-kit/#creators">Creators</SiteNavLink>
    <SiteNavLink href="/site-kit/#docs">Docs</SiteNavLink>
  {/if}
{/snippet}

{#snippet actions()}
  <DropdownMenu
    items={languages}
    value="en"
    ariaLabel="Language: English"
    menuLabel="Language"
    triggerLabel="English"
    compact
  />
{/snippet}

<SiteHeader
  brandHref="/site-kit/"
  brandAriaLabel="Shimpz home"
  navigationLabel="Primary navigation"
  skipLabel="Skip to content"
  contentWidth="editorial"
  {navigation}
  {actions}
/>

<main id="main-content" tabindex="-1">
  {#snippet media()}
    <ShimpzBrand variant="symbol" ariaLabel="Shimpz symbol" />
  {/snippet}
  {#snippet meta()}
    <span>Presentation only</span>
  {/snippet}
  <PageIntro
    kicker="Public shell // responsive"
    title="One site language."
    lead="A canonical header, navigation, page introduction, and footer without product orchestration."
    titleId="site-kit-title"
    {media}
    {meta}
  />

  <section id="services" aria-labelledby="services-title">
    <p class="shimpz-kicker">Dedicated pages</p>
    <h2 id="services-title">Every destination remains explicit.</h2>
    <p>Consumers supply routes, labels, active state, account actions, and product behavior.</p>
  </section>
  <div id="assistants"></div>
  <div id="creators"></div>
  <div id="docs"></div>
</main>

{#snippet links()}
  <div data-slot="site-footer-group">
    <p data-slot="site-footer-group-title">Project</p>
    <a href="/site-kit/#services">Privacy</a>
    <a href="/site-kit/#services">Terms</a>
  </div>
  <div data-slot="site-footer-group">
    <p data-slot="site-footer-group-title">Learn</p>
    <a href="/site-kit/#docs">Docs</a>
  </div>
{/snippet}
{#snippet footerMeta()}
  <span>Space platform // public presentation</span>
{/snippet}
<SiteFooter
  brandHref="/site-kit/"
  brandAriaLabel="Shimpz home"
  linksLabel="Footer links"
  statement="Teams stay isolated · permissions stay explicit"
  contentWidth="editorial"
  links={links}
  meta={footerMeta}
/>

<style>
  main {
    width: min(calc(100% - 2rem), var(--shimpz-editorial-width));
    min-height: 42rem;
    padding-block: clamp(3rem, 7vw, 6rem);
    margin-inline: auto;
  }

  section {
    max-width: 48rem;
    margin-block-start: clamp(4rem, 8vw, 7rem);
  }

  h2 {
    margin: 0.6rem 0 1rem;
    font: 700 clamp(1.7rem, 4vw, 2.8rem)/1.05 var(--shimpz-font-mono);
    letter-spacing: -0.04em;
  }

  section > p:last-child {
    color: var(--shimpz-color-text-muted);
    line-height: 1.7;
  }

  :global([data-slot="page-intro-meta"]) {
    color: var(--shimpz-color-text-dim);
    font: 600 0.68rem/1.4 var(--shimpz-font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
</style>
