<script>
  import { page } from '$app/stores';

  const user = $page.data.user;
</script>

<main class="bg-dark text-white min-h-screen pb-16">
  <!-- Header -->
  <header class="p-6 text-center">
    <h1 class="text-3xl font-bold text-primary">Perfil de Usuario</h1>
  </header>

  <!-- User Profile Section -->
  <section class="max-w-7xl mx-auto p-6">
    <div class="bg-dark rounded-lg shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Información del Usuario -->
      <div class="col-span-2">
        <h2 class="text-2xl font-semibold text-primary mb-2">{user.name}</h2>
        <p class="text-sm text-gray-300">Correo: {user.email}</p>
        <p class="text-sm text-gray-300">Fecha de registro: {user.createdAt}</p>
        
        <div class="mt-4">
          <button 
            class="bg-primary text-black py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
            on:click="{() => editProfile()}"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Sección de Actividades Recientes -->
  <section class="max-w-7xl mx-auto p-6 mt-8">
    <div class="bg-secondary rounded-lg shadow-xl p-6">
      <h3 class="text-xl font-semibold text-primary mb-4">Actividades Recientes</h3>
      <ul class="space-y-3">
        <!-- Lista de actividades, puede ser dinámico según las actividades del usuario -->
        <li class="bg-black text-white p-4 rounded-md">
          <p class="font-semibold">Actualización de perfil</p>
          <span class="text-sm text-gray-300">Hace 2 horas</span>
        </li>
        <li class="bg-black text-white p-4 rounded-md">
          <p class="font-semibold">Completó una tarea</p>
          <span class="text-sm text-gray-300">Hace 1 día</span>
        </li>
        <li class="bg-black text-white p-4 rounded-md">
          <p class="font-semibold">Recibió un mensaje</p>
          <span class="text-sm text-gray-300">Hace 3 días</span>
        </li>
      </ul>
    </div>
  </section>
</main>
