<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  title: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Название',
  placeholder: 'Поиск',
})

const inputModel = ref('')

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

watch(inputModel, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
<template>
  <div>
    <div class="ml-[10px] text-[14px] mb-[8px]">{{ props.title }}</div>
    <input
      v-model="inputModel"
      type="text"
      class="border border-black rounded-tl-lg rounded-br-lg w-full py-[4px] text-[1vw] pl-4 focus:outline-black focus:outline focus:outline-1"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style scoped></style>
