<script setup lang="ts"></script>

<template>
  <div
    class="w-full h-[320px] shadow-card rounded-3xl hover:scale-105 relative flex flex-col items-center max-w-[400px] ml-[20px] mr-[20px]"
  >
    <div class="w-full h-[55%] bg-black flex rounded-tl-2xl rounded-tr-2xl bro">
      <img class="object-cover w-full flex-1" src="../assets/images/test1.jpg" />
      <img class="object-cover w-full flex-1" src="../assets/images/test2.jpg" />
      <img class="object-cover w-full flex-1" src="../assets/images/test1.jpg" />
    </div>
    <img
      class="absolute w-[100px] h-[100px] rounded-full bg-transparent shadow-cardImage top-[35%] object-cover"
      src="../assets/images/test3.png"
    />
    <div class="mt-[40px] w-full flex flex-col gap-2">
      <span class="text-[20px] font-medium">Имя Фамилия</span>
      <div class="font-light">
        Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст
      </div>
    </div>
  </div>
</template>

<style scoped>
.bro img:first-child {
  border-top-left-radius: 16px;
}

.bro img:last-child {
  border-top-right-radius: 16px;
}
</style>
