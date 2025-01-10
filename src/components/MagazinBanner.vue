<script setup lang="ts">
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
</script>

<template>
  <div
    class="w-[90%] h-[500px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh]"
  >
    <div class="trapezoid">
      <div class="w-[300px] h-[100px] ml-[30px] mt-[30px] relative">
        <div class="absolute w-full h-full blur bg-black/40"></div>
        <p class="pl-[20px] pt-[10px] relative">Торги художника</p>
        <p class="text-right pr-[30px] font-['InterItalic'] font-light text-[28px] relative">
          Безымянный
        </p>
      </div>
      <div
        class="w-12 h-12 bg-black/25 rounded-full ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer"
      >
        <IconLeftArrow />
      </div>
      <div
        class="w-[300px] h-[100px] ml-[30px] mb-[30px] relative flex items-center justify-center"
      >
        <div class="absolute w-full h-full bg-black/40 blur"></div>
        <p class="relative text-center text-[42px] font-bold font-[InterItalic]">20 Октября</p>
      </div>
    </div>
    <div class="trapezoid2">
      <div
        class="w-[300px] h-[100px] mr-[30px] mt-[30px] relative flex items-center justify-center"
      >
        <div class="absolute w-full h-full bg-black/40 blur"></div>
        <p class="relative text-center text-[42px] font-bold font-[InterItalic]">20 Октября</p>
      </div>
      <div
        class="w-12 h-12 bg-black/25 rounded-full mr-[30px] flex items-center justify-center hover:scale-110 cursor-pointer"
      >
        <IconRightArrow />
      </div>
      <div class="w-[300px] h-[100px] mr-[30px] mb-[30px] relative">
        <div class="absolute w-full h-full blur bg-black/40"></div>
        <p class="pr-[20px] pt-[10px] relative text-right">Торги художника</p>
        <p class="pl-[30px] font-['InterItalic'] font-light text-[28px] relative">Безымянный</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trapezoid {
  position: absolute;

  width: 60%;
  height: 90%;
  margin-left: 30px;
  margin-top: 25px;
  background: url('../assets/images/test1.jpg');
  background-size: 100% auto;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 24px;
  font-weight: bold;
  clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%);
}
.trapezoid2 {
  position: absolute;
  right: 0;
  width: 60%;
  height: 90%;
  margin-top: 25px;
  margin-right: 30px;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background: url('../assets/images/test2.jpg');
  background-size: 100% auto;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: end;
  font-size: 24px;
  font-weight: bold;
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
