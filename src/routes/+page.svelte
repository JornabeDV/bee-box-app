<script>
  import HtmlHead from '$lib/HtmlHead.svelte';
  import HeaderHome from '$lib/homepage/header/HeaderHome.svelte';
  import HeroMain from '$lib/homepage/hero/HeroMain.svelte';
  import Logo from '$lib/common/Logo.svelte';

</script>

<HtmlHead
  pageDataTitle={"Entrenamiento CrossFit Personalizado | Bee Box"}
  pageDataDescription={"Unite a Bee Box y entrená CrossFit de forma personalizada según tus objetivos. Accedé a planificaciones, llevá tu progreso y mejorá tu rendimiento día a día desde cualquier lugar."}
  pageURL={""}
/>

<div class="container-page bg-dark">
  <section class="text-center p-6">    
    <Logo />
    <h2 class="text-3xl font-bold mb-2">Bee Box</h2>
    <p class="text-sm text-light mb-4">Planificaciones diseñadas para vos. Entrená donde quieras.</p>
    <a href='/login' class="bg-bee text-black px-6 py-3 rounded-full font-bold text-sm">Comenzá ahora</a>
  </section>
  <section class="p-6 space-y-4">
    <h3 class="text-xl font-semibold text-center">¿Por qué elegir Bee Box?</h3>
    <ul class="space-y-2 text-sm text-gray-300">
      <li class="bg-gray-600 p-3 rounded-md">🔥 Rutinas adaptadas a tus objetivos</li>
      <li class="bg-gray-600 p-3 rounded-md">📊 Seguimiento de progreso diario</li>
      <li class="bg-gray-600 p-3 rounded-md">📅 Acceso desde cualquier lugar</li>
      <li class="bg-gray-600 p-3 rounded-md">👥 Comunidad Bee Box exclusiva</li>
    </ul>
  </section>
  <section id="join" class="p-6 mt-6 bg-bee text-black text-center rounded-t-3xl">
    <h3 class="text-xl font-heading font-thin mb-2 text-dark">¿Listo para empezar?</h3>
    <p class="text-sm mb-4">Unite a la comunidad Bee Box y empezá tu transformación.</p>
    <button class="bg-darkest text-white px-6 py-3 rounded-full font-semibold text-sm">Crear cuenta</button>
  </section>
  <footer class="p-4 text-xs text-center text-lightGray mt-6">
    © {new Date().getFullYear()} Bee Box — CrossFit personalizado
  </footer>
</div>
