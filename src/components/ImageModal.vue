<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const isOpen = ref(false)
const photo = ref('')

function open(imageSrc: string) {
  photo.value = imageSrc
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

defineExpose({ open })
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50"
    @click="close"
  >
    <div class="relative max-w-[90%] max-h-[90%] flex items-center justify-center">
      <img :src="photo" class="w-[90%] max-h-[100vh] rounded-lg" />
    </div>
    <button
      class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
      @click.stop="close"
    >
      ✖
    </button>
  </div>
</template>

<style scoped></style>
