<script setup lang="ts">
import { config } from '@/scripts/config'
import AvatarCanvas from '../AvatarCanvas.vue'

interface Props {
  id: string
  userId?: string
  profile_photo: string
  firstname: string
  lastname: string
  lastDateMessage?: string
  textMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '0',
  userId: '0',
  profile_photo: '',
  firstname: 'Олег',
  lastname: '',
  lastDateMessage: '124',
  textMessage: 'ТЕкст ткс',
})

function formatDateTimeIntl(dateString: string) {
  const dateObj = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(dateObj)
  const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { formattedDate: formattedDate.replace(/\./g, '.'), formattedTime }
}

const emit = defineEmits<{
  (event: 'selectChat', chatId: string): void
}>()
</script>

<template>
  <div
    @click="emit('selectChat', props.id)"
    class="flex relative w-full hover:bg-[#EEEEEE] p-[6px] rounded-2xl cursor-pointer"
  >
    <div
      class="absolute w-[30px] h-[20px] bg-[#4C4C4C] flex items-center justify-center text-white rounded-xl text-[12px] bottom-[8px] right-[6px]"
    >
      22
    </div>
    <div class="">
      <img
        v-if="props.profile_photo"
        :src="config.url + props.profile_photo"
        class="rounded-full shadow-cardImage w-[70px] aspect-square"
      />
      <AvatarCanvas v-if="!props.profile_photo" :size="70" :name="props.firstname" />
    </div>
    <div class="flex flex-col flex-1 justify-around ml-4">
      <div class="flex w-full justify-between items-center">
        <div class="font-medium text-[1.2vw]">{{ props.firstname }} {{ props.lastname }}</div>
        <div class="font-extralight text-[0.8vw]">
          {{ formatDateTimeIntl(props.lastDateMessage).formattedTime }}
        </div>
      </div>
      <div class="w-full text-[1vw] pr-[40px] line-clamp-1">
        {{ textMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
