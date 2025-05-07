<script>
  import { openPopup, closePopup } from '$stores/store';
  import Icon from "../common/Icon.svelte";
  import { parseISO, format, isYesterday} from 'date-fns';
  import { flattenedNotifications } from '$stores/notificationStore';
  import AlertPopup from '$lib/bee-box/common/AlertPopup.svelte';
  import { onMount, onDestroy } from 'svelte';

  export let notifications = [];
  export let sortedNotifications = [];

  export let toggleNotifications;
  export let showNotifications;
  export let team;

  if ($flattenedNotifications.length === 0) {
    sortedNotifications = []
  }

  const today = new Date().toISOString().split('T')[0];

  function formatTime(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      throw new Error('Invalid date format');
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
	}

  function getDateLabel(dateStr) {
    const date = parseISO(dateStr);
    if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM do');
    }
  }

  const deleteNotifications = async () => {
		try {
			const res = await fetch(`/cpl/api/teams/${team.id}/notifications`, {
				method: 'DELETE'
			});

      if (res.ok) {
        notifications = [];

        flattenedNotifications.set([]);

        closePopup();

				openPopup(AlertPopup, {
					content: 'All notifications deleted',
          nofixed: true
				}, false);

        showNotifications();
        
			} else {
				console.error('Failed to delete notifications');
			}
		} catch (error) {
			console.log('Error deleting notifications:', error);
		}
	};

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      toggleNotifications(e);
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="z-40 absolute flex flex-col items-start justify-center bg-dark border-borderTable custom-transition rounded-md shadow-effusive w-[425px] right-[4rem] top-[68px] border" on:click|stopPropagation>
  <header class="flex justify-between items-center p-6 w-full border-b border-greenGray ">
    <span class="flex items-center gap-2 text-sm bg-dark">
      <Icon 
        name={notifications.some(notification => !notification.seen) ? 'bell-dot' : 'bell'} 
        class="w-4 h-4" 
      />
      {$_("sidebar.notifications.title")}
      <span class="bg-fail-red/10 py-1 px-2.5 rounded">
        {notifications.filter((not) => !not.seen).length}
      </span>
    </span>
    <button class="flex bg-dark text-skulls p-0 hf:text-primary custom-transition" aria-label="modal" on:click={toggleNotifications}>
      <Icon name="cross_tactics" class="h-4 w-4" />
    </button>
  </header>
  
  <main class="w-full h-[450px] overflow-y-scroll relative bg-bark">
    <section class="relative pt-6">
      {#each sortedNotifications as { date, notifications }}
        {#if date !== today}
          <div class="flex justify-center relative my-4 before:w-full before:content-[''] before:bg-borderTable before:bottom-0 before:h-[1px] before:left-0 before:absolute before:top-2.5">
            <p class="text-greenGray relative z-10 text-center px-12 bg-dark">{getDateLabel(date)}</p>
          </div>
        {/if}				
        {#each notifications as notification}
          <a href={notification.link} class="px-6 py-4 flex {notification.seen ? 'bg-dark' : 'bg-[#242428]'} hover:hover:bg-[#343435] cursor-pointer">
            <div class="flex items-center gap-4 text-light">
              <div>
                <Icon name={notification.icon} class="h-8 w-8" />
              </div>
              <div class="flex flex-col">
                <div class="leading-tight">
                  {@html notification.message}  
                </div>  
                <span class="text-greenGray">{formatTime(notification.scheduledAt)}</span>
              </div>                        
            </div>								
          </a>
        {/each}
      {/each}
    </section>
    <div class="{notifications.length > 4 ? 'sticky' : 'absolute'} bottom-0 w-full h-16" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0))"></div>
  </main>
  <footer class="px-6 py-4 flex justify-end gap-2 w-full border-t border-greenGray">
    <a href="/cpl/notifications" class="button-primary button--sm">
      {$_("sidebar.notifications.seeAll")}
    </a>
    <button 
      class="button-primary--outline button--sm"
      on:click={deleteNotifications}
      disabled={$flattenedNotifications.length === 0}
    >
      {$_("sidebar.notifications.clearAll")}
    </button>
  </footer>
</div>