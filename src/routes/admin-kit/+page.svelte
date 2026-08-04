<script lang="ts">
  import {
    ActionLink,
    AssistantIcon,
    Button,
    CheckboxField,
    ChoiceItem,
    DialogFrame,
    Disclosure,
    Drawer,
    EmbedFrame,
    FileInput,
    Modal,
    NavItem,
    PageIntro,
    Panel,
    ShimpzBrand,
    StatusBadge,
    TextAreaField,
    TextField,
    WorkspaceShell,
  } from "$lib";

  let modal = $state<HTMLDialogElement>();
  let tallModal = $state<HTMLDialogElement>();
  let fileInput = $state<HTMLInputElement>();
  let drawerOpen = $state(false);
  let enabled = $state(false);
  let teamName = $state("Marketing");
  let message = $state("List the zones with active DNS records.");
</script>

<svelte:head><title>Admin kit — Shimpz Frontend</title></svelte:head>

<WorkspaceShell skipLabel="Skip to Admin kit">
  {#snippet sidebar()}
    <div class="sidebar-content">
      <ShimpzBrand product="Admin" />
      <nav aria-label="Admin kit navigation">
        <NavItem href="#overview" active index="01">Overview</NavItem>
        <NavItem href="#chat" index="02">Chat</NavItem>
      </nav>
    </div>
  {/snippet}
  {#snippet header()}
    <div class="topbar"><StatusBadge tone="success">System online</StatusBadge><Button size="compact" variant="ghost" onclick={() => (drawerOpen = true)}>Open drawer</Button></div>
  {/snippet}

  <div class="content">
    <PageIntro kicker="Admin kit // presentation" title="One sealed interface" lead="Reusable cyberpunk primitives without product authority." />
    <section id="overview" class="grid" aria-label="Admin primitives">
      <Panel>
        <h2>Controls</h2>
        <TextField id="team-name" label="Team name" bind:value={teamName} />
        <TextAreaField id="message" label="Message" bind:value={message} />
        <CheckboxField id="enabled" label="Enable Assistant" bind:checked={enabled} />
        <div class="actions"><Button onclick={() => modal?.showModal()}>Open dialog</Button><Button variant="secondary" onclick={() => tallModal?.showModal()}>Open tall dialog</Button><ActionLink href="#chat">Go to Chat</ActionLink></div>
      </Panel>
      <Panel tone="accent">
        <h2>Assistant</h2>
        <div class="assistant"><AssistantIcon assistant="cloudflare" size={52} /><div><strong>Shimpz Cloudflare</strong><StatusBadge tone="info">Running</StatusBadge></div></div>
        <Disclosure>
          {#snippet summary()}Execution stages <span class="count">3</span>{/snippet}
          <ol><li>Admin prepares the request</li><li>Team gathers context</li><li>Assistant executes the Power</li></ol>
        </Disclosure>
      </Panel>
    </section>
    <section id="chat" aria-label="Embedded surface"><EmbedFrame title="Embedded Store preview" srcdoc="<!doctype html><html><body style='background:#000;color:#f4f4f5;font-family:monospace'>Store surface</body></html>" /></section>
    <FileInput bind:element={fileInput} aria-label="Attach files" />
  </div>
</WorkspaceShell>

<Modal bind:element={modal} labelledBy="kit-dialog-title">
  <DialogFrame
    kicker="Destination // Team"
    title="Choose a Team"
    titleId="kit-dialog-title"
    lead="The selection stays within this presentation contract."
  >
    <div class="team-list">
      <ChoiceItem title="Marketing" description="marketing" meta="Current" selected />
      <ChoiceItem title="Operations" description="operations" />
    </div>
    {#snippet footer()}
      <Button variant="secondary" onclick={() => modal?.close()}>Close</Button>
      <Button onclick={() => modal?.close()}>Confirm</Button>
    {/snippet}
  </DialogFrame>
</Modal>

<Modal bind:element={tallModal} labelledBy="tall-dialog-title">
  <DialogFrame
    kicker="Stress test // Scroll"
    title="Review a long Team list"
    titleId="tall-dialog-title"
    lead="Only the content region scrolls; actions remain available."
  >
    <div class="team-list">
      {#each Array.from({ length: 14 }, (_, index) => index + 1) as index}
        <ChoiceItem title={`Team ${index}`} description={`team_${index}`} selected={index === 1} />
      {/each}
    </div>
    {#snippet footer()}
      <Button variant="secondary" onclick={() => tallModal?.close()}>Cancel</Button>
      <Button onclick={() => tallModal?.close()}>Continue</Button>
    {/snippet}
  </DialogFrame>
</Modal>

<Drawer open={drawerOpen} labelledBy="kit-drawer-title">
  <h2 id="kit-drawer-title">System drawer</h2>
  <p>Focused information without hidden authority.</p>
  <Button variant="secondary" onclick={() => (drawerOpen = false)}>Close drawer</Button>
</Drawer>

<style>
  #chat :global(.shimpz-embed) { min-height: 32rem; background: var(--shimpz-color-bg); }
  .sidebar-content { display: grid; gap: 1.25rem; padding: 1rem; }
  nav { display: grid; gap: 0.4rem; }
  .topbar { display: flex; min-height: 3.75rem; align-items: center; justify-content: flex-end; gap: 0.5rem; padding-inline: 1rem; }
  .content { display: grid; gap: 1.5rem; padding: clamp(1rem, 2.5vw, 2rem); }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .grid :global(.shimpz-panel) { display: grid; align-content: start; gap: 0.75rem; }
  h2 { margin: 0; font: 700 0.9rem/1.2 var(--shimpz-font-mono); letter-spacing: 0.04em; text-transform: uppercase; }
  .actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .assistant { display: flex; align-items: center; gap: 0.75rem; }
  .assistant > div { display: grid; gap: 0.5rem; }
  .team-list { display: grid; gap: 0.25rem; }
  ol { display: grid; gap: 0.4rem; margin: 0; padding-inline-start: 1.25rem; color: var(--shimpz-color-text-muted); font-size: 0.85rem; }
  .count { color: var(--shimpz-color-cyan); }
  @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } }
</style>
