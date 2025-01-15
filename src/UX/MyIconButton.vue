<script setup lang="ts"></script>
<template>
  <button
    class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center"
  >
    <slot />
  </button>
</template>
<style scoped>
button:hover {
  transform: scale(1.1);
}
</style>
