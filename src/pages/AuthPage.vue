<script setup lang="ts">
import WelcomCard from '@/components/WelcomCard.vue'
import { config } from '@/scripts/config'
import { useUserStore } from '@/stores/userStore'
import MyButton from '@/UX/MyButton.vue'
import MySecondInput from '@/UX/MySecondInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
async function fetchData() {
  try {
    const response = await fetch(`${config.url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: emailModel.value,
        password: passwordModel.value,
      }),
    })
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      await userStore.fetchUser()
      router.push('/')
    } else {
      console.log(errorMail.value)
      if (!emailModel.value) {
        errorMail.value = true
      }
      if (!passwordModel.value) {
        errorPassword.value = true
      }
    }
  } catch (error) {
    console.error('Error', error)
  }
}

const errorMail = ref(false)
const errorPassword = ref(false)

const emailModel = ref('')
const passwordModel = ref('')
</script>

<template>
  <div class="registerImage w-screen h-screen flex justify-center items-center">
    <div class="w-full flex items-center justify-center">
      <WelcomCard />
      <div
        class="bg-[rgba(255,255,255,0.8)] h-[60vh] mobile:w-[35vw] w-[90vw] flex flex-col p-[30px] gap-6"
      >
        <div class="w-full text-center font-medium text-[20px]">Вход</div>
        <MySecondInput
          :required-error="errorMail"
          error-text="Введите почту"
          placeholder="example@mail.ru"
          title="Email"
          v-model="emailModel"
        />
        <MySecondInput
          :required-error="errorPassword"
          error-text="Введите пароль"
          typeInput="password"
          placeholder="Пароль"
          title="Пароль"
          v-model="passwordModel"
        />
        <div class="flex gap-3 items-center mt-auto w-full justify-center flex-col">
          <MyButton class="w-[80%]" title="Войти" @click="fetchData" />
          <div class="w-[80%] text-[10px] text-center">
            У вас нет аккаунта?
            <RouterLink to="/register"
              ><span class="underline hover:text-[#888888] cursor-pointer"
                >Нажмите здесь</span
              ></RouterLink
            >, чтобы зарегистрировать учетную запись.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registerImage {
  background-image: url('../assets/images/bgAuth.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
