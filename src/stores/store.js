import { writable } from 'svelte/store';

export const theme = writable('dark');

export const tactics = writable(null);

export const selectedTactic = writable(null);

export const loadouts = writable(null);

export const staffMembers = writable([]);

export const selectedLoadout = writable(null);

export const userImageUrl = writable(null);

export const shirtColor = writable(1);

export const showEquipments = writable(null);

export const loadoutEquipments = writable(null);

export const staff = writable(null);

export const openModal = writable(null);

export const selectedOption = writable(null);

export const matches = writable(null);

export const tacticsPopup = writable(false);

export const popupIsFullscreen = writable(false);

export const newRegisterPopup = writable(false);

export const loading = writable(false);

export const simulating = writable(false);

export const filteredTournaments = writable(false);

export const popoverTactics = writable({
  visible: false,
  x: 0,
  y: 0
});

export const popupUsage = writable(false);

export const selectedPlayer = writable(null);

export const currentTactic = writable({
  name: 'Tactic name',
  waypoints: []
});

export const currentWaypoint = writable(null);

export const user = writable(null);

export const popoverMatches = writable({
  visible: false,
  x: 0,
  y: 0
});

export const selectedMatch = writable(null);

export const popoverPlayer = writable({
  visible: false,
  x: 0,
  y: 0
});

export const popupContent = writable(null);
export const popupProps = writable({});
export const isPopupOpen = writable(false);

export const openPopup = (content, props = {}, showCloseButton = true) => {
  popupContent.set(content);
  popupProps.set({...props, showCloseButton});
  isPopupOpen.set(true);
}

export const closePopup = () => {
  popupContent.set(null);
  popupProps.set({});
  isPopupOpen.set(false);
}

export const popoverContent = writable(null);
export const popoverProps = writable({});
export const popoverPosition = writable({});
export const isPopoverOpen = writable(false);
export const popoverClasses = writable("");

export const openPopover = (content, props = {}, position = { x: 0, y: 0 }, classes = "") => {
  popoverPosition.set(position);
  popoverContent.set(content);
  popoverProps.set(props);
  isPopoverOpen.set(true);
  popoverClasses.set(classes);
}

export const closePopover = () => {
  popoverContent.set(null);
  popoverProps.set({});
  isPopoverOpen.set(false);
}

export const currentTab = writable(null);

export const closeAllDropdowns = writable(false);

export const currentPage = writable(1);

export const activePopover = writable(null);