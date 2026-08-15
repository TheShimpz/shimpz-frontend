<script lang="ts">
  import {
    Button,
    Card,
    EditorialHero,
    EditorialSection,
    EditorialVisual,
    Notice,
    ShimpzBrand,
    SignalList,
    TextField,
  } from "$lib";
  import shimpzThinking from "$lib/assets/shimpz-thinking.svg";

  let clicks = $state(0);
  let assistantId = $state("hello-world");
  const showcaseSignals = [
    { id: "resolve-zone", channel: "cloudflare", assurance: "approval" },
    { id: "inspect-records", channel: "dns.read", assurance: "none" },
    { id: "publish-record", channel: "dns.write", assurance: "reauth" },
  ] as const;
  const emptySignals: (typeof showcaseSignals)[number][] = [];
</script>

{#snippet heroMeta()}
  <output aria-live="polite">{clicks} transmissions acknowledged</output>
{/snippet}

{#snippet heroActions()}
  <Button glitch onclick={() => (clicks += 1)}>Transmit signal</Button>
  <Button variant="secondary">Read protocol</Button>
{/snippet}

{#snippet heroMedia()}
  <EditorialVisual
    class="showcase-visual"
    src={shimpzThinking}
    alt=""
    width={640}
    height={426}
    fit="contain"
    treatment="unframed"
    priority
  />
{/snippet}

{#snippet colorsContent()}
  <div class="swatches">
    <div class="cyan"><span>#00F0FF</span>Cyan</div>
    <div class="magenta"><span>#FF2A6D</span>Magenta</div>
    <div class="yellow"><span>#FCEE0A</span>Yellow</div>
    <div class="green"><span>#05FFA1</span>Green</div>
  </div>
{/snippet}

{#snippet signalIdentity(item: (typeof showcaseSignals)[number])}
  <div class="signal-identity">
    <span>Signal</span>
    <code>{item.id}</code>
  </div>
{/snippet}

{#snippet signalMeta(item: (typeof showcaseSignals)[number])}
  <dl class="signal-meta">
    <div><dt>Channel</dt><dd>{item.channel}</dd></div>
    <div><dt>Assurance</dt><dd>{item.assurance}</dd></div>
  </dl>
{/snippet}

<svelte:head>
  <title>Shimpz Frontend</title>
  <meta
    name="description"
    content="The public Shimpz design system for Svelte applications."
  />
</svelte:head>

<div class="shimpz-wrap">
  <header>
    <ShimpzBrand product="Frontend" href="/" ariaLabel="Shimpz Frontend home" />
    <p class="signal"><span></span> System online</p>
  </header>

  <main>
    <EditorialHero
      class="showcase-hero"
      kicker="Public design system // Svelte 5"
      titleId="hero-title"
      title="Signal over noise."
      lead="One precise visual language for the Shimpz ecosystem. Cyberpunk restraint, accessible primitives, zero business logic."
      meta={heroMeta}
      actions={heroActions}
      media={heroMedia}
    />

    <EditorialSection
      class="foundation"
      kicker="01 // Foundation"
      titleId="colors-title"
      title="Core signals"
      lead="Bounded editorial type, deliberate contrast and reusable visual framing keep every public surface readable."
      children={colorsContent}
    />

    <section aria-labelledby="primitives-title">
      <div class="section-heading">
        <p class="shimpz-kicker">02 // Interface</p>
        <h2 id="primitives-title">Primitives</h2>
      </div>
      <div class="component-grid">
        <Card title="Actions">
          <div class="stack">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="danger">Danger action</Button>
            <Button size="compact">Compact action</Button>
            <Button glitch disabled>Unavailable</Button>
          </div>
        </Card>
        <Card title="Inputs">
          <div class="stack">
            <TextField
              id="assistant-id"
              label="Assistant ID"
              hint="Lowercase words separated by hyphens."
              placeholder="hello-world"
              bind:value={assistantId}
            />
            <TextField
              id="auth-code"
              label="Authentication code"
              variant="code"
              value="BCDF-GHJK"
            />
            <TextField
              id="invalid-id"
              label="Invalid example"
              value="Not valid"
              error="Use lowercase ASCII characters."
            />
          </div>
        </Card>
        <Card class="signal-list-card" title="Signal list">
          <div class="signal-list-grid">
            <SignalList
              id="showcase-signal-list"
              items={showcaseSignals}
              getKey={(item) => item.id}
              signal={signalIdentity}
              meta={signalMeta}
              aria-label="System signals"
            />
            <SignalList
              id="empty-signal-list"
              class="empty-signal-list"
              items={emptySignals}
              getKey={(item) => item.id}
              signal={signalIdentity}
              meta={signalMeta}
              aria-label="Empty signals"
            />
          </div>
        </Card>
        <Card class="notices" title="System notices">
          <div class="stack">
            <Notice title="Connected">The authorization channel is ready.</Notice>
            <Notice variant="success" title="Published">Artifact evidence is complete.</Notice>
            <Notice variant="warning" title="Review pending">Manual approval is still required.</Notice>
            <Notice variant="error" title="Access denied">The session no longer matches.</Notice>
          </div>
        </Card>
      </div>
    </section>

    <Card class="brand-strip" aria-labelledby="brand-title">
      <div>
        <p class="shimpz-kicker">03 // Identity</p>
        <h2 id="brand-title">One mark, every surface.</h2>
      </div>
      <div class="brand-variants">
        <ShimpzBrand variant="symbol" ariaLabel="Shimpz symbol" />
        <ShimpzBrand product="Developers" />
        <ShimpzBrand product="Docs" />
      </div>
    </Card>
  </main>

  <footer>
    <span>SHIMPZ FRONTEND</span>
    <span>PRESENTATION ONLY // ACCESSIBLE BY DEFAULT</span>
  </footer>
</div>

<style>
  header,
  main,
  footer {
    width: min(calc(100% - 2rem), var(--shimpz-content-width));
    margin-inline: auto;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4.5rem;
    border-bottom: 1px solid var(--shimpz-color-border-subtle);
  }

  .signal {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    color: var(--shimpz-color-text-dim);
    font: 600 0.65rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .signal span {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--shimpz-color-green);
    box-shadow: 0 0 12px var(--shimpz-color-green);
  }

  main {
    padding-block: clamp(2.5rem, 6vw, 5rem);
  }

  h2 {
    font-family: var(--shimpz-font-mono);
  }

  output {
    display: block;
    margin-top: 1rem;
    color: var(--shimpz-color-text-dim);
    font: 400 0.72rem/1.4 var(--shimpz-font-mono);
  }

  :global(.showcase-hero) { min-height: min(38rem, calc(100vh - 6rem)); }
  :global(.showcase-visual img) { padding: clamp(2rem, 8vw, 6rem); }
  :global(.foundation) { margin-top: clamp(4rem, 8vw, 7rem); }

  section {
    margin-top: clamp(4rem, 8vw, 7rem);
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--shimpz-color-border);
  }

  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }

  .swatches {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    margin-top: 1.25rem;
    background: var(--shimpz-color-border);
    border: 1px solid var(--shimpz-color-border);
  }

  .swatches div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 8rem;
    padding: 1rem;
    font: 700 0.72rem/1 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--shimpz-color-surface);
    border-top: 0.3rem solid currentColor;
  }

  .swatches span {
    color: var(--shimpz-color-text-dim);
    font-weight: 400;
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .component-grid :global(.shimpz-card > [data-slot="card-content"]) {
    display: grid;
    gap: 1.5rem;
  }

  :global(.signal-list-card),
  :global(.notices) {
    grid-column: 1 / -1;
  }

  .signal-list-grid {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr);
  }

  :global(.empty-signal-list) {
    display: none;
  }

  .signal-identity {
    display: grid;
    min-width: 0;
    gap: 0.2rem;
  }

  .signal-identity span,
  .signal-meta dt {
    color: var(--shimpz-color-text-dim);
    font: 700 0.58rem/1.3 var(--shimpz-font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .signal-identity code {
    overflow-wrap: anywhere;
    color: var(--shimpz-color-text);
    font: 600 0.82rem/1.4 var(--shimpz-font-mono);
  }

  .signal-meta {
    display: grid;
    min-width: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin: 0;
  }

  .signal-meta dd {
    min-width: 0;
    margin: 0.2rem 0 0;
    overflow-wrap: anywhere;
    color: var(--shimpz-color-text-muted);
    font: 400 0.72rem/1.4 var(--shimpz-font-mono);
  }

  .stack {
    display: grid;
    align-items: start;
    gap: 1rem;
  }

  :global(.brand-strip > [data-slot="card-content"]) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  :global(.brand-strip h2) {
    margin-top: 0.5rem;
  }

  .brand-variants {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 2rem;
    color: var(--shimpz-color-text-dim);
    font: 400 0.62rem/1.4 var(--shimpz-font-mono);
    letter-spacing: 0.1em;
    border-top: 1px solid var(--shimpz-color-border-subtle);
  }

  .cyan {
    color: var(--shimpz-color-cyan);
  }

  .magenta {
    color: var(--shimpz-color-magenta);
  }

  .yellow {
    color: var(--shimpz-color-yellow);
  }

  .green {
    color: var(--shimpz-color-green);
  }

  @media (max-width: 850px) {
    :global(.showcase-hero) { min-height: auto; }

    .swatches {
      grid-template-columns: repeat(2, 1fr);
    }

    .component-grid {
      grid-template-columns: 1fr;
    }

    :global(.signal-list-card),
    :global(.notices) {
      grid-column: auto;
    }

    :global(.brand-strip > [data-slot="card-content"]) {
      align-items: flex-start;
      flex-direction: column;
    }

    .brand-variants {
      justify-content: flex-start;
    }
  }

  @media (max-width: 520px) {
    header {
      min-height: 4.25rem;
    }

    .signal {
      display: none;
    }

    .section-heading,
    footer {
      align-items: flex-start;
      flex-direction: column;
    }

    .swatches {
      grid-template-columns: 1fr;
    }

    .swatches div {
      min-height: 7rem;
    }
  }
</style>
