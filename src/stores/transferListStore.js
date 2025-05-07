import { writable } from 'svelte/store';

export const selectedAgeRange = writable([]);

export const selectedFame = writable([]);

export const selectedSkillRange = writable([]);

export const selectedOtherRange = writable([]);

export const selectedSkillLimitRange = writable([]);

export const filteredTransfers = writable([]);

export const transferBid = writable([]);

export const shortlistTransfersStore = writable([]);