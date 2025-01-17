<script setup lang="ts"></script>

<template>
  <div class="w-full h-[34vh] relative -z-10">
    <img class="h-full w-full object-cover" src="../assets/images/test1.jpg" />
    <img
      class="absolute w-48 h-48 rounded-full bottom-[-90px] left-[96px] shadow-cardImage"
      src="../assets/images/test3.png"
    />
  </div>

  <div class="w-full flex gap-8">
    <div
      class="bg-white w-[25%] max-w-[350px] h-[180px] shadow-container rounded-2xl mt-8 ml-[360px] relative"
    >
      <div class="w-6 h-6 bg-white shadow-container rounded-full left-[-36px] absolute"></div>
      <div
        class="w-4 h-4 bg-white shadow-container rounded-full left-[-64px] top-[-8px] absolute"
      ></div>
    </div>
    <div
      class="bg-white w-full flex-1 h-[180px] shadow-container rounded-2xl mt-8 mr-[96px] relative"
    ></div>
  </div>
</template>

<style scoped></style>
