import { createTippy } from 'svelte-tippy';

const defaultTippyOptions = {
  animation: 'perspective-subtle',
  theme: 'cpl-dark',
  arrow: false,
  placement: 'bottom', // Default placement; Popper will adjust if needed.
  offset: [0, 8],
  delay: [150, 0],
  duration: [150, 0]
};

export function tippy(node, options = {}) {
  // Merge your default options with any options passed to the action.
  let finalOptions = { ...defaultTippyOptions, ...options };
  let tippyInstance = createTippy(finalOptions)(node);

  return {
    update(newOptions = {}) {
      // Destroy the old instance
      tippyInstance.destroy();
      // Create a new tippy instance using updated options merged with defaults
      finalOptions = { ...defaultTippyOptions, ...newOptions };
      tippyInstance = createTippy(finalOptions)(node);
    },
    destroy() {
      tippyInstance.destroy();
    }
  };
}
