<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted } from 'vue'
import BetNotification from './modalNotificationComponents/BetNotification.vue'
import MessageNotification from './modalNotificationComponents/MessageNotification.vue'

const userStore = useUserStore()
const user = userStore.user

const link = computed(() => {
  return `/profile/${user?.id}`
})

const props = defineProps({
  betInfo: {
    type: Array,
    required: false,
  },
})

onMounted(() => {
  console.log('Пропсы', props.betInfo)
})
</script>

<template>
  <div
    class="absolute w-[300px] h-[140px] max-h-[140px] flex items-center bg-white dark:bg-[#232323] dark:text-[#CCCCCC] right-[216px] top-[54px] shadow-container dark:shadow-none dark:border dark:border-[#CCCCCC] z-20 rounded-lg cursor-default overflow-y-auto"
  >
    <ul class="text-[14px] flex flex-col pl-[10px] pr-[20px] py-[10px] gap-1 h-full w-full">
      <!-- <MessageNotification />
      <MessageNotification />
      <MessageNotification /> -->
      <BetNotification
        v-for="(bet, index) in props.betInfo"
        :key="index"
        :lot-id="bet.lotId"
        :time-stamp="bet.createdAt"
        :is-read="bet.isRead"
      />
    </ul>
  </div>
</template>

<style scoped>
/* ul li:hover {
  background-color: #ededed;
  cursor: pointer;
  border-radius: 4px;
} */
</style>
