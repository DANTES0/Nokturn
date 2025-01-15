<script setup lang="ts">
import MyButton from '@/UX/MyIconButton.vue'
import { RouterLink } from 'vue-router'
import IconPlus from './icons/IconPlus.vue'
import IconBell from './icons/IconBell.vue'
import IconMail from './icons/IconMail.vue'
import IconUser from './icons/IconUser.vue'

const icons = [IconPlus, IconBell, IconMail]
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
    <div class="flex gap-6">
      <MyButton v-for="(icon, index) in icons" :key="index">
        <component :is="icon" />
      </MyButton>
      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tl-lg rounded-br-lg flex items-center justify-center"
      >
        <IconUser />
      </button>
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
