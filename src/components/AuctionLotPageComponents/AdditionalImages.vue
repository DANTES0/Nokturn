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
    class="w-[450px] h-[160px] bg-white mt-[20px] shadow-container rounded-2xl relative flex items-center justify-center gap-8"
  >
    <img
      v-for="(item, index) in additionlImage"
      :key="index"
      class="w-[110px] h-[110px] rounded-lg object-cover"
      :src="config.url + item"
    />
  </div>
</template>

<style scoped></style>
