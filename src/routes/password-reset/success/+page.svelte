<script>
  import HtmlHead from '$lib/HtmlHead.svelte';
  import Logo from '$lib/common/Logo.svelte';

  window.location.href = "/bee-box";
</script>

<HtmlHead pageDataTitle={"Browser Based Esports Game | CPL Manager"} pageDataDescription={"Lead your FPS team to victory in the thrilling browser-based game set in the CPL esports tournaments. Take the challenge and compete in an intense league season!"} />

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class="pt-8 pb-6 px-6 md:px-12 h-full">
    <div class="flex justify-center">
      <Logo customClasses="w-[150px]" />
    </div>
    <h3 class="text-center uppercase my-6">Confirmación</h3>
    <p class="text-center">Exito</p>
  </div>
</div>