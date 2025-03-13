<script setup lang="ts">
import ChatMessenger from '@/components/ChatPageComponents/ChatMessenger.vue'
import ChatUserCard from '@/components/ChatPageComponents/ChatUserCard.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import { config } from '@/scripts/config'
import { useUserStore } from '@/stores/userStore'
import type { ChatType } from '@/types/ChatTypes'
import type { MessageType } from '@/types/MessagesType'
import MyButton from '@/UX/MyButton.vue'
import { computed, onMounted, ref, watch } from 'vue'
const userStore = useUserStore()
const user = computed(() => userStore.user)

const chatsArray = ref<ChatType[]>([])
const messagesArray = ref<MessageType[]>([])
const selectedChatId = ref<string | null>(null)
async function getChats() {
  if (!user.value?.id) return
  try {
    const response = await fetch(`${config.url}/api/chat/chats/${user.value?.id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.log('Не удалось получить чаты')
    } else {
      chatsArray.value = await response.json()
      console.log(chatsArray.value)
    }
  } catch (error) {
    throw console.error(error)
  }
}

async function getMessages() {
  try {
    const response = await fetch(`${config.url}/api/chat/messages/${selectedChatId.value}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.log('Ошибка получения сообщений о чате')
      return
    }
    messagesArray.value = await response.json()
  } catch (error) {
    throw console.error(error)
  }
}

function handleChatSelect(chatId: string) {
  selectedChatId.value = chatId
  console.log('Выбран чат:', chatId)
}

onMounted(() => {
  // getChats()
})

watch(
  user,
  (newUser) => {
    if (newUser?.id) getChats()
  },
  { immediate: true },
)
watch(
  selectedChatId,
  (newChatId) => {
    if (newChatId) getMessages()
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-[90%] h-full flex gap-[30px] mt-[30px]">
    <div
      class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg p-[20px] flex flex-col gap-7 overflow-y-scroll"
    >
      <ChatUserCard
        v-for="item in chatsArray"
        :key="item.id"
        :id="item.id"
        :profile_photo="item.user2.profile_photo"
        :firstname="item.user2.firstname"
        :lastname="item.user2.lastname"
        :last-date-message="item.messages.at(-1).createdAt"
        :text-message="item.messages.at(-1).text"
        @selectChat="handleChatSelect"
      />
    </div>
    <div class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg">
      <div class="flex flex-col gap-6 overflow-y-scroll h-[72vh] w-full p-[20px]">
        <ChatMessenger
          v-for="item in messagesArray"
          :key="item.id"
          :text="item.text"
          :sender="item.sender"
          :created-at="item.createdAt"
        />
      </div>
      <div class="w-full h-[15vh] p-[20px] flex justify-between items-center">
        <div class="w-[70%] relative">
          <input
            class="w-full border-b border-black h-[40px] pl-[10px] outline-none pr-[40px] text-[1vw]"
            placeholder="Написать сообщение"
          />
          <IconPaperClip class="absolute right-0 top-[6px] cursor-pointer hover:text-[#444444]" />
        </div>
        <MyButton title="Отправить" class="text-[0.8vw]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
