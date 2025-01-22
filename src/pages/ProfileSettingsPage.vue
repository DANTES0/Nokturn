<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'
import MyInput from '@/UX/MyInput.vue'
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <div class="w-[90%] bg-white shadow-container rounded-2xl h-[200px] p-[20px] mt-[30px]">
    <div
      class="w-full h-[34vh] relative cursor-pointer"
      @mouseover="() => (active = true)"
      @mouseleave="() => (active = false)"
    >
      <div
        class="w-full h-full absolute bottom-0 transition-all duration-500 gradient rounded-lg flex items-end"
        :class="{ 'opacity-100': active, 'opacity-0': !active }"
      >
        <div class="w-full flex justify-between">
          <div class="text-white font-medium text-[20px] mb-[20px] ml-[20px]">Шапка профиля</div>
          <div class="text-white flex gap-4 items-center absolute w-full justify-center">
            <div class="text-[20px]">Добавить изображение</div>
            <IconCamera class="w-[32px] h-[32px]" />
          </div>
        </div>
      </div>
      <img src="../assets/images/bgProfile.jpg" class="w-full h-full object-cover rounded-2xl" />
    </div>
    <div class="w-full mt-[20px] flex gap-4">
      <div
        class="bg-white shadow-card rounded-lg w-full max-w-[250px] flex flex-col items-center gap-4 p-[20px]"
      >
        <div class="text-[20px]">Фото профиля</div>
        <div
          class="w-[80%] aspect-square bg-[#FAFAFA] shadow-cardImage rounded-full flex flex-col items-center justify-center"
        >
          <IconCamera class="w-[32px] h-[32px]" />
          <div>Добавить фото</div>
        </div>
      </div>
      <div class="w-full bg-white shadow-card rounded-lg p-[20px]">
        <div class="text-[20px]">Личная информация</div>
        <div class="w-full h-[85%] grid grid-cols-3 items-center gap-4 content-center gap-y-12">
          <MyInput title="Имя/Псевдоним" placeholder="Имя" />
          <MyInput title="Почта" placeholder="Почта" />
          <MyInput title="Ссылка на Vk" placeholder="htttps://vk.com/*" />
          <MyInput title="Фамилия" placeholder="Фамилия" />
          <MyInput title="Дата рождения" placeholder="XX.XX.XXXXX" />
          <MyInput title="Ссылка на telegram" placeholder="https://t.me/*" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(rgba(106, 106, 106, 0) 0%, rgba(0, 0, 0, 1) 90%);
}
</style>
