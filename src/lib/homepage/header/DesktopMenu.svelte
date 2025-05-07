<script>
  const smoothScroll = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<li class="w-[120px] text-center cursor-pointer">
  <button class="hover:text-dark hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-dark bg-transparent font-normal text-lg hover:border-b hover:border-bee uppercase" on:click={() => {smoothScroll('home');}}>Home</button>
</li>
<li class="w-[120px] text-center cursor-pointer">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
  <button class="hover:text-dark hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-dark bg-transparent font-normal text-lg hover:border-b hover:border-bee uppercase" on:click={() => {smoothScroll('profile');}}>Profile</button>
</li>
<li class="w-[120px] text-center cursor-pointer">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
  <button class="hover:text-dark hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-dark bg-transparent font-normal text-lg hover:border-b hover:border-bee uppercase" on:click={() => {smoothScroll('login');}}>Login</button>
</li>