<script>
  import { goto } from '$app/navigation';
  export let data;

  let { users, totalUsers, totalPages, currentPage, search } = data;
  let searchInput = search;

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchInput) params.set('search', searchInput);
    params.set('page', '1'); // reset pages to search.
    goto(`/bee-box/admin/users?${params.toString()}`);
  }

  function goToPage(page) {
    const params = new URLSearchParams();
    if (searchInput) params.set('search', searchInput);
    params.set('page', page.toString());
    goto(`/bee-box/admin/users?${params.toString()}`);
  }

    async function handleDelete(id) {
    if (!confirm('¿Querés eliminar este usuario? Esta acción no se puede deshacer.')) return;

    const res = await fetch(`/bee-box/admin/users/${id}/delete`, {
      method: 'POST'
    });

    if (res.ok) {
      location.reload();
    } else {
      alert('Error al eliminar usuario');
    }
  }
</script>

<h5 class="mb-6">Usuarios</h5>

<!-- Search -->
<div class="mb-4 flex flex-col sm:flex-row gap-2">
  <input
    type="text"
    placeholder="Buscar por nombre o email..."
    bind:value={searchInput}
    class="flex-grow p-2 rounded bg-dark text-light"
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button on:click={handleSearch} class="button-primary button--md">
    Buscar
  </button>
    <a href="/bee-box/admin/users/new" class="button-primary--outline button--md">
    + Crear usuario
  </a>
</div>

<table class="table max-md:block max-md:overflow-auto max-md:h-full">
  <colgroup>
    <col class="w-[20%]">
    <col class="w-[25%]">
    <col class="w-[10%]">
    <col class="w-[10%]">
    <col class="w-[20%]">
  </colgroup>
  <thead>
    <tr>
      <th class="text-left max-md:px-2">Nombre</th>
      <th class="text-left max-md:px-2">Email</th>
      <th class="text-left max-md:px-2">Estado</th>
      <th class="text-left max-md:px-2">Creado</th>
      <th class="text-center max-md:px-2">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#if users.length === 0}
      <tr>
        <td colspan="5" class="p-4 text-center text-lightGray">No se encontraron usuarios</td>
      </tr>
    {:else}
      {#each users as user}
        <tr
          class="hover:bg-darkest cursor-pointer"
          on:click={() => goto(`/bee-box/admin/users/${user.id}/edit`)}
        >
          <td class="text-left max-md:px-2">{user.name}</td>
          <td class="text-left max-md:px-2">{user.email}</td>
          <td class="text-left max-md:px-2">{user.isActive ? 'Activo' : 'Inactivo'}</td>
          <td class="text-left max-md:px-2">{new Date(user.createdAt).toLocaleDateString()}</td>
          <td class="max-md:px-2">
            <div class="flex gap-1 justify-center">
              <button
                on:click|stopPropagation={() => handleDelete(user.id)}
                class="button-primary button--sm"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<!-- Pagination -->
{#if totalPages > 1}
  <div class="mt-4 flex justify-center gap-2">
    {#each Array(totalPages) as _, i}
      <button
        class="w-7 py-1 rounded {currentPage === i + 1 ? 'button-primary' : 'button-primary--outline'}"
        on:click={() => goToPage(i + 1)}
      >
        {i + 1}
      </button>
    {/each}
  </div>
{/if}