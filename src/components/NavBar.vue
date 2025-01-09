<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="w-[90%] items-center h-[48px] border-b border-[#7A7A7A] flex justify-between">
    <RouterLink
      to="/"
      class="font-[LeviBrushRus] text-[24px] hover:text-[#4C4C4C] cursor-pointer mt-auto"
      >Ноктюрн</RouterLink
    >
    <nav class="mr-auto mt-auto ml-[100px] flex gap-7 text-[18px]">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/auctions">Аукционы</RouterLink>
      <RouterLink to="/artists">Художники</RouterLink>
      <RouterLink to="/paintings">Работы</RouterLink>
    </nav>
    <div>
      <button>Кнопка</button>
      <button>Кнопка</button>
      <button>Кнопка</button>
      <button>Кнопка</button>
    </div>
  </div>
</template>
<style scoped>
nav > *:hover {
  color: #4c4c4c;
}

nav a.router-link-exact-active {
  position: relative;
}

nav a.router-link-exact-active::after {
  position: absolute;
  content: '';
  width: 0;
  height: 2px;
  background-color: black;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: growFromCenter 0.5s ease forwards;
}

@keyframes growFromCenter {
  0% {
    width: 0;
    transform: translateX(-50%);
  }
  100% {
    width: 100%;
    transform: translateX(-50%);
  }
}
</style>
