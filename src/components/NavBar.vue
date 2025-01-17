<script setup lang="ts">
import MyButton from '@/UX/MyIconButton.vue'
import { RouterLink, useRoute } from 'vue-router'
import IconPlus from './icons/IconPlus.vue'
import IconBell from './icons/IconBell.vue'
import IconMail from './icons/IconMail.vue'
import IconUser from './icons/IconUser.vue'
import { computed } from 'vue'

const icons = [IconPlus, IconBell, IconMail]

const route = useRoute()

const isProfileRoute = computed(() => route.path === '/profile')
</script>
<template>
  <div
    :class="[
      'w-full px-24 items-center h-[48px] border-b border-[#7A7A7A] flex justify-between',
      { 'absolute top-0 bg-[rgba(0,0,0,0.35)] text-white': isProfileRoute },
    ]"
  >
    <RouterLink
      to="/"
      class="font-[LeviBrushRus] text-[24px] hover:text-[#4C4C4C] cursor-pointer mt-auto"
      :class="{ 'hover:text-[#DDDDDD]': isProfileRoute }"
      >Ноктюрн</RouterLink
    >
    <nav class="mr-auto mt-auto ml-[100px] flex gap-7 text-[18px]">
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/">Главная</RouterLink>
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/auctions"
        >Аукционы</RouterLink
      >
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/artists"
        >Художники</RouterLink
      >
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/paintings"
        >Работы</RouterLink
      >
    </nav>
    <div class="flex gap-6">
      <MyButton
        v-for="(icon, index) in icons"
        :key="index"
        :class="{ 'border-[#CCCCCC]': isProfileRoute }"
      >
        <component :is="icon" />
      </MyButton>
      <RouterLink to="/profile"
        ><button
          class="w-[32px] h-[32px] border-2 border-black rounded-tl-lg rounded-br-lg flex items-center justify-center"
          :class="{ 'border-[#CCCCCC]': isProfileRoute }"
        >
          <IconUser /></button
      ></RouterLink>
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
