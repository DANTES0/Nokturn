<script setup lang="ts"></script>

<template>
  <div
    class="w-(calc(100%-30px)) h-[260px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center overflow-x-hidden overflow-y-auto scrollingbox"
  >
    <table class="w-[90%] border-separate border-spacing-y-3">
      <thead>
        <tr class="text-[12px]">
          <th scope="col">Пользователь</th>
          <th scope="col">Ставка</th>
          <th scope="col">Время</th>
          <th scope="col">Дата</th>
        </tr>
      </thead>
      <tbody class="mt-[10px]">
        <tr v-for="i in 8" :key="i" class="text-center shadow-card rounded-lg">
          <td>Пользователь</td>
          <td>6000₽</td>
          <td>10:00</td>
          <td>21.12.2024</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
