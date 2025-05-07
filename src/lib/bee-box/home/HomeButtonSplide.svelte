<script>
  import '@splidejs/svelte-splide/css'
</script>

<div class="splide__arrows">

  <button class="splide__arrow splide__arrow--prev" type="button" aria-label="Previous slide" aria-controls="splide01-track">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
    </svg>
  </button>

  <button class="splide__arrow splide__arrow--next" type="button" aria-label="Next slide" aria-controls="splide01-track">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
    </svg>
  </button>

</div>

<style>
  
  .splide__arrow {
    width: 100px;
    height: 100px;
    background-color: transparent;
  }

  .splide__arrow--next:hover {
    fill: none !important;
    stroke: none !important;
  }

  .splide__arrow svg {
    height: 24px;
    width: 24px;
    background: none;
    color: white;
    opacity: 100;
  }
  
  .splide__arrow svg:hover {
    color: none;
  }
  .splide__arrow--next {
    width: 100px;
    height: 100px;
    top: 2em;
    right: -1.3em;
    background-color: transparent;
  }
  
  .splide__arrow--prev {
    width: 120px;
    top: 2em;
    left: -1.3em;
    background-color: transparent;
  }
  
  .splide__arrow:hover {
  background-color: transparent; 
  fill: none !important;
  stroke: none !important;
  color: white;
  }
  
  .splide__arrow--prev {
    transform: rotate(360deg);
    background-color: transparent;
    fill: none;
  }
  
  .splide__arrow--next{
    fill: none;
  }  

  @media (min-width: 768px) {
    .splide__arrow {
      width: 50px;
      height: 50px;
    }
  
    .splide__arrow--next {
      width: 50px;
      height: 50px;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
  
    .splide__arrow--prev {
      width: 50px;
      height: 50px;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
    }
  
    .splide__arrow {
      fill: transparent;
    }
  
    .splide__arrow:hover {
      background-color: transparent;
      color: yellow;
    }
  }
  
  </style>