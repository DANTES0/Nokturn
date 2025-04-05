<script setup lang="ts">
import { config } from '@/scripts/config'
import { useFileInput } from '@/scripts/useFileInput'
import IconCamera from '@/components/icons/IconCamera.vue'
import { useUserStore } from '@/stores/userStore'
import MyButton from '@/UX/MyButton.vue'
import MyCheckBox from '@/UX/MyCheckBox.vue'
import MyInput from '@/UX/MyInput.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import formatDate from '@/scripts/formatDate'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const active = ref(false)
const activeProfilePhoto = ref(false)
const firstnameModel = ref(user.value?.firstname)
const lastnameModel = ref(user.value?.lastname)
const mailModel = ref(user.value?.mail)
const birthdayModel = ref(user.value?.birthday_date)
const vkLinkModel = ref(user.value?.vk_link)
const tgLinkModel = ref(user.value?.tg_link)
const descriptionModel = ref(user.value?.description)
const specialInfoModel = ref(user.value?.special_info)
const checkboxModel = ref(user.value?.name_visible)

const headerFileInput = useFileInput()
const profileFileInput = useFileInput()
const router = useRouter()
async function UpdateUser() {
  const formData = new FormData()

  formData.append('firstname', firstnameModel.value)
  formData.append('lastname', lastnameModel.value)
  formData.append('mail', mailModel.value)
  formData.append('birthday_date', new Date(birthdayModel.value).toISOString())
  formData.append('vk_link', vkLinkModel.value)
  formData.append('tg_link', tgLinkModel.value)
  formData.append('description', descriptionModel.value)
  formData.append('name_visible', checkboxModel.value)
  formData.append('special_info', specialInfoModel.value)

  if (headerFileInput.selectedFile.value) {
    formData.append('profile_header_photo', headerFileInput.selectedFile.value)
  }
  if (profileFileInput.selectedFile.value) {
    formData.append('profile_photo', profileFileInput.selectedFile.value)
  }

  try {
    const response = await fetch(`${config.url}/api/users/${user.value?.id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Ошибка обновления профиля:', errorText)
      throw new Error(`Ошибка: ${errorText}`)
    }

    console.log('Профиль успешно обновлен', await response.json())

    router.push(`/profile/${user.value?.id}`)
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error)
  }
}

onMounted(() => {
  if (user.value) {
    headerFileInput.selectedImage.value = user.value.profile_header_photo
    profileFileInput.selectedImage.value = user.value.profile_photo
  }
  birthdayModel.value = formatDate(birthdayModel.value)
})
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
        :src="
          !headerFileInput.selectedFile.value
            ? config.url + headerFileInput.selectedImage.value
            : headerFileInput.selectedImage.value
        "
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
          @mouseover="() => (activeProfilePhoto = true)"
          @mouseleave="() => (activeProfilePhoto = false)"
          class="w-[80%] aspect-square relative bg-[#FAFAFA] shadow-cardImage rounded-full flex flex-col items-center justify-center cursor-pointer"
        >
          <div
            class="absolute w-full aspect-square rounded-full gradient transition-all duration-500"
            :class="{ 'opacity-100': activeProfilePhoto, 'opacity-0': !activeProfilePhoto }"
          >
            <div class="flex w-full h-full items-center justify-center flex-col text-[#ffffff]">
              <IconCamera class="mt-[64px]" />
              <div>Изменить фото</div>
            </div>
          </div>
          <img
            v-if="profileFileInput.selectedImage.value"
            :src="
              !profileFileInput.selectedFile.value
                ? config.url + profileFileInput.selectedImage.value
                : profileFileInput.selectedImage.value
            "
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
      <MyButton title="Сохранить изменения" @click="UpdateUser" />
      <MyButton title="Перейти в профиль" @click="router.back" />
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(rgba(106, 106, 106, 0) 0%, rgba(0, 0, 0, 1) 90%);
}
</style>
