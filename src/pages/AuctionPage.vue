<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
import MyButton from '@/UX/MyButton.vue'

import MyCheckBox from '@/UX/MyCheckBox.vue'
import MyInput from '@/UX/MyInput.vue'
import MySelectionInput from '@/UX/MySelectionInput.vue'
</script>
<template>
  <div class="flex justify-between w-full gap-[30px] px-[30px]">
    <div
      class="w-[25%] max-w-[350px] h-[90vh] bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] mb-[30px] sticky top-[30px] flex flex-col"
    >
      <div class="flex flex-col w-full px-[30px] flex-1">
        <label class="text-[20px] mt-[20px]">Фильтры</label>
        <MyInput title="Поиск" placeholder="Арбуз" class="mt-[30px]" />
        <MySelectionInput title="Категория" placeholder="Физическое искусство" class="mt-[30px]" />
        <div class="mt-[20px]">Начальная цена</div>
        <div class="flex gap-5">
          <MyInput title="От" placeholder="100" class="mt-[14px]" />
          <MyInput title="До" placeholder="10000" class="mt-[14px]" />
        </div>
        <div class="mt-[10px]">Текущая цена</div>
        <div class="flex gap-5">
          <MyInput title="От" placeholder="100" class="mt-[14px]" />
          <MyInput title="До" placeholder="10000" class="mt-[14px]" />
        </div>
        <div class="flex mt-[20px] gap-7">
          <MyCheckBox class="w-6 h-6" />
          <label class="">Показывать текущие</label>
        </div>
        <div class="mt-[10px]">Размер картины</div>
        <div class="flex gap-5">
          <MyInput title="Длина" placeholder="100" class="mt-[14px]" />
          <MyInput title="Высота" placeholder="10000" class="mt-[14px]" />
        </div>
        <div class="w-full flex items-center justify-center mt-auto mb-[30px]">
          <MyButton title="Применить" />
        </div>
      </div>
    </div>
    <div
      class="w-full bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] relative mb-[30px] auc-card py-[30px] px-[30px]"
    >
      <AuctionCard v-for="i in 20" :key="i" class="shadow-card rounded-lg" />
    </div>
  </div>
</template>
<style scoped>
.auc-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  row-gap: 2em;
  column-gap: 1em;
  justify-items: center;
}
</style>
