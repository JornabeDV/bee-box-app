<script>
  import Icon from "../common/Icon.svelte";
  
</script>

<footer class="lg:hidden bg-dark w-full fixed bottom-0 left-0 right-0 z-30 translate-y-0 transition-transform duration-300"> 
  <nav class="text-xl justify-between">
    <div class="flex h-[70px] text-light">
      
      <a class="w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer border-solid border-t" href="/bee-box/profile/{1}">        
        <div class="flex flex-col items-center justify-center text-light">          
          <Icon name="user-round" class="h-4 w-4"/>
          <p class="text-light text-pMobile">Perfil</p>
        </div>
      </a>
      
      <a class="w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer border-solid border-t" href="/bee-box/shifts">        
        <div class="flex flex-col items-center justify-center text-light">          
          <Icon name="calendar-days" class="h-4 w-4"/>
          <p class="text-light text-pMobile">Turnos</p>
        </div>
      </a>
      <a 
        href="/bee-box"
        class="flex justify-center items-center border border-borderTable shadow-lg transition-all duration-200 hover:scale-105 bg-bee rounded-full -translate-y-4 h-16 w-16 mx-auto z-10"
      >
        <div class="flex flex-col items-center justify-center text-dark">
          <Icon name="house" class="h-8 w-8" />
        </div>
      </a>
      <a class="w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer  border-solid border-t" href="/bee-box/timer">        
        <div class="flex flex-col items-center justify-center text-light">          
          <Icon name="timer" class="h-4 w-4"/>
          <p class="text-light text-pMobile">Timer</p>
        </div>
      </a>
      
      <a class="w-1/5 flex text-base justify-center border-[#313133] items-center cursor-pointer border-solid border-t" href="/bee-box/calculator">        
        <div class="flex flex-col items-center justify-center text-light">          
          <Icon name="calculator" class="h-4 w-4"/>
          <p class="text-light text-pMobile">Calculadora</p>
        </div>
      </a>
      
    </div>
  </nav>
</footer>
