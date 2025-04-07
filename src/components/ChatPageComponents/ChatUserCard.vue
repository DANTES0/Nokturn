<script setup lang="ts">
import { config } from '@/scripts/config'
import AvatarCanvas from '../AvatarCanvas.vue'
import IconCheck from '../icons/IconCheck.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted, ref } from 'vue'
import getUserById from '@/scripts/getUser'
import type { UserType } from '@/types/UserType'
const userStore = useUserStore()
const user = computed(() => userStore.user)

const isSelected = computed(() => props.selectedChatId === props.id)

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

interface Props {
  id: string
  selectedChatId: string | null
  userId?: string
  profile_photo: string
  firstname: string
  lastname: string
  lastDateMessage?: string
  textMessage?: string
  unreadMessage?: number
  senderId?: string
  isRead?: boolean
  user1?: object
  user2?: object
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
const imgRef = ref<UserType>()
async function isUser() {
  if (user.value?.id == props.user1.id) {
    imgRef.value = await getUserById(props.user2.id)
  } else {
    imgRef.value = await getUserById(props.user1.id)
  }
}
onMounted(async () => {
  console.log(await getUserById(props.senderId))
  isUser()
})
</script>

<template>
  <div
    @click="emit('selectChat', props.id)"
    class="flex relative w-full hover:bg-[#EEEEEE] dark:hover:bg-[#3C3C3C] p-[6px] py-[8px] px-3 cursor-pointer"
    :class="{ 'selected-chat': isSelected }"
  >
    <div
      v-if="props.unreadMessage"
      class="absolute w-[30px] h-[20px] bg-[#4C4C4C] flex items-center justify-center text-white rounded-xl text-[12px] bottom-[8px] right-[8px]"
    >
      {{ props.unreadMessage }}
    </div>
    <div
      class="absolute bottom-[8px] right-[8px]"
      v-if="!props.unreadMessage && user?.id == props.senderId"
    >
      <IconCheck v-if="isRead" class="absolute left-[-6px]" />
      <IconCheck />
    </div>

    <div class="">
      <img
        v-if="imgRef?.profile_photo"
        :src="config.url + imgRef.profile_photo"
        class="rounded-full shadow-cardImage w-[70px] aspect-square object-cover"
      />
      <AvatarCanvas
        class="shadow-cardImage dark:shadow-none dark:border dark:border-[#383838]"
        v-else
        :size="70"
        :name="props.firstname == user?.firstname ? props.user1.firstname : props.firstname"
      />
    </div>
    <div class="flex flex-col flex-1 justify-around ml-4">
      <div class="flex w-full justify-between items-center">
        <div class="font-medium text-[1.2vw]">
          {{ props.firstname == user?.firstname ? props.user1.firstname : props.firstname }}
          {{ props.lastname == user?.lastname ? props.user1.lastname : props.lastname }}
        </div>
        <div class="font-extralight text-[0.8vw]">
          {{ getTimeAgo(props.lastDateMessage) }}
        </div>
      </div>
      <div class="w-full text-[1vw] pr-[40px] line-clamp-1">
        {{ textMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-chat {
  background: linear-gradient(135deg, #cccccc, #ffffff, #cccccc, #ffffff);
  transition: background 0.5s ease-in-out;
}
html.dark .selected-chat {
  background: linear-gradient(135deg, #383838, #3f3f3f, #383838, #3f3f3f);
  transition: background 0.5s ease-in-out;
}
</style>
