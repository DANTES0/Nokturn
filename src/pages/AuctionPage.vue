<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
</script>
<template>
  <div class="flex justify-between w-full gap-[30px] px-[30px]">
    <div
      class="w-[25%] max-w-[350px] h-[90vh] bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] mb-[30px] sticky top-[30px]"
    >
      Аукционы
    </div>
    <div
      class="w-full flex-1 bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px]"
    >
      <div class="flex flex-wrap py-[30px] gap-8 items-center justify-center">
        <AuctionCard v-for="i in 20" :key="i" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
