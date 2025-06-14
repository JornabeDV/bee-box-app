<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data;

  // let success = false;
  // let error = null;
  // let payment = null;
// https://bee-box-crossfit.netlify.app/success?collection_id=114452335059&collection_status=approved&payment_id=114452335059&status=approved&external_reference=2&payment_type=credit_card&merchant_order_id=31680808503&preference_id=1499495323-bb447bd8-a40b-4853-af0d-d224f3ad7f38&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
  // onMount(async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const payment_id = urlParams.get('payment_id');
  //   const preference_id = urlParams.get('preference_id');
  //   const status = urlParams.get('status');
  //   const plan_id = urlParams.get('external_reference');

  //   if (!payment_id || !preference_id || status !== 'approved') {
  //     error = 'Pago no aprobado o faltan parámetros.';
  //     return;
  //   }

  //   try {

  //     const res = await fetch('/bee-box/api/puchases', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ payment_id, preference_id })
  //     });

  //     const data = await res.json();

  //     if (data.success) {
  //       success = true;
  //       payment = data.payment;

  //       setTimeout(() => {
  //         goto('/bee-box');
  //       }, 3000);
  //     } else {
  //       error = data.error || 'Error desconocido en validación de pago.';
  //     }
  //   } catch (e) {
  //     error = e.message;
  //   }
  // });

    onMount(() => {
    if (data.success) {
      setTimeout(() => goto('/bee-box'), 3000);
    }
  });
</script>

<!-- {#if success}
  <h1>¡Gracias por tu pago!</h1>
  <p>Tu plan ha sido activado.</p>
  <p>ID de pago: {payment.id}</p>
  <p>Serás redirigido a la página principal en unos segundos...</p>
{:else if error}
  <h1 style="color:red;">Error</h1>
  <p>{error}</p>
{/if} -->

{#if data.success}
  <h1 class="text-2xl font-bold">¡Gracias por tu pago!</h1>
  <p>Tu plan ha sido activado correctamente.</p>
  <p>ID del pago: {data.payment.id}</p>
  <p>Serás redirigido a la página principal en unos segundos...</p>
{:else}
  <h1 class="text-xl text-red-500">Hubo un problema</h1>
  <p>{data.error}</p>
{/if}