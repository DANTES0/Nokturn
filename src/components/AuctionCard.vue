<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/lot">
    <div class="bg-white shadow-card w-[260px] h-[340px] rounded-lg hover:scale-105 cursor-pointer">
      <div class="flex flex-col justify-center items-center">
        <div
          class="w-[200px] h-[200px] bg-white shadow-cardImage mt-[10px] flex items-center justify-center"
        >
          <img
            class="w-[170px] h-[170px] object-cover rounded-sm pointer-events-none"
            src="../assets/images/test1.jpg"
          />
        </div>
        <div class="flex flex-col mt-2 w-[200px] gap-[2px]">
          <span class="font-semibold font-[InterItalic]">Название картины</span>
          <span class="font-light font-[InterItalic]">Имя Фамилия</span>
          <div class="flex text-[10px] gap-2">
            <div class="font-extralight">Цифровой арт</div>
            <div class="font-extralight">4000x2000</div>
          </div>
          <div class="flex">
            <span class="font-extralight">Начальная цена:</span>
            <span class="ml-4">5000₽</span>
          </div>
          <div class="flex text-[14px]">
            <span class="font-extralight">Начало торгов:</span>
            <span class="font-light ml-4">10.02.2024</span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
