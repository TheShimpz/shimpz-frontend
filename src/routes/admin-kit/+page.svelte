<script lang="ts">
  import {
    ActionLink,
    AssistantIcon,
    Button,
    Card,
    CheckboxField,
    ChoiceItem,
    DialogFrame,
    Disclosure,
    Drawer,
    DropdownMenu,
    EmptyState,
    EmbedFrame,
    FileInput,
    Modal,
    Message,
    NavItem,
    PageIntro,
    ScrollArea,
    Separator,
    ShimpzBrand,
    Skeleton,
    StatusBadge,
    TextAreaField,
    TextField,
    Toast,
    Toolbar,
    WorkspaceShell,
  } from "$lib";

  let modal = $state<HTMLDialogElement>();
  let tallModal = $state<HTMLDialogElement>();
  let fileInput = $state<HTMLInputElement>();
  let drawerOpen = $state(false);
  let enabled = $state(false);
  let teamName = $state("Marketing");
  let message = $state("List the zones with active DNS records.");
  let locale = $state("en");
  let toastVisible = $state(false);
</script>

<svelte:head><title>Admin kit — Shimpz Frontend</title></svelte:head>

{#if toastVisible}<Toast label="System" closeLabel="Dismiss notification" onClose={() => (toastVisible = false)}>Presentation contract synchronized.</Toast>{/if}

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
      <Card title="Controls" description="Compact fields and explicit actions.">
        <TextField id="team-name" label="Team name" bind:value={teamName} />
        <TextAreaField id="message" label="Message" bind:value={message} />
        <CheckboxField id="enabled" label="Enable Assistant" bind:checked={enabled} />
        <Toolbar><Button onclick={() => modal?.showModal()}>Open dialog</Button><Button variant="secondary" onclick={() => tallModal?.showModal()}>Open tall dialog</Button><Button variant="ghost" onclick={() => (toastVisible = true)}>Show toast</Button><ActionLink href="#chat">Go to Chat</ActionLink></Toolbar>
      </Card>
      <Card tone="accent" title="Assistant" description="Status, identity and execution details.">
        {#snippet action()}<StatusBadge tone="info">Running</StatusBadge>{/snippet}
        <div class="assistant"><AssistantIcon assistant="cloudflare" size={52} /><div><strong>Shimpz Cloudflare</strong><StatusBadge tone="info">Running</StatusBadge></div></div>
        <Separator />
        <Disclosure>
          {#snippet summary()}Execution stages <span class="count">3</span>{/snippet}
          <ol><li>Admin prepares the request</li><li>Team gathers context</li><li>Assistant executes the Power</li></ol>
        </Disclosure>
      </Card>
    </section>
    <section class="grid" aria-label="Menu and message primitives">
      <Card title="Menu" description="Keyboard-navigable selection with current state.">
        <DropdownMenu
          items={[{ value: "unavailable", label: "Unavailable locale", disabled: true }, { value: "en", label: "English" }, { value: "pt", label: "Português" }]}
          value={locale}
          ariaLabel="Current language"
          triggerLabel={locale === "en" ? "English" : "Português"}
          onSelect={(value) => (locale = value)}
        />
      </Card>
      <Card title="Conversation" description="Role-specific message hierarchy.">
        <ScrollArea maxHeight="10rem">
          <div class="messages">
            <Message variant="user" author="You">List active DNS records.</Message>
            <Message author="Marketing">I found three active records.</Message>
          </div>
        </ScrollArea>
      </Card>
    </section>
    <EmptyState compact title="No pending operations" description="New activity will appear here when a Team starts work." />
    <Card title="Loading state" description="Reserved geometry prevents layout shifts while content arrives.">
      <div class="skeleton-demo"><Skeleton height="0.75rem" width="42%" /><Skeleton height="2.5rem" /><Skeleton height="2.5rem" /></div>
    </Card>
    <Card id="chat" class="embed-card" padding="none" aria-label="Embedded surface"><EmbedFrame title="Embedded Store preview" srcdoc="<!doctype html><html><body style='background:#000;color:#f4f4f5;font-family:monospace'>Store surface</body></html>" /></Card>
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
  :global(.embed-card [data-slot="card-content"]) { padding: 0; }
  :global(.embed-card .shimpz-embed) { min-height: 32rem; background: var(--shimpz-color-bg); }
  .sidebar-content { display: grid; gap: 1.25rem; padding: 1rem; }
  nav { display: grid; gap: 0.4rem; }
  .topbar { display: flex; min-height: 3.75rem; align-items: center; justify-content: flex-end; gap: 0.5rem; padding-inline: 1rem; }
  .content { display: grid; gap: 1.5rem; padding: clamp(1rem, 2.5vw, 2rem); }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .grid :global(.shimpz-card [data-slot="card-content"]) { display: grid; align-content: start; gap: 0.75rem; }
  h2 { margin: 0; font: 700 0.9rem/1.2 var(--shimpz-font-mono); letter-spacing: 0.04em; text-transform: uppercase; }
  .assistant { display: flex; align-items: center; gap: 0.75rem; }
  .assistant > div { display: grid; gap: 0.5rem; }
  .messages { display: grid; gap: 0.75rem; }
  .skeleton-demo { display: grid; gap: 0.65rem; }
  .team-list { display: grid; gap: 0.25rem; }
  ol { display: grid; gap: 0.4rem; margin: 0; padding-inline-start: 1.25rem; color: var(--shimpz-color-text-muted); font-size: 0.85rem; }
  .count { color: var(--shimpz-color-cyan); }
  @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } }
</style>
