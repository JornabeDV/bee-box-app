<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { openPopup, loading } from '$stores/store';
  import AlertPopup from '$lib/bee-box/common/AlertPopup.svelte';

  let user = $page.data.user;
  const classInfo = $page.data.classInfo;
  $: date = $page.url.searchParams.get('date');
  $: time = $page.url.searchParams.get('time');

  let alreadyRegistered = false;
  let error = null;  

onMount(() => {
  if (classInfo?.reservations?.some(r => r.user_id === user.id)) {
    alreadyRegistered = true;
  }
});

  async function reserveClass() {
    if (alreadyRegistered) return;

    loading.set(true);
    try {
      const response = await fetch(`/bee-box/api/users/${user.id}/reservations`, {
        method: "POST",
        body: JSON.stringify({ date, time }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        openPopup(AlertPopup, {
          content: 'Reserva confirmada',
          nofixed: true
        }, false);

        classInfo.reservations.push({ user });
        alreadyRegistered = true;
      } else {
        const errData = await response.json();
        openPopup(AlertPopup, {
          content: `Error al reservar: ${errData.error || response.statusText}`,
          nofixed: true
        }, false);
      }
    } catch (err) {
      openPopup(AlertPopup, {
        content: 'Error al reservar la clase',
        nofixed: true
      }, false);
    } finally {
      loading.set(false);
    }
  }

  async function cancelReservation() {
    loading.set(true);
    try {
      const response = await fetch(`/bee-box/api/users/${user.id}/reservations`, {
        method: "DELETE",
        body: JSON.stringify({ date, time }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        openPopup(AlertPopup, {
          content: 'Te diste de baja correctamente',
          nofixed: true
        }, false);

        // Eliminar al usuario de la lista de reservas
        classInfo.reservations = classInfo.reservations.filter(r => r.user?.id !== user.id);
        alreadyRegistered = false;
      } else {
        const errData = await response.json();
        openPopup(AlertPopup, {
          content: `Error al cancelar: ${errData.error || response.statusText}`,
          nofixed: true
        }, false);
      }
    } catch (err) {
      openPopup(AlertPopup, {
        content: 'Error al cancelar la reserva',
        nofixed: true
      }, false);
    } finally {
      loading.set(false);
    }
  }


  $: alreadyRegistered = classInfo?.reservations?.some(r => r.user?.id === user.id);
</script>

{#if classInfo}
  <section class="w-full">
    <div>
      <h5 class="font-heading font-thin text-bee mb-4">Clase: {classInfo.type}</h5>

      <div class="text-light mb-3 space-y-1">
        <p>🗓️ {new Date(date).toLocaleDateString()} a las 🕒 {time}</p>
        <p>👩‍🏫 Coach: {classInfo.coach}</p>
        <p>📍 Ubicación: {classInfo.location}</p>
      </div>

      <div class="mb-6">
        <h6 class="text-primary font-thin font-heading mb-2">
          Participantes ({classInfo.reservations?.length}/{classInfo.capacity})
        </h6>

        {#if classInfo?.reservations?.length > 0}
          <ul class="grid grid-cols-3 gap-3 text-light">
            {#each classInfo.reservations as p}
              <li class="bg-darkest rounded-lg shadow-md p-1 flex flex-col items-center text-center border border-bee">
                <span class="text-light font-medium">{p.user.name}</span>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-400 italic">No hay inscriptos aún.</p>
        {/if}
      </div>

      {#if alreadyRegistered}
        <div class="text-green-400 text-center font-semibold mb-4">
          Ya estás registrado para esta clase.
        </div>
        <button 
          class="bg-red-500 hover:bg-red-600 transition text-white font-sans px-4 py-2 rounded-full w-full" 
          on:click={cancelReservation}
        >
          Cancelar reserva
        </button>
      {:else}
        <button 
          class="bg-primary text-black font-sans px-4 py-2 rounded-full w-full" 
          on:click={reserveClass}
        >
          Reservar clase
        </button>
      {/if}
    </div>
  </section>
{:else}
  <p class="text-light italic">Cargando información de la clase...</p>
{/if}

