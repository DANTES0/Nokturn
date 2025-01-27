<script setup lang="ts">
import { useRoute } from 'vue-router'

interface Props {
  title: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Поиск',
  placeholder: 'Поиск',
})

const route = useRoute()
</script>

<template>
  <div class="w-full relative">
    <input
      type="text"
      class="border border-black h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px] focus:outline-black focus:outline focus:outline-1"
      :placeholder="props.placeholder"
    />
    <div
      class="absolute top-[-14px] left-[20px] bg-[#FAFAFA] px-2 font-light"
      :class="{ ['!bg-white']: route.path === '/addLot' || route.path === '/profileSettings' }"
    >
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped></style>
