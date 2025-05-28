<script>
  import { popupContent, popupProps, isPopupOpen, closePopup } from '$stores/store';
  import Icon from "./Icon.svelte";

  let Component = $state();
  let props = $state(null);
  let isOpen = $state(null);
  let showCloseButton = $state(true);
  let popupClasses = $state('max-w-2xl md:max-w-5xl');

  popupContent.subscribe(value => Component = value);
  popupProps.subscribe(value => {
    props = value;
    if ('showCloseButton' in value) {
      showCloseButton = value.showCloseButton;
    }
    if (props.popupClass) {
      popupClasses = props.popupClass;
    }
  });
  isPopupOpen.subscribe(value => isOpen = value);

  const handleClose = () => {
    closePopup();
  }
</script>

<div class="inset-0 z-[100] {props.nofixed ? '' : 'fixed'} {isOpen ? '' : 'pointer-events-none opacity-0'} flex items-start justify-center transition-opacity duration-300 overflow-y-auto">
  {#if !props.nofixed}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="z-[100] fixed w-full h-full custom-transition {showCloseButton && isOpen ? 'bg-black bg-opacity-50' : showCloseButton ? 'bg-black bg-opacity-0' : ''}" onclick={handleClose}></div>
  {/if}
  <div class={`bg-dark flex flex-col z-[101] justify-center ${showCloseButton ? 'p-4 md:p-8' : ''} max-md:w-full px-4 md:px-12 ${popupClasses} max-h-4xl m-auto rounded-2xl shadow-md transition-transform duration-300`}>
    <div class="flex justify-end">
      {#if showCloseButton}
        <button class="mt-2 flex bg-dark text-skulls p-0 hf:text-primary custom-transition" aria-label="modal" onclick={handleClose}>
          <Icon name="cross_tactics" class="h-4 md:h-6 w-4 md:w-6"/>
        </button>
      {/if}
    </div>
    {#if Component}
      <Component {...props} />
    {/if}
  </div>
</div>