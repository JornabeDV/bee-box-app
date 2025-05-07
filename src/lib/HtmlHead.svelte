<script>
  export let pageDataTitle;
  export let pageDataDescription;
  export let pageURL;
</script>

<svelte:head>
  {#if pageDataTitle}
    <title>{pageDataTitle}</title>
    <meta property="og:title" content={pageDataTitle}>
    <meta name="twitter:title" content={pageDataTitle}>
  {/if}

  {#if pageDataDescription}
    <meta name="description" content={pageDataDescription}>
    <meta property="og:description" content={pageDataDescription}>
    <meta name="twitter:description" content={pageDataDescription}>
  {/if}

  <link rel="canonical" href="https://www.bee-box.com.ar{pageURL}" />
  <meta property="og:url" content="https://www.bee-box.com.ar{pageURL}">
</svelte:head>