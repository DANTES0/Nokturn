<script setup lang="ts">
import ArtistCard from '@/components/ArtistPageComponents/ArtistCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
</script>
<template>
  <div class="w-[90%] mt-[30px]">
    <div class="relative mr-auto w-full max-w-[400px]">
      <input
        class="border border-black w-full h-[30px] rounded-bl-lg rounded-tr-lg pl-4 pr-[40px] max-w-[400px]"
        type="text"
        placeholder="Поиск"
      />
      <IconSearch class="absolute right-[8px] top-[4px]" />
    </div>
  </div>
  <div
    class="w-[90%] bg-white mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px] gap-[30px] flex-col px-[30px] py-[30px] text-center items-center"
  >
    <ArtistCard v-for="i in 4" :key="i" />
  </div>
</template>
<style scoped></style>
