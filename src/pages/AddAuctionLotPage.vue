<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'
import { config } from '@/scripts/config'
import { useFileInput } from '@/scripts/useFileInput'
import { useUserStore } from '@/stores/userStore'
import InputTimedate from '@/UX/InputTimedate.vue'
import MyButton from '@/UX/MyButton.vue'
import MyInput from '@/UX/MyInput.vue'
import MySelectionInput from '@/UX/MySelectionInput.vue'
import { computed, ref } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const mainImage = useFileInput()
const additionalImages = useFileInput(true)
const nameModel = ref('')
const categoryModel = ref('')
const sizeModel = ref('')
const startingBetModel = ref('')
const minBidIncrementModel = ref('')
const beginDateTimeModel = ref('')
const EndDateTimeModel = ref('')
const descriptionModel = ref('')

async function addLot() {
  const formData = new FormData()
  formData.append('name', nameModel.value)
  formData.append('userId', user.value?.id ?? '')
  formData.append('category', categoryModel.value)
  formData.append('size', sizeModel.value)
  formData.append('starting_bet', startingBetModel.value)
  formData.append('min_bid_increment', minBidIncrementModel.value)
  formData.append('description', descriptionModel.value)
  formData.append('begin_time_date', new Date(`${beginDateTimeModel.value}:00.000`).toISOString())
  formData.append('end_time_date', new Date(`${EndDateTimeModel.value}:00.000`).toISOString())
  formData.append('lot_status', 'inactive')

  if (mainImage.selectedFile.value) {
    formData.append('image', mainImage.selectedFile.value)
  }

  if (additionalImages.selectedFilesArray.value) {
    additionalImages.selectedFilesArray.value.forEach((file) => {
      formData.append('another_images', file)
    })
  }

  try {
    const response = await fetch(`${config.url}/api/lot/`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Ошибка загрузки лота', errorText)
      throw new Error(`Ошибка ${errorText}`)
    }

    console.log('Лот успешно загружен', await response.json())
  } catch (error) {
    console.error('Ошибка при загрузке лота', error)
  }
}
</script>

<template>
  <div
    class="bg-white shadow-container w-[90%] rounded-2xl mt-[30px] p-[30px] flex flex-col mb-[30px]"
  >
    <div class="w-full flex gap-5">
      <div class="w-full max-w-[400px]">
        <div
          class="w-full bg-white rounded-lg shadow-card aspect-square flex items-center justify-center flex-col gap-2"
          @click="() => $refs.mainImageInput.click()"
        >
          <img
            v-if="mainImage.selectedImage.value"
            :src="mainImage.selectedImage.value"
            class="w-full h-full object-cover aspect-square rounded-lg"
          />
          <div v-else class="flex items-center justify-center flex-col gap-2">
            <IconCamera class="h-[48px] w-[48px]" />
            <div class="text-[18px] text-center">Добавить главное изображение</div>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          ref="mainImageInput"
          @change="mainImage.handleFileChange"
        />
      </div>
      <div class="w-full flex-1 flex">
        <div
          class="w-full bg-white rounded-lg shadow-card grid grid-cols-2 gap-x-8 p-[30px] items-center"
        >
          <MyInput v-model="nameModel" title="Название" placeholder="Название картины" />
          <MyInput
            v-model="startingBetModel"
            title="Начальная цена"
            placeholder="Например в рублях: 200"
          />
          <MyInput v-model="sizeModel" title="Размер картины" placeholder="Например: 1920x1080" />
          <MyInput v-model="minBidIncrementModel" title="Шаг торгов" placeholder="Напрмер: 200" />
          <InputTimedate
            v-model="beginDateTimeModel"
            title="Дата начала торгов"
            placeholder="XX-XX-XXXX"
          />
          <InputTimedate
            v-model="EndDateTimeModel"
            title="Дата конца торгов"
            placeholder="XX-XX-XXXX"
          />
          <MySelectionInput
            v-model="categoryModel"
            title="Категория"
            placeholder="Выбор категории"
          />
        </div>
      </div>
    </div>
    <div class="mt-[20px] flex w-full gap-5">
      <div>
        <div>Дополнительные изображения</div>
        <div
          class="w-[400px] bg-white shadow-card rounded-lg p-[20px] flex justify-between flex-wrap gap-3 mt-[10px]"
        >
          <img
            v-for="(img, index) in additionalImages.selectedImagesArray.value"
            :key="index"
            :src="img"
            class="rounded-lg w-[30%] aspect-square object-cover"
          />
          <div
            class="bg-white rounded-lg w-[108px] aspect-square shadow-card flex flex-col items-center justify-center"
            @click="() => $refs.additionalFileImagesModel.click()"
            v-if="additionalImages.selectedImagesArray.value.length != 6"
          >
            <div class="flex flex-col items-center justify-center gap-1">
              <IconCamera />
              <div class="text-[14px]">Добавить</div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="additionalImages.handleFileChange"
            ref="additionalFileImagesModel"
            class="hidden"
          />
        </div>
      </div>
      <div class="flex-1 w-full">
        <div>Описание</div>
        <div class="w-full flex-1 flex mt-[10px]">
          <div
            class="w-full bg-white rounded-lg shadow-card flex items-center justify-center flex-col gap-2 p-[30px] h-full min-h-[268px]"
          >
            <textarea
              v-model="descriptionModel"
              class="border border-black rounded-br-lg rounded-tl-lg w-full min-h-[200px] p-[10px]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between mt-[30px]">
      <MyButton @click="addLot" title="Выставить лот"></MyButton>
      <MyButton @click="console.log(categoryModel)" title="Отменить"></MyButton>
    </div>
  </div>
</template>

<style scoped></style>
