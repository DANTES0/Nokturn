<script setup lang="ts">
import getCurrentUser from '@/assets/scripts/middlewareAuth'
import WelcomCard from '@/components/WelcomCard.vue'
import MyButton from '@/UX/MyButton.vue'
import MySecondInput from '@/UX/MySecondInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
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
      getCurrentUser(data.token, router)
    }
  } catch (error) {
    console.error('Error', error)
  }
}

const emailModel = ref('')
const passwordModel = ref('')
</script>

<template>
  <div class="registerImage w-screen h-screen flex justify-center items-center">
    <WelcomCard />
    <div class="bg-[rgba(255,255,255,0.8)] h-[60vh] w-[35vw] flex flex-col p-[30px] gap-6">
      <div class="w-full text-center font-medium text-[20px]">Вход</div>
      <MySecondInput placeholder="example@mail.ru" title="Email" v-model="emailModel" />
      <MySecondInput placeholder="Пароль" title="Пароль" v-model="passwordModel" />
      <div class="flex gap-6 items-center mt-auto w-full justify-center">
        <MyButton title="Войти" @click="fetchData" />
        <div class="w-[180px] text-[0.6vw]">
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
</template>

<style scoped>
.registerImage {
  background-image: url('../assets/images/bgAuth.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
