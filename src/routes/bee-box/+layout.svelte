<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { navigating } from '$app/stores';
  import HtmlHead from '$lib/HtmlHead.svelte';
  import FooterMobile from '$lib/bee-box/FooterMobile.svelte';
  import Header from '$lib/bee-box/Header.svelte';
  import Icon from '$lib/common/Icon.svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { balanceTeam } from '$stores/teamStore';
  import { closeTooltip } from '$stores/tooltipStore';
  import { closePopover } from '$stores/store';

  export let data;
  
  let previousBasePath = '';
  let currentBasePath = $page.url.pathname.split('/')[2]; // Initial base path
  let isSameBasePath = true; // Track if it's the same base path

  // Hook for before navigation to store the previous base path
  beforeNavigate(() => {
    // Store current base path as previous before navigation starts
    previousBasePath = currentBasePath;
  });

  // Hook for after navigation to check the current base path
  afterNavigate(() => {
    currentBasePath = $page.url.pathname.split('/')[2]; // Update current base path
    isSameBasePath = previousBasePath === currentBasePath; // Compare the base paths
  });
</script>

<HtmlHead
  pageDataTitle={"CrossFit | Bee Box"}
  pageDataDescription={"Unite a Bee Box y entrená CrossFit de forma personalizada según tus objetivos. Accedé a planificaciones, llevá tu progreso y mejorá tu rendimiento día a día desde cualquier lugar."}
  pageURL={""}
/>

<div class="flex flex-col md:flex-row lg:overflow-hidden lg:h-screen h-screen lg:min-h-screen lg:max-h-screen relative {$page.url.pathname.includes('/live') || $page.url.pathname.includes('/simulation') || $page.route.id === "/cpl/team/tactics/[slug]" ? 'bg-[#222222]' : ''}">
  <div class="flex flex-col flex-1 relative h-full min-w-0">    
    {#if !$page.url.pathname.includes('/live') && !$page.url.pathname.includes('/simulation') && $page.route.id !== "/cpl/team/tactics/[slug]"}
    <Header general={data.general} />
    {/if}

    <div class="relative w-full min-h-0 flex-1 lg:overflow-x-hidden md:overflow-y-auto" on:scroll={() => { closePopover(); closeTooltip(); }}>
      {#key $page.url.pathname}
        {#if $navigating && !isSameBasePath}
          <div class="absolute left-1/2 -translate-x-1/2 top-1/4 z-10">
            <Icon
              class="animate-spin w-16 h-16 text-secondary"
              name="spinner-large"
            />
          </div>
        {:else}
          <div class="h-full container-page overflow-y-auto" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
            <slot team={data.team} />
          </div>
        {/if}
      {/key}
    </div>

  </div>

  {#if !$page.url.pathname.includes('/live') && $page.route.id !== "/cpl/team/tactics/[slug]" && !$page.url.pathname.includes('/simulation')}
  <FooterMobile team={data.team} user={data.user} />
  {/if}

</div>