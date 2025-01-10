<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import MagazinBanner from '@/components/MagazinBanner.vue'

import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex items-center flex-col w-full max-w-[1728px]">
    <MagazinBanner />

    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="text-[24px]"> Ближайшие торги </label>

      <RouterLink class="font-light flex items-center justify-center" to="/auctions">
        Посмотреть все торги</RouterLink
      >
    </div>
    <div
      class="w-[90%] h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] flex items-center justify-between"
    >
      <div
        class="w-12 h-12 bg-[#F5F5F5] rounded-full ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconLeftArrow />
      </div>
      <div class="flex items-center justify-center gap-12 w-[80%]">
        <AuctionCard v-for="i in 4" :key="i" />
      </div>
      <div
        class="w-12 h-12 bg-[#F5F5F5] rounded-full mr-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconRightArrow />
      </div>
    </div>
    <div class="mt-[30px] mb-[30px] flex w-[90%] justify-between">
      <label class="text-[24px]"> Торги физического творчества </label>

      <RouterLink class="font-light flex items-center justify-center" to="/auctions">
        Посмотреть все торги</RouterLink
      >
    </div>
    <div class="flex flex-wrap w-[90%] justify-center gap-x-14 gap-y-8">
      <AuctionCard v-for="i in 8" :key="i" />
    </div>
    <div class="mt-[30px] mb-[30px] flex w-[90%] justify-between">
      <label class="text-[24px]"> Художники </label>

      <RouterLink class="font-light flex items-center justify-center" to="/artists">
        Посмотреть всех художников</RouterLink
      >
    </div>
  </div>
</template>

<style scoped></style>
