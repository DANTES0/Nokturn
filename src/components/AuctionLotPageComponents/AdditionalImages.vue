<script setup lang="ts">
import { config } from '@/scripts/config'
import { ref } from 'vue'
import ImageModal from '../ImageModal.vue'

defineProps({
  additionlImage: {
    type: Array as () => string[],
    default: () => [],
  },
})
const modalRef = ref<InstanceType<typeof ImageModal> | null>(null)
</script>

<template>
  <div
    class="w-[450px] min-h-[160px] bg-white dark:bg-[#1c1c1c] mt-[20px] shadow-container dark:shadow-none dark:border dark:border-[#383838] rounded-2xl relative flex items-center justify-center gap-8"
  >
    <div class="text-[18px]" v-if="additionlImage.length == 0">Изображения отсутствуют</div>
    <div
      v-if="additionlImage.length !== 0"
      class="w-full h-full grid grid-cols-3 gap-2 justify-items-center p-4"
    >
      <img
        v-for="(item, index) in additionlImage"
        :key="index"
        class="w-[110px] h-[110px] rounded-lg object-cover"
        :src="config.url + item"
        @click="modalRef?.open(config.url + item)"
      />
    </div>
  </div>
  <ImageModal ref="modalRef" />
</template>

<style scoped></style>
