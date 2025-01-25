<script setup lang="ts">
import { useScreenWidth } from '@/assets/scripts/ScriptWindowSize'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
const isMobile = useScreenWidth(800)
</script>

<template>
  <div
    class="laptop:w-[90%] w-full laptop:h-[500px] h-[240px] laptop:bg-white mt-[30px] laptop:shadow-container laptop:rounded-[32px] relative"
  >
    <div
      class="trapezoid laptop:ml-[30px] laptop:mt-[25px] laptop:rounded-tl-2xl laptop:rounded-bl-2xl"
    >
      <div class="laptop:ml-[60px] mt-[20px] relative mr-[10px]">
        <div class="absolute w-full h-full blur bg-black/40"></div>
        <p class="pl-[20px] pt-[10px] relative laptop:text-[32px] text-[12px] mr-[14px]">
          Торги художника
        </p>
        <p
          class="laptop:pl-[90px] pl-[30px] font-['InterItalic'] font-light laptop:text-[28px] text-[16px] relative mr-[14px]"
        >
          Безымянный
        </p>
      </div>
      <div
        class="laptop:w-12 laptop:h-12 w-6 h-6 ml-2 bg-black/25 rounded-full laptop:ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer"
      >
        <IconLeftArrow />
      </div>
      <div
        class="laptop:w-[300px] laptop:h-[100px] w-[100px] h-[30px] laptop:ml-[60px] mb-[30px] relative flex items-center justify-center ml-[2vw]"
      >
        <div class="absolute w-full h-full bg-black/40 blur"></div>
        <p class="relative text-center laptop:text-[32px] text-[16px] font-bold font-[InterItalic]">
          20 Октября
        </p>
      </div>
    </div>
    <div
      class="trapezoid2 laptop:mr-[30px] laptop:mt-[25px] laptop:rounded-tl-2xl laptop:rounded-bl-2xl"
    >
      <div
        class="laptop:w-[300px] laptop:h-[100px] w-[100px] h-[30px] laptop:mr-[30px] mt-[30px] relative flex items-center justify-center mr-[2vw]"
      >
        <div class="absolute w-full h-full bg-black/40 blur"></div>
        <p class="relative text-center laptop:text-[32px] text-[16px] font-bold font-[InterItalic]">
          20 Октября
        </p>
      </div>
      <div
        class="laptop:w-12 laptop:h-12 h-6 w-6 mr-2 bg-black/25 rounded-full laptop:mr-[30px] flex items-center justify-center hover:scale-110 cursor-pointer"
      >
        <IconRightArrow />
      </div>
      <div class="laptop:mr-[60px] mb-[30px] relative mr-[10px]">
        <div class="absolute w-full h-full blur bg-black/40"></div>
        <p class="pl-[20px] pt-[10px] relative laptop:text-[32px] text-[12px] mr-[14px]">
          Торги художника
        </p>
        <p
          class="laptop:pl-[90px] pl-[30px] font-['InterItalic'] font-light laptop:text-[28px] text-[16px] relative mr-[14px]"
        >
          Безымянный
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trapezoid {
  position: absolute;

  width: 60%;
  height: 90%;
  /* margin-left: 30px; */
  /* margin-top: 25px; */
  background: url('../assets/images/test1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  /* border-top-left-radius: 16px; */
  /* border-bottom-left-radius: 16px; */
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 2vw;
  font-weight: bold;
  clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%);
}
.trapezoid2 {
  position: absolute;
  right: 0;
  width: 60%;
  height: 90%;
  /* margin-top: 25px;
  margin-right: 30px; */
  /* border-bottom-right-radius: 16px;
  border-top-right-radius: 16px; */
  background: url('../assets/images/test2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: end;
  font-size: 2vw;
  font-weight: bold;
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
