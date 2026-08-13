<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import type { HTMLOlAttributes } from "svelte/elements";

  type Props = Omit<HTMLOlAttributes, "children" | "role"> & {
    items: readonly T[];
    getKey: (item: T) => string | number;
    signal: Snippet<[T]>;
    meta: Snippet<[T]>;
  };

  let {
    items,
    getKey,
    signal,
    meta,
    class: className,
    style,
    ...attributes
  }: Props = $props();
</script>

<ol
  {...attributes}
  data-slot="signal-list"
  role="list"
  class={["shimpz-signal-list", className]}
  {style}
>
  {#each items as item (getKey(item))}
    <li data-slot="signal-list-item">
      <span data-slot="signal-list-marker" aria-hidden="true"></span>
      <div data-slot="signal-list-signal">{@render signal(item)}</div>
      <div data-slot="signal-list-meta">{@render meta(item)}</div>
    </li>
  {/each}
</ol>

<style>
  ol {
    --signal-list-cut: var(--shimpz-cut);
    --signal-list-border: var(--shimpz-color-border-subtle);
    --signal-list-rail: var(--shimpz-color-cyan);
    container-name: signal-list;
    container-type: inline-size;
    display: grid;
    min-width: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    list-style: none;
    background:
      linear-gradient(115deg, color-mix(in srgb, var(--signal-list-rail) 4%, transparent), transparent 34%),
      var(--shimpz-color-surface);
    box-shadow: inset 0 0 0 1px var(--signal-list-border);
    clip-path: polygon(
      0 0,
      calc(100% - var(--signal-list-cut)) 0,
      100% var(--signal-list-cut),
      100% 100%,
      0 100%
    );
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 1.2fr);
    min-width: 0;
    align-items: center;
    gap: var(--shimpz-space-4);
    padding: var(--shimpz-space-3) var(--shimpz-space-4) var(--shimpz-space-3) var(--shimpz-space-5);
  }

  li + li {
    border-block-start: 1px solid var(--signal-list-border);
  }

  [data-slot="signal-list-signal"],
  [data-slot="signal-list-meta"] {
    min-width: 0;
  }

  [data-slot="signal-list-marker"] {
    position: absolute;
    inset-block: var(--shimpz-space-2);
    inset-inline-start: 0;
    width: 3px;
    background: var(--signal-list-rail);
  }

  [data-slot="signal-list-marker"]::after {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 0;
    width: 0.42rem;
    height: 0.42rem;
    background: var(--signal-list-rail);
    box-shadow: 0 0 12px color-mix(in srgb, var(--signal-list-rail) 65%, transparent);
    clip-path: polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%);
    content: "";
    transform: translateY(-50%);
  }

  @container signal-list (max-width: 40rem) {
    li {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--shimpz-space-2);
      padding-block: var(--shimpz-space-2);
    }
  }

  @media (forced-colors: active) {
    ol {
      --signal-list-border: CanvasText;
      --signal-list-rail: CanvasText;
      background: Canvas;
      clip-path: none;
    }

    [data-slot="signal-list-marker"]::after {
      box-shadow: none;
    }
  }
</style>
