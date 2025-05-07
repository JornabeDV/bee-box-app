import { writable } from 'svelte/store';

export const academyRoom = writable({});
export const maxPlayers = writable("");
export const extraExp = writable("");
export const selectedSlot = writable({});
export const selectedSlotPosition = writable(null);