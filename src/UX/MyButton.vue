<script setup lang="ts">
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Кнопка',
})
</script>

<template>
  <button
    class="text-[16px] border border-black dark:border-[#CCCCCC] rounded-tl-[8px] rounded-br-[8px] shadow-cardImage px-[30px] py-[4px] hover:bg-[#EEEEEE] dark:hover:bg-[#3C3C3C] active:shadow-none active:bg-[#E0E0E0] dark:active:bg-[#161616] bg-white dark:bg-[#1C1C1C] dark:text-[#CCCCCC]"
  >
    {{ props.title }}
  </button>
</template>

<style scoped></style>
