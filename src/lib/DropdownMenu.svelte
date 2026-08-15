<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";

  type Item = { value: string; label: string; disabled?: boolean; href?: string };
  type Props = {
    items: Item[];
    value?: string;
    ariaLabel: string;
    menuLabel?: string;
    triggerLabel: string;
    triggerIcon?: Snippet;
    compact?: boolean;
    wide?: boolean;
    onSelect?: (value: string) => void;
    class?: string;
  };

  let { items, value, ariaLabel, menuLabel, triggerLabel, triggerIcon, compact = false, wide = false, onSelect, class: className }: Props = $props();
  let open = $state(false);
  let root = $state<HTMLDivElement>();
  let trigger = $state<HTMLButtonElement>();
  let menu = $state<HTMLDivElement>();
  let linkItems = $state<HTMLAnchorElement[]>([]);
  let buttonItems = $state<HTMLButtonElement[]>([]);
  let focusedIndex = $state(0);
  const menuId = $props.id();

  function close(restore = false) {
    if (menu?.matches(":popover-open")) menu.hidePopover();
    open = false;
    if (restore) queueMicrotask(() => trigger?.focus());
  }
  function placeMenu() {
    if (!root || !trigger || !menu) return;
    const triggerBox = trigger.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    const width = wide ? triggerBox.width : Math.max(176, triggerBox.width);
    const rtl = getComputedStyle(root).direction === "rtl";
    const preferredLeft = rtl ? triggerBox.right - width : triggerBox.left;
    const left = Math.max(8, Math.min(preferredLeft, window.innerWidth - width - 8));
    const below = triggerBox.bottom + 4;
    const top = below + menuBox.height <= window.innerHeight - 8 ? below : Math.max(8, triggerBox.top - menuBox.height - 4);
    menu.style.setProperty("--menu-left", `${left}px`);
    menu.style.setProperty("--menu-top", `${top}px`);
    menu.style.setProperty("--menu-width", `${width}px`);
  }
  function itemDisabled(item: Item) {
    return item.disabled || (!item.href && !onSelect);
  }
  function enabledPositions() {
    return items.flatMap((item, position) => itemDisabled(item) ? [] : [position]);
  }
  function focusItem(position: number) {
    focusedIndex = position;
    queueMicrotask(() => (linkItems[focusedIndex] ?? buttonItems[focusedIndex])?.focus());
  }
  function moveFocus(direction: -1 | 1) {
    const enabled = enabledPositions();
    if (!enabled.length) return;
    const current = Math.max(0, enabled.indexOf(focusedIndex));
    focusItem(enabled[(current + direction + enabled.length) % enabled.length]);
  }
  function toggle() {
    if (open) return close();
    const enabled = enabledPositions();
    if (!enabled.length) return;
    const selected = items.findIndex((item) => item.value === value && !item.disabled);
    focusedIndex = selected >= 0 ? selected : enabled[0];
    open = true;
    queueMicrotask(() => {
      menu?.showPopover();
      placeMenu();
      focusItem(focusedIndex);
    });
  }
  function triggerClick(event: MouseEvent) {
    event.preventDefault();
    toggle();
  }
  function choose(item: Item) {
    if (itemDisabled(item)) return;
    onSelect?.(item.value);
    close(true);
  }
  function outsidePointerdown(event: PointerEvent) {
    if (open && event.target instanceof Node && !root?.contains(event.target)) close();
  }
  function keydown(event: KeyboardEvent) {
    if (!open) return;
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const enabled = enabledPositions();
      if (event.key === "Home") focusItem(enabled[0]);
      else if (event.key === "End") focusItem(enabled.at(-1)!);
      else moveFocus(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Escape" || event.key === "Tab") close(event.key === "Escape");
  }

  onMount(() => {
    if (menu?.matches(":popover-open")) menu.hidePopover();
  });
</script>

<svelte:window onkeydown={keydown} onresize={placeMenu} onscrollcapture={() => { if (open) placeMenu(); }} />
<svelte:document onpointerdown={outsidePointerdown} />

<div bind:this={root} class={["shimpz-dropdown", wide && "is-wide", className]}>
  <Button bind:element={trigger} class="trigger" variant="ghost" size="compact" onclick={triggerClick} popovertarget={menuId} popovertargetaction="toggle" aria-haspopup="menu" aria-expanded={open} aria-label={ariaLabel}>
    {#if triggerIcon}<span class="trigger-icon">{@render triggerIcon()}</span>{/if}
    {#if !compact}<span class="trigger-label">{triggerLabel}</span>{/if}
    <span class="chevron" aria-hidden="true">⌄</span>
  </Button>
    <div bind:this={menu} id={menuId} class="content" role="menu" aria-label={menuLabel} popover="manual" ontoggle={(event) => (open = event.newState === "open")}>
      {#each items as item, index (item.value)}
        {#if item.href}
          <a
            bind:this={linkItems[index]}
            class={["item-link", item.value === value && "item-selected", item.disabled && "is-disabled"]}
            role="menuitemradio"
            tabindex={focusedIndex === index ? 0 : -1}
            aria-checked={item.value === value}
            aria-disabled={item.disabled || undefined}
            href={item.disabled ? undefined : item.href}
            onclick={() => close()}
          >
            <span>{item.label}</span>{#if item.value === value}<span class="selected" aria-hidden="true">●</span>{/if}
          </a>
        {:else}
          <Button
            bind:element={buttonItems[index]}
            variant="ghost"
            size="compact"
            role="menuitemradio"
            tabindex={focusedIndex === index ? 0 : -1}
            aria-checked={item.value === value}
            disabled={itemDisabled(item)}
            class={item.value === value ? "item-selected" : undefined}
            onclick={() => choose(item)}
          >
            <span>{item.label}</span>{#if item.value === value}<span class="selected" aria-hidden="true">●</span>{/if}
          </Button>
        {/if}
      {/each}
    </div>
</div>

<style>
  .shimpz-dropdown { position: relative; width: fit-content; }
  .is-wide { width: 100%; }
  .shimpz-dropdown > :global(.trigger) { width: 100%; justify-content: flex-start; gap: var(--shimpz-space-2); background: var(--shimpz-color-surface); }
  .shimpz-dropdown > :global(.trigger > span) { width: 100%; justify-content: flex-start; gap: var(--shimpz-space-2); }
  .trigger-icon { display: inline-grid; flex: 0 0 auto; place-items: center; }
  .trigger-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chevron { margin-inline-start: auto; color: var(--shimpz-color-text-dim); }
  .content { position: fixed; z-index: 80; top: var(--menu-top); left: var(--menu-left); display: grid; width: var(--menu-width); min-width: 11rem; max-height: min(22rem, calc(100dvh - 1rem)); gap: 1px; padding: var(--shimpz-space-1); margin: 0; overflow: auto; color: var(--shimpz-color-text); background: var(--shimpz-color-surface-raised); border: 1px solid var(--shimpz-color-border); box-shadow: 0 1rem 3rem rgb(0 0 0 / 65%); }
  .content:not(:popover-open) { display: none; }
  .content :global(.shimpz-button) { width: 100%; justify-content: flex-start; color: var(--shimpz-color-text-muted); background: transparent; border: 0; clip-path: none; text-align: start; }
  .content :global(.shimpz-button > span) { width: 100%; justify-content: space-between; gap: var(--shimpz-space-3); }
  .item-link { display: flex; width: 100%; min-height: var(--shimpz-control-height-compact); align-items: center; justify-content: space-between; gap: var(--shimpz-space-3); padding: 0.45rem 0.65rem; color: var(--shimpz-color-text-muted); font: 600 0.72rem/1.2 var(--shimpz-font-mono); text-decoration: none; }
  .item-link.is-disabled { cursor: not-allowed; opacity: 0.48; }
  .item-link:focus-visible { outline: 2px solid var(--shimpz-color-yellow); outline-offset: -2px; }
  .content :global(.shimpz-button:hover), .content :global(.item-selected), .item-link:not(.is-disabled):hover { color: var(--shimpz-color-cyan); background: var(--shimpz-color-surface-high); }
  .selected { margin-inline-start: auto; }
</style>
