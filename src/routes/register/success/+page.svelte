<script>
  import { page } from '$app/stores';
  import { enhance } from "$app/forms";
  import Icon from '$lib/common/Icon.svelte';
  import { loading } from '$stores/store';
  import HtmlHead from '$lib/HtmlHead.svelte';

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
      emailError = "Formato de correo inválido";
      return;
    }
    emailError = '';
  }
</script>

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class="min-w-[325px] md:w-[500px] pt-8 pb-6 px-6 md:px-12">
    <h4 class="uppercase justify-center -mt-1 mb-6">Casi listo</h4>
    <div class="flex flex-col gap-6 text-light">
      <p>Hemos enviado un enlace de verificación a tu correo electrónico.</p>
      <p>Por favor haz clic en el enlace del correo para finalizar el proceso de verificación. Una vez finalizado, podés cerrar esta ventana de forma segura.</p>
      <form use:enhance={submitEmail} action="/email-verification?/sendEmail" method="POST" class="flex bg-no-repeat gap-4 flex-col justify-between">
        <label class="field group {!emailError ? 'hf:border-borderline' : ''}" class:active={email} class:error={emailError} class:border-error={emailError}>
          <input type="email lowercase" name="email" on:change={validateEmail} on:input={validateEmail} bind:value={email} required class="input--primary--form" />
          <span class="group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Correo electrónico</span>
        </label>
        {#if errors}
        <div class="min-h-[20px] text-error text-xs">{errors}</div>
        {/if}
        <button class="button-primary button--md" disabled={emailError || $loading}>
          {#if $loading}
            <Icon class={$loading ? 'animate-spin h-6 w-6' : 'h-6 w-6'} name="spinner"/>
          {:else}
            Reenviar correo
          {/if}
        </button>
        {#if success}
          ¡Correo enviado con el código de verificación!
        {/if}
      </form>
    </div>
  </div>
</div>