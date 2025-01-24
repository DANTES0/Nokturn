<script setup lang="ts">
import WelcomCard from '@/components/WelcomCard.vue'
import MyButton from '@/UX/MyButton.vue'
import MySecondInput from '@/UX/MySecondInput.vue'
</script>

<template>
  <div class="registerImage w-screen h-screen flex justify-center items-center">
    <WelcomCard />
    <div class="bg-[rgba(255,255,255,0.8)] h-[60vh] w-[35vw] flex flex-col p-[30px] gap-6">
      <div class="w-full text-center font-medium text-[20px]">Вход</div>
      <MySecondInput placeholder="example@mail.ru" title="Email" />
      <MySecondInput placeholder="Имя/Псевдноним" title="Имя/Псевдноним" />
      <div class="flex gap-6 items-center mt-auto w-full justify-center">
        <MyButton title="Войти" />
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
