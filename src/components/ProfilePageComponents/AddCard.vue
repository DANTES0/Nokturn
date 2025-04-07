<script setup lang="ts">
import IconPlus from '@/components/icons/IconPlus.vue'

interface Props {
  title: string
  card?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Кнопка',
  card: 'lot',
})
</script>

<template>
  <div
    class="w-[260px] h-[340px] bg-white dark:bg-[#1c1c1c] dark:shadow-none dark:border dark:border-[#383838] shadow-card rounded-lg flex items-center justify-center flex-col gap-3 hover:scale-105 cursor-pointer"
    :class="{ im: props.card == 'work' }"
  >
    <div
      class="w-[40px] h-[40px] border border-black dark:border-[#CCCCCC] flex items-center justify-center rounded-tr-2xl rounded-bl-2xl"
    >
      <IconPlus />
    </div>
    <div class="text-[20px]">{{ props.title }}</div>
  </div>
</template>

<style lang="css" scoped>
.im {
  width: 100% !important;
  aspect-ratio: 1;
  height: auto;
  position: relative;
}
</style>
