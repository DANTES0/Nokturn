<script setup lang="ts">
import ChatMessenger from '@/components/ChatPageComponents/ChatMessenger.vue'
import ChatUserCard from '@/components/ChatPageComponents/ChatUserCard.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import { config } from '@/scripts/config'
import { getSocket } from '@/scripts/socket'
import { useFileInput } from '@/scripts/useFileInput'
import { useUserStore } from '@/stores/userStore'
import type { ChatType } from '@/types/ChatTypes'
import type { MessageType } from '@/types/MessagesType'
import MyButton from '@/UX/MyButton.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
const userStore = useUserStore()
const user = computed(() => userStore.user)

const additionalImages = useFileInput(true)
function removeImage(index: number) {
  console.log(additionalImages.selectedFilesArray, additionalImages.selectedImagesArray)
  additionalImages.selectedImagesArray.value.splice(index, 1)
  additionalImages.selectedFilesArray.value.splice(index, 1)
  console.log(additionalImages.selectedFilesArray, additionalImages.selectedImagesArray)
}
const chatsArray = ref<ChatType[]>([])
const messagesArray = ref<MessageType[]>([])
const selectedChatId = ref<string | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)
const modelText = ref('')
const socket = getSocket()
async function getChats() {
  if (!user.value?.id) return
  try {
    const response = await fetch(`${config.url}/api/chat/chats/${user.value?.id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.log('Не удалось получить чаты')
    } else {
      const chats = await response.json()

      chatsArray.value = chats.map((chat: ChatType) => {
        const unreadCount = chat.messages.filter(
          (msg: MessageType) => !msg.isRead && msg.senderId !== user.value?.id,
        ).length
        return { ...chat, unreadCount }
      })

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
    scrollToBottom()
  } catch (error) {
    throw console.error(error)
  }
}

async function sendMessage() {
  if (!modelText.value && additionalImages.selectedFilesArray.value.length === 0) {
    return
  }
  if (!selectedChatId.value) {
    return
  }

  let imageUrls: string[] = []
  let messageId: string | null = null
  if (additionalImages.selectedFilesArray.value.length > 0) {
    const formData = new FormData()
    additionalImages.selectedFilesArray.value.forEach((file) => {
      formData.append('images', file)
    })
    formData.append('chatId', selectedChatId.value)
    formData.append('senderId', user.value?.id)

    try {
      const response = await fetch(`${config.url}/api/chat/createMessage`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        console.log('Ошибка загрузки изображений')
        return
      }

      const uploadedImages = await response.json()
      imageUrls = uploadedImages.urls
      messageId = uploadedImages.id
      console.log(messageId)
    } catch (error) {
      console.error('Ошибка при отправке изображений:', error)
      return
    }
  }

  const messageObject = {
    chatId: selectedChatId.value,
    senderId: user.value?.id,
    text: modelText.value,
    images: imageUrls,
    messageId: messageId,
  }

  socket.emit('sendMessage', messageObject)

  modelText.value = ''
  additionalImages.selectedImagesArray.value = []
  additionalImages.selectedFilesArray.value = []
}

function handleChatSelect(chatId: string) {
  selectedChatId.value = chatId
  socket.emit('joinChat', chatId)
  console.log('Выбран чат:', chatId)
  socket.emit('markAsRead', { chatId, userId: user.value?.id })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  socket.on('messagesRead', ({ chatId }) => {
    console.log(`🔹 Сообщения в чате ${chatId} отмечены как прочитанные`)
    getMessages()
    getChats()
  })

  socket.on('updateUnreadCount', ({ chatId, count }) => {
    const chat = chatsArray.value.find((c) => c.id === chatId)
    if (chat) {
      chat.unreadCount = count
    }
  })

  socket.on('newMessage', (newMessage) => {
    console.log('Получено новое сообщение через WebSocket:', newMessage)

    const chat = chatsArray.value.find((c) => c.id === newMessage.chatId)

    if (!chat) {
      getChats()
      return
    }

    chat.messages.push(newMessage)

    if (newMessage.senderId !== user.value?.id) {
      chat.unreadCount++
    }

    if (newMessage.chatId === selectedChatId.value) {
      messagesArray.value.push(newMessage)
      console.log('Обновилось')
      socket.emit('markAsRead', { chatId: newMessage.chatId, userId: user.value?.id })
      chat.unreadCount = 0
      scrollToBottom()
    }
  })

  socket.on('newMessageNotification', (message) => {
    console.log('Новое сообщение!', message)

    getChats()
  })
  getChats()
})

watch(
  user,
  (newUser) => {
    if (newUser?.id) {
      socket.emit('joinUserRoom', user.value?.id)
      getChats()
    }
  },
  { immediate: true },
)
watch(selectedChatId, (newChatId, oldChatId) => {
  if (oldChatId) {
    socket.emit('leaveChat', oldChatId)
  }
  if (newChatId) {
    socket.emit('joinChat', newChatId)
    getMessages()
  }
})
watch(messagesArray, () => {
  // getMessages()
  scrollToBottom()
})
</script>

<template>
  <div class="w-[90%] h-full flex gap-[30px] mt-[30px]">
    <div
      class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg pb-[20px] flex flex-col gap-4 overflow-y-scroll"
    >
      <ChatUserCard
        v-for="item in chatsArray"
        :key="item.id"
        :id="item.id"
        :profile_photo="item.user2.profile_photo"
        :firstname="item.user2.firstname"
        :lastname="item.user2.lastname"
        :last-date-message="
          item.messages.length ? item.messages[item.messages.length - 1].createdAt : null
        "
        :text-message="item.messages.length ? item.messages[item.messages.length - 1].text : ''"
        :sender-id="item.messages.length ? item.messages[item.messages.length - 1].senderId : null"
        :is-read="item.messages.length ? item.messages[item.messages.length - 1].isRead : false"
        :unread-message="item.unreadCount"
        :selectedChatId="selectedChatId"
        @selectChat="handleChatSelect"
      />
    </div>
    <div class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg">
      <div
        ref="messagesContainer"
        class="flex flex-col gap-6 overflow-y-scroll h-[72vh] w-full p-[20px]"
      >
        <ChatMessenger
          v-for="item in messagesArray"
          :key="item.id"
          :text="item.text"
          :sender="item.sender"
          :created-at="item.createdAt"
          :is-read="item.isRead"
          :image-urls="item.imageUrls"
        />
      </div>
      <div
        v-for="(img, index) in additionalImages.selectedImagesArray.value"
        :key="index"
        class="relative w-[30%] aspect-square"
      >
        <img :src="img" class="rounded-lg w-full h-full object-cover" />
        <button
          @click="removeImage(index)"
          class="absolute top-[-8px] right-[-8px] bg-white text-black text-[20px] hover:text-white shadow-container w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600"
        >
          ×
        </button>
      </div>
      <div class="w-full h-[15vh] p-[20px] flex justify-between items-center">
        <div class="w-[70%] relative">
          <input
            v-model="modelText"
            class="w-full border-b border-black h-[40px] pl-[10px] outline-none pr-[40px] text-[1vw]"
            placeholder="Написать сообщение"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            @change="additionalImages.handleFileChange"
            ref="additionalFileImagesModel"
            class="hidden"
          />
          <IconPaperClip
            @click="() => $refs.additionalFileImagesModel.click()"
            class="absolute right-0 top-[6px] cursor-pointer hover:text-[#444444]"
          />
        </div>
        <MyButton @click="sendMessage" title="Отправить" class="text-[0.8vw]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
