<script>
  import { enhance } from "$app/forms";
  import Icon from '$lib/common/Icon.svelte';
  import { loading } from '$stores/store';
  import { goto } from '$app/navigation';
  import HtmlHead from '$lib/HtmlHead.svelte';
  import Logo from '$lib/common/Logo.svelte';

  export let form;

  let emailError = '';
  let email = '';
  let errors = '';
  let success = '';

  const submitEmail = ({ data }) => {
    loading.set(true);
    return async ({ result, update }) => {
      loading.set(false);
      if (result.type === 'failure') {
        errors = result.data.message;
      }
      if (result.type === 'redirect') {
        goto(result.location);
      }
      if (result.type === 'success') {
        success = result.data.success;
      }
    }
  }

  const validateEmail = (e) => {
    errors = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      emailError = "Invalid email format";
      return;
    }
    emailError = '';
  }
</script>

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class=" bg-no-repeat bg-right-bottom rounded-lg min-w-[325px] md:w-[500px] pt-8 pb-6 px-6 md:px-12" >
    <div class="flex justify-center">
      <Logo customClasses="w-64" />
    </div>
    <h1 class="text-4xl font-sourceSemiBold justify-center mt-6 mb-6 text-center text-light">Recuperar Password</h1>
    <div class="flex flex-col gap-4">
      <p>Ingrese su dirección de correo electrónico y le enviaremos un correo electrónico con más instrucciones.</p>
      <form use:enhance={submitEmail} action="/forgot?/sendEmail" method="POST" class="flex bg-no-repeat gap-4 flex-col justify-between">
        <label class="field group {!emailError ? 'hf:border-borderline' : ''}" class:active={email} class:error={emailError} class:border-error={emailError}>
          <input type="email lowercase" name="email" on:change={validateEmail} on:input={validateEmail} bind:value={email} required class="input--primary--form" />
          <span class="group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Email</span>
        </label>
        {#if errors}
        <div class="min-h-[20px] text-error text-xs">{errors}</div>
        {/if}
        <button class="button-primary button--md" disabled={emailError || $loading}>
          {#if $loading}
            <Icon class={$loading ? 'animate-spin h-6 w-6' : 'h-6 w-6'} name="spinner"/>
          {:else}
            Enviar
          {/if}
        </button>
        {#if success}
          ¡Correo electrónico enviado con código de verificación!
        {/if}
      </form>
      <a href="/login" class="text-center mt-2 uppercase text-xs justify-center flex">¿Recordás tu contraseña?</a>
    </div>
  </div>
</div>