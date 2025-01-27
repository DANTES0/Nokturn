<script setup lang="ts">
import { useScreenWidth } from '@/assets/scripts/ScriptWindowSize'
import { onMounted, ref, watch } from 'vue'

const isMobile = useScreenWidth(1300)

const sizeArrayImage = ref(5)

watch(isMobile, () => {
  if (isMobile.value) {
    sizeArrayImage.value = 3
  } else sizeArrayImage.value = 5
})

onMounted(() => {
  if (isMobile.value) {
    sizeArrayImage.value = 3
  }
})
</script>

<template>
  <div class="bg-white shadow-card p-[30px] rounded-2xl flex w-full">
    <div class="flex items-center mobile:flex-row flex-col">
      <img class="w-24 h-24 rounded-full shadow-card" src="../../assets/images/test3.png" />
      <div
        class="flex flex-col mobile:ml-[20px] mobile:max-w-[300px] max-w-[200px] gap-3 mobile:border-r mobile:border-black mobile:pr-[10px]"
      >
        <span class="mt-[10px] text-[18px] mobile:text-start text-center">Имя Фамилия</span>
        <span class="mb-[10px] text-[14px] font-light mobile:text-start text-center"
          >Текст Текст Текст Текст Текст Текст Текст Текст Текст</span
        >
      </div>
    </div>
    <div class="flex w-full ml-[20px] gap-4 items-center justify-center mobile:flex-row flex-col">
      <img
        v-for="i in sizeArrayImage"
        :key="i"
        class="mobile:w-[11vw] w-[100px] h-auto rounded-2xl max-w-[160px] max-h-[160px]"
        src="../../assets/images/test5.jpg"
      />
    </div>
  </div>
</template>

<style scoped></style>
