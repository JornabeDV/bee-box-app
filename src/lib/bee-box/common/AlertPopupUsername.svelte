<script>
  import { onMount, onDestroy } from 'svelte';
  import { closePopup } from "$stores/store";
  import Icon from "$lib/common/Icon.svelte";

  export let content;
  export let icon;

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

<div class="border border-greenGray fixed items-center text-sm top-16 left-1/2 -translate-x-1/2 transform bg-dark p-3 pr-3.5 rounded-lg z-50 max-md:w-4/5 md:max-w-xl flex gap-3 { icon==='check_icon' ? 'text-success-green': 'text-fail-red'}" style="box-shadow: 0 0px 15px 10px rgb(0 0 0 / 0.5);">
  <Icon class="{ icon==='check_icon' ? 'w-6 h-6': 'w-4 h-4 '}" name={icon} />
  <p class="text-light md:whitespace-nowrap">{content}</p>
</div>
