<script setup lang="ts">
import ArtistMainPageCard from '@/components/ArtistMainPageCard.vue'
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
    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="text-[24px]"> Художники </label>

      <RouterLink class="font-light flex items-center justify-center" to="/artists">
        Посмотреть всех художников</RouterLink
      >
    </div>

    <div
      class="w-[90%] h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] flex items-center justify-between overflow-hidden"
    >
      <div
        class="w-12 h-12 bg-[#F5F5F5] rounded-full ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconLeftArrow />
      </div>
      <div class="flex-1 flex items-center justify-center gap-8 w-[80%]">
        <ArtistMainPageCard v-for="i in 3" :key="i" />
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
      <label class="text-[24px]"> Работы не для продажи </label>

      <RouterLink class="font-light flex items-center justify-center" to="/auctions">
        Посмотреть все работы</RouterLink
      >
    </div>

    <div class="gallery">
      <img src="../assets/images/test4.jpg" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test5.jpg" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test3.png" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test3.png" />
      <img src="../assets/images/test6.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test3.png" />
      <img src="../assets/images/test4.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test3.png" />
      <img src="../assets/images/test6.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test5.jpg" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test6.jpg" />
      <img src="../assets/images/test3.png" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test2.jpg" />
      <img src="../assets/images/test5.jpg" />
      <img src="../assets/images/test1.jpg" />
      <img src="../assets/images/test2.jpg" />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  width: min(100%, 90%);
  margin: 0 auto;
  columns: 5 200px;
  column-gap: 1em;
}

.gallery img {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 8px;
}
</style>
