<script>
  import { goto, invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  const { stats, todaySchedules, locations, selectedDate } = data;

  let filterDate = selectedDate || new Date().toISOString().slice(0, 10);
  let filterLocationId = data.selectedLocationId || '';

  function handleFilter() {
    const query = new URLSearchParams();
    if (filterLocationId) query.append('locationId', filterLocationId);
    if (filterDate) query.append('date', filterDate);
    const url = `/bee-box/admin?${query.toString()}`;
    window.location.href = url;
  }
</script>

<h5 class="mb-6">Dashboard</h5>

<!-- Filters -->
<div class="flex flex-col sm:flex-row gap-4 mb-6">
  <div class="w-full sm:w-auto flex-1 min-w-[140px]">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="text-sm block mb-1 text-gray-400">Fecha</label>
    <input type="date" bind:value={filterDate} class="bg-light text-darkest p-2 rounded w-full" />
  </div>

  <div class="w-full sm:w-auto flex-1 min-w-[140px]">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="text-sm block mb-1 text-gray-400">Sede</label>
    <select bind:value={filterLocationId} class="bg-light text-darkest p-2 rounded w-full">
      <option value="">Todas</option>
      {#each locations as loc}
        <option value={String(loc.id)}>{loc.name}</option>
      {/each}
    </select>
  </div>

  <div class="w-full sm:w-auto">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block text-transparent">.</label>
    <button
      on:click={handleFilter}
      class="bg-bee text-black px-4 py-2 rounded w-full sm:w-auto"
    >
      Filtrar
    </button>
  </div>
</div>

<!-- Resume Cards -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div class="card justify-between">
    <h6 class="max-md:text-sm text-base uppercase text-lightGray">Usuarios activos</h6>
    <p class="md:text-3xl font-bold text-green-400 md:mt-2">{stats.activeUsers}</p>
  </div>
  <div class="card justify-between">
    <h6 class="max-md:text-sm text-base uppercase text-lightGray">Reservas hoy</h6>
    <p class="md:text-3xl font-bold text-blue-400 md:mt-2">{stats.todayReservations}</p>
  </div>
  <div class="card justify-between">
    <h6 class="max-md:text-sm text-base uppercase text-lightGray">% Ocupación</h6>
    <p class="md:text-3xl font-bold text-yellow-400 md:mt-2">{stats.occupancyRate}%</p>
  </div>
  <div class="card justify-between">
    <h6 class="max-md:text-sm text-base uppercase text-lightGray">Clases restantes</h6>
    <p class="md:text-3xl font-bold text-red-400 md:mt-2">{stats.remainingSchedules}</p>
  </div>
</div>

<!-- Filter Cards -->
<h6 class="mb-3">Clases del día</h6>
<div class="space-y-3">
  {#if todaySchedules.length === 0}
    <p class="text-lightGray">No hay clases para la fecha y sede seleccionadas.</p>
  {:else}
    {#each todaySchedules as cls}
      <div class="card">
        <div class="flex">
          <div class="flex-1">
            <h6>{cls.activity.name} - {cls.time.slice(0, 5)}</h6>
            <p class="text-sm text-lightGray">
              Coach: {cls.coach?.name || 'Sin asignar'}
            </p>
            <p class="text-sm text-lightGray">
              Capacidad: {cls.maxCapacity}
            </p>
          </div>
          <div class="flex max-md:flex-col flex-wrap sm:flex-nowrap items-center gap-2">
            <p class="text-sm text-darkest bg-bee px-3 py-1 rounded-md">
              {cls.reservations.length} reservas
            </p>
            <a
              href={`/bee-box/class/${cls.id}`}
              class="text-sm bg-lightGray text-black px-3 py-1 rounded-md hover:bg-bee max-md:w-full transition text-center"
            >
              Ver
            </a>
          </div>
        </div>        
      </div>
    {/each}
  {/if}
</div>