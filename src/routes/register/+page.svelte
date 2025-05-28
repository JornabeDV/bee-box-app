<script>
  import { enhance } from "$app/forms";
  import Icon from '$lib/common/Icon.svelte';
  import { loading } from '$stores/store';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let emailError = '';
  let passwordError = '';
  let errors = '';

  const submitRegister = ({ data }) => {
    loading.set(true);
    return async ({ result, update }) => {
      loading.set(false);
      if (result.type === 'failure') {
        errors = result.data.message;
      }
      if (result.type === 'redirect') {
        goto(result.location);
      }
    };
  };

  const validateEmail = (e) => {
    errors = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      emailError = "Invalid email format";
      return;
    }
    emailError = '';
  };

  const validatePassword = (e) => {
    errors = '';
    if (typeof e.target.value !== "string" || e.target.value.length < 6 || e.target.value.length > 255) {
      passwordError = "Password must be between 6 and 255 characters";
      return;
    }
    passwordError = '';
  };
</script>

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class="bg-dark border border-borderline bg-no-repeat bg-right-bottom rounded-lg min-w-[325px] md:w-[650px] pt-8 pb-6 px-6 md:px-12">
    <a href="/" class="flex justify-center">
      <Icon name="logo" class="h-20 w-20 pb-8" />
    </a>
    <h1 class="text-4xl font-sourceSemiBold justify-center -mt-1 mb-6 text-center">Registro</h1>
    <form use:enhance={submitRegister} action="/register?/register" method="POST" class="flex gap-4 flex-col justify-between">
      <fieldset class="flex flex-col gap-10">
        <div class="relative grid">
          <label class="field group {!emailError ? 'hf:border-borderline' : ''}" class:active={email} class:error={emailError} class:border-error={emailError}>
            <input type="email" name="email" on:change={validateEmail} on:input={validateEmail} bind:value={email} required class="input--primary--form" />
            <span class="group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Email</span>
          </label>
          {#if emailError}
            <div class="absolute -bottom-5 text-[11px] text-error">{emailError}</div>
          {/if}
        </div>

        <div class="relative grid">
          <label class="field group {!passwordError ? 'hf:border-borderline' : ''}" class:active={password} class:error={passwordError} class:border-error={passwordError}>
            <input type="password" name="password" on:change={validatePassword} on:input={validatePassword} bind:value={password} required class="input--primary--form" />
            <span class="group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Contraseña</span>
          </label>
          {#if passwordError}
            <div class="absolute -bottom-5 text-[11px] text-error">{passwordError}</div>
          {/if}
        </div>
      </fieldset>

      <div class="min-h-[20px] text-error text-xs">{errors}</div>

      <button class="button-primary button--md self-center" disabled={emailError || passwordError || $loading}>
        {#if $loading}
          <Icon class="animate-spin h-6 w-6" name="spinner" />
        {:else}
          Registrar
        {/if}
      </button>
    </form>

    <a href="/login" class="text-center mt-6 uppercase text-xs justify-center flex">¿Ya tenés cuenta?</a>
  </div>
</div>