<script setup lang="ts">
import { ref } from 'vue'
import IconMail from './icons/IconMail.vue'
import IconGear from './icons/IconGear.vue'
import IconLogout from './icons/IconLogout.vue'
import IconUser from './icons/IconUser.vue'
import IconBell from './icons/IconBell.vue'
import IconPlus from './icons/IconPlus.vue'

const isMenuOpen = ref(false)
const isProfileDropdown = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropMenu = () => {
  isProfileDropdown.value = !isProfileDropdown.value
}
</script>

<template>
  <div
    :class="[
      'w-full px-[10px] items-center h-[48px] border-b border-[#7A7A7A] flex justify-between relative',
    ]"
  >
    <div class="font-[LeviBrushRus]">Ноктюрн</div>
    <div class="flex gap-6 items-center">
      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105"
      >
        <IconPlus />
      </button>

      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
      >
        <div
          class="w-[12px] h-[12px] bg-red-600 border border-black absolute rounded-full top-[-6px] right-[-6px]"
        ></div>
        <IconBell />
      </button>
      <RouterLink to="/chat">
        <button
          class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
        >
          <div
            class="w-[14px] h-[14px] border border-black bg-white absolute top-[-6px] right-[-8px] flex items-center justify-center rounded-tr-[4px] rounded-bl-[4px]"
          >
            <div class="text-[9px] font-bold text-black">22</div>
          </div>
          <IconMail />
        </button>
      </RouterLink>
      <div class="h-full items-center justify-center flex" @click="toggleMenu">
        <div class="flex flex-col justify-between h-[20px] cursor-pointer">
          <div class="w-[30px] h-[2px] bg-black"></div>
          <div class="w-[30px] h-[2px] bg-black"></div>
          <div class="w-[30px] h-[2px] bg-black"></div>
        </div>
      </div>
    </div>
    <div
      class="bg-white w-[200px] absolute right-0 top-[48px] rounded-bl-lg shadow-container flex flex-col text-[20px] pt-[10px] z-50"
      v-if="isMenuOpen"
    >
      <div>
        <div class="flex items-center" @click="toggleDropMenu">
          <button
            class="w-[40px] h-[40px] border border-black rounded-tl-lg rounded-br-lg flex items-center justify-center ml-[10px]"
          >
            <!-- <IconUser /> -->
            <img
              src="../assets/images/test3.png"
              class="rounded-tl-md rounded-br-lg h-full object-cover"
              alt=""
            />
          </button>
          <div class="text-[14px]">
            <div class="ml-[10px] text-[16px]">Даниил</div>
            <div class="ml-[10px]">Ехлаков</div>
          </div>
        </div>
        <div class="flex flex-col justify-center" v-if="isProfileDropdown">
          <div class="ml-[10px] flex gap-2 items-center">
            <IconUser />
            <div>Профиль</div>
          </div>
          <div class="ml-[10px] flex gap-2 items-center">
            <IconMail />
            <div>Сообщения</div>
          </div>
          <div class="ml-[10px] flex gap-2 items-center">
            <IconGear />
            <div>Настройки</div>
          </div>
          <div class="ml-[10px] flex gap-2 items-center">
            <IconLogout />
            <div>Выход</div>
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-black mt-[4px]"></div>
      <RouterLink to="/"><div class="ml-[10px] mt-[10px]">Главная</div></RouterLink>
      <hr />
      <RouterLink to="/auctions"><div class="ml-[10px] mt-[4px]">Аукционы</div></RouterLink>
      <hr />
      <RouterLink to="/artists"><div class="ml-[10px] mt-[4px]">Художники</div></RouterLink>
      <hr />
      <RouterLink to="/paintings"><div class="ml-[10px] mt-[4px]">Работы</div></RouterLink>
      <hr />
    </div>
    <!-- Контент меню -->
  </div>
</template>

<style scoped>
/* Стили бургер-меню */
</style>
