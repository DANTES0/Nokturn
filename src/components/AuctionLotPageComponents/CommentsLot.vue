<script setup lang="ts">
import MainComments from './CommentsLotComponents/MainComments.vue'
</script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[450px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center justify-between"
  >
    <div class="w-[95%] overflow-x-hidden overflow-y-auto scrollingbox">
      <MainComments v-for="i in 6" :key="i" />
    </div>
    <div class="flex mb-[10px] w-[95%] items-end justify-between">
      <img class="w-14 h-14 rounded-full" src="../../assets/images/test6.jpg" />
      <input
        class="w-[75%] border-b border-black h-[30px] text-[14px] pl-2 outline-none mr-[20px] ml-[20px]"
        type="text"
        placeholder="Написать сообщение"
      />
      <button
        class="border border-black rounded-tl-lg rounded-br-lg w-[140px] h-[40px] shadow-cardImage"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
