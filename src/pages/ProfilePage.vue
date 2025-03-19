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
import type { ArtType } from '@/types/ArtTypes'
import { useRoute } from 'vue-router'
import type { UserType } from '@/types/UserType'
import AvatarCanvas from '@/components/AvatarCanvas.vue'
import router from '@/router'

const route = useRoute()
const isMobile = useScreenWidth(1024)
const userStore = useUserStore()
const user = computed(() => userStore.user)
const userInfo = ref<UserType>()
const dataCardAuction = ref<lotType[]>([])
const dataArtCards = ref<ArtType[]>([])
const isMyProfile = computed(() => {
  if (user.value?.id == userInfo.value?.id) {
    return true
  } else {
    return false
  }
})
async function getArts() {
  try {
    let response
    if (route.params.id == user.value?.id) {
      response = await fetch(`${config.url}/api/art/${user.value?.id}`, {
        method: 'GET',
      })
    } else {
      response = await fetch(`${config.url}/api/art/${route.params.id}`, {
        method: 'GET',
      })
    }

    if (!response.ok) {
      console.log('Не удалось получить арты')
    } else {
      dataArtCards.value = await response.json()
    }
  } catch (error) {
    throw console.log(error)
  }
}
async function getUser() {
  try {
    let response
    if (route.params.id == user.value?.id) {
      response = await fetch(`${config.url}/api/users/${user.value?.id}`, {
        method: 'GET',
      })
    } else {
      response = await fetch(`${config.url}/api/users/${route.params.id}`, {
        method: 'GET',
      })
    }

    if (!response.ok) {
      console.log('Не удалось получить арты')
    } else {
      userInfo.value = await response.json()
    }
  } catch (error) {
    throw console.log(error)
  }
}

async function goToChat() {
  const objectBody = {
    user1Id: user.value?.id,
    user2Id: userInfo.value?.id,
  }
  try {
    const response = await fetch(`${config.url}/api/chat/createChats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectBody),
    })

    if (!response.ok) {
      console.log('Не удалось создать или открыть чат')
    } else {
      console.log(await response.json())
      router.push('/chat')
    }
  } catch (error) {
    throw console.log(error)
  }
}

watch(
  () => route.params.id,
  async (newUserId) => {
    if (newUserId) {
      dataCardAuction.value = await getAuctionCards({ userId: newUserId })
      getArts()
      getUser()
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
      :src="
        userInfo?.profile_header_photo ? config.url + userInfo?.profile_header_photo : headerImage
      "
    />
    <img
      v-if="userInfo?.profile_photo"
      class="absolute w-48 h-48 rounded-full bottom-[-90px] laptop:left-[96px] left-[104px] shadow-cardImage object-cover"
      :src="userInfo?.profile_photo ? config.url + userInfo?.profile_photo : profileImage"
    />
    <AvatarCanvas
      v-if="userInfo?.firstname && !userInfo.profile_photo"
      class="absolute w-48 h-48 rounded-full bottom-[-90px] laptop:left-[96px] left-[104px] shadow-cardImage object-cover bg-white"
      :name="userInfo?.firstname ?? ''"
      :size="192"
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
      <IconChat
        @click="goToChat"
        v-if="user?.id !== route.params.id"
        class="absolute top-2 right-[10px] cursor-pointer"
      />
      <div class="w-full h-full flex flex-col p-[20px] justify-between">
        <div class="text-[24px]">{{ userInfo?.firstname }} {{ userInfo?.lastname }}</div>
        <div class="text-[18px] font-light">{{ userInfo?.special_info }}</div>
        <div class="font-extralight">
          Дата регистрации: {{ formatDate(userInfo?.birthday_date ?? '00.00.0000') }}
        </div>
        <div class="flex justify-between">
          <div class="flex gap-2">
            <IconTg />
            <IconVk />
          </div>
          <div class="flex">
            <IconStarOutline />
            <span>{{ userInfo?.rating }}/5</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white w-full flex-1 h-[180px] shadow-container rounded-2xl laptop:mt-8 relative p-[20px] text-justify description-text overflow-y-scroll laptop:text-[14px] desktop:text-[18px]"
    >
      {{ userInfo?.description }}
    </div>
  </div>
  <div class="w-[90%]">
    <div v-if="dataCardAuction.length != 0" class="text-[20px] mt-[20px]">Выставленные лоты</div>
    <div class="mt-[20px] auc-card">
      <RouterLink v-if="user?.id == route.params.id" to="/addLot"
        ><AddCard title="Добавить лот"
      /></RouterLink>
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
        :current-bet="item.current_bet.toString()"
        :begin-date="formatDate(item.begin_time_date)"
        :profile="isMyProfile"
      />
    </div>
    <div
      v-if="dataArtCards.length != 0 || user?.id == route.params.id"
      class="text-[20px] mt-[20px]"
    >
      Работы для демонстрации
    </div>
    <div class="gap-3 work mt-[20px] mb-[40px]">
      <RouterLink v-if="user?.id == route.params.id" to="/addPainting">
        <AddCard title="Добавить работу" card="work"
      /></RouterLink>
      <div v-for="item in dataArtCards" :key="item.id" class="paint-card">
        <PaintsCard
          :id="item.id"
          :photo="item.image"
          :user-id="item.userId"
          :photo-name="item.name"
          :user-photo="item.user?.profile_photo"
          :username="item.user?.firstname"
          :get-arts="getArts"
          styleCard="profile"
          class=""
        />
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
}

.paint-card {
  width: 100%;
}

/* .description-text {
  font-size: clamp(6px, 2vw + 1px, 18px);
} */
</style>
