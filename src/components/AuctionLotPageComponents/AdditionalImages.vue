<script setup lang="ts">
import { config } from '@/scripts/config'

defineProps({
  additionlImage: {
    type: Array as () => string[], // Правильный способ указать массив строк
    default: () => [], // `default` должен быть функцией
  },
})
</script>

<template>
  <div
    class="w-[450px] min-h-[160px] bg-white mt-[20px] shadow-container rounded-2xl relative flex items-center justify-center gap-8"
  >
    <div class="text-[18px]" v-if="additionlImage.length == 0">Изображения отсутствуют</div>
    <div
      v-if="additionlImage.length !== 0"
      class="w-full h-full grid grid-cols-3 gap-2 justify-items-center p-4"
    >
      <img
        v-for="(item, index) in additionlImage"
        :key="index"
        class="w-[110px] h-[110px] rounded-lg object-cover"
        :src="config.url + item"
      />
    </div>
  </div>
</template>

<style scoped></style>
