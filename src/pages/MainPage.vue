<script setup lang="ts">
import ArtistMainPageCard from '@/components/ArtistMainPageCard.vue'
import AuctionCard from '@/components/AuctionCard.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import MagazinBanner from '@/components/MagazinBanner.vue'
import { RouterLink } from 'vue-router'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { onMounted, ref } from 'vue'
import PaintsCard from '@/components/PaintsCard.vue'
import { config } from '@/scripts/config'
//ВРМЕНННО ДО СЕРВЕРА
import test1 from '../assets/images/test1.jpg'
import test2 from '../assets/images/test2.jpg'
import test3 from '../assets/images/test3.png'
import test4 from '../assets/images/test4.jpg'
import test5 from '../assets/images/test5.jpg'
import test6 from '../assets/images/test6.jpg'
import getUserById from '@/scripts/getUser'
import type { AuctionCardData } from '@/types/AuctionCardtype'
import formatDate from '@/scripts/formatDate'
import type { lotType } from '@/types/lotType'

const tempArrayImages = [test1, test2, test3, test4, test5, test6]

const randomImage = () => {
  const randomIndex = Math.floor(Math.random() * tempArrayImages.length)
  return tempArrayImages[randomIndex]
}
//КОНЕЦ ВРЕМЕННО ДО СЕРВЕРА

async function getCategoryLot(category: string) {
  const response = await fetch(`${config.url}/api/lot/filters?category=${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    return await response.json()
  }
}

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

const auctionDigitalCards = ref<AuctionCardData[]>([])
const auctionPhysCards = ref<AuctionCardData[]>([])

onMounted(async () => {
  const digitalData = await getCategoryLot('Цифровое искусство')
  const PhysData = await getCategoryLot('Физическое искусство')

  const auctionDigitalData = await Promise.all(
    digitalData.map(async (item: lotType) => {
      const user = await getUserById(item.userId)
      return {
        title: item.name,
        image: item.image,
        author: user?.firstname || 'Неизвестный автор',
        category: item.category,
        size: item.size,
        startingBet: item.starting_bet,
        beginDate: item.begin_time_date,
      }
    }),
  )
  const auctionPhysData = await Promise.all(
    PhysData.map(async (item: lotType) => {
      const user = await getUserById(item.userId)
      return {
        title: item.name,
        image: item.image,
        author: user?.firstname || 'Неизвестный автор',
        category: item.category,
        size: item.size,
        startingBet: item.starting_bet,
        beginDate: item.begin_time_date,
      }
    }),
  )

  auctionDigitalCards.value = auctionDigitalData
  auctionPhysCards.value = auctionPhysData
  console.log(auctionDigitalCards.value)
})
</script>
<template>
  <div class="flex items-center flex-col w-full max-w-[1728px]">
    <MagazinBanner />

    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]"> Ближайшие торги </label>

      <RouterLink
        class="font-light flex items-center justify-center laptop:text-[16px] text-[12px]"
        to="/auctions"
      >
        Посмотреть все торги</RouterLink
      >
    </div>
    <div
      class="laptop:w-[90%] w-full h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] flex items-center justify-between"
    >
      <div
        @click="prevAuctionCard"
        class="laptop:w-12 laptop:h-12 w-6 h-6 bg-[#F5F5F5] rounded-full laptop:ml-[30px] ml-4 flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
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
        class="laptop:w-12 laptop:h-12 w-6 h-6 bg-[#F5F5F5] rounded-full mr-[30px] flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconRightArrow />
      </div>
    </div>
    <div class="mt-[30px] mb-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]">Цифровое творчество </label>

      <RouterLink
        class="font-light flex items-center justify-center laptop:text-[16px] text-[12px]"
        to="/auctions"
      >
        Посмотреть все торги</RouterLink
      >
    </div>
    <div class="flex flex-wrap w-[90%] justify-center gap-x-14 gap-y-8">
      <AuctionCard
        @click="() => console.log(item)"
        v-for="(item, index) in auctionDigitalCards"
        :key="index"
        :title="item.title"
        :image="item.image"
        :author="item.author"
        :category="item.category"
        :size="item.size"
        :starting-bet="item.startingBet.toString()"
        :begin-date="formatDate(item.beginDate)"
      />
    </div>
    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]"> Художники </label>

      <RouterLink
        class="font-light flex items-center justify-center laptop:text-[16px] text-[12px]"
        to="/artists"
      >
        Посмотреть всех художников</RouterLink
      >
    </div>

    <div
      class="laptop:w-[90%] w-full h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] flex items-center justify-between"
    >
      <div
        @click="prev"
        class="laptop:w-12 laptop:h-12 w-6 h-6 bg-[#F5F5F5] rounded-full laptop:ml-[30px] ml-4 flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconLeftArrow />
      </div>
      <div class="items-center justify-center desktop:w-[85%] laptop:w-[85%] w-[80%]">
        <Carousel ref="carouselRef" v-model="currentSlide" v-bind="carouselConfig">
          <Slide v-for="slide in 10" :key="slide">
            <ArtistMainPageCard class="max-h-[300px]"
          /></Slide>
        </Carousel>
      </div>

      <div
        @click="next"
        class="laptop:w-12 laptop:h-12 w-6 h-6 bg-[#F5F5F5] rounded-full laptop:mr-[30px] mr-4 flex items-center justify-center hover:scale-110 cursor-pointer shadow-cardImage"
      >
        <IconRightArrow />
      </div>
    </div>
    <div class="mt-[30px] mb-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]">Физическое творчество </label>

      <RouterLink
        class="font-light flex items-center justify-center laptop:text-[16px] text-[12px]"
        to="/auctions"
      >
        Посмотреть все торги</RouterLink
      >
    </div>
    <div class="flex flex-wrap w-[90%] justify-center gap-x-14 gap-y-8">
      <AuctionCard
        v-for="(item, index) in auctionPhysCards"
        :key="index"
        :title="item.title"
        :image="item.image"
        :author="item.author"
        :category="item.category"
        :size="item.size"
        :starting-bet="item.startingBet.toString()"
        :begin-date="formatDate(item.beginDate)"
      />
    </div>
    <div class="mt-[30px] mb-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]"> Работы не для продажи </label>

      <RouterLink
        class="font-light flex items-center justify-center laptop:text-[16px] text-[12px]"
        to="/auctions"
      >
        Посмотреть все работы</RouterLink
      >
    </div>

    <div class="gallery">
      <PaintsCard v-for="i in 20" :key="i" :photo="randomImage()" />
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

/* .gallery img {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 8px;
} */
</style>
