<script>
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';
  import Icon from "$lib/common/Icon.svelte";

  // Simulación de clases por día
  const schedule = {
    'Lunes 15': [
      { id: 1, startTime: '07:00 AM', className: 'CrossFit Básico' },
      { id: 2, startTime: '09:00 AM', className: 'CrossFit Intermedio' },
      { id: 3, startTime: '11:00 AM', className: 'Entrenamiento Funcional' }
    ],
    'Martes 16': [
      { id: 4, startTime: '08:00 AM', className: 'CrossFit HIIT' },
      { id: 5, startTime: '10:00 AM', className: 'CrossFit Avanzado' },
      { id: 6, startTime: '12:00 PM', className: 'WOD Libre' }
    ]
  };

  function goToClass(classId) {
    goto(`/class/${classId}`);
  }
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
    {#each Object.entries(schedule) as [day, classes]}
      <div>
        <h3 class="text-lg text-primary font-sans mb-4">{day}</h3>
        <div class="space-y-3">
          {#each classes as classes}
            <button
              on:click={() => goToClass(classes.id)}
              class="w-full text-left bg-dark hover:bg-yellow-900 transition duration-200 p-3 rounded-md shadow-md text-white"
            >
              <div class="text-sm text-light font-semibold">{classes.startTime}</div>
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>