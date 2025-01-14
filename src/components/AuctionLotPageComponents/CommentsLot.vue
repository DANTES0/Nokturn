<script setup lang="ts"></script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[450px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center justify-between"
  >
    <div class="w-[95%] overflow-x-hidden overflow-y-auto scrollingbox">
      <div v-for="i in 6" :key="i" class="flex text-[16px] items-center w-full mt-[30px]">
        <img class="rounded-full h-14 w-14 shadow-cardImage" src="../../assets/images/test3.png" />
        <div class="flex flex-col ml-[20px] gap-2">
          <div class="flex items-center">
            <div class="font-light">Имя автора</div>
            <div class="font-light text-[12px] ml-[30px]">30 минут</div>
          </div>
          <div class="text-[14px]">
            ТЕкст сообщения ТЕкст сообщенияТЕкст сообщения ТЕкст сообщенияТЕкст сообщенияТЕкст
            сообщения ТЕкст сообщенияТЕкст сообщения ТЕкст сообщения
          </div>
          <div class="font-extralight text-[12px]">Ответить</div>
        </div>
      </div>
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
