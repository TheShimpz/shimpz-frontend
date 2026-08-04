<script lang="ts">
  import {
    ActionLink,
    AssistantIcon,
    Button,
    CheckboxField,
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
        <div class="actions"><Button onclick={() => modal?.showModal()}>Open dialog</Button><ActionLink href="#chat">Go to Chat</ActionLink></div>
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
  <Panel tone="accent">
    <h2 id="kit-dialog-title">Confirm operation</h2>
    <p>The component owns presentation only.</p>
    <Button variant="secondary" onclick={() => modal?.close()}>Close</Button>
  </Panel>
</Modal>

<Drawer open={drawerOpen} labelledBy="kit-drawer-title">
  <h2 id="kit-drawer-title">System drawer</h2>
  <p>Focused information without hidden authority.</p>
  <Button variant="secondary" onclick={() => (drawerOpen = false)}>Close drawer</Button>
</Drawer>

<style>
  .sidebar-content { display: grid; gap: 2rem; padding: 1.5rem; }
  nav { display: grid; gap: 0.6rem; }
  .topbar { display: flex; min-height: 4.25rem; align-items: center; justify-content: flex-end; gap: 0.75rem; padding-inline: 1.25rem; }
  .content { display: grid; gap: 2rem; padding: clamp(1.25rem, 4vw, 3rem); }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
  .grid :global(.shimpz-panel) { display: grid; align-content: start; gap: 1rem; }
  h2 { margin: 0; font-family: var(--shimpz-font-mono); }
  .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .assistant { display: flex; align-items: center; gap: 1rem; }
  .assistant > div { display: grid; gap: 0.5rem; }
  ol { display: grid; gap: 0.5rem; margin: 0; padding-inline-start: 1.4rem; color: var(--shimpz-color-text-muted); }
  .count { color: var(--shimpz-color-cyan); }
  @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } }
</style>
