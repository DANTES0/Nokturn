<script setup lang="ts">
import ChatMessenger from '@/components/ChatPageComponents/ChatMessenger.vue'
import ChatUserCard from '@/components/ChatPageComponents/ChatUserCard.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import MyButton from '@/UX/MyButton.vue'

//Ничего не делал 28.01.2025
//Ничего не делал 29.01.2025
//Ничего не делал 30.01.2025
</script>

<template>
  <div class="w-[90%] h-full flex gap-[30px] mt-[30px]">
    <div
      class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg p-[20px] flex flex-col gap-7 overflow-y-scroll"
    >
      <ChatUserCard v-for="i in 10" :key="i" />
    </div>
    <div class="bg-white w-1/2 h-[85vh] shadow-container rounded-lg">
      <div class="flex flex-col gap-6 overflow-y-scroll h-[72vh] w-full p-[20px]">
        <ChatMessenger v-for="i in 10" :key="i" />
      </div>
      <div class="w-full h-[15vh] p-[20px] flex justify-between items-center">
        <div class="w-[70%] relative">
          <input
            class="w-full border-b border-black h-[40px] pl-[10px] outline-none pr-[40px] text-[1vw]"
            placeholder="Написать сообщение"
          />
          <IconPaperClip class="absolute right-0 top-[6px] cursor-pointer hover:text-[#444444]" />
        </div>
        <MyButton title="Отправить" class="text-[0.8vw]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
