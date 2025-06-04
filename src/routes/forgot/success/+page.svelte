<script>
  import linesBg from '$lib/assets/lines_compete.png?format=webp';
  import dotsBg from '$lib/assets/main_bg.png?format=webp';
  import HtmlHead from '$lib/HtmlHead.svelte';
</script>

<HtmlHead pageDataTitle={"Browser Based Esports Game | CPL Manager"} pageDataDescription={"Lead your FPS team to victory in the thrilling browser-based game set in the CPL esports tournaments. Take the challenge and compete in an intense league season!"} />

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center" style="background-image: url({dotsBg});">
  <div class="bg-dark border border-borderline bg-no-repeat bg-right-bottom rounded-lg min-w-[325px] md:w-[500px] pt-8 pb-6 px-6 md:px-12" style="background-image: url({linesBg})">
    <h3 class="uppercase justify-center -mt-1 mb-6">Confirmación</h3>
    <div class="flex flex-col gap-6">
      <p>Exito</p>
    </div>
  </div>
</div>