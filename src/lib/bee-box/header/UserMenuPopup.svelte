<script>
  import { page } from '$app/stores';
  import Icon from '$lib/common/Icon.svelte';
  import { enhance } from "$app/forms";
  import UserLogo from '$lib/cpl/common/UserLogo.svelte';

  const user = $page.data.user;
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  let friendsShow = false;

  const toggleFriends = (e) => {
		friendsShow = !friendsShow;
		e.stopPropagation();
	}

  const sortedFriends = user.friends ? user.friends.slice().sort((a, b) => {
    const aIsOnline = a.friend.sessions.some(session => new Date(session.lastActivity) > fiveMinutesAgo);
    const bIsOnline = b.friend.sessions.some(session => new Date(session.lastActivity) > fiveMinutesAgo);
    
    return (bIsOnline === aIsOnline) ? 0 : bIsOnline ? 1 : -1;
  }) : [];

  async function handleLogout() {
    const response = await fetch('/cpl/api/logout', { method: 'POST' });
    if (response.ok) {
      console.log('yes');
      // follow the redirect returned by our endpoint
      window.location.href = '/login';
    } else {
      console.error('Logout failed', await response.text());
    }
  }
</script>

<div class="z-40 absolute flex flex-col items-start justify-center bg-dark border-borderTable custom-transition rounded-md shadow-effusive w-[200px] right-[4rem] top-[60px]">
  <main class="w-full h-auto flex flex-col gap-1 p-1 relative bg-bark">
    <a href="/cpl/users/{user.id}" class="menu-item hfa:border-transparent p-2 justify-between">
      <span class="flex gap-2.5 items-center text-sm">
        <Icon class="w-6 h-6" name="user" />
        Profile
      </span>
    </a>
    <a href="/cpl/store/premium" class="menu-item hfa:border-transparent menu-item--gold p-2 text-gold justify-between" >
      <span class="flex gap-2.5 items-center text-sm">
        <Icon class="w-6 h-6" name="crown" />
        Get VIP
      </span>
    </a>
    <button class="menu-item p-2 justify-between hfa:border-transparent {friendsShow ? 'menu-item--active' : ''}"
      on:click={toggleFriends}
      >
      <span class="flex gap-2.5 items-center text-sm">
        <Icon class="w-6 h-6" name="users-round" />
        Friends
      </span>
      <span class="font-sourceSemiBold font-semibold text-sm">
        {user.friends.filter((userFriend) => userFriend.friend.sessions.some(session => new Date(session.lastActivity) > fiveMinutesAgo)).length}/{user.friends.length}
      </span>
    </button>
    <a
      href="/cpl/store"
      class="flex items-center justify-between gap-2 hfa:border-transparent p-2 w-full menu-item"
      >
      <span class="flex gap-2.5 items-center">
        <Icon name="store" class="h-6 w-6" />
        <p class="text-sm">Store</p>
      </span>
    </a>
    <a
      href="/cpl/helpcenter"
      class="flex items-center justify-between gap-2 p-2 w-full menu-item hfa:border-transparent"
      >
      <span class="flex gap-2.5 items-center">
        <Icon name="help" class="h-6 w-6" />
        <p class="text-sm">Help</p>
      </span>
    </a>
    <hr class="border-borderTable border-1 w-full">
    <button type="submit" class="menu-item hfa:border-transparent flex items-center justify-start gap-2 p-2 w-full" on:click|preventDefault={handleLogout}>
      <Icon name="logout" class="h-6 w-6" />
      <p class="text-sm">Log Out</p>
    </button>
  </main>
</div>

{#if friendsShow}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="z-40 absolute flex flex-col items-start justify-center bg-dark border-borderTable custom-transition rounded-md shadow-effusive md:w-[300px] right-[calc(4rem+200px)] top-[138px]" on:click|stopPropagation>
    <header class="flex justify-between items-center p-4 w-full border-b border-greenGray ">
      <span class="flex items-center gap-2 text-sm bg-dark">
        Friends
      </span>
      <button class="flex bg-dark text-skulls p-0 hf:text-primary custom-transition" aria-label="modal" on:click={toggleFriends}>
        <Icon name="cross_tactics" class="h-4 w-4" />
      </button>
    </header>

    <main class="w-full h-[300px] overflow-y-scroll relative bg-bark">
      <section class="relative pt-6">
        {#if sortedFriends.length > 0}
          {#each sortedFriends as userFriend}
            <a href="/cpl/users/{userFriend.friend.id}" class="flex items-center border-b border-borderTable justify-between gap-4 text-light px-6 py-4 bg-dark hover:hover:bg-[#343435] cursor-pointer">
              <div class="flex gap-3 items-center text-sm">
                <UserLogo user={userFriend.friend} />
                {userFriend.friend.username}
              </div>
              <div class="flex flex-col text-sm">
                {#if userFriend.friend.sessions.some(session => new Date(session.lastActivity) > fiveMinutesAgo)}
                  <span class="text-success-green">
                    Online
                  </span>
                {:else}
                  <span class="text-fail-red">
                    Offline
                  </span>
                {/if}
              </div>
            </a>
          {/each}
        {:else}
          <div class="text-lightGray text-center px-4 flex flex-col gap-8">
            <p>You don't have any friends.</p>
            <p>You can add users as friends directly from their profiles.</p>
            <p>See full list of users <a href="/cpl/users" class="underline">here</a></p>
          </div>
        {/if}
      </section>
      <div class="{user.friends.length > 4 ? 'sticky' : 'absolute'} bottom-0 w-full h-16" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0))"></div>
    </main>
  </div>
{/if}