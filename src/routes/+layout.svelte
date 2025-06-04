<script>
  import "../app.css";
  import Popup from '$lib/common/Popup.svelte';

</script>


<div class="h-screen bg-dark hex-bg">

  <slot />

  <Popup /> 

</div>