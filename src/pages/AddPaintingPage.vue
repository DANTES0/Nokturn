<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'
import MyButton from '@/UX/MyButton.vue'
import { useFileInput } from '@/assets/scripts/useFileInput'

const { selectedImage, handleFileChange } = useFileInput()
// const selectedImage = ref<string | null>(null)

// const handleFileChange = (event: Event) => {
//   const target = event.target as HTMLInputElement
//   if (target.files && target.files[0]) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       selectedImage.value = e.target?.result as string
//     }
//     reader.readAsDataURL(target.files[0])
//   }
// }
</script>

<template>
  <div
    class="bg-white shadow-container w-[30%] rounded-2xl flex flex-col justify-center items-center p-[30px] mt-[30px] max-w-[500px]"
  >
    <div
      class="w-[90%] h-auto aspect-square shadow-card rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#F6F6F6] relative overflow-hidden"
      @click="() => $refs.fileInput.click()"
    >
      <img
        v-if="selectedImage"
        :src="selectedImage"
        alt="Selected"
        class="w-full h-full object-cover rounded-2xl"
      />

      <div v-else class="flex flex-col items-center justify-center">
        <IconCamera class="w-[48px] h-[48px]" />
        <div class="text-[20px]">Выбрать</div>
      </div>

      <input
        type="file"
        accept="image/*"
        class="hidden"
        ref="fileInput"
        @change="handleFileChange"
      />
    </div>
    <div class="text-left w-full mt-[20px] ml-[100px]">Название</div>
    <input
      type="text"
      class="border border-black rounded-tl-lg rounded-br-lg w-[80%] h-8 text-[16px] pl-4 mt-[6px]"
      placeholder="Введите название картины"
    />
    <div class="w-full flex gap-4 mt-[20px]">
      <MyButton title="Выставить работу" class="w-full flex-1 !p-0"></MyButton>
      <MyButton title="Отменить" class="w-full flex-1 !p-0"></MyButton>
    </div>
  </div>
</template>

<style scoped></style>
