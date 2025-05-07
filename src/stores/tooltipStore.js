import { writable } from 'svelte/store';

export const tooltipContent = writable(null);
export const tooltipProps = writable({});
export const tooltipPosition = writable({});
export const isTooltipOpen = writable(false);

export const openTooltip = (content, props = {}, position = { x: 0, y: 0 }) => {
  tooltipPosition.set(position);
  tooltipContent.set(content);
  tooltipProps.set(props);
  isTooltipOpen.set(true);
}

export const closeTooltip = () => {
  tooltipContent.set(null);
  tooltipProps.set({});
  isTooltipOpen.set(false);
}