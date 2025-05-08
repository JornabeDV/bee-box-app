<script>
  import { page } from '$app/stores';
  import Icon from "$lib/common/Icon.svelte";
  import { goto } from "$app/navigation";

  const plan = $page.data.plan;
</script>

<button 
  class="p-3 button-base justify-start gap-1 hf:underline text-primary" 
  type="button" 
  on:click={() => goto('/bee-box/plans')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>
<main class="max-w-3xl mx-auto p-6 mt-10 text-white">
  <section class="bg-dark rounded-lg shadow-lg p-6">
    <h4 class="font-heading font-thin text-yellow-500 mb-4">{plan.name}</h4>
    <p class="font-bold text-yellow-400 mb-6">${plan.price}.000 mes</p>
    <p class="text-lg text-gray-300 mb-6">{plan.description}</p>
    <button class="bg-primary text-black text-sm font-sourceSemiBold py-2 px-4 rounded-full mt-4"
    >
      Suscribirse
    </button>
  </section>
</main>