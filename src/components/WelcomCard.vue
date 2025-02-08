<script setup lang="ts">
import { useScreenWidth } from '@/scripts/ScriptWindowSize'

const isMobile = useScreenWidth(640)
</script>

<template>
  <div
    v-if="!isMobile"
    class="bg-[rgba(0,0,0,0.8)] h-[60vh] mobile:w-[30vw] text-white flex flex-col gap-4 p-[2vw]"
  >
    <div
      class="font-[InterItalic] font-bold laptop:text-[20px] mobile:text-[16px] text-[14px] leading-tight"
    >
      Каждая картина — это ноктюрн на холсте, создающий свою мелодию эмоций
    </div>
    <div class="laptop:text-[16px] mobile:text-[12px] text-[12px]">
      Откройте мир искусства с нашим онлайн-аукционом картин! Уникальные произведения от талантливых
      художников ждут своего ценителя. Участвуйте в торгах, находите шедевры, которые вдохновляют, и
      добавляйте их в свою коллекцию. Искусство ближе, чем вы думаете – начните свой путь к
      уникальным покупкам уже сегодня!
    </div>
  </div>
</template>

<style scoped></style>
