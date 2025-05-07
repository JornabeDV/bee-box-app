<script>
  import Logo from '$lib/common/Logo.svelte';
  import LoginButton from './LoginButton.svelte';
  import MobileMenu from './MobileMenu.svelte';
  import DesktopMenu from './DesktopMenu.svelte';  
</script>

<div class="max-md:hidden bg-light sticky top-0 z-50">

  <div class="flex justify-between items-center text-dark container-large h-[90px]">
    <Logo />
    <nav class="flex">
      <ul class="flex justify-between items-left gap-10 items-center text-lg w-full container-large">
        <DesktopMenu/>
      </ul>
    </nav>    
    <LoginButton />

  </div>
</div>
<div class="md:hidden flex justify-between sticky top-0 w-full z-50 bg-light text-dark items-center h-[80px] container-large">
  <Logo />
  <MobileMenu/>
</div>