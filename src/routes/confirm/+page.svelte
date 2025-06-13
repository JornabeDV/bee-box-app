<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let success = false;
  let error = null;
  let payment = null;

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment_id = urlParams.get('payment_id');
    const preference_id = urlParams.get('preference_id');
    const status = urlParams.get('status');

    if (!payment_id || !preference_id || status !== 'approved') {
      error = 'Pago no aprobado o faltan parámetros.';
      return;
    }

    try {

      const res = await fetch('/bee-box/api/puchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id, preference_id })
      });

      const data = await res.json();

      if (data.success) {
        success = true;
        payment = data.payment;

        setTimeout(() => {
          goto('/bee-box');
        }, 3000);
      } else {
        error = data.error || 'Error desconocido en validación de pago.';
      }
    } catch (e) {
      error = e.message;
    }
  });
</script>

{#if success}
  <h1>¡Gracias por tu pago!</h1>
  <p>Tu plan ha sido activado.</p>
  <p>ID de pago: {payment.id}</p>
  <p>Serás redirigido a la página principal en unos segundos...</p>
{:else if error}
  <h1 style="color:red;">Error</h1>
  <p>{error}</p>
{/if}