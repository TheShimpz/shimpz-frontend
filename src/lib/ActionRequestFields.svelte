<script lang="ts">
  import CheckboxField from "./CheckboxField.svelte";
  import RadioField from "./RadioField.svelte";
  import SelectField from "./SelectField.svelte";
  import TextAreaField from "./TextAreaField.svelte";
  import TextField from "./TextField.svelte";

  type Labels = {
    chooseOption: string;
    selectionHint: string;
    passwordLabel: string;
    totpLabel: string;
    totpPlaceholder: string;
  };

  type Props = {
    request: Record<string, any>;
    resetKey: string;
    labels: Labels;
    value?: boolean | string | string[];
    valid?: boolean;
  };

  let {
    request,
    resetKey,
    labels,
    value = $bindable(),
    valid = $bindable(false),
  }: Props = $props();

  let activeKey = $state("");
  let textValue = $state("");
  let singleValue = $state("");
  let selectedValues = $state<string[]>([]);

  const kind = $derived(request.kind ?? "");
  const responseValue = $derived.by(() => {
    if (kind === "approval" || kind === "auth:passkey") return true;
    if (kind === "input:select" || kind === "input:choice") return singleValue;
    if (kind === "input:choices") return selectedValues;
    return textValue;
  });
  const responseValid = $derived.by(() => {
    if (kind === "approval" || kind === "auth:passkey") return true;
    if (kind === "input:select" || kind === "input:choice") {
      return singleValue !== "" || request.required === false;
    }
    if (kind === "input:choices") {
      return selectedValues.length >= request.min_selections &&
        selectedValues.length <= request.max_selections;
    }
    if (kind === "auth:password" || kind === "auth:totp") return textValue.length > 0;
    return textValue.length >= request.min_length &&
      textValue.length <= request.max_length &&
      (request.required === false || textValue.length > 0);
  });

  $effect(() => {
    if (resetKey === activeKey) return;
    activeKey = resetKey;
    textValue = "";
    singleValue = "";
    selectedValues = [];
  });

  $effect(() => {
    value = responseValue;
    valid = responseValid;
  });

  function toggle(optionValue: string, checked: boolean) {
    selectedValues = checked
      ? [...selectedValues, optionValue]
      : selectedValues.filter((item) => item !== optionValue);
  }
</script>

<div class="action-request-fields" data-slot="action-request-fields">
  {#if kind === "input:text" || kind === "input:password" || kind === "input:phone"}
    <TextField
      id="human-request-value"
      label={request.label}
      visuallyHiddenLabel
      type={kind === "input:password" ? "password" : kind === "input:phone" ? "tel" : "text"}
      inputmode={kind === "input:phone" ? "tel" : undefined}
      autocomplete={kind === "input:phone" ? "tel" : "off"}
      spellcheck={kind === "input:password" ? "false" : undefined}
      placeholder={request.placeholder ?? undefined}
      minlength={request.min_length}
      maxlength={request.max_length}
      required={request.required}
      bind:value={textValue}
    />
  {:else if kind === "input:textarea"}
    <TextAreaField
      id="human-request-value"
      label={request.label}
      visuallyHiddenLabel
      placeholder={request.placeholder ?? undefined}
      minlength={request.min_length}
      maxlength={request.max_length}
      required={request.required}
      rows={6}
      bind:value={textValue}
    />
  {:else if kind === "input:select"}
    <SelectField
      id="human-request-value"
      label={request.label}
      visuallyHiddenLabel
      placeholder={labels.chooseOption}
      options={request.options}
      required={request.required}
      bind:value={singleValue}
    />
  {:else if kind === "input:choice"}
    <fieldset>
      <legend class="visually-hidden">{request.label}</legend>
      {#each request.options as option (option.value)}
        <RadioField
          id={`human-request-${option.value}`}
          name="human-request-choice"
          optionValue={option.value}
          label={option.label}
          description={option.description ?? undefined}
          bind:value={singleValue}
        />
      {/each}
    </fieldset>
  {:else if kind === "input:choices"}
    <fieldset>
      <legend class="visually-hidden">{request.label}</legend>
      <p class="field-hint">{labels.selectionHint}</p>
      {#each request.options as option (option.value)}
        <CheckboxField
          id={`human-request-${option.value}`}
          label={option.label}
          hint={option.description ?? undefined}
          checked={selectedValues.includes(option.value)}
          onchange={(event) => toggle(option.value, event.currentTarget.checked)}
        />
      {/each}
    </fieldset>
  {:else if kind === "auth:password"}
    <TextField
      id="human-request-auth"
      label={labels.passwordLabel}
      visuallyHiddenLabel
      type="password"
      autocomplete="current-password"
      required
      maxlength={4096}
      bind:value={textValue}
    />
  {:else if kind === "auth:totp"}
    <TextField
      id="human-request-auth"
      label={labels.totpLabel}
      visuallyHiddenLabel
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      placeholder={labels.totpPlaceholder}
      required
      maxlength={16}
      bind:value={textValue}
    />
  {/if}
</div>

<style>
  .action-request-fields {
    display: contents;
  }

  fieldset {
    display: grid;
    gap: var(--shimpz-space-2);
    margin: 0;
    border: 0;
    padding: 0;
  }

  legend {
    margin-bottom: var(--shimpz-space-1);
    padding: 0;
    color: var(--shimpz-color-text);
    font: 600 0.7rem/1.2 var(--shimpz-font-mono);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  .field-hint {
    margin: 0 0 var(--shimpz-space-1);
    color: var(--shimpz-color-text-dim);
    font-size: 0.72rem;
  }
</style>
