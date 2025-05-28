<script>
  import "../app.css";
  import Popup from '$lib/common/Popup.svelte';

</script>


<div class="h-screen bg-no-repeat bg-dark bg-cover bg-center flex items-center justify-center">

  <slot />

  <Popup /> 

</div>