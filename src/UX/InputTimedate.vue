<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title: string
  placeholder: string
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Поиск',
  placeholder: 'Поиск',
})

const route = useRoute()
const formattedDate = computed({
  get: () => {
    if (!props.modelValue) return ''
    const date = new Date(props.modelValue)
    return date.toISOString().slice(0, 16)
  },
  set: (newValue) => {
    emit('update:modelValue', new Date(newValue).toISOString())
  },
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
  <div class="w-full relative">
    <input
      :value="formattedDate"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="datetime-local"
      class="border border-black h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px] focus:outline-black focus:outline focus:outline-1"
      :placeholder="props.placeholder"
    />
    <div
      class="absolute top-[-14px] left-[20px] bg-[#FAFAFA] px-2 font-light"
      :class="{
        '!bg-white':
          ['/addLot', '/profileSettings'].includes(route.path) ||
          route.path.startsWith('/editLot/'),
      }"
    >
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped></style>
