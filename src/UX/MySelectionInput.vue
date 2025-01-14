<script setup lang="ts">
import IcoDownArrow from '@/components/icons/IcoDownArrow.vue'
import { ref, onMounted, onUnmounted } from 'vue'
interface Props {
  title: string
  placeholder: string
  model?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Поиск',
  placeholder: 'Поиск',
})

const searchText = ref(props.model || '')
const activeDropDown = ref(false)
const items = ['Физическое искусство', 'Цифровое искусство']

const selectedItem = (item: string) => {
  activeDropDown.value = false
  searchText.value = item
}

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
</script>

<template>
  <div class="w-full relative">
    <div @click.stop="activeDropDown = !activeDropDown">
      <input
        v-model="searchText"
        type="text"
        class="border border-black h-[40px] rounded-tr-2xl rounded-bl-2xl bg-transparent w-full pl-[10px] pr-[60px]"
        :placeholder="props.placeholder"
      />
      <div class="absolute top-[-14px] left-[20px] bg-[#FAFAFA] px-2 font-light">
        {{ props.title }}
      </div>
      <div class="absolute top-[8px] right-[50px]">|</div>
      <IcoDownArrow class="absolute top-[8px] right-[13px]" />
    </div>
    <div
      v-if="activeDropDown"
      class="absolute w-full shadow-card mt-2 rounded-lg px-[20px] py-[10px] dropdown-container bg-[#FAFAFA] z-10"
    >
      <div
        @click="selectedItem(items[0])"
        class="hover:bg-[#ececec] rounded-lg pl-[10px] py-[2px] cursor-pointer"
      >
        {{ items[0] }}
      </div>
      <hr class="my-[4px]" />
      <div
        @click="selectedItem(items[1])"
        class="hover:bg-[#ececec] rounded-lg pl-[10px] py-[2px] cursor-pointer"
      >
        {{ items[1] }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
