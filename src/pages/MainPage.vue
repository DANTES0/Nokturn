<script setup lang="ts">
import ArtistMainPageCard from '@/components/ArtistMainPageCard.vue'
import AuctionCard from '@/components/AuctionCard.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import MagazinBanner from '@/components/MagazinBanner.vue'
import { RouterLink } from 'vue-router'
import magazin1 from '../assets/images/Magazin1.png'
import magazin2 from '../assets/images/Magazin2.png'
import magazin3 from '../assets/images/Magazin3.png'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { onMounted, ref } from 'vue'
import PaintsCard from '@/components/PaintsCard.vue'
import formatDate from '@/scripts/formatDate'
import type { lotType } from '@/types/lotType'
import getAuctionCards from '@/scripts/getAuctionCard'
import { config } from '@/scripts/config'
import type { ArtType } from '@/types/ArtTypes'
import type { UserType } from '@/types/UserType'
import MainPageMagazinBanner from '@/components/MainPageMagazinBanner.vue'

const MagazinBannerArray = [magazin1, magazin2, magazin3]

//КОНЕЦ ВРЕМЕННО ДО СЕРВЕРА
const carouselConfig = ref({
  gap: 16,
  wrapAround: false,
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

const carouselMagazinConfig = ref({
  gap: 10,
  wrapAround: true,
  height: 460,
  breakpointMode: 'viewport',
  breakpoints: {
    0: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    830: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    1240: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    1640: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
  },
})

const carouselMagazinRef = ref()
const carouselMagazinSlide = ref(0)

const carouselRef = ref()
const currentSlide = ref(0)

const carouselAuctionRef = ref()
const currentAuctionSlide = ref(0)

const next = () => carouselRef.value.next()
const prev = () => carouselRef.value.prev()

const nextAuctionCard = () => carouselAuctionRef.value.next()
const prevAuctionCard = () => carouselAuctionRef.value.prev()

const nextMagazinCard = () => carouselMagazinRef.value.next()
const prevMagazinCard = () => carouselMagazinRef.value.prev()

const auctionDigitalCards = ref<lotType[]>([])
const auctionPhysCards = ref<lotType[]>([])
const auctionCurrentCards = ref<lotType[]>([])
const dataArtCards = ref<ArtType[]>([])
const artistsCard = ref<UserType[]>([])

async function getArts() {
  try {
    const response = await fetch(`${config.url}/api/art/`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.log('Не удалось получить арты')
    } else {
      dataArtCards.value = await response.json()
    }
  } catch (error) {
    throw console.log(error)
  }
}

async function getArtists() {
  try {
    const response = await fetch(`${config.url}/api/users/withArts`, {
      method: 'GET',
    })
    if (!response.ok) {
      console.log('Не удалось получить арты')
    } else {
      artistsCard.value = await response.json()
    }
  } catch (error) {
    throw console.error(error)
  }
}

onMounted(async () => {
  auctionDigitalCards.value = await getAuctionCards({ category: 'Цифровое искусство' })
  auctionPhysCards.value = await getAuctionCards({ category: 'Физическое искусство' })
  auctionCurrentCards.value = await getAuctionCards({ lot_status: 'active' })
  getArts()
  getArtists()
})
</script>
<template>
  <div class="flex items-center flex-col w-full max-w-[1728px]">
    <!-- <MagazinBanner /> -->

    <MainPageMagazinBanner>
      <div
        @click="prevMagazinCard"
        class="z-[1] laptop:w-12 laptop:h-12 w-6 h-6 ml-2 bg-black/25 rounded-full laptop:ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer absolute left-5"
      >
        <IconLeftArrow class="text-white" />
      </div>
      <Carousel
        class="rounded-2xl"
        v-bind="carouselMagazinConfig"
        v-model="carouselMagazinSlide"
        ref="carouselMagazinRef"
      >
        <Slide class="rounded-2xl" v-for="item in MagazinBannerArray" :key="item">
          <img class="w-[96%] h-[460px] object-cover rounded-2xl" :src="item" />
        </Slide>
      </Carousel>
      <div
        @click="nextMagazinCard"
        class="laptop:w-12 laptop:h-12 w-6 h-6 ml-2 bg-black/25 rounded-full laptop:ml-[30px] flex items-center justify-center hover:scale-110 cursor-pointer absolute right-12"
      >
        <IconRightArrow class="text-white" />
      </div>
    </MainPageMagazinBanner>

    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="laptop:text-[24px] text-[18px]"> Активные торги </label>

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
          <Slide v-for="item in auctionCurrentCards" :key="item">
            <AuctionCard
              class="max-h-[340px]"
              :key="item.id"
              :id="item.id"
              :title="item.name"
              :image="item.image"
              :author="item.firstname || ''"
              :category="item.category"
              :size="item.size"
              :starting-bet="item.starting_bet.toString()"
              :current-bet="item.current_bet.toString()"
              :begin-date="formatDate(item.begin_time_date)"
              :lot-status="item.lot_status"
            />
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
    <div class="auc-card w-[90%] justify-items-center gap-x-14 gap-y-8">
      <AuctionCard
        v-for="item in auctionDigitalCards"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :image="item.image"
        :author="item.firstname || ''"
        :category="item.category"
        :size="item.size"
        :current-bet="item.current_bet.toString()"
        :starting-bet="item.starting_bet.toString()"
        :begin-date="formatDate(item.begin_time_date)"
        :lot-status="item.lot_status"
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
          <Slide v-for="slide in artistsCard" :key="slide">
            <ArtistMainPageCard
              :firstname="slide.firstname"
              :profile_photo="slide.profile_photo"
              :id="slide.id"
              :arts="slide.arts"
              :special_info="slide.special_info"
              class="max-h-[300px]"
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
    <div class="w-[90%] justify-items-center gap-x-14 gap-y-8 auc-card">
      <AuctionCard
        v-for="item in auctionPhysCards"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :image="item.image"
        :author="item.firstname || ''"
        :category="item.category"
        :size="item.size"
        :current-bet="item.current_bet.toString()"
        :starting-bet="item.starting_bet.toString()"
        :begin-date="formatDate(item.begin_time_date)"
        :lot-status="item.lot_status"
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
      <PaintsCard
        v-for="item in dataArtCards"
        :key="item.id"
        :photo="item.image"
        :user-id="item.userId"
        :photo-name="item.name"
        :user-photo="item.user?.profile_photo"
        :username="item.user?.firstname"
      />
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
.auc-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  row-gap: 2em;
  column-gap: 2em;
}

/* .gallery img {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 8px;
} */
</style>
