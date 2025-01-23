<script setup lang="ts">
import ChatUserCard from '@/components/ChatPageComponents/ChatUserCard.vue'
</script>

<template>
  <div class="w-[90%] h-full flex gap-[30px] mt-[30px]">
    <div
      class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg p-[20px] flex flex-col gap-7 overflow-y-scroll"
    >
      <ChatUserCard v-for="i in 10" :key="i" />
    </div>
    <div class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg min-h-[400px]"></div>
  </div>
</template>

<style scoped></style>
