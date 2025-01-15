<script setup lang="ts"></script>

<template>
  <div class="bg-white shadow-card p-[30px] rounded-2xl flex w-full">
    <div class="flex items-center">
      <img class="w-24 h-24 rounded-full shadow-card" src="../../assets/images/test3.png" />
      <div class="flex flex-col ml-[20px] max-w-[300px] gap-3 border-r border-black pr-[10px]">
        <span class="mt-[10px] text-[18px]">Имя Фамилия</span>
        <span class="mb-[10px] text-[14px] font-light"
          >Текст Текст Текст Текст Текст Текст Текст Текст Текст</span
        >
      </div>
    </div>
    <div class="flex w-full flex-1 ml-[20px] gap-4 items-center justify-center">
      <img
        v-for="i in 5"
        :key="i"
        class="w-[20%] h-auto rounded-2xl max-w-[160px] max-h-[160px]"
        src="../../assets/images/test5.jpg"
      />
    </div>
  </div>
</template>

<style scoped></style>
