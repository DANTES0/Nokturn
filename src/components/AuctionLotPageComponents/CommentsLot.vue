<script setup lang="ts">
import { config } from '@/scripts/config'
import MainComments from './CommentsLotComponents/MainComments.vue'
import { computed, onMounted, ref } from 'vue'
import type { CommentType } from '@/types/CommentType'
import { useUserStore } from '@/stores/userStore'
interface Props {
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
})
const textCommentModel = ref('')
const userStore = useUserStore()
const user = computed(() => userStore.user)
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
    } else {
      throw console.error('Ошибка при отпраке комментария')
    }
  } catch (error) {
    throw console.error(error)
  }
}

onMounted(getComments)
</script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[450px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center justify-between"
  >
    <div class="w-[95%] overflow-x-hidden overflow-y-auto scrollingbox">
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
      />
    </div>
    <div class="flex mb-[10px] w-[95%] items-end justify-between">
      <img class="w-14 h-14 rounded-full" src="../../assets/images/test6.jpg" />
      <input
        class="w-[75%] border-b border-black h-[30px] text-[14px] pl-2 outline-none mr-[20px] ml-[20px]"
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
