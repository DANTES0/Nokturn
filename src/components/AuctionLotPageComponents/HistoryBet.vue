<script setup lang="ts">
import { config } from '@/scripts/config'
import getUserById from '@/scripts/getUser'
import { onMounted, onUnmounted, ref } from 'vue'
import type { HistoryLotBet } from '@/types/HistoryLotBetType'
import { io } from 'socket.io-client'

interface Props {
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
})

const socket = io(config.url, { transports: ['websocket'] })

function formatDateTimeIntl(dateString: string) {
  const dateObj = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(dateObj)
  const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { formattedDate: formattedDate.replace(/\./g, '.'), formattedTime }
}

const dataHistory = ref<HistoryLotBet[]>([])
async function getHistory() {
  const response = await fetch(`${config.url}/api/lot/history/${props.id}`, {
    method: 'GET',
  })
  try {
    if (!response.ok) {
      throw console.error('Не удалось запросить историю ставок')
    }

    dataHistory.value = await formatHistory(await response.json())
  } catch (error) {
    console.error(error)
  }
}

async function formatHistory(history: HistoryLotBet[]) {
  return await Promise.all(
    history.map(async (bet) => {
      const user = await getUserById(bet.userId)
      return { ...bet, userName: user.firstname, date: formatDateTimeIntl(bet.time_date) }
    }),
  )
}

onMounted(() => {
  getHistory()

  socket.on('updateHistory', async (updatedHistory) => {
    console.log('Пришли новые данные', updatedHistory)
    dataHistory.value = await formatHistory(updatedHistory)
  })
})

onUnmounted(() => {
  socket.off('updateHistory')
})
</script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[260px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center overflow-x-hidden overflow-y-auto scrollingbox"
  >
    <table class="w-[90%] border-separate border-spacing-y-3">
      <thead>
        <tr class="text-[12px]">
          <th scope="col">Пользователь</th>
          <th scope="col">Ставка</th>
          <th scope="col">Время</th>
          <th scope="col">Дата</th>
        </tr>
      </thead>
      <tbody class="mt-[10px]">
        <tr v-for="item in dataHistory" :key="item.id" class="text-center shadow-card rounded-lg">
          <td>{{ item.userName }}</td>
          <td>{{ item.bet }}₽</td>
          <td>{{ item.date?.formattedTime }}</td>
          <td>{{ item.date?.formattedDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
