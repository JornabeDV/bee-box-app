<script>
  import HtmlHead from '$lib/HtmlHead.svelte';
  import HeaderHome from '$lib/homepage/header/HeaderHome.svelte';
  import HeroMain from '$lib/homepage/hero/HeroMain.svelte';
  import Logo from '$lib/common/Logo.svelte';
</script>

<HtmlHead
  pageDataTitle={"Entrená Funcional, CrossFit y más en Bee Box | Comunidad Bee Box"}
  pageDataDescription={"Unite a Bee Box, el gimnasio donde podés entrenar CrossFit, funcional, fuerza y más. Accedé a planificaciones personalizadas, llevá tu progreso y sentí el poder de entrenar en comunidad."}
  pageURL={""}
/>

<div class="container-page bg-dark">
  <section class="text-center p-6 flex flex-col items-center">    
    <Logo customClasses='w-40'/>
    <h2 class="text-3xl font-bold mb-2">Bee Box</h2>
    <p class="text-sm text-light mb-4">Entrenamiento funcional, CrossFit, fuerza y más. Todo en un solo lugar.</p>
    <a href='/login' class="bg-bee text-black px-6 py-3 rounded-full font-bold text-sm">Empezá a entrenar</a>
  </section>

  <section class="p-6 space-y-4">
    <h3 class="text-xl font-semibold text-center">¿Por qué elegir Bee Box?</h3>
    <ul class="space-y-2 text-sm text-gray-300">
      <li class="bg-gray-600 p-3 rounded-md">🔥 Entrenamientos adaptados a tus objetivos: fuerza, resistencia, movilidad</li>
      <li class="bg-gray-600 p-3 rounded-md">📊 Seguimiento de tu progreso con estadísticas y feedback</li>
      <li class="bg-gray-600 p-3 rounded-md">📍 Entrená en nuestra sede o desde donde estés</li>
      <li class="bg-gray-600 p-3 rounded-md">👥 Comunidad Bee Box que te motiva cada día</li>
    </ul>
  </section>

  <section id="join" class="p-6 mt-6 bg-bee text-black text-center rounded-t-3xl">
    <h3 class="text-xl font-heading font-thin mb-2 text-dark">¿Listo para sumarte?</h3>
    <p class="text-sm mb-4">Vení a entrenar con nosotros y formá parte de una comunidad que entrena con propósito.</p>
    <button class="bg-darkest text-white px-6 py-3 rounded-full font-semibold text-sm">Crear cuenta</button>
  </section>

  <footer class="p-4 text-xs text-center text-lightGray mt-6">
    © {new Date().getFullYear()} Bee Box — Entrenamiento funcional, CrossFit y más
  </footer>
</div>