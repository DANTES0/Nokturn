<script setup lang="ts">
import WelcomCard from '@/components/WelcomCard.vue'
import MyButton from '@/UX/MyButton.vue'
import MyCheckBox from '@/UX/MyCheckBox.vue'
import MySecondInput from '@/UX/MySecondInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

async function fetchData() {
  const objectData = {
    firstname: loginModel.value,
    mail: emailModel.value,
    password: passwordModel.value,
    birthday_date: new Date(birthdayModel.value),
  }
  console.log(objectData)
  if (!loginModel.value || !emailModel.value || !passwordModel.value || !birthdayModel.value) {
    console.log('Не все данные')
    return
  }
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectData),
    })

    if (response.ok) {
      console.log('Запрос выполнен успешно, пользователь зарегистрирован')
      router.push('/auth')
    }
  } catch (error) {
    console.error('Error', error)
  }
}

const emailModel = ref('')
const loginModel = ref('')
const passwordModel = ref('')
const birthdayModel = ref('')

const router = useRouter()
</script>

<template>
  <div class="registerImage w-screen h-screen flex justify-center items-center">
    <WelcomCard />
    <div
      class="bg-[rgba(255,255,255,0.8)] h-[90vh] w-[35vw] flex flex-col p-[30px] justify-between"
    >
      <div class="w-full text-center font-medium text-[20px]">Регистрация</div>
      <MySecondInput placeholder="example@mail.ru" title="Email" v-model="emailModel" />
      <MySecondInput placeholder="Имя/Псевдноним" title="Имя/Псевдноним" v-model="loginModel" />
      <MySecondInput placeholder="Пароль" title="Пароль" v-model="passwordModel" />
      <MySecondInput placeholder="Повторите пароль" title="Повторите пароль" />
      <MySecondInput
        placeholder="11-11-1111"
        title="Введите вашу дату рождения"
        v-model="birthdayModel"
      />

      <div class="flex gap-4 mt-[14px]">
        <MyCheckBox />
        <div class="text-[1vw]">Подтвердите условие участия в аукционах</div>
      </div>
      <div class="flex gap-6 items-center">
        <MyButton @click="fetchData" title="Зарегистрировать" />
        <div class="w-[150px] text-[0.6vw]">
          У вас уже есть аккаунт?
          <RouterLink to="/auth"
            ><span class="underline hover:text-[#888888] cursor-pointer"
              >Нажмите здесь</span
            ></RouterLink
          >, чтобы войти в учетную запись
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .bg {
  background-color: rgba(255, 255, 255, 0.8);
} */
.registerImage {
  background-image: url('../assets/images/bgAuth.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
