<script setup lang="ts">
import { config } from '@/scripts/config'
import { useUserStore } from '@/stores/userStore'
import MyButton from '@/UX/MyButton.vue'
import { io } from 'socket.io-client'
// import { io } from 'socket.io-client'
import { computed, ref } from 'vue'
const socket = io(config.url, { transports: ['websocket'] })

const modelBet = ref('')
function formatDate(isoString: string): string {
  const date = new Date(isoString)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${hours}:${minutes} ${day}.${month}.${year}`
}

interface Props {
  id?: number
  startBet: number
  currentBet: number
  beginDate: string
  endDate: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  startBet: 1000,
  currentBet: 1020,
  beginDate: '10:30 29.11.2024',
  endDate: '10:30 31.11.2024',
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

async function placeBet() {
  const response = await fetch(`${config.url}/api/lot/placeBet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.value?.id,
      lotId: props.id,
      bet: modelBet.value,
    }),
  })

  if (!response.ok) {
    console.error('Ошибка ставки')
  } else {
    console.log(response.json())
    socket.emit('placeBet', {
      lotId: props.id,
      userId: user.value?.id,
      bet: modelBet.value,
    })
  }
}
</script>

<template>
  <div
    class="w-[400px] h-full bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px]"
  >
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Начальная ставка:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ props.startBet }}₽</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Текущая ставка:</label>
      <label class="ml-[30px] font-medium">{{ props.currentBet }}₽</label>
    </div>
    <div class="mt-[20px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата начала:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ formatDate(props.beginDate) }}</label>
      <!-- <label class="ml-[30px] font-[InterItalic]">29.11.2024</label> -->
    </div>
    <div class="mt-[20px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата конца:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ formatDate(props.endDate) }}</label>
      <!-- <label class="ml-[30px] font-[InterItalic]">29.11.2024</label> -->
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Осталось до конца:</label>
      <label class="ml-[30px] text-[16px]">07 дн 00 ч 00 м</label>
    </div>
    <div class="mt-[20px] ml-[20px] flex">
      <label class="font-[InterItalic]">Предложить ставку</label>
      <input
        v-model="modelBet"
        class="ml-[30px] w-[80px] border border-black rounded-bl-xl rounded-tr-xl text-center text-[14px]"
        placeholder="8000"
        type="text"
      />
    </div>
    <div class="flex items-center justify-center mt-[20px]">
      <MyButton @click="placeBet" title="Подтвердить ставку" class="w-[90%]" />
    </div>
  </div>
</template>

<style scoped></style>
