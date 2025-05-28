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
      emailError = "Invalid email format";
      return;
    }
    emailError = '';
  }
</script>

<HtmlHead pageDataTitle={"Browser Based Esports Game | CPL Manager"} pageDataDescription={"Lead your FPS team to victory in the thrilling browser-based game set in the CPL esports tournaments. Take the challenge and compete in an intense league season!"} pageURL={$page.url.href} />

<div class="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center">
  <div class="bg-dark border border-borderline bg-no-repeat bg-right-bottom rounded-lg min-w-[325px] md:w-[500px] pt-8 pb-6 px-6 md:px-12">
    <h4 class="uppercase justify-center -mt-1 mb-6">Almost Ready</h4>
    <div class="flex flex-col gap-6 text-light">
      <p>A verification link has been sent to your email.</p>
      <p>Please click the link in the email to finish setting up your account. Once you've finished, you can safely close this window.</p>
      <form use:enhance={submitEmail} action="/email-verification?/sendEmail" method="POST" class="flex bg-no-repeat gap-4 flex-col justify-between">
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
            Resend email
          {/if}
        </button>
        {#if success}
          Email sent with verification code!
        {/if}
      </form>
    </div>
  </div>
</div>