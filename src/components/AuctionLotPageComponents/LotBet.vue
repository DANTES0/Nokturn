<script setup lang="ts">
function formatDate(isoString: string): string {
  const date = new Date(isoString)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Месяцы в JS начинаются с 0
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
        class="ml-[30px] w-[80px] border border-black rounded-bl-xl rounded-tr-xl text-center text-[14px]"
        placeholder="8000"
        type="text"
      />
    </div>
    <div class="flex items-center justify-center mt-[20px]">
      <button
        class="w-[90%] border border-black rounded-tl-lg rounded-br-lg pt-[4px] pb-[4px] shadow-cardImage"
      >
        Подтвердить ставку
      </button>
    </div>
  </div>
</template>

<style scoped></style>
