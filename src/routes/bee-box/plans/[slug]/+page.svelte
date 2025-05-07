<script>
  import { page } from '$app/stores';

  const plan = $page.data.plan;
</script>

<main class="max-w-3xl mx-auto p-6 mt-10 text-white">
  <section class="bg-black rounded-lg shadow-lg p-6">
    <h1 class="text-3xl font-bold text-yellow-500 mb-4">{plan.name}</h1>
    <p class="text-5xl font-bold text-yellow-400 mb-6">${plan.price}/mes</p>
    <p class="text-lg text-gray-300 mb-6">{plan.description}</p>
    <button class="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition">
      Suscribirse
    </button>
  </section>
</main>

