<script setup lang="ts">
import { config } from '@/scripts/config'
import getUserById from '@/scripts/getUser'
import { onMounted, ref } from 'vue'
import type { HistoryLotBet } from '@/types/HistoryLotBetType'

interface Props {
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
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

const dataHistory = ref<HistoryLotBet[]>([])
async function getHistory() {
  const response = await fetch(`${config.url}/api/lot/history/${props.id}`, {
    method: 'GET',
  })
  try {
    if (!response.ok) {
      throw console.error('Не удалось запросить историю ставок')
    }

    dataHistory.value = await response.json()

    const updatedHistory = await Promise.all(
      dataHistory.value.map(async (bet) => {
        const user = await getUserById(bet.userId)
        console.log(user)

        return { ...bet, userName: user.firstname, date: formatDateTimeIntl(bet.time_date) } // Добавляем userName
      }),
    )

    dataHistory.value = updatedHistory
  } catch (error) {
    console.error(error)
  }
}

onMounted(getHistory)
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
