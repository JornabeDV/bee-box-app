<script>
  import { page } from '$app/stores';
  import { enhance } from "$app/forms";
  import Icon from '$lib/common/Icon.svelte';
  import { loading } from '$stores/store';
  import { goto } from '$app/navigation';
  import HtmlHead from '$lib/HtmlHead.svelte';
  import Logo from '$lib/common/Logo.svelte';

  export let form;

  let password = '';
  let passwordError = '';
  let errors = '';
  const searchParams = new URLSearchParams($page.url.search); // Extract query params
  let token = searchParams.get('token');

  const submitReset = ({ data }) => {
    loading.set(true);
    return async ({ result, update }) => {
      loading.set(false);
      if (result.type === 'failure') {
        errors = result.data.message;
      }
      if (result.type === 'redirect') {
        goto(result.location);
      }
    }
  }

  const validatePassword = (e) => {
    errors = '';
    if (
			typeof e.target.value !== "string" || e.target.value.length < 6 || e.target.value.length > 255
		) {
			passwordError = "Más de 6 caracteres";
      return;
		}
    passwordError = '';
  }
</script>

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class="pt-8 pb-6 px-6 md:px-12 h-full">
    <div class="flex justify-center">
      <Logo customClasses="w-[150px]" />
    </div>
    <h3 class="font-sourceSemiBold justify-center my-6 text-center">Restablecer contraseña</h3>
    <div class="flex flex-col gap-4">
      <p>Elija y vuelva a escribir una nueva contraseña, luego presione 'Restablecer' para iniciar sesión.</p>
      <form use:enhance={submitReset} action="/password-reset?/reset" method="POST" class="flex bg-no-repeat gap-4 md:gap-8  flex-col justify-between">
        <input type="hidden" name="token" bind:value={token} />
        <fieldset class="flex flex-col gap-10">
          <div class="relative grid">
            <label class="field group {!passwordError ? 'hf:border-borderline' : ''}" class:active={password} class:error={passwordError} class:border-error={passwordError}>
              <input type="password" name="password" on:change={validatePassword} on:input={validatePassword} bind:value={password} required class="input--primary--form" />
              <span class="group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Nueva contraseña</span>
            </label>
            {#if passwordError}
              <div class="absolute -bottom-5 text-[11px] text-error">{passwordError}</div>
            {/if}
          </div>
        </fieldset>
        <div class="text-error text-xs">{errors}</div>
        <button class="button-primary button--md self-center" disabled={passwordError || $loading}>
          {#if $loading}
          <Icon class={$loading ? 'animate-spin h-6 w-6' : 'h-6 w-6'} name="spinner"/>
          {:else}
            Restablecer
          {/if}
        </button>
      </form>
      <a href="/login" class="text-center mt-2 uppercase text-xs justify-center flex">¿Recordás tu contraseña?</a>
    </div>
  </div>
</div>