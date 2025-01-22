<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'
</script>

<template>
  <div class="bg-white shadow-container w-[90%] rounded-2xl mt-[30px] p-[30px] flex flex-col">
    <div class="w-full flex gap-5">
      <div class="w-full max-w-[400px]">
        <div
          class="w-full bg-white rounded-lg shadow-card aspect-square flex items-center justify-center flex-col gap-2"
        >
          <IconCamera class="h-[48px] w-[48px]" />
          <div class="text-[18px] text-center">Добавить главное изображение</div>
        </div>
      </div>
      <div class="w-full flex-1 flex">
        <div
          class="w-full bg-white rounded-lg shadow-card flex items-center justify-center flex-col gap-2"
        ></div>
      </div>
    </div>
    <div class="mt-[20px] flex w-full gap-5">
      <div>
        <div>Дополнительные изображения</div>
        <div
          class="w-full max-w-[400px] bg-white shadow-card rounded-lg p-[20px] flex justify-between flex-wrap gap-3 mt-[10px]"
        >
          <img src="../assets/images/test5.jpg" class="rounded-lg w-[30%] aspect-square" />
          <img src="../assets/images/test5.jpg" class="rounded-lg w-[30%] aspect-square" />
          <img src="../assets/images/test5.jpg" class="rounded-lg w-[30%] aspect-square" />
          <div
            class="bg-white rounded-lg w-[30%] aspect-square shadow-card flex flex-col items-center justify-center"
          >
            <IconCamera />
            <div class="text-[14px]">Добавить</div>
          </div>
        </div>
      </div>
      <div class="flex-1 w-full">
        <div>Описание</div>
        <div class="w-full flex-1 flex mt-[10px]">
          <div
            class="w-full bg-white rounded-lg shadow-card flex items-center justify-center flex-col gap-2 p-[30px] h-full min-h-[268px]"
          >
            <textarea
              class="border border-black rounded-br-lg rounded-tl-lg w-full min-h-[200px] p-[10px]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
