<script>
  import { onMount, onDestroy } from 'svelte';
  import { closePopup } from "$stores/store";
  import Icon from "$lib/common/Icon.svelte";

  export let content;

  let timer = null;

  onMount(() => {
    timer = setTimeout(() => {
      closePopup();
    }, 3000);
  });

  onDestroy(() => {
    clearTimeout(timer);
  }); 
</script>

<div class="border border-greenGray text-sm md:text-base fixed items-center top-16 left-1/2 -translate-x-1/2 transform bg-dark p-3 rounded-lg z-50 max-w-sm flex gap-4 text-success-green" style="box-shadow: 0 0px 15px 10px rgb(0 0 0 / 0.5);">
  <Icon class="w-6 h-6" name="check_icon" />
  <p class="text-light">{content}</p>
</div>
