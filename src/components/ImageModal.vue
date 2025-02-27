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
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50"
        @click="close"
      >
        <div
          class="relative max-w-[90%] max-h-[90%] flex items-center justify-center modal-content"
          @click.stop
        >
          <img :src="photo" class="w-[90%] max-h-[100vh] rounded-lg" />
        </div>
        <button
          class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
          @click.stop="close"
        >
          ✖
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.2);
}
</style>
