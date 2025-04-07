<script setup lang="ts">
import IcoDownArrow from '@/components/icons/IcoDownArrow.vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
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

const searchText = ref(props.modelValue || '')
const activeDropDown = ref(false)
const items = ['Физическое искусство', 'Цифровое искусство']

const selectedItem = (item: string) => {
  activeDropDown.value = false
  searchText.value = item
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

watch(searchText, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown-container')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    activeDropDown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const route = useRoute()
</script>

<template>
  <div class="w-full relative">
    <div @click.stop="activeDropDown = !activeDropDown">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text"
        class="border border-black dark:border-[#CCCCCC] h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px] placeholder:text-[14px] pr-[60px] focus:outline-black dark:focus:outline-[#CCCCCC] focus:outline focus:outline-1 dark:placeholder:text-[#7a7a7a]"
        :placeholder="props.placeholder"
      />
      <div
        class="absolute top-[-14px] left-[20px] bg-[#FAFAFA] dark:bg-[#232323] px-2 font-light"
        :class="{
          '!bg-white  dark:!bg-[#1c1c1c]':
            ['/addLot', '/profileSettings'].includes(route.path) ||
            route.path.startsWith('/editLot/'),
        }"
      >
        {{ props.title }}
      </div>
      <div class="absolute top-[8px] right-[50px]">|</div>
      <IcoDownArrow class="absolute top-[8px] right-[13px]" />
    </div>
    <div
      v-if="activeDropDown"
      class="absolute w-full dark:text-[#CCCCCC] shadow-card dark:border dark:border-[#CCCCCC] dark:shadow-none mt-2 rounded-lg px-[20px] py-[10px] dropdown-container bg-[#FAFAFA] dark:bg-[#232323] z-10"
    >
      <div
        @click="selectedItem(items[0])"
        class="hover:bg-[#ececec] dark:hover:bg-[#3C3C3C] rounded-lg pl-[10px] py-[2px] cursor-pointer"
      >
        {{ items[0] }}
      </div>
      <hr class="my-[4px]" />
      <div
        @click="selectedItem(items[1])"
        class="hover:bg-[#ececec] dark:hover:bg-[#3C3C3C] rounded-lg pl-[10px] py-[2px] cursor-pointer"
      >
        {{ items[1] }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
