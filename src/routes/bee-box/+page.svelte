<script>
  import HomeBanner from '$lib/bee-box/home/HomeBanner.svelte';
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';

  const plans = $page.data.plans;
</script>

<main>
  <section class="max-w-7xl mx-auto p-6 mt-8">
    <div class="bg-bee rounded-lg shadow-xl p-6">
      <h3 class="text-2xl font-semibold text-dark text-center mb-4">Planes de Membresía</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each plans as plan}
          <div class="bg-black text-white rounded-lg p-6 text-center shadow-md">
            <h6 class="text-xl font-semibold text-primary mb-2">{plan.name}</h6>
            <p class="font-bold text-yellow-500 mb-4">${plan.price}/mes</p>
            <button
              class="bg-primary text-black py-2 px-4 rounded mt-4 hover:bg-yellow-500 transition duration-200"
              on:click={() => goto(`bee-box/plans/${plan.id}`)}
            >
              Más Información
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>
