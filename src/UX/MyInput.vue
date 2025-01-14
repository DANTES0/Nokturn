<script setup lang="ts">
interface Props {
  title: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Поиск',
  placeholder: 'Поиск',
})
</script>

<template>
  <div class="w-full relative">
    <input
      type="text"
      class="border border-black h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px]"
      :placeholder="props.placeholder"
    />
    <div class="absolute top-[-14px] left-[20px] bg-[#FAFAFA] px-2 font-light">
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped></style>
