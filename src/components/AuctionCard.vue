<script setup lang="ts">
import { RouterLink } from 'vue-router'
import testImage from '@/assets/images/test1.jpg'
import { config } from '@/scripts/config'
import { computed } from 'vue'

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
  beginDate: string
  lotStatus?: string
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
})
const path = computed(() => `/lot/${props.id}`)
</script>

<template>
  <RouterLink class="w-[260px] h-[340px]" :to="path">
    <div class="bg-white shadow-card w-[260px] h-[340px] rounded-lg hover:scale-105 cursor-pointer">
      <div class="flex flex-col justify-center items-center">
        <div
          class="w-[200px] h-[200px] bg-white shadow-cardImage mt-[10px] flex items-center justify-center"
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
          <div class="flex">
            <span
              v-if="props.lotStatus == 'active' || props.lotStatus == 'completed'"
              class="font-extralight text-[14px]"
              >Текущая цена:</span
            >
            <span v-if="props.lotStatus == 'inactive'" class="font-extralight text-[14px]"
              >Начальная цена:</span
            >
            <span class="ml-4">{{ props.startingBet }}₽</span>
          </div>
          <div class="flex text-[14px]">
            <span class="font-extralight">Начало торгов:</span>
            <span class="font-light ml-4">{{ props.beginDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
