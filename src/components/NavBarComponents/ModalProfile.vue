<script setup lang="ts">
import IconUser from '@/components/icons/IconUser.vue'
import IconGear from '@/components/icons/IconGear.vue'
import IconLogout from '@/components/icons/IconLogout.vue'

defineProps({
  onClose: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="absolute w-[250px] bg-white right-[96px] top-[54px] shadow-container z-20 rounded-lg">
    <ul class="text-[14px] flex flex-col justify-between px-[20px] py-[10px] gap-1">
      <RouterLink to="/profile" @click="onClose"
        ><li class="pl-1 flex items-center gap-1">
          <IconUser class="w-[16px]" />Профиль
        </li></RouterLink
      >
      <hr />
      <RouterLink to="/profileSettings" @click="onClose"
        ><li class="pl-1 flex items-center gap-1">
          <IconGear class="w-[16px]" />Настройки профиля
        </li></RouterLink
      >
      <hr />
      <li class="pl-1 flex items-center gap-1"><IconLogout class="w-[16px]" /> Выход</li>
    </ul>
  </div>
</template>

<style scoped>
ul li:hover {
  background-color: #ededed;
  cursor: pointer;
  border-radius: 4px;
}
</style>
