<script>
  import { page } from '$app/stores';
  import Icon from "$lib/common/Icon.svelte";
  import { goto } from "$app/navigation";

  const plan = $page.data.plan;

  let loading = false;
  let error = '';

  async function subscribe() {
    loading = true;
    error = '';
    try {
      const res = await fetch('/bee-box/api/mercadopago/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id })
      });

      const data = await res.json();

      if (res.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        error = 'Error al generar el link de pago';
      }
    } catch (err) {
      error = 'Ocurrió un error al conectar con MercadoPago';
    } finally {
      loading = false;
    }
  }
</script>

<button 
  class="p-3 button-base justify-start gap-1 hf:underline text-primary" 
  type="button" 
  on:click={() => goto('/bee-box/plans')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>

<section class="card max-w-md mx-auto mt-6 bg-dark text-white p-6 rounded-lg shadow-lg">
  <h4 class="font-heading font-thin text-light text-2xl mb-4">{plan.name}</h4>
  <p class="font-bold text-bee text-xl mb-2">${plan.price} / mes</p>
  <p class="text-primary text-sm mb-4">{plan.classes_per_month} clases por mes</p>
  <p class="text-lg text-white mb-6">{plan.description}</p>

  {#if error}
    <p class="text-red-500 text-sm mb-2">{error}</p>
  {/if}

  <button 
    class="bg-primary text-black text-sm font-sourceSemiBold py-2 px-4 rounded-full mt-4 disabled:opacity-50"
    on:click={subscribe}
    disabled={loading}
  >
    {loading ? 'Redirigiendo...' : 'Suscribirse'}
  </button>
</section>