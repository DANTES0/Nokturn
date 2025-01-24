<script setup lang="ts"></script>

<template>
  <div class="flex relative w-full hover:bg-[#EEEEEE] p-[6px] rounded-2xl cursor-pointer">
    <div
      class="absolute w-[30px] h-[20px] bg-[#4C4C4C] flex items-center justify-center text-white rounded-xl text-[12px] bottom-[8px] right-[6px]"
    >
      22
    </div>
    <div class="">
      <img
        src="../../assets/images/test3.png"
        class="rounded-full shadow-cardImage w-[4.5vw] aspect-square"
      />
    </div>
    <div class="flex flex-col flex-1 justify-around ml-4">
      <div class="flex w-full justify-between items-center">
        <div class="font-medium text-[1.2vw]">Петриков Кирилл</div>
        <div class="font-extralight text-[0.8vw]">10:23</div>
      </div>
      <div class="w-full text-[1vw] pr-[40px] line-clamp-1">
        Текст со специальной информацией Текст со специальной информациейТекст со специальной
        информацией Текст со специальной информацией
      </div>
    </div>
  </div>
</template>

<style scoped></style>
