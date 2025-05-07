import { writable } from 'svelte/store';

export const friendsNew = writable([]);

export const blockedNew = writable([]);

export const loadingFriend = writable(false);

export const loadingBlocked = writable(false);

export const userLogoInVerification = writable(false);

export const vipEndsAt = writable("");

export const coinBalance = writable("");
