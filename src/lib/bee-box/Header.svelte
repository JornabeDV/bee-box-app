<script>
  import { page } from '$app/stores';
  import Logo from '$lib/common/Logo.svelte';
  import Icon from '../common/Icon.svelte';
  import { theme } from "$stores/store";
  import { notifications, flattenedNotifications } from '$stores/notificationStore';
  import NotificationsPopup from '$lib/bee-box/NotificationsPopup.svelte';
  import { closePopover } from '$stores/store';
  // import UserMenuPopup from '$lib/cpl/header/UserMenuPopup.svelte';
  import { tippy } from '$lib/actions/tippy';

  const team = $page.data.team;
  const user = $page.data.user;

  let time = new Date();
  let userMenuTrigger;
  let searchTerm = '';
  let notificationsShow = false;
  let userMenuShow = false;
  let tooltipStyle = "top: 0; left: 0; visibility: hidden;";
	let tooltipVisible = false;
  let tooltipItems = [];
  let subMenuOpen = false;
	let isActiveNotification = false;
  let sortedNotifications = [];
  let friendsShow = false;

  const tooltips = {
		logout: [{ label: 'Log Out', url: '/login?/logout' }],
		help: [{ label: 'Help' }],
		notification: [{ label: 'Notifications' }],
		messages: [{ label: 'Messages' }],
		friends: [{ label: 'Friends' }],
	};

  // if (user) {
	// 	notifications.set(user.team.notifications);
  //   if ($notifications.length) {
  //     notifications.set(groupNotificationsByDateAndSort($notifications));
  //   }
	// }


  setInterval(() => {
    time = new Date();
  }, 1000);

  const switchTheme = () => {
    if ($theme === 'dark') {
      theme.set('light');
    } else {
      theme.set('dark');
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim().length < 3) return;

    window.location.href = `/cpl/search?q=${encodeURIComponent(searchTerm)}`;
  }

  const showNotifications = () => {
		notificationsShow = !notificationsShow;
	}	

  function showUserMenu() {
    userMenuShow = !userMenuShow;
    if (userMenuShow) {
      notificationsShow = false;
    }
  }
	
	const toggleNotifications = (e) => {
		notificationsShow = !notificationsShow;
		friendsShow = false;
    if (notificationsShow) {
      userMenuShow = false;
    }
    e?.stopPropagation?.();
		isActiveNotification = true;

		updateSortedNotifications();
		const hasUnreadNotifications = $flattenedNotifications.some(notification => notification.seen === false);
		
		if (hasUnreadNotifications) {
			markNotificationsAsSeen();
		}
	}

	const markNotificationsAsSeen = async () => {
		try {
			await fetch(`/cpl/api/teams/${team.id}/notifications`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			notifications.update(currentNotifications => {
				for (const date in currentNotifications) {
					currentNotifications[date] = currentNotifications[date].map(notification => ({
						...notification,
						seen: true,
					}));
				}

				updateSortedNotifications();
				flattenedNotifications.set(Object.values(currentNotifications).flat());

				return currentNotifications;
			});
			
		} catch (error) {
			console.error('Error:', error);
		}
	};

  const handleTooltip = (event, type) => {
		closeSubMenu();

		tooltipVisible = true;
		tooltipItems = tooltips[type] || [];
		updateTooltipPosition(event);
	};

  const closeSubMenu = () => {
    closePopover();
    subMenuOpen = false;
  };

	function groupNotificationsByDateAndSort(notifications) {
		const grouped = notifications.reduce((acc, notification) => {
			const date = notification.createdAt.split('T')[0];
			if (!acc[date]) acc[date] = [];
			acc[date].push(notification);
			return acc;
		}, {});

		Object.keys(grouped).forEach((date) => {
			grouped[date].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		});

		return grouped;
	}

  function updateSortedNotifications() {
    notifications.subscribe(currentNotifications => {
      sortedNotifications = Object.keys(currentNotifications)
        .map(date => ({
          date,
          notifications: currentNotifications[date]
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    })();
  }

	const closeTooltip = () => {
	  tooltipVisible = false;
	};

  const updateTooltipPosition = (event) => {
	  tooltipStyle = `top: ${event.clientY + 10}px; left: ${event.clientX + 10}px; visibility: visible;`;
	};

	flattenedNotifications.set(Object.values($notifications).flat());
</script>

{#if $theme === 'dark'}
<style>
  :root {
    --color-background: #141416;
    --text-hover: #fff;
    --color-heading: #EBEBEB;
    --color-border: #242428;
    --border-table: #313133;
    --color-text: #EBEBEB;
    --color-secondary: #1C1C1E;
  }
</style>
{:else}
<style>
  :root {
    --color-background: #fff;
    --text-hover: #141416;
    --color-heading: #141416;
    --color-border: #EBEBEB;
    --border-table: #E8E9EB;
    --color-text: #444444;
    --color-secondary: #F8F8F8;
  }
</style>
{/if}

<svelte:window on:click={(e) => {
  if (userMenuTrigger && !userMenuTrigger.contains(e.target)) {
    userMenuShow = false;
  }
  notificationsShow = false;
  }} />
<div class="bg-dark sticky left-0 top-0 z-20 border-b border-borderTable text-light max-h-[65px] h-full w-full">
  <div class="container relative flex flex-1 justify-between items-center h-full max-lg:hidden">
    <div class="flex gap-3 items-center text-primary">
      <div class="w-[1px] h-[26px] rounded-md bg-primary"></div>
      <div 
        class="flex items-center gap-3"
        use:tippy={{
          content: 'Current time',
        }}
      >
        <div class="flex gap-1 items-center font-bold font-sourceBold">
          <div class="cursor-default min-w-[30px] bg-[#EDEEC0]/10 rounded-lg justify-center text-primary px-2 py-1 text-sm flex items-center gap-1.5 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {time.getHours().toString().padStart(2, '0')}
          :
            {time.getMinutes().toString().padStart(2, '0')}
          :
            {time.getSeconds().toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      <div class="w-[1px] h-[26px] rounded-md bg-primary"></div>
    </div>
    {#if user}
      <div class="flex justify-between items-center pr-2 pl-1">
        <div class="flex items-center">
          <button class="p-2 rounded-[4px] hf:text-secondary custom-transition hf:bg-secondary/10 border border-transparent bg-transparent hidden" on:click={switchTheme}>
            {#if $theme === 'dark'}
              <Icon name="sun" class="w-6 h-6" />
            {:else}
              <Icon name="moon" class="w-6 h-6" />
            {/if}
          </button>
          <button 
            class="p-2 rounded-[4px] hf:text-secondary custom-transition hf:bg-secondary/10 border border-transparent bg-transparent {notificationsShow && isActiveNotification ? 'menu-item--active' : ''}" 
            on:click={showNotifications, toggleNotifications}
            on:mouseenter={(event) => handleTooltip(event, 'notification')}
            on:mouseleave={closeTooltip}
            on:mousemove={updateTooltipPosition}
          >
            <Icon 
              name="{$flattenedNotifications.some(notification => !notification.seen) ? 'bell-dot' : 'bell'}" 
              class="w-5 h-5 pointer-events-none"
            />
          </button>
          <a
            class="p-2 relative hf:text-secondary custom-transition hf:bg-secondary/10 bg-transparent border-l border-l-transparent border-r border-r-transparent"
            href="/cpl/messages"
            on:mouseenter={(event) => handleTooltip(event, 'messages')}
            on:mouseleave={closeTooltip}
            on:mousemove={updateTooltipPosition}
          >
            <!-- {#if user.messages.some(message => !message.seen)}
              <span class="w-2.5 h-2.5 flex items-center justify-center absolute top-1.5 right-1.5 rounded-full bg-dark after:rounded-full after:block after:content-[''] after:bg-fail-red after:w-1.5 after:h-1.5"></span>
            {/if}
            <Icon 
              name="mail"
              class="w-6 h-5 pointer-events-none"
            /> -->
          </a>
        </div>
      </div>
    {:else}
      <div class="flex justify-center gap-4">
        <a href="/register" class="button-primary--outline button--sm">Register</a>
        <a href="/login" class="button-primary button--sm">Login</a>
      </div>
    {/if}
    {#if team}
      {#if notificationsShow}
        <NotificationsPopup notifications={$flattenedNotifications} {sortedNotifications} {showNotifications} {toggleNotifications} {team} />
      {/if}
      <!-- {#if userMenuShow}
        <UserMenuPopup />
      {/if} -->
    {/if}
  </div>
  <div class="lg:hidden flex justify-between top-0 px-4 md:p-4 w-full h-full z-10 bg-dark text-dark items-center">
    <Logo />
  </div>
</div>
