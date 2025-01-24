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
  <div>
    <div class="ml-[10px] text-[14px] mb-[8px]">{{ props.title }}</div>
    <input
      type="text"
      class="border border-black rounded-tl-lg rounded-br-lg w-full py-[4px] text-[1vw] pl-4"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style scoped></style>
