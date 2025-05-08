<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '$lib/common/Icon.svelte';
  import { onMount } from 'svelte';

  let user = $page.data.user;
  let name = '';
  let email = '';
  let error = '';
  let success = '';

  onMount(() => {
    name = user.name;
    email = user.email;
  });

  async function updateProfile() {
    try {
      const res = await fetch(`/bee-box/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!res.ok) throw new Error('Error al actualizar');

      success = 'Perfil actualizado con éxito';
      error = '';
    } catch (e) {
      error = e.message || 'Ocurrió un error';
      success = '';
    }
  }
</script>

<!-- Volver -->
<button 
  class="font-sans p-3 button-base text-primary justify-start gap-1 hf:underline" 
  type="button" 
  on:click={() => goto('/bee-box')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>

<!-- Título -->
<h2 class="font-heading font-thin text-bee text-center mb-4">Perfil</h2>

<!-- Formulario de perfil -->
<section class="max-w-2xl mx-auto p-6">
  <div class="bg-dark rounded-lg shadow-xl p-6">
    <div class="mb-4">
      <label class="block text-primary mb-1" for="name">Nombre</label>
      <input
        id="name"
        type="text"
        class="w-full p-2 rounded bg-darkest text-white border border-gray-700"
        bind:value={name}
      />
    </div>
    <div class="mb-4">
      <label class="block text-primary mb-1" for="email">Correo</label>
      <input
        id="email"
        type="email"
        class="w-full p-2 rounded bg-darkest text-white border border-gray-700"
        bind:value={email}
      />
    </div>
    {#if error}
      <p class="text-red-500 text-sm">{error}</p>
    {/if}
    {#if success}
      <p class="text-green-500 text-sm">{success}</p>
    {/if}
    <button
      class="bg-primary text-darkest text-sm font-sourceSemiBold py-2 px-4 rounded-full mt-4"
      on:click={updateProfile}
    >
      Guardar Cambios
    </button>
  </div>
</section>