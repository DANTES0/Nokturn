<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
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
          <MyInput title="От" placeholder="100" class="mt-[20px]" />
          <MyInput title="До" placeholder="10000" class="mt-[20px]" />
        </div>
        <div class="mt-[20px]">Текущая цена</div>
        <div class="flex gap-5">
          <MyInput title="От" placeholder="100" class="mt-[20px]" />
          <MyInput title="До" placeholder="10000" class="mt-[20px]" />
        </div>
        <MyCheckBox class="w-6 h-6" />
      </div>
    </div>
    <div
      class="w-full flex-1 bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px]"
    >
      <div class="flex flex-wrap py-[30px] gap-8 items-center justify-center">
        <AuctionCard v-for="i in 20" :key="i" class="shadow-card rounded-lg" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
