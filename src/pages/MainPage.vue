<script setup lang="ts">
import MagazinBanner from '@/components/MagazinBanner.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex items-center flex-col w-full max-w-[1728px]">
    <MagazinBanner />

    <div class="mt-[30px] flex w-[90%] justify-between">
      <label class="text-[24px]"> Ближайшие торги </label>

      <RouterLink class="font-light flex items-center justify-center" to="/auctions">
        Посмотреть все торги</RouterLink
      >
    </div>
    <div
      class="w-[90%] h-[400px] bg-white mt-[30px] shadow-container rounded-[32px] relative max-h-[80vh] mb-[100px]"
    ></div>
  </div>
</template>

<style scoped></style>
