<script>
  import HomeBanner from '$lib/bee-box/home/HomeBanner.svelte';
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';
  import Icon from "$lib/common/Icon.svelte";

  const plans = $page.data.plans;
</script>

<button 
  class="font-sans p-3 button-base text-primary justify-start gap-1 hf:underline" 
  type="button" 
  on:click={() => goto('/bee-box')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>
<section class="max-w-7xl mx-auto">
    <h2 class="font-heading font-thin text-bee text-center mb-4">Planes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each plans as plan}
        <div class="bg-dark text-white rounded-xl p-6 text-center shadow-md">
          <h6 class="text-3xl font-heading font-thin text-light mb-2">{plan.name}</h6>
          <p class="font-sans text-bee mb-4">${plan.price}.000 por mes</p>
          <button
            class="bg-primary text-black text-sm font-sourceSemiBold py-2 px-4 rounded-full mt-4"
            on:click={() => goto(`/bee-box/plans/${plan.id}`)}
          >
            Más Información
          </button>
        </div>
      {/each}
    </div>
</section>
