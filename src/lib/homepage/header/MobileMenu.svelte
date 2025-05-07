<script>
  import LoginButton from './LoginButton.svelte';
  import Icon from '../../common/Icon.svelte';
  
  let isMenuOpen = false;
  let isCrossIcon = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    isCrossIcon = !isCrossIcon;
  }

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore missing-declaration -->
<nav class="block absolute top-[100%] w-full left-0 bg-light z-40 bg-contain bg-bottom bg-no-repeat" class:max-md:hidden={!isMenuOpen}>
  <ul class="flex flex-col z-20 justify-between items-left gap-9 my-16 md:items-center container-large">
    <li>
      <button class="hover:text-primary hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-light bg-transparent font-normal text-lg hover:border-b hover:border-secondary uppercase" on:click={() => {toggleMenu(); smoothScroll('home_mobile');}}>Home</button>
    </li>
    <li>
      <button class="hover:text-primary hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-light bg-transparent font-normal text-lg hover:border-b hover:border-secondary uppercase" on:click={() => {toggleMenu(); smoothScroll('perfil_mobile');}}>Perfil</button>
    </li>
    <li>
      <button class="hover:text-primary hover:font-semibold cursor-pointer rounded-none p-0 h-[30px] text-light bg-transparent font-normal text-lg hover:border-b hover:border-secondary uppercase" on:click={() => {toggleMenu(); smoothScroll('login_mobile');}}>Login</button>
    </li> 
  </ul>
</nav>
<button class="mt-2 flex bg-light p-0 text-dark" aria-label="Menu" on:click={toggleMenu}>
  {#if isCrossIcon}
  <Icon name="cross" class="h-6 w-6"/>
  {:else}
  <Icon name="hamburger" class="h-6 w-6"/>
  {/if}
</button>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="{isMenuOpen ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-30" on:click={toggleMenu}></div>