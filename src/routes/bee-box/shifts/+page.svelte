<script>
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';
  import Icon from "$lib/common/Icon.svelte";

  // Simulación de clases por día
const schedule = [
  { date: '2025-07-15', time: '07:00', name: 'CrossFit Básico' },
  { date: '2025-07-15', time: '09:00', name: 'CrossFit Intermedio' },
  { date: '2025-07-16', time: '08:00', name: 'CrossFit HIIT' },
];


function goToClass(date, time) {
  goto(`/bee-box/shifts/shift?date=${date}&time=${time}`);
}

  $: groupedSchedule = schedule.reduce((acc, cls) => {
  if (!acc[cls.date]) acc[cls.date] = [];
  acc[cls.date].push(cls);
  return acc;
}, {});
</script>

<button 
  class="font-sans p-3 button-base text-primary justify-start gap-1 hf:underline" 
  type="button" 
  on:click={() => goto('/bee-box')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>  
<h2 class="font-heading font-thin text-bee text-center mb-4">Agenda</h2>

  <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
    {#each Object.entries(groupedSchedule) as [day, classes]}
      <div>
        <h3 class="text-lg text-primary font-sans mb-4">{new Date(day).toLocaleDateString()}</h3>
        <div class="space-y-3">
          {#each classes as shift}
            <button
              on:click={() => goToClass(shift.date, shift.time)}
              class="w-full text-left bg-dark hover:bg-yellow-900 transition duration-200 p-3 rounded-md shadow-md text-white"
            >
              <div class="text-sm text-light font-semibold">{shift.time} - {shift.name}</div>
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>