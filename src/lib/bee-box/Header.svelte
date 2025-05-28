<script>
  import { page } from '$app/stores';
  import Logo from '$lib/common/Logo.svelte';
  import Icon from '../common/Icon.svelte';
  import { closePopover } from '$stores/store';

    async function handleLogout() {
    const response = await fetch('/bee-box/api/logout', { method: 'POST' });
    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed', await response.text());
    }
  }
</script>

<div class="bg-dark sticky left-0 z-20 border-b border-borderTable text-light max-h-[65px] lg:hidden flex justify-between top-0 px-4 md:p-4 w-full h-full text-dark items-center">  
  <Logo />
  <a href="/login?/logout" aria-label="Ir al inicio">
    <button class="flex items-center justify-center rounded-full bg-darkest text-bee p-0 custom-transition w-[40px] h-[40px]"
    on:click|preventDefault={handleLogout}
    >
      <Icon name="door-open" class="h-6 w-6" />
    </button>
  </a>
</div>
