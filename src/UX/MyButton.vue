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
    class="text-[16px] border border-black rounded-tl-[8px] rounded-br-[8px] shadow-cardImage px-[30px] py-[4px] hover:bg-[#EEEEEE] active:shadow-none active:bg-[#E0E0E0] bg-white"
  >
    {{ props.title }}
  </button>
</template>

<style scoped></style>
