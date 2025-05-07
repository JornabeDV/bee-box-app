<script>
  import Dropdown from '$lib/common/Dropdown.svelte';
  import { onMount } from 'svelte';
  import Logo from "$lib/common/Logo.svelte";
  
  const year = new Date().getFullYear();  
</script>

<footer class="border-t border-[#343435] mt-12">
  <div class="grid md:grid-cols-4 items-start py-12 container-page">
    <Logo />
    <div class="flex flex-col gap-2">
      <h6 class="mb-2">Get help</h6>
      <a class="plain-link" href="/cpl/helpcenter/manual">Manual</a>
      <a class="plain-link" href="/cpl/helpcenter/support">Support</a>
      <a class="plain-link" href="/cpl/helpcenter/tutorials">Tutorials</a>
      <a class="plain-link" href="/cpl/helpcenter/faq">FAQ</a>
    </div>
    <div class="flex flex-col gap-2">
      <a class="" href="https://discord.gg/PMvHTPUfWv">Discord</a>
    </div>
  </div>
</footer>
<footer class="border-t border-[#343435]">
  <div class="flex container-page justify-between text-greenGray text-sm py-4 items-center">
    © {year} Bee Box
  </div>
</footer>