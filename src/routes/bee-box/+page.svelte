<script>
  const userSubscription = {
    planName: 'Intermedio',
    remainingClasses: 8,
    endDate: '2025-07-15'
  };

  const randomInfo = [
    { title: 'Tips de nutrición', description: 'Come proteínas después del entrenamiento.' },
    { title: 'Planes', description: 'Conocé nuestros planes de entrenamiento!' },
    { title: 'Nuevo coach', description: 'Conocé a Lara, experta en halterofilia.' }
  ];
</script>

<div class="flex flex-col gap-6">
  <section class="bg-dark rounded-lg p-6 shadow-lg">
    <h3 class="font-heading font-thin text-bee mb-2">Tu Plan Actual</h3>
    <p><span class="font-semibold text-primary">Plan:</span> {userSubscription.planName}</p>
    <p><span class="font-semibold text-primary">Clases restantes:</span> {userSubscription.remainingClasses}</p>
    <p><span class="font-semibold text-primary">Válido hasta:</span> {new Date(userSubscription.endDate).toLocaleDateString()}</p>
  </section>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each randomInfo as info}
        {#if info.title === 'Planes'}
          <a href="/bee-box/plans" class="bg-dark p-4 rounded-lg hover:bg-yellow-900 transition duration-200 block">
            <h4 class="font-heading font-thin text-bee mb-2">{info.title}</h4>
            <p class="text-gray-300">{info.description}</p>
          </a>
        {:else}
          <div class="bg-dark p-4 rounded-lg">
            <h4 class="font-heading font-thin text-bee mb-2">{info.title}</h4>
            <p class="text-gray-300">{info.description}</p>
          </div>
        {/if}
      {/each}
    </div>
  </section>
</div>
