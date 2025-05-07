
<script>
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import hero_bg_desktop from '$lib/assets/hero_bg_desktop.png?format=webp';
  import donate_bg from '$lib/assets/donate-bg.jpg?format=webp';
  import hero_bg_mobile from '$lib/assets/hero_bg_mobile.png?format=webp&w=562&h=1135';
  import donate_bg_mobile from '$lib/assets/donate-bg.jpg?format=webp&w=562&h=1135';
</script>

<style>
  @media screen and (min-width: 768px) {
    .mobile-only {
      display: none !important;
    }
  }
  @media screen and (max-width: 767px) {
    .desktop-only {
      display: none !important;
    }
  }
</style>

<div class="w-full aspect-[16/7]" id="news">
  <Splide options={{ type: 'loop', autoplay: true, perPage: 1, pagination: true, arrows: false, width: '100%' }}>
    <SplideSlide>
      <div class="desktop-only" style="background-image: url({hero_bg_desktop}); background-size: cover;background-position: right;">
        <div class="container-large flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 h-[78vh]">
          <div class="pb-3 leading-tight">
            <h1 class="uppercase text-[53px] tracking-wide text-dark">
              BEE BOX<br>
              <span class="text-outline">BEE BOX</span>
            </h1>
          </div>
          <p class="text-darkYellow leading-relaxed font-normal text-[23.11px] pb-10 max-w-[550px]">
            BEE BOX
            <span class="font-bold">BEE BOX</span>
            BEE BOX
          </p>
          <a href="/login" class="button-primary button--md">
            LOGIN
          </a>
        </div>
      </div>
      <!-- <div class="mobile-only" style="background-image: url({hero_bg_mobile}); background-size: cover;">
        <div class="container-large flex flex-col pb-16 justify-center items-start top-0 left-0 right-0 bottom-0 h-[730px]">
          <div class="pb-3 leading-10">
            <h1 class="uppercase text-[33.15px] tracking-wide text-dark">{$_("home.hero.title")}</h1>
            <h2 class="uppercase text-[33.15px] tracking-wide text-outline-mobile">{$_("home.hero.subtitle")}</h2>
          </div>
          <p class="text-darkYellow font-normal text-[13.56px] pb-6">
            {$_("home.hero.text.first")}
            <span class="font-bold">{$_("home.hero.span")}</span>
            {$_("home.hero.text.second")}
          </p>
          <a href="/login" class="button-primary button--md">
            {$_("home.hero.button")}
          </a>

        </div>
      </div> -->
    </SplideSlide>
    <SplideSlide>
      <div class="desktop-only relative">
        <div class="z-10 h-full w-full absolute" style="box-shadow: inset 500px 20px 200px 5px rgb(255 255 255 / 71%);"></div>
        <img src="{donate_bg}" alt="" loading="lazy" class="absolute w-full h-full object-cover" style="background-size: cover;background-position: right;">
        <div class="container-large flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 h-[78vh] relative z-20">
          <div class="pb-3 leading-tight">
            <h1 class="uppercase text-[53px] tracking-wide text-dark">
              TOP DONORS
            </h1>
          </div>
          <p class="text-darkYellow leading-relaxed font-normal text-[23.11px] pb-8 max-w-[550px]">
            These are the users who made the biggest contributions to the project:
          </p>
          <ul class="pl-5 text-[23.11px] text-darkYellow list-decimal">
            <li>wuzzle</li>
            <li>Baereop</li>
            <li>RIPcsmanager</li>
            <li>Kakalov</li>
            <li>ShahinXXI</li>
          </ul>
          <div class="pt-9">
            <a href="https://donate.stripe.com/3csbJjcIh2nP3D29AA" class="button-primary button--md" target="_blank">
              Donate via Stripe
            </a>
            <a href="https://www.paypal.com/donate/?hosted_button_id=QH6DAQTHKK8DG" class="button-primary--outline button--md" target="_blank">
              Donate via Paypal
            </a>
          </div>
        </div>
      </div>
      <div class="mobile-only" style="background-image: url({donate_bg_mobile}); background-size: cover;">
        <img src="{donate_bg_mobile}" alt="" loading="lazy" class="absolute w-full h-full object-cover" style="background-size: cover;background-position: right;">
        <div class="container-large flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 h-[730px] relative z-10" style="box-shadow: inset 275px 160px 190px 5px rgb(255 255 255 / 71%);">
          <div class="pb-3 leading-tight">
            <h1 class="uppercase text-[33.15px] tracking-wide text-dark">
              TOP DONORS
            </h1>
          </div>
          <p class="text-darkYellow leading-relaxed font-normal text-[15px] pb-8 max-w-[550px]">
            These are the users who made the biggest contributions to the project:
          </p>
          <ul class="pl-5 text-[18px] text-darkYellow list-decimal">
            <li>wuzzle</li>
            <li>RIPcsmanager</li>
            <li>Baereop</li>
            <li>Kakalov</li>
            <li>booban</li>
          </ul>
          <div class="pt-9 w-full text-center">
            <a href="https://donate.stripe.com/3csbJjcIh2nP3D29AA" class="button-primary button--sm" target="_blank">
              Donate via Stripe
            </a>
            <a href="https://www.paypal.com/donate/?hosted_button_id=QH6DAQTHKK8DG" class="button-primary--outline button--sm" target="_blank">
              Donate via Paypal
            </a>
          </div>
        </div>
      </div>
    </SplideSlide>
  </Splide>
</div>