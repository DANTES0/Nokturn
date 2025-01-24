<script setup lang="ts">
interface Props {
  title: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Название',
  placeholder: 'Поиск',
})
</script>
<template>
  <div class="ml-[10px] text-[14px]">{{ props.title }}</div>
  <input
    type="text"
    class="border border-black rounded-tl-lg rounded-br-lg w-[80%] h-8 text-[16px] pl-4"
    :placeholder="props.placeholder"
  />
</template>

<style scoped></style>
