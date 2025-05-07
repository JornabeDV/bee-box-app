import { writable } from 'svelte/store';

export const selectedLineups = writable([]);

export const selectedGearTeam = writable([]);

export const playerList = writable([]);

export const transferList = writable([]);

export const totalSkillValueA = writable(0);

export const totalSkillValueB = writable(0);

export const isInShortlist = writable(false);