<script setup lang="ts">
import { useFileInput } from '@/assets/scripts/useFileInput'
import IconCamera from '@/components/icons/IconCamera.vue'
import MyButton from '@/UX/MyButton.vue'
import MyCheckBox from '@/UX/MyCheckBox.vue'
import MyInput from '@/UX/MyInput.vue'
import { ref } from 'vue'

const active = ref(false)
const firstnameModel = ref(null)
const lastnameModel = ref(null)
const mailModel = ref(null)
const birthdayModel = ref(null)
const vkLinkModel = ref(null)
const tgLinkModel = ref(null)
const descriptionModel = ref(null)
const specialInfoModel = ref(null)
const checkboxModel = ref(false)

const headerFileInput = useFileInput()
const profileFileInput = useFileInput()
</script>

<template>
  <div class="w-[90%] bg-white shadow-container rounded-2xl p-[20px] mt-[30px] mb-[40px]">
    <div
      class="w-full h-[34vh] relative cursor-pointer"
      @click="() => $refs.fileInput.click()"
      @mouseover="() => (active = true)"
      @mouseleave="() => (active = false)"
    >
      <div
        class="w-full h-full absolute bottom-0 transition-all duration-500 gradient rounded-lg flex items-end"
        :class="{ 'opacity-100': active, 'opacity-0': !active }"
      >
        <div class="w-full flex justify-between">
          <div class="text-white font-medium text-[20px] mb-[20px] ml-[20px]">Шапка профиля</div>
          <div class="text-white flex gap-4 items-center absolute w-full justify-center">
            <div v-if="headerFileInput.selectedImage.value" class="text-[20px]">
              Изменить изображение
            </div>
            <div v-else class="text-[20px]">Добавить изображение</div>
            <IconCamera class="w-[32px] h-[32px]" />
          </div>
        </div>
      </div>
      <img
        v-if="headerFileInput.selectedImage.value"
        :src="headerFileInput.selectedImage.value"
        class="w-full h-full object-cover rounded-2xl shadow-cardImage"
      />
      <img
        v-else
        src="../assets/images/bgProfile.jpg"
        class="w-full h-full object-cover rounded-2xl"
      />
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        class="hidden"
        @change="headerFileInput.handleFileChange"
      />
    </div>
    <div class="w-full mt-[20px] flex gap-4">
      <div
        class="bg-white shadow-card rounded-lg w-full max-w-[250px] flex flex-col items-center gap-4 p-[20px]"
      >
        <div class="text-[20px]">Фото профиля</div>

        <div
          @click="
            () => {
              $refs.profilePhotoFileInput.click()
            }
          "
          class="w-[80%] aspect-square bg-[#FAFAFA] shadow-cardImage rounded-full flex flex-col items-center justify-center cursor-pointer"
        >
          <img
            v-if="profileFileInput.selectedImage.value"
            :src="profileFileInput.selectedImage.value"
            alt="Selected"
            class="w-full aspect-square shadow-cardImage rounded-full object-cover"
          />
          <div v-else class="w-full flex items-center justify-center flex-col">
            <IconCamera class="w-[32px] h-[32px]" />
            <div>Добавить фото</div>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref="profilePhotoFileInput"
          class="hidden"
          @change="profileFileInput.handleFileChange"
        />
      </div>
      <div class="w-full bg-white shadow-card rounded-lg p-[20px]">
        <div class="text-[20px]">Личная информация</div>
        <div class="w-full h-[85%] grid grid-cols-3 items-center gap-4 content-center gap-y-12">
          <MyInput title="Имя/Псевдоним" placeholder="Имя" v-model="firstnameModel" />
          <MyInput title="Почта" placeholder="Почта" v-model="mailModel" />
          <MyInput title="Ссылка на Vk" placeholder="htttps://vk.com/*" v-model="vkLinkModel" />
          <MyInput title="Фамилия" placeholder="Фамилия" v-model="lastnameModel" />
          <MyInput title="Дата рождения" placeholder="XX.XX.XXXXX" v-model="birthdayModel" />
          <MyInput title="Ссылка на telegram" placeholder="https://t.me/*" v-model="tgLinkModel" />
        </div>
      </div>
    </div>
    <div class="w-full mt-[20px] flex gap-4">
      <div class="bg-white shadow-card w-full max-w-[800px] rounded-lg p-[20px]">
        <div class="text-[20px]">О вас</div>
        <textarea
          class="border border-black rounded-br-lg rounded-tl-lg w-full min-h-[180px] p-[10px] mt-[10px]"
          v-model="descriptionModel"
        ></textarea>
      </div>
      <div class="w-full bg-white shadow-card rounded-lg flex-1 p-[20px] flex flex-col gap-3">
        <div class="text-[20px]">Дополнительная информация</div>
        <div class="flex gap-3">
          <MyCheckBox v-model="checkboxModel" />
          <div>Отображать только имя?</div>
        </div>
        <div class="flex flex-col gap">
          <div class="flex gap-3">
            <div>Специальная информация</div>
            <div
              class="w-5 h-5 text-center border border-black rounded-tr-md rounded-bl-md items-center flex justify-center text-[#999999] font-light"
            >
              ?
            </div>
          </div>
          <textarea
            class="border border-black rounded-br-lg rounded-tl-lg w-full min-h-[100px] p-[10px] mt-[10px]"
            v-model="specialInfoModel"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="w-full mt-[20px] flex justify-between">
      <MyButton
        title="Сохранить изменения"
        @click="
          () => {
            console.log(
              firstnameModel,
              lastnameModel,
              mailModel,
              birthdayModel,
              vkLinkModel,
              tgLinkModel,
              descriptionModel,
              specialInfoModel,
              checkboxModel,
            )
          }
        "
      />
      <MyButton title="Перейти в профиль" />
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(rgba(106, 106, 106, 0) 0%, rgba(0, 0, 0, 1) 90%);
}
</style>
