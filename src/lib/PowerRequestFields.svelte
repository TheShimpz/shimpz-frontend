<script lang="ts">
  import CheckboxField from "./CheckboxField.svelte";
  import Notice from "./Notice.svelte";
  import RadioField from "./RadioField.svelte";
  import SelectField from "./SelectField.svelte";
  import TextAreaField from "./TextAreaField.svelte";
  import TextField from "./TextField.svelte";

  type Labels = {
    required: string;
    optional: string;
    chooseOption: string;
    selectionHint: string;
    thirdPartySecret: string;
    reauthHint: string;
    reauthLabel: string;
    secondFactorHint: string;
    secondFactorLabel: string;
    secondFactorPlaceholder: string;
    passkeyHint: string;
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
  const requiredLabel = $derived(request.required ? labels.required : labels.optional);
  const responseValue = $derived.by(() => {
    if (kind === "approval" || kind === "auth:phishing-resistant") return true;
    if (kind === "input:select" || kind === "input:choice") return singleValue;
    if (kind === "input:choices") return selectedValues;
    return textValue;
  });
  const responseValid = $derived.by(() => {
    if (kind === "approval" || kind === "auth:phishing-resistant") return true;
    if (kind === "input:select" || kind === "input:choice") {
      return singleValue !== "" || request.required === false;
    }
    if (kind === "input:choices") {
      return selectedValues.length >= request.min_selections &&
        selectedValues.length <= request.max_selections;
    }
    if (kind === "auth:reauth" || kind === "auth:second-factor") return textValue.length > 0;
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

<div class="power-request-fields" data-slot="power-request-fields">
  {#if kind === "input:text" || kind === "input:password" || kind === "input:phone"}
    {#if kind === "input:password"}<Notice variant="warning">{labels.thirdPartySecret}</Notice>{/if}
    <TextField
      id="human-request-value"
      label={`${request.label} · ${requiredLabel}`}
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
      label={`${request.label} · ${requiredLabel}`}
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
      label={`${request.label} · ${requiredLabel}`}
      placeholder={labels.chooseOption}
      options={request.options}
      required={request.required}
      bind:value={singleValue}
    />
  {:else if kind === "input:choice"}
    <fieldset>
      <legend>{request.label} · {requiredLabel}</legend>
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
      <legend>{request.label} · {requiredLabel}</legend>
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
  {:else if kind === "auth:reauth"}
    <Notice variant="warning">{labels.reauthHint}</Notice>
    <TextField
      id="human-request-auth"
      label={labels.reauthLabel}
      type="password"
      autocomplete="current-password"
      required
      maxlength={4096}
      bind:value={textValue}
    />
  {:else if kind === "auth:second-factor"}
    <Notice variant="warning">{labels.secondFactorHint}</Notice>
    <TextField
      id="human-request-auth"
      label={labels.secondFactorLabel}
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      placeholder={labels.secondFactorPlaceholder}
      required
      maxlength={16}
      bind:value={textValue}
    />
  {:else if kind === "auth:phishing-resistant"}
    <Notice variant="warning">{labels.passkeyHint}</Notice>
  {/if}
</div>

<style>
  .power-request-fields,
  fieldset {
    display: grid;
    gap: var(--shimpz-space-2);
  }

  fieldset {
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

  .field-hint {
    margin: 0 0 var(--shimpz-space-1);
    color: var(--shimpz-color-text-dim);
    font-size: 0.72rem;
  }
</style>
