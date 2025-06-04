<script>
  import { onMount } from 'svelte';
  import Icon from '$lib/common/Icon.svelte';

  let rm = '';
  let percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5];

  const calculateWeight = (percent) => {
    const value = parseFloat(rm);
    if (isNaN(value)) return '-';
    return Math.round(value * (percent / 100));
  };
</script>

<button 
  class="font-sans p-3 button-base text-primary justify-start gap-1 hf:underline" 
  type="button" 
  on:click={() => goto('/bee-box')}
>
  <Icon name="arrow_short" class="w-6 h-6" />
  Volver
</button>

<h3 class="font-heading font-thin text-bee text-center mb-4">Calculadora</h3>

<div class="mb-6">
  <label for="rm" class="block text-primary mb-1 font-semibold">Ingresá tu RM (kg)</label>
  <input
    id="rm"
    type="number"
    bind:value={rm}
    min="0"
    class="w-full p-3 rounded bg-darkest text-white border border-bee"
    placeholder="Ej: 100"
  />
</div>

{#if rm && !isNaN(parseFloat(rm))}
  <table class="table">
    <colgroup>
      <col class="w-[50%]">
      <col class="w-[50%]">
    </colgroup>
    <thead>
      <tr>
        <th class="text-center">Porcentaje</th>
        <th class="text-center">Peso (kg)</th>
      </tr>
    </thead>
    <tbody>
      {#each percentages as percent}
        <tr>
          <td class="p-3 font-semibold text-white">{percent}%</td>
          <td class="p-3 text-light">{calculateWeight(percent)} kg</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}