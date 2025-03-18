<script setup lang="ts">
import { config } from '@/scripts/config'
import type { MessageType } from '@/types/MessagesType'
import IconCheck from '../icons/IconCheck.vue'
import AvatarCanvas from '../AvatarCanvas.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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
  isRead: false,
})

const pushRout = computed(() => {
  return `/profile/${props.sender?.id}`
})

function getTimeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now.getTime() - past.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 60) {
    return `${diffMinutes} мин. назад`
  } else if (diffHours < 24) {
    return `${diffHours} ч. назад`
  } else if (diffDays === 1) {
    return `Вчера`
  } else if (diffDays < 7) {
    return `${diffDays} д. назад`
  } else {
    return past.toLocaleDateString('ru-RU')
  }
}

function formatDateTimeIntl(dateString: string) {
  const dateObj = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(dateObj)
  const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { formattedDate: formattedDate.replace(/\./g, '.'), formattedTime }
}

const isReadLocal = ref(props.isRead)

watch(
  () => props.isRead,
  (newValue) => {
    isReadLocal.value = newValue
  },
)
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
        <RouterLink :to="pushRout">
          <div class="font-medium text-[1vw] cursor-pointer hover:text-[#666666]">
            {{ props.sender?.firstname }} {{ props.sender?.lastname }}
          </div>
        </RouterLink>
        <div class="flex items-center">
          <div v-if="user?.id == props.sender?.id" class="flex relative">
            <IconCheck class=""></IconCheck>
            <IconCheck v-if="isReadLocal" class="absolute left-[-6px]"></IconCheck>
          </div>

          <div class="font-extralight text-[12px]">
            {{ getTimeAgo(createdAt) }}
          </div>
        </div>
      </div>
      <div class="w-full text-[14px] pr-[40px]">
        {{ props.text }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
