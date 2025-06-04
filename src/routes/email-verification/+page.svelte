<script>
  import * as m from '$lib/paraglide/messages';

  export let data;
</script>

{#if data.error}
  {m["email-verification.error"]()}: {data.error}
{:else}
  <h3>{m["email-verification.first_content"]()}</h3>
{/if}