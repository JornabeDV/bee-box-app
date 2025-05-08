<script>
  import Icon from "../common/Icon.svelte";
  import { slide } from 'svelte/transition';
  import { page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';
  import { openPopover, openPopup } from '$stores/store';
  import SubMenu from '$lib/common/SubMenu.svelte';
  import { enhance } from "$app/forms";
  import { notifications, flattenedNotifications } from '$stores/notificationStore';
	import { parseISO, format, isYesterday} from 'date-fns';
  import AlertPopup from '$lib/bee-box/common/AlertPopup.svelte';

  export let team = {};
  export let user = {};

  const isAdmin = user.adminLevel >= 1;

  let isVisible = false;
	let sidebarItems;
  let subMenuOpen = false;
  let isCollapsed = false;
	let notificationsShow = false;
	let sortedNotifications = [];
	let notificationButton; 

  const toggleMenu = () => {
    if (notificationsShow) {
      notificationsShow = !notificationsShow;
      }
    isVisible = !isVisible;
  }

  const toggleMenuClose = (e) => {
		if (e) {
			e.preventDefault();
			if (e.currentTarget && e.currentTarget.getAttribute('href')) {
				window.location.href = e.currentTarget.getAttribute('href');
			}
		}
    setTimeout(() => {
      isVisible = false;
    }, 200);
  }

  const toggleSubItems = (item) => {
    sidebarItems = sidebarItems.map(si => {
      if (si === item) {
        si.isActive = !si.isActive;
      } else {
        si.isActive = false;
      }
      return si;
    });
  };

  const navigateTo = async (event, item, subItem = null) => {
  let url = item.url;

  if (subItem) {
    url = subItem.url;
    toggleMenuClose();
  } else if (item.subItems && item.subItems.length > 0) {
    toggleSubItems(item);
    return;
  } else {
    toggleMenuClose();
  }

		// Check if Cmd or Ctrl key is pressed
		if (event.metaKey || event.ctrlKey) {
      // Open link in a new tab
      window.open(url, '_blank');
      return; // Do not use `goto` if opening in a new tab
    }

    // Immediately update the active state
    sidebarItems = sidebarItems.map(si => {
      if (si === item) {
        si.isActive = true;
        if (si.subItems) {
          si.subItems = si.subItems.map(su => ({
            ...su,
            isActive: su === subItem
          }));
        }
      } else {
        si.isActive = false;
        if (si.subItems) {
          si.subItems = si.subItems.map(su => ({
            ...su,
            isActive: false
          }));
        }
      }
      return si;
    });

    // Perform the navigation after state update
    await goto(url);
  };

  const openSubMenu = (event, items) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    console.log(rect.left, rect.top, rect.right, rect.bottom)
    const x = rect.right + window.scrollX + 23;
    const y = rect.top + window.scrollY;
    openPopover(SubMenu, { items }, { x, y });
    subMenuOpen = true;
  };

  $: {
    navigating.subscribe((nav) => {
			if (team) {
				sidebarItems = [
					/*{
						label: 'Missions',
						icon: 'clipboard-check',
						url: '/cpl/missions',
						isActive: $page.url.pathname.includes('/communities'),
					},*/
					{
						labelKey: 'sidebar.item.own.team',
						icon: 'userTeam',
						isActive: $page.url.pathname.includes('/team/'),
						subItems: [
							{ labelKey: 'sidebar.subItem.overview', url: `/cpl/teams/${team.id}`, isActive: $page.url.pathname === '/team' },
							{ labelKey: 'sidebar.subItem.players', url: `/cpl/teams/${team.id}/players`, isActive: $page.url.pathname.includes(`/teams/${team.id}/players`) },
							{ labelKey: 'sidebar.subItem.training', url: '/cpl/team/training', isActive: $page.url.pathname.includes('/team/training') },
							{ labelKey: 'sidebar.subItem.training', url: '/cpl/team/streaming', isActive: $page.url.pathname.includes('/team/streaming') },
							{ labelKey: 'sidebar.subItem.league', url: `/cpl/leagues/${team.leagueId}`, isActive: $page.url.pathname.includes(`/cpl/leagues/${team.leagueId}`) },
							{ labelKey: 'sidebar.subItem.tactics', url: '/cpl/team/tactics', isActive: $page.url.pathname.includes('/team/tactics') },
							{ labelKey: 'sidebar.subItem.loadouts', url: '/cpl/team/loadouts', isActive: $page.url.pathname.includes('/team/loadouts') },
							{ labelKey: 'sidebar.subItem.reports', url: '/cpl/team/reports', isActive: $page.url.pathname.includes('/team/reports') },
						]
					},
					{
						labelKey: 'sidebar.item.academy',
						icon: 'graduation-cap',
						url: '/cpl/academy',
						isActive: $page.url.pathname.includes('/academy'),
						subItems: [
							{ labelKey: 'sidebar.subItem.squad', url: `/cpl/academy`, isActive: $page.url.pathname.includes(`/academy`) },
							{ labelKey: 'sidebar.subItem.room', url: '/cpl/academy/room', isActive: $page.url.pathname.includes('/academy/room') },
							{ labelKey: 'sidebar.subItem.report', url: '/cpl/academy/report', isActive: $page.url.pathname.includes('/academy/report') },
							{ labelKey: 'sidebar.subItem.tryouts', url: `/cpl/academy/tryouts`, isActive: $page.url.pathname.includes(`/cpl/academy/tryouts`) },
							{ labelKey: 'sidebar.subItem.matches', url: `/cpl/academy/matches`, isActive: $page.url.pathname.includes(`/cpl/academy/matches`) },
						]
					},
					{
						labelKey: 'sidebar.item.office',
						icon: 'briefcase-business',
						url: '/cpl/office/finances',
						isActive: $page.url.pathname.includes('/office'),
						subItems: [
							{ label: 'Gaming House', url: `/cpl/office/house`, isActive: $page.url.pathname.includes('/office/house') },
							{ label: 'Transfer List', url: '/cpl/office/transfers', isActive: $page.url.pathname.includes('/office/transfers') },
							{ label: 'Finances', url: `/cpl/office/finances`, isActive: $page.url.pathname.includes('/office/finances') },
							{ label: 'Staff', url: `/cpl/office/staff`, isActive: $page.url.pathname.includes('/office/staff') },
							{ label: 'Sponsors', url: `/cpl/office/sponsors`, isActive: $page.url.pathname.includes('/office/sponsors') },
							//{ label: 'Shop', url: '/cpl/office/shop', isActive: $page.url.pathname.includes('/office/shop') },
							{ label: 'Merch', url: '/cpl/office/merch',isActive: $page.url.pathname.includes('/office/merch') },
							//{ label: 'Trophy Room', url: `/cpl/office/trophy`, isActive: $page.url.pathname.includes('/office/trophy') },
						]
					},
					{
						labelKey: 'sidebar.item.competitions',
						icon: 'tournament',
						url: '/cpl/tournaments',
						isActive: $page.url.pathname.includes('/tournaments'),
						subItems: [
							{ labelKey: 'sidebar.subItem.leagues', url: `/cpl/leagues` },
							{ labelKey: 'sidebar.subItem.ladders', url: '/cpl/ladders' },
							{ labelKey: 'sidebar.subItem.tournaments', url: '/cpl/tournaments' },
						]
					},
					{
						labelKey: 'sidebar.item.matches',
						icon: 'control',
						url: `/cpl/teams/${team.id}/matches`,
						isActive: $page.url.pathname === (`/teams/${team.id}/matches`),
						subItems: [
							{
								labelKey: 'sidebar.subItem.upcoming',
								url: `/cpl/teams/${team.id}/matches`
							},
							{
								labelKey: 'sidebar.subItem.played',
								url: `/cpl/teams/${team.id}/matches/played`
							},
							/*{
								label: 'Replays',
								url: `/cpl/teams/${team.id}/matches?tab=replays`
							}*/
						]
					},
					{
						labelKey: 'sidebar.item.challenges',
						icon: 'swords',
						url: '/cpl/challenges/received',
						isActive: $page.url.pathname.includes('/challenges'),
						subItems: [
							{
								labelKey: 'sidebar.subItem.received',
								url: `/cpl/challenges/received`
							},
							{
								labelKey: 'sidebar.subItem.sent',
								url: `/cpl/challenges/sent`
							},
							{
								labelKey: 'sidebar.subItem.scrim',
								url: `/cpl/challenges/scrim-finder`
							}
						]
					},
					{
						labelKey: 'sidebar.item.communities',
						icon: 'hub',
						url: '/cpl/communities',
						isActive: $page.url.pathname.includes('/communities'),
					},
					{
						labelKey: 'sidebar.item.more',
						icon: 'plus',
						url: '/cpl',
						isActive: $page.url.pathname.includes('/rankings'),
						subItems: [
							{ labelKey: 'sidebar.subItem.rankings', url: `/cpl/rankings` },
							{ labelKey: 'sidebar.subItem.calendar', url: `/cpl/calendar` },	
							{ labelKey: 'sidebar.subItem.hallOfFame', url: `/cpl/hall-of-fame` },
							{ labelKey: 'sidebar.subItem.rules', url: `/cpl/rules` }
						]
					},
					...(isAdmin
						? [{
							labelKey: 'sidebar.item.admin',
							icon: 'user-round-cog',
							url: '/cpl/admin',
							isActive: $page.url.pathname.includes('/admin'),
							subItems: [
								{ labelKey: 'sidebar.subItem.overview', url: `/cpl/admin`, isActive: $page.url.pathname.includes(`/admin`)},
								{ labelKey: 'sidebar.subItem.tickets', url: `/cpl/admin/tickets`, isActive: $page.url.pathname.includes(`/admin/tickets`) },
								{ labelKey: 'sidebar.subItem.flaggedTransfers', url: '/cpl/admin/flagged-transfers', isActive: $page.url.pathname.includes('/admin/flagged-transfers')},
								{ labelKey: 'sidebar.subItem.pictureRequests', url: '/cpl/admin/picture-requests', isActive: $page.url.pathname.includes('/admin/picture-requests')},
								{ labelKey: 'sidebar.subItem.usernameRequests', url: `/cpl/admin/username-requests`, isActive: $page.url.pathname.includes(`/cpl/admin/username-requests`) },
							]
						}]
						: [])
				];
			} else {
				sidebarItems = [
					{
						labelKey: 'sidebar.item.competitions',
						icon: 'tournament',
						url: '/cpl/tournaments',
						isActive: $page.url.pathname.includes('/tournaments'),
						subItems: [
							{ labelKey: 'sidebar.subItem.leagues', url: `/cpl/leagues` },
							{ labelKey: 'sidebar.subItem.ladders', url: '/cpl/ladders' },
							{ labelKey: 'sidebar.subItem.tournaments', url: '/cpl/tournaments' },
						]
					},
					{
						labelKey: 'sidebar.item.communities',
						icon: 'hub',
						url: '/cpl/communities',
						isActive: $page.url.pathname.includes('/communities'),
					}
				];
			}
    });
  }

  const toggleNotifications = (e) => {
    isVisible = !isVisible;
		notificationsShow = !notificationsShow;
		e.stopPropagation();
		
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

  function getDateLabel(dateStr) {
    const date = parseISO(dateStr);
    if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM do');
    }
  }

  function formatTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
	}

  const deleteNotifications = async () => {
		try {
			const res = await fetch(`/cpl/api/teams/${team.id}/notifications`, {
				method: 'DELETE'
			});

			if (res.ok) {
				notifications.update(currentNotifications => {
					currentNotifications = {};

					flattenedNotifications.set([]);

					return currentNotifications;
				});

				openPopup(AlertPopup, {
					content: 'All notifications deleted',
          nofixed: true
				}, false);

			notificationsShow = !notificationsShow;

			} else {
				console.error('Failed to delete notifications');
			}
		} catch (error) {
			console.log('Error deleting notifications:', error);
		}
	};

  const today = new Date().toISOString().split('T')[0];

  flattenedNotifications.set(Object.values($notifications).flat());
</script>

{#if isVisible && !notificationsShow}

<nav in:slide={{ duration: 200 }} class="fixed bottom-[70px] z-[99] left-0 text-xl flex flex-col gap-2 w-full justify-between pb-4 h-[calc(100%-70px)] bg-dark">
	<div class="flex items-center pt-6 px-4">
		<a href="/cpl/users/{user.id}" on:touchstart={toggleMenuClose} class="flex items-center cursor-pointer transition duration-200 ease-in-out gap-3 w-full justify-start ">
			<Icon name="user" class="pl-0 h-9 w-9"/>
			<p class="text-sm">{user?.username}</p>
		</a>
		<a
			class="p-2 relative hf:text-secondary custom-transition hf:bg-secondary/10 {isCollapsed ? 'menu-item w-full justify-center' : 'bg-transparent border-l border-l-transparent border-r border-r-transparent'}"
			href="/cpl/messages"
			on:touchstart={toggleMenuClose}					
		>
			{#if user.messages.some(message => !message.seen)}
			<span class="w-2.5 h-2.5 flex items-center justify-center absolute top-1.5 right-1.5 rounded-full bg-dark after:rounded-full after:block after:content-[''] after:bg-fail-red after:w-1.5 after:h-1.5"></span>
			{/if}
			<Icon 
				name="mail"
				class="w-6 h-5 pointer-events-none"
			/>
		</a>
		<a
			on:touchstart={toggleMenuClose}
			class="p-3 rounded-[4px] hf:text-secondary custom-transition hf:bg-secondary/10" 
			href="/cpl/notifications"
		>
			<Icon 
				name={$flattenedNotifications.some(notification => !notification.seen) ? 'bell-dot' : 'bell'} 
				class="w-5 h-5 pointer-events-none"
			/>
		</a>
	</div>
	<hr class="border-light border-1 w-full opacity-10">
	<div class="flex flex-col gap-2 text-light text-sm h-full overflow-y-scroll">
		<a on:touchstart={toggleMenuClose} href="/cpl" class="px-2 flex items-center justify-between cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-r-transparent border-transparent hover:rounded hover:border-solid transition duration-200 ease-in-out">
			<div class="flex items-center gap-2 p-2 justify-start" >                
				<Icon name="house" class="h-4 w-4"/>
				<p class="text-light">Home</p>
			</div>
		</a>
		<div class="flex flex-col gap-2">
			{#each sidebarItems as item}
				<div
					class="flex flex-col group overflow-hidden  
					{toggleMenu ? 'justify-center' : ''}
					{item.isActive ? 'active' : ''}"
				>
					<button
						class="flex items-center gap-2 p-2 px-4 justify-between"
						on:touchstart={(e) => navigateTo(e, item)}
						on:mouseenter={(event) => item.subItems && isCollapsed ? openSubMenu(event, item.subItems) : ''}
					>
						<span class="flex gap-2.5 items-left">
							<Icon name={item.icon} class="h-4 w-4" />
							<p class="text-sm">{$_(item.labelKey)}</p>
						</span>
						{#if item.subItems}
							<Icon name="chevron-down" class="h-4 w-4 group-ac:rotate-180" />
						{/if}
					</button>
			
					{#if toggleMenu}
						{#if item.subItems}
						<ul class="cursor-pointer hidden flex-col pl-7 w-full group-ac:flex">
							{#each item.subItems as subItem}
								<li>
									<button class="text-sm flex px-3 py-2.5 hover:text-secondary
									{subItem.isActive ? 'bg-secondary/10 text-secondary rounded-[4px]' : ''}" on:touchstart={(e) => navigateTo(e, item, subItem)}>{$_(subItem.labelKey)}</button>
								</li>
							{/each}
						</ul>
						{/if}
					{/if}
				</div>
			{/each}
			<hr class="border-light border-1 w-full opacity-10">
			<a href="/cpl/store" class="px-2 flex items-center justify-between cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-r-transparent border-transparent hover:rounded hover:border-solid transition duration-200 ease-in-out" on:touchstart={toggleMenuClose}>
				<div class="flex items-center gap-2 p-2 justify-start" >              
					<Icon name="store" class="h-4 w-4"/>
					<p class="text-light">{$_("sidebar.item.store")}</p>
				</div>
			</a>     
			<a href="/cpl/helpcenter" class="px-2 flex items-center justify-between cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-r-transparent border-transparent hover:rounded hover:border-solid transition duration-200 ease-in-out" on:touchstart={toggleMenuClose}>
				<div class="flex items-center gap-2 p-2 justify-start" >              
					<Icon name="help" class="h-4 w-4"/>
					<p class="text-light">{$_("sidebar.item.help")}</p>
				</div>
			</a>
			<form
			method="POST" 
			action="/login?/logout" 
			use:enhance 
			class="px-2 flex items-center justify-between cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-r-transparent border-transparent hover:rounded hover:border-solid transition duration-200 ease-in-out"
			>
				<button type="submit" class="flex items-center gap-2 p-2 justify-start">
					<Icon name="logout" class="h-4 w-4 "/>
					{#if !isCollapsed}
						<p class="text-light">{$_("sidebar.item.logOut")}</p>
					{/if}
				</button>
			</form>
		</div>
	</div>
</nav>
{/if}

<footer class="lg:hidden bg-dark w-full fixed bottom-0 left-0 right-0 z-30 translate-y-0 transition-transform duration-300">

  {#if notificationsShow}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="in:slide={{ duration: 200 }} text-xl flex flex-col gap-5 w-full justify-between pb-4 h-auto" on:click|stopPropagation>
			<header class="flex justify-between items-center p-6 w-full border-b border-greenGray ">
				<span class="flex items-center gap-2 text-sm bg-dark">
					<Icon 
						name={$flattenedNotifications.some(notification => !notification.seen) ? 'bell-dot' : 'bell'} 
						class="w-4 h-4" 
					/>
						{$_("sidebar.notifications.title")}
					<span class="bg-fail-red/10 py-1 px-2.5 rounded">
						{$flattenedNotifications.filter((not) => !not.seen).length}
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
								<p class="text-greenGray relative z-10 text-base text-center px-12 bg-dark">{getDateLabel(date)}</p>
							</div>
						{/if}				
						{#each notifications as notification}
							<a href={notification.link} class="px-6 py-4 flex {notification.seen ? 'bg-dark' : 'bg-[#242428]'} hover:hover:bg-[#343435] cursor-pointer">
								<div class="flex items-center gap-4 text-light">
									<div>
										<Icon name={notification.icon} class="h-6 w-6" />
									</div>
									<div class="flex flex-col">
										<div class="text-sm leading-tight">
											{@html notification.message}  
										</div>  
										<span class="text-sm text-greenGray">{formatTime(notification.createdAt)}</span>
									</div>                        
								</div>								
							</a>
						{/each}
					{/each}
				</section>
				<div class="{$flattenedNotifications.length > 4 ? 'sticky' : 'absolute'} bottom-0 w-full h-16" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0))"></div>
			</main>
			<footer class="px-6 py-4 flex justify-end gap-2 w-full border-t border-greenGray">
				<a href="/cpl/notifications" class="button-primary button--sm">
					{$_("sidebar.notifications.seeAll")}
				</a>
				<button 
					class="button-primary--outline button--sm"
					on:click={deleteNotifications}
				>
					{$_("sidebar.notifications.clearAll")}
				</button>
			</footer>
		</div>
	{/if}
  <nav class="text-xl justify-between">
    <div class="flex h-[70px]">
			{#if team}
				<a on:touchstart={toggleMenuClose} class=" w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-t-secondary border-t-4 hover:border-t-4 hover:border-solid hover:border-secondary transition duration-200 ease-in-out" href="/bee-box/profile/{1}">        
					<div class="flex flex-col items-center justify-center">          
						<Icon name="user-round" class="h-4 w-4"/>
						<p class="text-light text-pMobile">Perfil</p>
					</div>
				</a>
				<a on:touchstart={toggleMenuClose} class=" w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-t-secondary border-t-4 hover:border-t-4 hover:border-solid hover:border-secondary transition duration-200 ease-in-out" href="/bee-box">        
					<div class="flex flex-col items-center justify-center">          
						<Icon name="house" class="h-4 w-4"/>
						<p class="text-light text-pMobile">Inicio</p>
					</div>
				</a>
				<a on:touchstart={toggleMenuClose} class=" w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-t-secondary border-t-4 hover:border-t-4 hover:border-solid hover:border-secondary transition duration-200 ease-in-out" href="/bee-box/shifts">        
					<div class="flex flex-col items-center justify-center">          
						<Icon name="calendar-days" class="h-4 w-4"/>
						<p class="text-light text-pMobile">Turnos</p>
					</div>
				</a>
				<a on:touchstart={toggleMenuClose} class=" w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-t-secondary border-t-4 hover:border-t-4 hover:border-solid hover:border-secondary transition duration-200 ease-in-out" href="/bee-box/timer">        
					<div class="flex flex-col items-center justify-center">          
						<Icon name="timer" class="h-4 w-4"/>
						<p class="text-light text-pMobile">Timer</p>
					</div>
				</a>
				<a on:touchstart={toggleMenuClose} class=" w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer hover:bg-[#F56E0E] border-solid hover:text-secondary hover:bg-opacity-[10%] hover:border-t-secondary border-t-4 hover:border-t-4 hover:border-solid hover:border-secondary transition duration-200 ease-in-out" href="/bee-box/chat">        
					<div class="flex flex-col items-center justify-center">          
						<Icon name="message-square-text" class="h-4 w-4"/>
						<p class="text-light text-pMobile">Chat</p>
					</div>
				</a>
			{/if}
    </div>
  </nav>
</footer>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="{isVisible ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-30 z-20" on:touchstart={toggleMenu}></div>