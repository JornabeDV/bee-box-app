<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '$lib/common/Icon.svelte';
  import { page } from '$app/stores';

  let schedule = $page.data.schedule;

  $: groupedSchedule = schedule.reduce((acc, cls) => {
    if (!acc[cls.date]) acc[cls.date] = [];
    acc[cls.date].push(cls);
    return acc;
  }, {});

  function formatDay(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric'
    });
  }
</script>

<button class="font-sans p-3 button-base text-primary justify-start gap-1 hf:underline" on:click={() => goto('/bee-box')}>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>

<h3 class="font-heading font-thin text-bee text-center mb-4">Agenda</h3>

<div class="flex overflow-x-auto gap-4 px-2 pb-4 scroll-smooth">
  {#each Object.entries(groupedSchedule) as [day, shifts]}
    <div class="w-[40vw] sm:w-[50vw] md:w-[200px] bg-dark border border-theme-borders rounded-lg p-3 flex-shrink-0">
      <h6 class="text-md text-center text-primary font-semibold mb-2 capitalize">{formatDay(day)}</h6>
      <div class="space-y-2 max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
        {#each shifts as shift}
          <a
            href='/bee-box/schedule/{shift.id}'
            class="w-full bg-darkest text-light border border-theme-borders p-2 rounded-md text-sm shadow hover:bg-dark/80 transition"
          >
            <p>{shift.time}</p>
            <p>{shift.activity}</p>
            <p class="text-xs mt-1">{shift.reserved} / {shift.capacity} reservas</p>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>