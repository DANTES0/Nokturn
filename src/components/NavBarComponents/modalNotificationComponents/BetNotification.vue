<script setup lang="ts">
function getTimeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now.getTime() - past.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 60) {
    return `${diffMinutes} мин. назад`
  } else if (diffHours < 24) {
    return `${diffHours} ч. назад`
  } else if (diffDays === 1) {
    return `Вчера`
  } else if (diffDays < 7) {
    return `${diffDays} д. назад`
  } else {
    return past.toLocaleDateString('ru-RU')
  }
}

defineProps({
  lotId: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <li class="flex items-center gap-3 hover:bg-[#ededed] dark:hover:bg-[#3C3C3C]">
    <div
      class="w-[10px] h-[10px] border-black rounded-full bg-red-700 border"
      :class="{ 'bg-white dark:bg-[#CCCCCC]': isRead }"
    ></div>
    <div class="flex flex-col">
      <div class="text-[12px] font-extralight">{{ getTimeAgo(timeStamp) }}</div>
      <div class="flex">
        <div class="underline hover:text-[#444444] dark:hover:text-[#ffffff] cursor-pointer">
          Лот №{{ lotId }}
        </div>
        <div class="">- Вашу ставку перебили</div>
      </div>
    </div>
  </li>
  <hr class="dark:bg-[#3C3C3C] dark:border-none h-[1px]" />
</template>

<style scoped></style>
