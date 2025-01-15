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
    class="border border-black rounded-tl-[8px] rounded-br-[8px] h-[36px] shadow-cardImage px-[30px] hover:bg-[#EEEEEE] active:shadow-none active:bg-[#E0E0E0]"
  >
    {{ props.title }}
  </button>
</template>

<style scoped></style>
