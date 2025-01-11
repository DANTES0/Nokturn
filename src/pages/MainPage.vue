<script setup lang="ts">
import ArtistMainPageCard from '@/components/ArtistMainPageCard.vue'
import AuctionCard from '@/components/AuctionCard.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import MagazinBanner from '@/components/MagazinBanner.vue'

import { RouterLink } from 'vue-router'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref } from 'vue'

const carouselConfig = ref({
  gap: 16,
  wrapAround: true,
  height: 340,
  breakpointMode: 'viewport',
  breakpoints: {
    830: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    1040: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
    1536: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
  },
})

const carouselAuctionConfig = ref({
  gap: 10,
  wrapAround: true,
  height: 380,
  breakpointMode: 'viewport',
  breakpoints: {
    0: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    830: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
    1240: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    1640: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
})

const carouselRef = ref()
const currentSlide = ref(0)

const carouselAuctionRef = ref()
const currentAuctionSlide = ref(0)

const next = () => carouselRef.value.next()
const prev = () => carouselRef.value.prev()

const nextAuctionCard = () => carouselAuctionRef.value.next()
const prevAuctionCard = () => carouselAuctionRef.value.prev()
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
        @click="prevAuctionCard"
        class="w-12 h-12 bg-[#F5F5F5] rounded-full ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconLeftArrow />
      </div>
      <div class="items-center justify-center gap-12 w-[80%]">
        <Carousel
          v-bind="carouselAuctionConfig"
          v-model="currentAuctionSlide"
          ref="carouselAuctionRef"
        >
          <Slide v-for="slide in 6" :key="slide">
            <AuctionCard class="max-h-[340px]" />
          </Slide>
        </Carousel>
      </div>
      <div
        @click="nextAuctionCard"
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
      class="w-[90%] h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] flex items-center justify-between"
    >
      <div
        @click="prev"
        class="w-12 h-12 bg-[#F5F5F5] rounded-full ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconLeftArrow />
      </div>
      <div class="items-center justify-center w-[85%]">
        <Carousel ref="carouselRef" v-model="currentSlide" v-bind="carouselConfig">
          <Slide v-for="slide in 10" :key="slide">
            <ArtistMainPageCard class="max-h-[300px]"
          /></Slide>
        </Carousel>
      </div>

      <div
        @click="next"
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
