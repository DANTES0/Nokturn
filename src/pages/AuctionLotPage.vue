<script setup lang="ts">
import AdditionalImages from '@/components/AuctionLotPageComponents/AdditionalImages.vue'
import CommentsLot from '@/components/AuctionLotPageComponents/CommentsLot.vue'
import DescriptionLot from '@/components/AuctionLotPageComponents/DescriptionLot.vue'
import HistoryBet from '@/components/AuctionLotPageComponents/HistoryBet.vue'
import LotBet from '@/components/AuctionLotPageComponents/LotBet.vue'
import LotInformation from '@/components/AuctionLotPageComponents/LotInformation.vue'
import { config } from '@/scripts/config'
import getUserById from '@/scripts/getUser'
import { useUserStore } from '@/stores/userStore'
import type { lotType } from '@/types/lotType'
import { io } from 'socket.io-client'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const user = computed(() => userStore.user)
const route = useRoute()
const lotData = ref<lotType | null>(null)
const lotid = route.params.id

const socket = io(config.url, { transports: ['websocket'] })

async function getLotById() {
  try {
    const response = await fetch(`${config.url}/api/lot/${lotid}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw console.error('Ошибка загрузки лота')
    }

    lotData.value = await response.json()
    const userData = await getUserById(lotData.value?.userId || '')
    lotData.value = {
      ...lotData.value,
      firstname: userData.firstname,
      lastname: userData.lastname,
    } as lotType

    console.log(lotData.value)
  } catch (error) {
    throw console.error(error)
  }
}

onMounted(() => {
  getLotById()

  socket.on('newBet', (data) => {
    if (data.lotId == lotid) {
      console.log('Новая ставка', data)
      if (lotData.value) {
        lotData.value.current_bet = data.bet
      }
    }
  })
})

onUnmounted(() => {
  socket.off('newBet')
  socket.emit('leaveLot', user.value?.id)
  socket.disconnect()
})
</script>
<template>
  <div
    v-if="lotData"
    class="w-[90%] bg-white mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px] gap-[30px]"
  >
    <div class="ml-[30px] mt-[30px]">
      <img
        class="rounded-2xl w-[450px] h-[450px] object-cover shadow-cardImage"
        :src="config.url + lotData.image"
      />
      <div class="text-[20px] mt-[20px] font-light">Дополнительные изображения</div>
      <AdditionalImages :additionl-image="lotData.another_images" />
      <div class="text-[20px] mt-[20px] font-light">Описание</div>
      <DescriptionLot />
    </div>
    <div class="flex flex-col h-full w-full">
      <div class="flex justify-between h-[350px] w-full mt-[30px]">
        <LotInformation
          :title="lotData.name"
          :author="lotData.firstname ?? ''"
          :lastname="lotData.lastname"
          :category="lotData.category"
          :size="lotData.size"
          :lotId="lotData.id"
        />
        <LotBet
          :id="lotData.id"
          :start-bet="lotData.starting_bet"
          :current-bet="lotData.current_bet"
          :begin-date="lotData.begin_time_date"
          :end-date="lotData.end_time_date"
        />
      </div>
      <div class="text-[20px] mt-[20px] font-light mb-[20px]">История ставок</div>
      <HistoryBet />
      <div class="text-[20px] mt-[20px] font-light mb-[20px]">Комментарии</div>
      <CommentsLot />
    </div>
  </div>
</template>
<style scoped>
.scrollingbox {
  scrollbar-color: rgb(0, 0, 0) transparent;
  scrollbar-width: thin;
}
</style>
