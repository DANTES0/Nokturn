<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconStarOutline from '@/components/icons/IconStarOutline.vue'
import IconTg from '@/components/icons/IconTg.vue'
import IconVk from '@/components/icons/IconVk.vue'
import PaintsCard from '@/components/PaintsCard.vue'
import AddCard from '@/components/ProfilePageComponents/AddCard.vue'
</script>

<template>
  <div class="w-full h-[34vh] relative -z-10">
    <img class="h-full w-full object-cover" src="../assets/images/test1.jpg" />
    <img
      class="absolute w-48 h-48 rounded-full bottom-[-90px] left-[96px] shadow-cardImage"
      src="../assets/images/test3.png"
    />
  </div>

  <div class="w-[90%] flex gap-8">
    <div
      class="bg-white w-[25%] max-w-[350px] h-[180px] shadow-container rounded-2xl mt-8 ml-[330px] relative"
    >
      <div class="w-6 h-6 bg-white shadow-container rounded-full left-[-36px] absolute"></div>
      <div
        class="w-4 h-4 bg-white shadow-container rounded-full left-[-64px] top-[-8px] absolute"
      ></div>
      <IconChat class="absolute top-2 right-[10px]" />
      <div class="w-full h-full flex flex-col p-[20px] justify-between">
        <div class="text-[24px]">Имя Фамилия</div>
        <div class="text-[18px] font-light">Художник</div>
        <div class="font-extralight">Дата регистрации: 01.01.2024</div>
        <div class="flex justify-between">
          <div class="flex gap-2">
            <IconTg />
            <IconVk />
          </div>
          <div class="flex">
            <IconStarOutline />
            <span>4.5/5</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white w-full flex-1 h-[180px] shadow-container rounded-2xl mt-8 relative p-[20px] text-justify description-text"
    >
      Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
      Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение
      шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при
      простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
    </div>
  </div>
  <div class="w-[90%]">
    <div class="text-[20px] mt-[20px]">Выставленные лоты</div>
    <div class="mt-[20px] auc-card">
      <AddCard title="Добавить лот" />
      <AuctionCard class="" v-for="i in 8" :key="i" />
    </div>
    <div class="text-[20px] mt-[20px]">Работы для демонстрации</div>
    <div class="gap-3 work mt-[20px]">
      <RouterLink to="/addPainting"> <AddCard title="Добавить работу" card="work" /></RouterLink>
      <div v-for="i in 8" :key="i" class="paint-card">
        <PaintsCard styleCard="profile" class="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.work {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2em;
}
.auc-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  row-gap: 2em;
  column-gap: 2em;
  justify-items: center;
}

.paint-card {
  width: 100%;
}

.description-text {
  font-size: clamp(6px, 1vw + 1px, 18px);
}
</style>
