<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import testImage from '@/assets/images/test1.jpg'
import { config } from '@/scripts/config'
import { computed, ref } from 'vue'
import IconEdit from './icons/IconEdit.vue'
const router = useRouter()
const isHoveringEdit = ref(false)
interface Props {
  id: number
  title: string
  image: string
  author: string
  lastname?: string
  tags?: string
  category: string
  size: string
  startingBet: string
  currentBet?: string
  beginDate: string
  lotStatus?: string
  profile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: 'Название картины',
  image: testImage,
  author: 'Имя Фамилия',
  tags: '',
  category: 'Категория',
  size: '4000x2000',
  startingBet: '5000',
  beginDate: '10.02.2024',
  lotStatus: 'inactive',
  currentBet: '6000',
  profile: false,
})
const path = computed(() => `/lot/${props.id}`)
</script>

<template>
  <RouterLink class="w-[260px] h-[340px] dark:text-[#CCCCCC]" :to="path">
    <div
      class="bg-white dark:bg-[#1C1C1C] group shadow-card dark:shadow-none dark:border-[#383838] dark:border w-[260px] h-[340px] rounded-lg cursor-pointer relative"
      :class="{ 'hover:scale-105': !isHoveringEdit }"
    >
      <div class="flex flex-col justify-center items-center">
        <div
          class="w-[200px] h-[200px] bg-white dark:bg-[#232323] shadow-cardImage dark:shadow-containerCard mt-[10px] flex items-center justify-center"
        >
          <img
            class="w-[170px] h-[170px] object-cover rounded-sm pointer-events-none"
            :src="config.url + image"
          />
        </div>
        <div class="flex flex-col mt-2 w-[200px] gap-[2px]">
          <span class="font-semibold font-[InterItalic]">{{ props.title }}</span>
          <span class="font-light font-[InterItalic]">{{ props.author }} {{ props.lastname }}</span>
          <div class="flex text-[10px] gap-2">
            <div class="font-extralight">{{ props.category }}</div>
            <div class="font-extralight">{{ props.size }}</div>
          </div>
          <div v-if="props.lotStatus != 'completed'" class="flex">
            <span
              v-if="props.lotStatus == 'active' || props.lotStatus == 'completed'"
              class="font-extralight text-[14px]"
              >Текущая цена:</span
            >
            <span v-if="props.lotStatus == 'inactive'" class="font-extralight text-[14px]"
              >Начальная цена:</span
            >
            <span class="ml-4"
              >{{ props.lotStatus == 'active' ? props.currentBet : props.startingBet }}₽</span
            >
          </div>
          <div v-if="props.lotStatus != 'completed'" class="flex text-[14px]">
            <span class="font-extralight">Начало торгов:</span>
            <span class="font-light ml-4">{{ props.beginDate }}</span>
          </div>
          <div class="flex flex-col items-center justify-center" v-else>
            <span class="text-[14px]">Аукцион завершен</span>
            <span class="font-medium"
              ><span class="font-light">Конечная цена:</span> {{ props.currentBet }}</span
            >
          </div>
        </div>
      </div>
      <div
        v-if="profile"
        @mouseenter="isHoveringEdit = true"
        @mouseleave="isHoveringEdit = false"
        @click.stop.prevent="
          (event: Event) => {
            event.stopPropagation()
            event.preventDefault()
            router.push(`/editLot/${props.id}`)
          }
        "
        class="w-8 h-8 bg-white shadow-container absolute top-[-12px] right-[-12px] flex items-center justify-center rounded-full hover:bg-[#EEEEEE]"
      >
        <IconEdit />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
