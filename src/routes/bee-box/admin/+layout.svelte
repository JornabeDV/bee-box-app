<script>
  import { page } from '$app/stores';
  import Logo from "$lib/common/Logo.svelte";

  let showSidebar = false;

  const navItems = [
    { href: '/bee-box/admin', label: 'Dashboard' },
    { href: '/bee-box/admin/users', label: 'Usuarios' },
    { href: '/bee-box/admin/schedules', label: 'Clases' },
    { href: '/bee-box/admin/reservations', label: 'Reservas' },
    { href: '/bee-box/admin/locations', label: 'Sedes' },
    { href: '/bee-box/admin/locations', label: 'Estadísticas' },
    { href: '/bee-box/admin/locations', label: 'Caja' },
    { href: '/bee-box/admin/locations', label: 'Calendario' }, // Poder armar el calendario, carga masiva, copiar días, copiar semanas, asignar actividad, Seleccionar profesor
    { href: '/bee-box/admin/locations', label: 'Profesores' } // Carga y baja de profes.
  ];

  function closeSidebar() {
    showSidebar = false;
  }
</script>

<div class="flex min-h-screen text-white flex-col md:flex-row">

  <div class="flex md:hidden items-center justify-between bg-darkest px-4 py-3 border border-theme-borders">
    <h5 class="text-lg">Admin</h5>
    <button on:click={() => (showSidebar = !showSidebar)} class="text-white text-2xl">☰</button>
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  {#if showSidebar}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      on:click={closeSidebar}
    ></div>
  {/if}

  <aside
    class={`fixed md:static top-0 left-0 h-full w-64 bg-dark border-r border-theme-borders p-4 space-y-4 z-50
            transform transition-transform duration-300 ease-in-out md:h-auto
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:block`}
  >
    <h5 class="mb-6 pl-3 hidden md:block">Admin</h5>
    <nav class="flex flex-col space-y-2">
          <Logo />
      {#each navItems as item}
        <a
          href={item.href}
          class="px-3 py-2 rounded hover:bg-bee transition hover:text-darkest"
          class:selected={$page.url.pathname === item.href}
          on:click={closeSidebar}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </aside>

  <main class="flex-1 p-6 bg-darkest border border-theme-borders z-0">
    <slot />
  </main>
</div>

<style>
  a.selected {
    background-color: #FEEA3B;
    color: #141416;
  }
</style>