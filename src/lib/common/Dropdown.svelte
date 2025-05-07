<script>
  import { tick } from 'svelte';
  import Icon from '$lib/common/Icon.svelte';
  import { slide } from 'svelte/transition';
  import { closeAllDropdowns } from '$stores/store';

  export let options = [];
  export let currentValue;
  export let callback;
  export let buttonClasses = "";
  export let buttonDivClasses = "relative";
  export let style;
  export let disabledClass;
  export let disabled;
  export let placeholder = "";
  export let search = false;

  let trigger;
  let isExpanded = false;
  let searchTerm = '';
  let searchInput;

  $: currentValue = currentValue || null;
  $: currentDisplay = options.find(d => d.value == currentValue)?.display || placeholder || options[0]?.display;
  $: filteredOptions = options.filter((option) =>
    option.display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = async () => {
    if (!disabled) {
      isExpanded = !isExpanded;
      if (isExpanded && search) {
        await tick();
        searchInput.focus();
      }
    }
  }

  const selectOption = (selectedValue) => {
    const selectedOption = options.find(opt => opt.value == selectedValue);
    if (!selectedOption || selectedOption.disabled) return;

    currentValue = selectedValue;
    isExpanded = false;
    callback(currentValue);
  }

  const onClickOutside = (e) => {
    if (!trigger.contains(e.target)) {
      isExpanded = false;
    }
  }

  closeAllDropdowns.subscribe(value => {
    if (value) {
      isExpanded = false;
    }
  });
</script>

<svelte:window on:click={onClickOutside} />
<svelte:options accessors={true}/>

<div class={`min-w-14 ${buttonDivClasses} ${$$props.class}`} bind:this={trigger}>
  <button
    type="button"
    class={`flex w-full px-3 text-sm justify-between hover:border-primary items-center bg-transparent py-1.5 rounded-md border text-light focus:text-[#F56E0E] focus:border-[#F56E0E] ${disabled ? 'opacity-50' : ''} ${buttonClasses}`}
    style={style}
    on:click={toggleMenu}
  >
    <span class="truncate">{currentDisplay}</span>
    <Icon name="arrowSlide" class={`h-4 md:h-6 w-4 md:w-6 transition-transform duration-200 ${isExpanded ? 'rotate-[270deg]' : 'rotate-90'}`} />
  </button>

  {#if isExpanded}
    <div class="absolute z-50 min-w-16 bg-[#242428] border border-[#F56E0E] mt-1 rounded-md" style={style} transition:slide>
      {#if search}
        <div class="px-4 py-2 border-b border-[#F56E0E]">
          <input
            type="text"
            placeholder="Search..."
            bind:this={searchInput}
            bind:value={searchTerm}
            class="w-full bg-transparent text-lightGray placeholder:text-dark-gray outline-none"
          />
        </div>
      {/if}
      <div class="flex flex-col py-2 overflow-y-scroll max-h-[200px] scrollbar-none">
        {#each filteredOptions as option}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <div
            class="block z-50 px-4 py-2 hover:bg-[#F56E0E] hover:text-dark text-sm {option.disabled ? disabledClass : 'text-light cursor-pointer'} {option.value === currentValue ? 'font-extrabold' : '' }"
            on:click={() => selectOption(option.value)}
          >
            <div class="truncate">{option.display}</div>
            {#if option.disabled && option.team}
              <span class="text-[10px] text-dark">({option.team})</span>
            {/if}
          </div>
        {/each}
      </div>
      {#if filteredOptions.length > 6}
      <div class="absolute bottom-0 w-full h-12 z-50 rounded-b pointer-events-none" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0))"></div>
      {/if}
    </div>
  {/if}
</div>
