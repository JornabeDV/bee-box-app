<script>
  import { goto } from '$app/navigation';

  let name = '';
  let email = '';
  let isActive = true;
  let password = '';

  let error = '';

  async function handleSubmit() {
    error = '';
    if (!name || !email || !password) {
      error = 'Por favor completa todos los campos';
      return;
    }

    const res = await fetch('/bee-box/api/admin/users/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, isActive, password }),
    });

    if (res.ok) {
      goto('/bee-box/admin/users');
    } else {
      const data = await res.json();
      error = data.error || 'Error al crear usuario';
    }
  }
</script>

<h1 class="text-3xl mb-6">Nuevo Usuario</h1>

{#if error}
  <p class="text-red-500 mb-4">{error}</p>
{/if}

<form on:submit|preventDefault={handleSubmit} class="max-w-md space-y-4">
  <div>
    <label class="block mb-1">Nombre</label>
    <input type="text" bind:value={name} class="w-full p-2 rounded bg-gray-900 text-white" />
  </div>

  <div>
    <label class="block mb-1">Email</label>
    <input type="email" bind:value={email} class="w-full p-2 rounded bg-gray-900 text-white" />
  </div>

  <div>
    <label class="block mb-1">Contraseña</label>
    <input type="password" bind:value={password} class="w-full p-2 rounded bg-gray-900 text-white" />
  </div>

  <div class="flex items-center gap-2">
    <input type="checkbox" bind:checked={isActive} id="active" />
    <label for="active">Activo</label>
  </div>

  <button type="submit" class="bg-primary px-4 py-2 rounded text-black">Crear</button>
</form>