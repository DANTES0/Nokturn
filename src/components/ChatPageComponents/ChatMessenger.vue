<script setup lang="ts">
import { config } from '@/scripts/config'
import type { MessageType } from '@/types/MessagesType'
import IconCheck from '../icons/IconCheck.vue'
import AvatarCanvas from '../AvatarCanvas.vue'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const props = withDefaults(defineProps<MessageType>(), {
  id: '0',
  userId: '0',
  profile_photo: '',
  firstname: 'Олег',
  lastname: '',
  lastDateMessage: '124',
  textMessage: 'ТЕкст ткс',
  createdAt: '',
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
</script>

<template>
  <div class="flex">
    <div class="">
      <img
        v-if="props.sender?.profile_photo"
        :src="config.url + props.sender?.profile_photo"
        class="rounded-full object-cover shadow-cardImage w-[3.8vw] aspect-square"
      />
      <AvatarCanvas
        v-if="!props.sender?.profile_photo"
        :name="props.sender?.firstname ?? ''"
        :size="60"
      />
    </div>
    <div class="flex flex-col flex-1 justify-around ml-4">
      <div class="flex w-full justify-between items-center">
        <div class="font-medium text-[1vw]">
          {{ props.sender?.firstname }} {{ props.sender?.lastname }}
        </div>
        <div class="flex">
          <div v-if="user?.id == props.sender?.id" class="flex relative">
            <IconCheck></IconCheck>
            <IconCheck class="absolute left-[-4.2px]"></IconCheck>
          </div>

          <div class="font-extralight text-[0.7vw]">
            {{ formatDateTimeIntl(props.createdAt).formattedTime }}
          </div>
        </div>
      </div>
      <div class="w-full text-[0.8vw] pr-[40px]">
        {{ props.text }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
