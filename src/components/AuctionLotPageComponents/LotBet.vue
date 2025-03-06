<script setup lang="ts">
import { config } from '@/scripts/config'
import { getSocket } from '@/scripts/socket'
// import socket from '@/scripts/socket'
import { useUserStore } from '@/stores/userStore'
import MyButton from '@/UX/MyButton.vue'
// import { io } from 'socket.io-client'
// import { io } from 'socket.io-client'
import { computed, onMounted, onUnmounted, ref } from 'vue'
// const socket = io(config.url, { transports: ['websocket'] })
const socket = getSocket()
const modelBet = ref('')
const activePopUpWarning = ref(false)
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
  minBidIncrement: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  startBet: 1000,
  currentBet: 1020,
  beginDate: '10:30 29.11.2024',
  endDate: '10:30 31.11.2024',
  minBidIncrement: 0,
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

async function placeBet() {
  console.log(props.minBidIncrement + Number(props.currentBet))
  if (Number(modelBet.value) < props.minBidIncrement + Number(props.currentBet)) {
    activePopUpWarning.value = true
    setTimeout(() => {
      activePopUpWarning.value = false
    }, 3000)
    return
  }
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
    modelBet.value = ''
  }
}

const remainingTime = ref('')
function updateRemainingTime() {
  const endTime = new Date(props.endDate).getTime()
  const now = new Date().getTime()
  const diff = endTime - now

  if (diff <= 0) {
    remainingTime.value = 'Аукцион завершен'
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  remainingTime.value = `${days} дн ${hours} ч ${minutes} м`
}

let timer: number

onMounted(() => {
  updateRemainingTime()
  timer = setInterval(updateRemainingTime, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div
    class="w-[400px] h-full bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px]"
  >
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Начальная ставка:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ props.startBet }}₽</label>
    </div>
    <div class="mt-[10px] ml-[20px]">
      <label class="font-[InterItalic]">Текущая ставка:</label>
      <label class="ml-[30px] font-medium">{{ props.currentBet }}₽</label>
    </div>
    <div class="mt-[10px] ml-[20px]">
      <label class="font-[InterItalic] text-[16px]">Шаг торгов:</label>
      <label class="ml-[30px] font-medium text-[16px]">{{ props.minBidIncrement }}₽</label>
    </div>
    <div class="mt-[10px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата начала:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ formatDate(props.beginDate) }}</label>
      <!-- <label class="ml-[30px] font-[InterItalic]">29.11.2024</label> -->
    </div>
    <div class="mt-[10px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата конца:</label>
      <label class="ml-[30px] font-[InterItalic]">{{ formatDate(props.endDate) }}</label>
      <!-- <label class="ml-[30px] font-[InterItalic]">29.11.2024</label> -->
    </div>
    <div class="mt-[10px] ml-[20px]">
      <label class="font-[InterItalic]">Осталось до конца:</label>
      <label class="ml-[30px] text-[16px]">{{ remainingTime }}</label>
    </div>
    <div class="mt-[20px] ml-[20px] flex">
      <label class="font-[InterItalic]">Предложить ставку</label>
      <div class="relative">
        <input
          v-model="modelBet"
          class="ml-[30px] w-[80px] h-full border border-black rounded-bl-xl rounded-tr-xl text-center text-[14px]"
          :placeholder="(Number(props.currentBet) + props.minBidIncrement).toString()"
          type="text"
        />
        <Transition name="popUpWarning">
          <div
            v-if="activePopUpWarning"
            class="absolute w-[300px] h-[40px] bg-white shadow-container top-[-50px] left-[-160px] text-[16px] text-red-700 flex items-center justify-around rounded-2xl"
          >
            <div>Минимальная ставка: {{ Number(props.currentBet) + props.minBidIncrement }}</div>
            <button
              @click="
                () => {
                  activePopUpWarning = false
                }
              "
              class="ml-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div class="flex items-center justify-center mt-[20px]">
      <MyButton @click="placeBet" title="Подтвердить ставку" class="w-[90%]" />
    </div>
  </div>
</template>

<style scoped>
.popUpWarning-enter-active,
.popUpWarning-leave-active {
  transition: opacity 0.2s ease-out;
}

.popUpWarning-enter-from {
  opacity: 0;
}

.popUpWarning-leave-to {
  opacity: 0;
}
</style>
