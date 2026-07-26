<script lang="ts">
  import { Button } from "$lib";

  let clicks = $state(0);
</script>

<svelte:head>
  <title>Shimpz Frontend</title>
  <meta
    name="description"
    content="The public Shimpz design system for Svelte applications."
  />
</svelte:head>

<main>
  <p class="eyebrow">Design system</p>
  <h1>Shimpz <span>Frontend</span></h1>
  <p class="lead">Shared tokens and presentation primitives for the Shimpz ecosystem.</p>

  <section aria-labelledby="colors-title">
    <h2 id="colors-title">Core colors</h2>
    <div class="swatches">
      <div class="cyan">Cyan</div>
      <div class="magenta">Magenta</div>
      <div class="yellow">Yellow</div>
      <div class="green">Green</div>
    </div>
  </section>

  <section aria-labelledby="primitives-title">
    <h2 id="primitives-title">Primitives</h2>
    <div class="primitives">
      <Button onclick={() => (clicks += 1)}>Interactive button</Button>
      <output aria-live="polite">{clicks} activations</output>
      <Button disabled>Disabled button</Button>
    </div>
  </section>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    background: var(--shimpz-color-bg);
    color: var(--shimpz-color-text);
    font-family: var(--shimpz-font-sans);
  }

  main {
    width: min(100% - 2rem, 64rem);
    margin-inline: auto;
    padding-block: clamp(4rem, 12vw, 9rem);
  }

  .eyebrow,
  h1,
  h2,
  .swatches {
    font-family: var(--shimpz-font-mono);
  }

  .eyebrow {
    color: var(--shimpz-color-cyan);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0.75rem 0;
    font-size: clamp(3rem, 10vw, 7rem);
    letter-spacing: -0.08em;
    line-height: 0.92;
  }

  h1 span {
    color: var(--shimpz-color-magenta);
  }

  .lead {
    max-width: 42rem;
    color: var(--shimpz-color-text-muted);
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.6;
  }

  section {
    margin-top: 5rem;
  }

  h2 {
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .swatches {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 1px;
    margin-top: 1rem;
    background: var(--shimpz-color-border);
    border: 1px solid var(--shimpz-color-border);
  }

  .swatches div {
    min-height: 8rem;
    padding: 1rem;
    background: var(--shimpz-color-surface);
    border-top: 0.35rem solid currentColor;
  }

  .primitives {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
    margin-top: 1rem;
    padding: 1.5rem;
    background: var(--shimpz-color-surface);
    border: 1px solid var(--shimpz-color-border);
  }

  output {
    min-width: 8rem;
    color: var(--shimpz-color-text-muted);
    font-family: var(--shimpz-font-mono);
    font-size: 0.8rem;
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
</style>
