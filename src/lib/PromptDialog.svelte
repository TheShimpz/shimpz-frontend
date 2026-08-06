<script lang="ts">
  import type { Snippet } from "svelte";
  import DialogFrame from "./DialogFrame.svelte";
  import Modal from "./Modal.svelte";

  type Props = {
    open?: boolean;
    title: string;
    titleId: string;
    kicker?: string;
    lead?: string;
    size?: "sm" | "md" | "lg" | "xl";
    autocomplete?: "on" | "off";
    children: Snippet;
    footer?: Snippet;
    oncancel?: (event: Event) => void;
    onsubmit?: (event: SubmitEvent) => void;
  };

  let {
    open = $bindable(false),
    title,
    titleId,
    kicker,
    lead,
    size = "md",
    autocomplete = "off",
    children,
    footer,
    oncancel,
    onsubmit,
  }: Props = $props();

  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  });

  function cancel(event: Event) {
    if (oncancel) {
      oncancel(event);
      return;
    }
    open = false;
  }

  function closed() {
    open = false;
  }
</script>

<Modal
  bind:element={dialog}
  labelledBy={titleId}
  {size}
  oncancel={cancel}
  onclose={closed}
>
  <form {autocomplete} {onsubmit}>
    <DialogFrame {kicker} {title} {titleId} {lead} {footer}>
      {@render children()}
    </DialogFrame>
  </form>
</Modal>

<style>
  form { margin: 0; }
</style>
