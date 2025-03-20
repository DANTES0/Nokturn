<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'
import MyButton from '@/UX/MyButton.vue'
import { useFileInput } from '@/scripts/useFileInput'
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'
import { config } from '@/scripts/config'
import { useRouter } from 'vue-router'

const artImage = useFileInput()
const titleModel = ref('')
const userStore = useUserStore()
const user = computed(() => userStore.user)
const router = useRouter()

async function addArts() {
  const formData = new FormData()
  formData.append('name', titleModel.value)
  formData.append('userId', user.value?.id ?? '')
  if (artImage.selectedFile.value) {
    formData.append('image', artImage.selectedFile.value)
  }

  try {
    const response = await fetch(`${config.url}/api/art`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      console.error('Ошибка загрузки арта', await response.text())
      throw new Error(`Ошибка ${await response.text()}`)
    } else {
      console.log('Арт успешно загружен', await response.json())
      router.back()
    }
  } catch (error) {
    throw console.log('Ошибка при загрузке арта', error)
  }
}

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
        v-if="artImage.selectedImage.value"
        :src="artImage.selectedImage.value"
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
        @change="artImage.handleFileChange"
      />
    </div>
    <div class="text-left w-full mt-[20px] ml-[100px]">Название</div>
    <input
      type="text"
      v-model="titleModel"
      class="border border-black rounded-tl-lg rounded-br-lg w-[80%] h-8 text-[16px] pl-4 mt-[6px]"
      placeholder="Введите название картины"
    />
    <div class="w-full flex gap-4 mt-[20px]">
      <MyButton @click="addArts" title="Выставить работу" class="w-full flex-1 !p-1"></MyButton>
      <MyButton @click="router.back" title="Отменить" class="w-full flex-1 !p-1"></MyButton>
    </div>
  </div>
</template>

<style scoped></style>
