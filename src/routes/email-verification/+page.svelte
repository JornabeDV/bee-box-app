<script>
  export let data;
</script>

{#if data.error}
  Error: {data.error}
{:else}
  <h3>Error</h3>
{/if}