<script>
  import { page } from '$app/stores';
  import Icon from '$lib/common/Icon.svelte';

  const news = $page.data.news;
  const user = $page.data.user;

  const userSubscription = {
    planName: 'Intermedio',
    remainingClasses: 8,
    endDate: '2025-07-15'
  };

  const whatsappNumber = '2995249409';
  const whatsappMessage = 'Hola! Me gustaría obtener más información.';
</script>

<div class="flex flex-col gap-6">
  <a href="/bee-box/plans/2" class="card">
    <h3 class="font-heading font-thin text-bee mb-2">Tu Plan Actual</h3>
    <p><span class="font-semibold text-primary">Plan:</span> {userSubscription.planName}</p>
    <p><span class="font-semibold text-primary">Clases restantes:</span> {userSubscription.remainingClasses}</p>
    <p><span class="font-semibold text-primary">Válido hasta:</span> {new Date(userSubscription.endDate).toLocaleDateString()}</p>
  </a>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each news as info}
          <div class="card">
            <h5 class="font-heading font-thin text-bee mb-2">{info.title}</h5>
            <p class="text-gray-300">{info.content}</p>
          </div>
      {/each}
    </div>
  </section>
</div>

<!-- Floating WhatsApp Button -->
<a
  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
  target="_blank"
  rel="noopener noreferrer"
  class="fixed bottom-[500px] right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
  aria-label="Contactar por WhatsApp"
>
  <Icon class="w-8 h-8" name="whatsapp" />
</a>

<style>
  /* Add smooth animation for the WhatsApp button */
  a[aria-label="Contactar por WhatsApp"] {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>