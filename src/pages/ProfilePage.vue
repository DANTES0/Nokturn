<script setup lang="ts">
import { useScreenWidth } from '@/scripts/ScriptWindowSize'
import AuctionCard from '@/components/AuctionCard.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconStarOutline from '@/components/icons/IconStarOutline.vue'
import IconTg from '@/components/icons/IconTg.vue'
import IconVk from '@/components/icons/IconVk.vue'
import PaintsCard from '@/components/PaintsCard.vue'
import AddCard from '@/components/ProfilePageComponents/AddCard.vue'
import formatDate from '@/scripts/formatDate'
import { useUserStore } from '@/stores/userStore'
import { computed, ref, watch } from 'vue'
import { config } from '@/scripts/config'
import headerImage from '../assets/images/bgProfile.jpg'
import profileImage from '../assets/images/test2.jpg'
import getAuctionCards from '@/scripts/getAuctionCard'
import type { lotType } from '@/types/lotType'
const isMobile = useScreenWidth(1024)
const userStore = useUserStore()
const user = computed(() => userStore.user)

const dataCardAuction = ref<lotType[]>([])

watch(
  () => user.value?.id,
  async (newUserId) => {
    if (newUserId) {
      dataCardAuction.value = await getAuctionCards({ userId: newUserId })
      console.log(dataCardAuction.value)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full h-[34vh] relative -z-10">
    <img
      class="h-full w-full object-cover"
      :src="user?.profile_header_photo ? config.url + user?.profile_header_photo : headerImage"
    />
    <img
      class="absolute w-48 h-48 rounded-full bottom-[-90px] laptop:left-[96px] left-[104px] shadow-cardImage object-cover"
      :src="user?.profile_photo ? config.url + user?.profile_photo : profileImage"
    />
  </div>

  <div class="w-[90%] flex gap-8 laptop:flex-row flex-col">
    <div
      class="bg-white laptop:w-[25%] laptop:max-w-[350px] w-full h-[180px] shadow-container rounded-2xl laptop:mt-8 mt-[120px] laptop:ml-[300px] relative"
    >
      <div
        v-if="!isMobile"
        class="w-6 h-6 bg-white shadow-container rounded-full left-[-36px] absolute"
      ></div>
      <div
        v-if="!isMobile"
        class="w-4 h-4 bg-white shadow-container rounded-full left-[-64px] top-[-8px] absolute"
      ></div>
      <IconChat class="absolute top-2 right-[10px]" />
      <div class="w-full h-full flex flex-col p-[20px] justify-between">
        <div class="text-[24px]">{{ user?.firstname }} {{ user?.lastname }}</div>
        <div class="text-[18px] font-light">{{ user?.special_info }}</div>
        <div class="font-extralight">
          Дата регистрации: {{ formatDate(user?.birthday_date ?? '00.00.0000') }}
        </div>
        <div class="flex justify-between">
          <div class="flex gap-2">
            <IconTg />
            <IconVk />
          </div>
          <div class="flex">
            <IconStarOutline />
            <span>{{ user?.rating }}/5</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white w-full flex-1 h-[180px] shadow-container rounded-2xl laptop:mt-8 relative p-[20px] text-justify description-text overflow-y-scroll laptop:text-[14px] desktop:text-[18px]"
    >
      {{ user?.description }}
    </div>
  </div>
  <div class="w-[90%]">
    <div class="text-[20px] mt-[20px]">Выставленные лоты</div>
    <div class="mt-[20px] auc-card">
      <RouterLink to="/addLot"><AddCard title="Добавить лот" /></RouterLink>
      <AuctionCard
        class=""
        v-for="(item, index) in dataCardAuction"
        :key="index"
        :id="item.id"
        :title="item.name"
        :image="item.image"
        :author="item.firstname || ''"
        :lastname="item.lastname"
        :category="item.category"
        :size="item.size"
        :starting-bet="item.starting_bet.toString()"
        :begin-date="formatDate(item.begin_time_date)"
      />
    </div>
    <div class="text-[20px] mt-[20px]">Работы для демонстрации</div>
    <div class="gap-3 work mt-[20px]">
      <RouterLink to="/addPainting"> <AddCard title="Добавить работу" card="work" /></RouterLink>
      <div v-for="i in 8" :key="i" class="paint-card">
        <PaintsCard styleCard="profile" class="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.work {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2em;
}
.auc-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  row-gap: 2em;
  column-gap: 2em;
  justify-items: center;
}

.paint-card {
  width: 100%;
}

/* .description-text {
  font-size: clamp(6px, 2vw + 1px, 18px);
} */
</style>
