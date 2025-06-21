<script>
  import { page } from '$app/stores';
  import { enhance, applyAction } from "$app/forms";
  import Icon from '$lib/common/Icon.svelte';
  import { loading } from '$stores/store';
  import HtmlHead from '$lib/HtmlHead.svelte';
  import Logo from '$lib/common/Logo.svelte';

  let password = '';
  let email = '';
  let emailError = '';
  let passwordError = '';
  let errors = '';

  const submitLogin = ({ data }) => {
    loading.set(true);
    return async ({ result, update }) => {
      if (result.type === 'failure') {
        errors = result.data.message;
      }
      if (result.type === 'redirect') {
        window.location.href = result.location;
        update();
      } else {
        loading.set(false);
      }
      await applyAction(result);
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

  function handleRememberCheck() {

  }
</script>

<HtmlHead pageDataTitle={"Browser Based Esports Game | CPL Manager"} pageDataDescription={"Lead your FPS team to victory in the thrilling browser-based game set in the CPL esports tournaments. Take the challenge and compete in an intense league season!"} pageURL={$page.url.href} />

  <div class="bg-no-repeat bg-right-bottom rounded-lg min-w-[325px] md:w-[500px] pt-8 pb-6 px-6 md:px-12">
    <div class="flex justify-center">
      <Logo customClasses="w-40" />
    </div>
    <h3 class="font-sourceSemiBold justify-center mb-6 text-center text-light">Iniciar Sesión</h3>
    <form use:enhance={submitLogin} action="/login?/login" method="POST" class="flex bg-no-repeat gap-4 flex-col justify-between">
      <fieldset class="flex flex-col gap-6">
        <div class="relative grid">
          <label class="field group {!emailError ? 'hf:border-borderline' : ''}" class:active={email} class:error={emailError} class:border-error={emailError}>
            <input type="email lowercase" name="email" autocomplete="email" on:change={validateEmail} on:input={validateEmail} bind:value={email} required class="input--primary--form lowercase" />
            <span class="text-light group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]" class:text-error={emailError}>Email</span>
          </label>
          {#if emailError}
            <div class="absolute -bottom-5 text-[11px] text-error">{emailError}</div>
          {/if}
        </div>
        <div class="relative grid">
          <label class="field group {!passwordError ? 'hf:border-borderline' : ''}" class:active={password} class:error={passwordError} class:border-error={passwordError}>
            <input type="password" name="password" autocomplete="current-password" on:change={validatePassword} on:input={validatePassword} bind:value={password} required class="input--primary--form" />
            <span class="text-light group-ac:translate-x-2 group-ac:translate-y-1 group-ac:text-[10px]">Contraseña</span>
          </label>
          {#if passwordError}
            <div class="absolute -bottom-5 text-[11px] text-error">{passwordError}</div>
          {/if}
        </div>
        <label class="flex items-center gap-2 cursor-pointer text-dark">
          <input 
            type="checkbox" 
            name="remember-me"
            on:change={handleRememberCheck} 
          />
          <!-- <span class="checkbox-tactics flex justify-center items-center text-dark">
            <Icon name="check_icon" class="w-3 h-3" />                            
          </span> -->
          <span class="text-sm text-light">Recordarme</span>
        </label>
      </fieldset>
      <div class="min-h-[20px] text-error text-xs">{@html errors}</div>
      <button class="button-primary button--md self-center" disabled={emailError || passwordError || $loading}>
        {#if $loading}
        <Icon name="spinner" class={$loading ? 'animate-spin w-6 h-6' : 'w-6 h-6'}/>
        {:else}
          Iniciar sesión
        {/if}
      </button>
    </form>
    <div class="flex gap-2 justify-center items-center mt-6">
      <a href="/register" class="text-center uppercase text-xs justify-center flex">Crear cuenta</a>
      |
      <a href="/forgot" class="text-center uppercase text-xs justify-center flex">Recuperar contraseña</a>
    </div>
  </div>