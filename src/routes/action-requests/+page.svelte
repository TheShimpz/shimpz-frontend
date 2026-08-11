<script lang="ts">
  import { ActionRequestFields, SelectField } from "$lib";

  const options = [
    { value: "input:text", label: "Text" },
    { value: "input:textarea", label: "Textarea" },
    { value: "input:password", label: "Password" },
    { value: "input:phone", label: "Phone" },
    { value: "input:select", label: "Select" },
    { value: "input:choice", label: "Choice" },
    { value: "input:choices", label: "Choices" },
    { value: "approval", label: "Approval" },
    { value: "auth:reauth", label: "Reauthentication" },
    { value: "auth:second-factor", label: "Second factor" },
    { value: "auth:phishing-resistant", label: "Passkey" },
  ];
  const choiceOptions = [
    { value: "one", label: "One", description: "First reviewed option" },
    { value: "two", label: "Two", description: null },
  ];
  const labels = {
    required: "Required",
    optional: "Optional",
    chooseOption: "Choose an option",
    selectionHint: "Choose 1–2 options",
    reauthLabel: "Current password",
    secondFactorLabel: "Authentication code",
    secondFactorPlaceholder: "123456",
  };

  let kind = $state("input:text");
  let value = $state<boolean | string | string[]>();
  let valid = $state(false);
  const request = $derived({
    kind,
    label: "Reviewed value",
    required: true,
    placeholder: "Enter a value",
    min_length: 1,
    max_length: kind === "input:textarea" ? 16_000 : 128,
    options: choiceOptions,
    min_selections: 1,
    max_selections: 2,
  });
</script>

<svelte:head><title>Action requests — Shimpz Frontend</title></svelte:head>

<main>
  <p class="shimpz-kicker">Presentation contract // Action requests</p>
  <h1>Human request fields</h1>
  <SelectField id="request-kind" label="Request kind" {options} bind:value={kind} />
  <ActionRequestFields {request} resetKey={kind} {labels} bind:value bind:valid />
  <output aria-live="polite">{valid ? "Valid" : "Waiting"} · {JSON.stringify(value)}</output>
</main>

<style>
  main { display: grid; gap: var(--shimpz-space-4); width: min(calc(100% - 2rem), 42rem); margin: 0 auto; padding-block: var(--shimpz-space-8); }
  h1 { margin: 0; font: 700 clamp(2rem, 6vw, 4rem)/0.95 var(--shimpz-font-mono); letter-spacing: -0.05em; text-transform: uppercase; }
  output { color: var(--shimpz-color-cyan); font: 600 0.75rem/1.4 var(--shimpz-font-mono); }
</style>
