<script>
  export let items = [];

  import { closePopover } from '$stores/store';

  const closeSubMenu = () => {
    closePopover();
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bg-dark border min-w-[150px] border-[#313133] text-sm flex flex-col justify-center p-4 rounded-md text-light" on:mouseleave={closeSubMenu}>
  <nav class="cursor-pointer flex flex-col gap-3">
    {#each items as item}
      <button class="flex gap-1 hover:text-secondary">
        <a href={item.url} on:click={closeSubMenu}>{item.label}</a>
      </button>
    {/each}
  </nav>
</div>
