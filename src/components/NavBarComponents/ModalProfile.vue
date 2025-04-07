<script setup lang="ts">
import IconUser from '@/components/icons/IconUser.vue'
import IconGear from '@/components/icons/IconGear.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import IconHistory from '../icons/IconHistory.vue'
import IconLightTheme from '../icons/IconLightTheme.vue'
import IconDarkTheme from '../icons/IconDarkTheme.vue'
import { useThemeStore } from '@/stores/themeStore'
const userStore = useUserStore()
const user = userStore.user
const themeStore = useThemeStore()

const link = computed(() => {
  return `/profile/${user?.id}`
})

defineProps({
  onClose: {
    type: Function,
    required: true,
  },
  onLogout: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div
    class="absolute w-[250px] bg-white dark:bg-[#232323] dark:text-[#CCCCCC] right-[96px] top-[54px] shadow-container dark:shadow-none dark:border dark:border-[#CCCCCC] z-20 rounded-lg"
  >
    <ul class="text-[14px] flex flex-col justify-between px-[20px] py-[10px] gap-1">
      <RouterLink :to="link" @click="onClose"
        ><li class="pl-1 flex items-center gap-1 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]">
          <IconUser class="w-[16px]" />Профиль
        </li></RouterLink
      >
      <hr class="dark:bg-[#3C3C3C] dark:border-none h-[1px]" />
      <RouterLink to="/profileSettings" @click="onClose"
        ><li class="pl-1 flex items-center gap-1 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]">
          <IconHistory class="w-[16px]" />История лотов
        </li></RouterLink
      >
      <hr class="dark:bg-[#3C3C3C] dark:border-none h-[1px]" />
      <RouterLink to="/profileSettings" @click="onClose"
        ><li class="pl-1 flex items-center gap-1 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]">
          <IconGear class="w-[16px]" />Настройки профиля
        </li></RouterLink
      >
      <hr class="dark:bg-[#3C3C3C] dark:border-none h-[1px]" />

      <li
        @click="themeStore.toggleTheme()"
        class="pl-1 flex items-center gap-1 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]"
      >
        <component :is="themeStore.isDark ? IconLightTheme : IconDarkTheme" class="w-[16px]" />
        Сменить тему
      </li>

      <hr class="dark:bg-[#3C3C3C] dark:border-none h-[1px]" />
      <li
        @click="onLogout()"
        class="pl-1 flex items-center gap-1 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]"
      >
        <IconLogout class="w-[16px]" /> Выход
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul li:hover {
  /* background-color: #ededed; */
  cursor: pointer;
  border-radius: 4px;
}
</style>
