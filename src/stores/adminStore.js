import { writable } from 'svelte/store';

export const loadingReject = writable(false);

export const loadingApprove = writable(false);

export const loadingClear = writable(false);

export const pictureRequests = writable([]);
