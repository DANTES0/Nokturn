<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import BetNotification from './modalNotificationComponents/betNotification.vue'
import MessageNotification from './modalNotificationComponents/MessageNotification.vue'

const userStore = useUserStore()
const user = userStore.user

const link = computed(() => {
  return `/profile/${user?.id}`
})

// defineProps({
//   onClose: {
//     type: Function,
//     required: true,
//   },
//   onLogout: {
//     type: Function,
//     required: true,
//   },
// })
</script>

<template>
  <div
    class="absolute w-[300px] h-[140px] max-h-[140px] flex items-center bg-white right-[216px] top-[54px] shadow-container z-20 rounded-lg cursor-default overflow-y-auto"
  >
    <ul class="text-[14px] flex flex-col pl-[10px] pr-[20px] py-[10px] gap-1 h-full w-full">
      <MessageNotification />
      <MessageNotification />
      <MessageNotification />

      <BetNotification />
      <BetNotification />
      <BetNotification />
      <BetNotification />
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
