<script>
  import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import hero_bg_desktop from '$lib/assets/hero_bg_desktop.png?format=webp';
  import donate_bg from '$lib/assets/donate-bg.jpg?format=webp';
  import HomeButtonSplide from './HomeButtonSplide.svelte';

</script>

<Splide class="cpl-home-hero" hasTrack={false}>  
  <SplideTrack>
    <SplideSlide>
      <div style="background-image: url({hero_bg_desktop}); background-size: cover;background-position: right; ">
        <div class="flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 relative bg-no-repeat bg-cover bg-center border-b border-b-[#222224] text-light min-h-[296px]" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0)), linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));">
          <div class="container flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0  max-lg:container-page max-md:pb-5">
            <div class="max-w-[456px]">
              <h5 class="tracking-wide text-light pb-4">Bee Box</h5>
              <a href="/login" class="button-primary--outline button--sm">
                <p>Ingresar</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SplideSlide>
    <SplideSlide>
      <div style="background-image: url({donate_bg}); background-size: cover;background-position: right;">
        <div class="flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 relative bg-no-repeat bg-cover bg-center border-b border-b-[#222224] text-light min-h-[296px]" style="background-image: linear-gradient(to top, rgba(20, 20, 22, 1), rgba(20, 20, 22, 0)), linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));">
          <div class="container flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 max-lg:container-page max-md:pb-7">
            <div class="pb-7">
              <h5 class="text-light pb-4">Bee box</h5>
              <p class="text-light">CrossFit</p>
            </div>
            <div class="w-full text-start flex gap-2 max-md:flex-col max-md:justify-center max-md:items-start">
              <a href="https://donate.stripe.com/3csbJjcIh2nP3D29AA" class="button-primary button--sm" target="_blank">
                <p>Stripe</p>
              </a>
              <a href="https://www.paypal.com/donate/?hosted_button_id=QH6DAQTHKK8DG" class="button-primary--outline button--sm" target="_blank">
                <p>Paypal</p>
              </a>
            </div>
          <div>       
        </div>
      </div>
    </SplideSlide>
  </SplideTrack>  
  <div class="max-md:hidden">
    <HomeButtonSplide/>
  </div>
</Splide>