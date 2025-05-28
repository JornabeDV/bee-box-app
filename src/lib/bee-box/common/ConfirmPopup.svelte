<script>
  import { closePopup, loading } from "$stores/store";
  import Icon from "$lib/common/Icon.svelte";
  import { onMount, onDestroy } from 'svelte';

  export let title;
  export let content;
  export let callback;

  const handleConfirm = async () => {
    loading.set(true);
    try {
      await callback();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      loading.set(false);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closePopup();
    } else if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="md:min-w-[520px] flex flex-col gap-9 w-full">
  <h5>{title}</h5>
  <p class="max-sm:text-sm w-full">{content}</p>
  <footer class="flex gap-6 mt-3 md:mt-7 justify-end">
    <button class="button-primary--outline button--sm md:button--md" on:click={closePopup} disabled={$loading}>
      Cancelar
    </button>
    <button class="button-primary button--sm md:button--md" on:click={handleConfirm} disabled={$loading}>
      {#if $loading}
        <Icon class="animate-spin w-6 h-6" name="spinner" />
      {:else}
        Confirmar
      {/if}
    </button>
  </footer>
</div>