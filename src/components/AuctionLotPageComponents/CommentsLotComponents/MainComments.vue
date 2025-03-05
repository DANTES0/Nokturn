<script setup lang="ts">
import { ref } from 'vue'

const activeMainChildElements = ref(false)
</script>

<template>
  <div class="flex text-[16px] items-center w-full mt-[30px]">
    <img class="rounded-full h-14 w-14 shadow-cardImage" src="../../../assets/images/test3.png" />
    <div class="flex flex-col ml-[20px] gap-2">
      <div class="flex items-center">
        <div class="font-light">Имя автора</div>
        <div class="font-light text-[12px] ml-[30px]">30 минут</div>
      </div>
      <div class="text-[14px]">
        ТЕкст сообщения ТЕкст сообщенияТЕкст сообщения ТЕкст сообщенияТЕкст сообщенияТЕкст сообщения
        ТЕкст сообщенияТЕкст сообщения ТЕкст сообщения
      </div>
      <div class="flex items-center gap-6">
        <div class="font-extralight text-[12px]">Ответить</div>
        <div
          @click="
            () => {
              activeMainChildElements = !activeMainChildElements
            }
          "
          class="text-[12px] cursor-pointer underline hover:text-[#5f5f5f]"
        >
          <div v-if="!activeMainChildElements">Показать (2) ответа</div>
          <div v-if="activeMainChildElements">Скрыть ответы</div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="activeMainChildElements">
    <div class="flex items-center ml-[40px] mt-2">
      <img class="rounded-full h-14 w-14 shadow-cardImage" src="../../../assets/images/test1.jpg" />
      <div class="flex flex-col ml-[20px] gap-2">
        <div class="flex items-center">
          <div class="font-light text-[16px]">Имя автора</div>
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
</template>

<style scoped></style>
