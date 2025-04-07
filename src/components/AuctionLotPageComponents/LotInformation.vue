<script setup lang="ts">
interface Props {
  id?: number
  title: string
  lotId: number
  author: string
  lastname?: string
  tags?: string
  category: string
  size: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: 'Название картины',
  author: 'Имя Фамилия',
  tags: '',
  category: 'Категория',
  size: '4000x2000',
})
</script>

<template>
  <div
    class="w-[400px] h-full bg-white dark:bg-[#1c1c1c] shadow-container dark:shadow-none dark:border dark:border-[#383838] rounded-2xl relative flex flex-col text-[18px]"
  >
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Название:</label>
      <label class="ml-[30px] font-medium font-[InterItalic]">{{ props.title }}</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Номер лота:</label>
      <label class="ml-[30px]">Лот №{{ props.lotId }}</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Автор:</label>
      <label class="ml-[30px] border-b border-black dark:border-[#CCCCCC] font-[InterItalic]"
        >{{ props.author }} {{ props.lastname }}</label
      >
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Категория:</label>
      <label class="ml-[30px] text-[16px]">{{ props.category }}</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Размеры:</label>
      <label class="ml-[30px] text-[16px]">{{ props.size }}</label>
    </div>
    <!-- <div class="mt-[20px] ml-[20px]">
      <label class="font-extralight font-[InterItalic]">живопись</label>
    </div> -->
  </div>
</template>

<style scoped></style>
