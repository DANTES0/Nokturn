<script setup lang="ts"></script>

<template>
  <div
    class="w-[400px] h-full bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px]"
  >
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Начальная ставка:</label>
      <label class="ml-[30px] font-[InterItalic]">5000₽</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Текущая ставка:</label>
      <label class="ml-[30px] font-medium">5000₽</label>
    </div>
    <div class="mt-[20px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата начала:</label>
      <label class="ml-[30px] font-[InterItalic]">10:00</label>
      <label class="ml-[30px] font-[InterItalic]">29.11.2024</label>
    </div>
    <div class="mt-[20px] ml-[20px] text-[16px]">
      <label class="font-[InterItalic] font-light">Дата конца:</label>
      <label class="ml-[30px] font-[InterItalic]">10:00</label>
      <label class="ml-[30px] font-[InterItalic]">29.11.2024</label>
    </div>
    <div class="mt-[20px] ml-[20px]">
      <label class="font-[InterItalic]">Осталось до конца:</label>
      <label class="ml-[30px] text-[16px]">07 дн 00 ч 00 м</label>
    </div>
    <div class="mt-[20px] ml-[20px] flex">
      <label class="font-[InterItalic]">Предложить ставку</label>
      <input
        class="ml-[30px] w-[80px] border border-black rounded-bl-xl rounded-tr-xl text-center text-[14px]"
        placeholder="8000"
        type="text"
      />
    </div>
    <div class="flex items-center justify-center mt-[20px]">
      <button
        class="w-[90%] border border-black rounded-tl-lg rounded-br-lg pt-[4px] pb-[4px] shadow-cardImage"
      >
        Подтвердить ставку
      </button>
    </div>
  </div>
</template>

<style scoped></style>
