<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title: string
  placeholder: string
  modelValue: string | number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Поиск',
  placeholder: 'Поиск',
})

const route = useRoute()

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
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      class="border border-black h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px] focus:outline-black focus:outline focus:outline-1 placeholder:text-[14px]"
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
