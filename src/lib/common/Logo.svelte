<script>
  import logoSrc from '../assets/logo-header.png'

  export let customClasses = '';

</script>

<a href="/" aria-label="Logo">
  <img
    src={logoSrc}
    alt="Bee Box Logo"
    class="cursor-pointer w-[95px] md:w-32 {customClasses} "
  />
</a>
