import { writable } from 'svelte/store';

export const selectedPlayers = writable([1, 2, 3, 4, 5]);

export const visiblePlayers = writable([1, 2, 3, 4, 5]);

export const currentWaypoints = writable([]);

export const gameData = writable(null);

export const tacticGroupUpdate = writable([]);

export const filteredTactics = writable(false);

export const loadingSimulate = writable(false);

export const loadingClear = writable(false);

export const loadingSave = writable(false);

export const selectedLoadout = writable({});

export const selectedMapStore = writable({});

export const selectedSideStore = writable({});