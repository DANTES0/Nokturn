<script setup lang="ts">
import AdditionalImages from '@/components/AuctionLotPageComponents/AdditionalImages.vue'
import CommentsLot from '@/components/AuctionLotPageComponents/CommentsLot.vue'
import DescriptionLot from '@/components/AuctionLotPageComponents/DescriptionLot.vue'
import HistoryBet from '@/components/AuctionLotPageComponents/HistoryBet.vue'
import LotBet from '@/components/AuctionLotPageComponents/LotBet.vue'
import LotInformation from '@/components/AuctionLotPageComponents/LotInformation.vue'
</script>
<template>
  <div
    class="w-[90%] bg-white mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px] gap-[30px]"
  >
    <div class="ml-[30px] mt-[30px]">
      <img class="rounded-2xl w-[450px] h-[450px]" src="../assets/images/test5.jpg" />
      <div class="text-[20px] mt-[20px] font-light">Дополнительные изображения</div>
      <AdditionalImages />
      <div class="text-[20px] mt-[20px] font-light">Описание</div>
      <DescriptionLot />
    </div>
    <div class="flex flex-col h-full w-full">
      <div class="flex justify-between h-[350px] w-full mt-[30px]">
        <LotInformation />
        <LotBet />
      </div>
      <div class="text-[20px] mt-[20px] font-light mb-[20px]">История ставок</div>
      <HistoryBet />
      <div class="text-[20px] mt-[20px] font-light mb-[20px]">Комментарии</div>
      <CommentsLot />
    </div>
  </div>
</template>
<style scoped>
.scrollingbox {
  scrollbar-color: rgb(0, 0, 0) transparent;
  scrollbar-width: thin;
}
</style>
