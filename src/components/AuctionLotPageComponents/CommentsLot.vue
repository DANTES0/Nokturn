<script setup lang="ts">
import { config } from '@/scripts/config'
import MainComments from './CommentsLotComponents/MainComments.vue'
import { computed, onMounted, ref } from 'vue'
import type { CommentType } from '@/types/CommentType'
import { useUserStore } from '@/stores/userStore'
import IconReply from '../icons/IconReply.vue'
interface Props {
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
})
const textCommentModel = ref('')
const userStore = useUserStore()
const user = computed(() => userStore.user)
const replyingTo = ref<{ parentId: number | null; firstname: string; lastname: string }>({
  parentId: null,
  firstname: '',
  lastname: '',
})

const allComments = ref<CommentType[]>([])
async function getComments() {
  try {
    const response = await fetch(`${config.url}/api/comment/${props.id}`, {
      method: 'GET',
    })

    allComments.value = await response.json()
    console.log(allComments.value)
  } catch (error) {
    throw console.error(error)
  }
}

async function addComments() {
  console.log(user.value?.id, props.id, textCommentModel.value)
  const sendObject = {
    userId: user.value?.id,
    lotId: props.id,
    commentsText: textCommentModel.value,
    parentId: replyingTo.value.parentId,
  }
  try {
    const response = await fetch(`${config.url}/api/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendObject),
    })
    if (response.ok) {
      console.log('Запрос на добавление комментария успешно отправился')
      textCommentModel.value = ''
      replyingTo.value = { parentId: null, firstname: '', lastname: '' }
      await getComments()
    } else {
      throw console.error('Ошибка при отпраке комментария')
    }
  } catch (error) {
    throw console.error(error)
  }
}
function handleReply(data: { parentId: number; firstname: string; lastname: string }) {
  replyingTo.value = data
}
function cancelReply() {
  replyingTo.value = { parentId: null, firstname: '', lastname: '' }
}
onMounted(getComments)
</script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[450px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center justify-between"
  >
    <div v-if="allComments.length" class="w-[95%] overflow-x-hidden overflow-y-auto scrollingbox">
      <MainComments
        v-for="item in allComments"
        :key="item.id"
        :id="item.id"
        :user-id="item.userId"
        :lot-id="item.lotId"
        :comments-text="item.commentsText"
        :parent-id="item.parentId"
        :time-date-created="item.timeDateCreated"
        :is-deleted="item.isDeleted"
        :user="item.user"
        :replies="item.replies"
        @reply="handleReply"
      />
    </div>
    <div class="mt-auto mb-auto" v-else>Комментариев нет</div>
    <div
      v-if="replyingTo.parentId"
      class="flex items-center justify-center text-[14px] text-gray-500 mb-2 mr-auto ml-[80px] shadow-container rounded-2xl px-[10px] py-1 absolute bottom-[50px] left-[16px] bg-white"
    >
      <IconReply />
      <span>Ответ на комментарий от: {{ replyingTo.firstname }} {{ replyingTo.lastname }}</span>
      <button @click="cancelReply" class="ml-2 text-gray-600 hover:text-black">✖</button>
    </div>
    <div
      class="flex w-[100%] px-[40px] py-[10px] rounded-2xl items-end justify-between border-t shadow-card"
    >
      <img class="w-14 h-14 rounded-full object-cover" :src="config.url + user?.profile_photo" />
      <input
        class="w-[70%] border-b border-black h-[30px] text-[14px] pl-2 outline-none mr-[20px] ml-[20px]"
        type="text"
        placeholder="Написать сообщение"
        v-model="textCommentModel"
      />
      <button
        @click="addComments"
        class="border border-black rounded-tl-lg rounded-br-lg w-[140px] h-[40px] shadow-cardImage"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
