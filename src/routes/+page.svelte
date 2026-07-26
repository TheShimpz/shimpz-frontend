<script lang="ts">
  import { Button, Notice, ShimpzBrand, TextField } from "$lib";

  let clicks = $state(0);
  let assistantId = $state("hello-world");
</script>

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
    <section class="hero" aria-labelledby="hero-title">
      <div>
        <p class="shimpz-kicker">Public design system // Svelte 5</p>
        <h1 id="hero-title">Signal over <span>noise.</span></h1>
        <p class="lead">
          One precise visual language for the Shimpz ecosystem. Cyberpunk restraint, accessible
          primitives, zero business logic.
        </p>
        <div class="actions">
          <Button onclick={() => (clicks += 1)}>Transmit signal</Button>
          <Button variant="secondary">Read protocol</Button>
        </div>
        <output aria-live="polite">{clicks} transmissions acknowledged</output>
      </div>
      <div class="hero-brand shimpz-panel">
        <ShimpzBrand variant="hero" product="Frontend" />
        <p>Canonical assets. Closed variants. Local fonts.</p>
      </div>
    </section>

    <section aria-labelledby="colors-title">
      <div class="section-heading">
        <p class="shimpz-kicker">01 // Foundation</p>
        <h2 id="colors-title">Core signals</h2>
      </div>
      <div class="swatches">
        <div class="cyan"><span>#00F0FF</span>Cyan</div>
        <div class="magenta"><span>#FF2A6D</span>Magenta</div>
        <div class="yellow"><span>#FCEE0A</span>Yellow</div>
        <div class="green"><span>#05FFA1</span>Green</div>
      </div>
    </section>

    <section aria-labelledby="primitives-title">
      <div class="section-heading">
        <p class="shimpz-kicker">02 // Interface</p>
        <h2 id="primitives-title">Primitives</h2>
      </div>
      <div class="component-grid">
        <article class="shimpz-panel">
          <h3>Actions</h3>
          <div class="stack">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="danger">Danger action</Button>
            <Button size="compact">Compact action</Button>
            <Button disabled>Unavailable</Button>
          </div>
        </article>
        <article class="shimpz-panel">
          <h3>Inputs</h3>
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
        </article>
        <article class="notices shimpz-panel">
          <h3>System notices</h3>
          <div class="stack">
            <Notice title="Connected">The authorization channel is ready.</Notice>
            <Notice variant="success" title="Published">Artifact evidence is complete.</Notice>
            <Notice variant="warning" title="Review pending">Manual approval is still required.</Notice>
            <Notice variant="error" title="Access denied">The session no longer matches.</Notice>
          </div>
        </article>
      </div>
    </section>

    <section class="brand-strip shimpz-panel" aria-labelledby="brand-title">
      <div>
        <p class="shimpz-kicker">03 // Identity</p>
        <h2 id="brand-title">One mark, every surface.</h2>
      </div>
      <div class="brand-variants">
        <ShimpzBrand variant="symbol" ariaLabel="Shimpz symbol" />
        <ShimpzBrand product="Developers" />
        <ShimpzBrand product="Docs" />
      </div>
    </section>
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
    min-height: 5.5rem;
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
    padding-block: clamp(3rem, 8vw, 7rem);
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
    align-items: center;
    gap: clamp(2rem, 7vw, 7rem);
    min-height: min(44rem, calc(100vh - 8rem));
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    font-family: var(--shimpz-font-mono);
  }

  h1 {
    max-width: 11ch;
    margin: 1rem 0 1.5rem;
    font-size: clamp(3.25rem, 9vw, 7.5rem);
    letter-spacing: -0.075em;
    line-height: 0.9;
    text-transform: uppercase;
  }

  h1 span {
    color: var(--shimpz-color-magenta);
    text-shadow: 0 0 32px color-mix(in srgb, var(--shimpz-color-magenta) 25%, transparent);
  }

  .lead {
    max-width: 40rem;
    margin: 0;
    color: var(--shimpz-color-text-muted);
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.65;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  output {
    display: block;
    margin-top: 1rem;
    color: var(--shimpz-color-text-dim);
    font: 400 0.72rem/1.4 var(--shimpz-font-mono);
  }

  .hero-brand {
    display: grid;
    place-items: center;
    min-height: 24rem;
    padding: 2rem;
    text-align: center;
    background:
      radial-gradient(circle at 50% 40%, rgb(0 240 255 / 9%), transparent 48%),
      var(--shimpz-color-surface);
  }

  .hero-brand p {
    max-width: 15rem;
    margin: 1.5rem 0 0;
    color: var(--shimpz-color-text-dim);
    font: 400 0.72rem/1.6 var(--shimpz-font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  section {
    margin-top: clamp(5rem, 10vw, 9rem);
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
    margin-top: 1.5rem;
    background: var(--shimpz-color-border);
    border: 1px solid var(--shimpz-color-border);
  }

  .swatches div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 10rem;
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
    margin-top: 1.5rem;
  }

  article {
    padding: clamp(1.25rem, 3vw, 2rem);
  }

  article h3 {
    margin: 0 0 1.5rem;
    color: var(--shimpz-color-text);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .notices {
    grid-column: 1 / -1;
  }

  .stack {
    display: grid;
    align-items: start;
    gap: 1rem;
  }

  .brand-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .brand-strip h2 {
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
    .hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .hero-brand {
      min-height: 20rem;
    }

    .swatches {
      grid-template-columns: repeat(2, 1fr);
    }

    .component-grid {
      grid-template-columns: 1fr;
    }

    .notices {
      grid-column: auto;
    }

    .brand-strip {
      align-items: flex-start;
      flex-direction: column;
    }

    .brand-variants {
      justify-content: flex-start;
    }
  }

  @media (max-width: 520px) {
    header {
      min-height: 4.75rem;
    }

    .signal {
      display: none;
    }

    h1 {
      font-size: clamp(3rem, 17vw, 5rem);
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
