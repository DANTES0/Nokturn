<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'

//18.01.2025 ничего не делал

import test1 from '../assets/images/test1.jpg'
import test2 from '../assets/images/test2.jpg'
import test3 from '../assets/images/test3.png'
import test4 from '../assets/images/test4.jpg'
import test5 from '../assets/images/test5.jpg'
import test6 from '../assets/images/test6.jpg'
import PaintsCard from '@/components/PaintsCard.vue'

const tempArrayImages = [test1, test2, test3, test4, test5, test6]

const randomImage = () => {
  const randomIndex = Math.floor(Math.random() * tempArrayImages.length)
  return tempArrayImages[randomIndex]
}
//КОНЕЦ ВРЕМЕННО ДО СЕРВЕРА
</script>
<template>
  <div class="w-[90%] mt-[30px]">
    <div class="relative mr-auto">
      <input
        class="border border-black w-[400px] h-[30px] rounded-bl-lg rounded-tr-lg pl-4 pr-[40px]"
        type="text"
        placeholder="Поиск"
      />
      <IconSearch class="absolute left-[360px] top-[4px]" />
    </div>
  </div>
  <div class="gallery !mt-[20px]">
    <PaintsCard v-for="i in 20" :key="i" :photo="randomImage()" />
  </div>
</template>
<style scoped>
.gallery {
  width: min(100%, 90%);
  margin: 0 auto;
  columns: 5 200px;
  column-gap: 1em;
}
</style>
