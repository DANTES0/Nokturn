<script setup lang="ts">
import MyButton from '@/UX/MyButton.vue'
import MyCheckBox from '@/UX/MyCheckBox.vue'
import MyInput from '@/UX/MyInput.vue'
import MySecondInput from '@/UX/MySecondInput.vue'
</script>

<template>
  <div class="registerImage w-screen h-screen flex justify-center items-center">
    <div class="bg-[rgba(0,0,0,0.8)] h-[60vh] w-[30vw] text-white flex flex-col gap-4 p-[2vw]">
      <div class="font-[InterItalic] font-bold text-[2vw] leading-tight">
        Каждая картина — это ноктюрн на холсте, создающий свою мелодию эмоций
      </div>
      <div class="text-[1vw]">
        Откройте мир искусства с нашим онлайн-аукционом картин! Уникальные произведения от
        талантливых художников ждут своего ценителя. Участвуйте в торгах, находите шедевры, которые
        вдохновляют, и добавляйте их в свою коллекцию. Искусство ближе, чем вы думаете – начните
        свой путь к уникальным покупкам уже сегодня!
      </div>
    </div>
    <div
      class="bg-[rgba(255,255,255,0.8)] h-[90vh] w-[35vw] flex flex-col p-[30px] justify-between"
    >
      <div class="w-full text-center">Регистрация</div>
      <MySecondInput placeholder="example@mail.ru" title="Email" />
      <MySecondInput placeholder="Имя/Псевдноним" title="Имя/Псевдноним" />
      <MySecondInput placeholder="Пароль" title="Пароль" />
      <MySecondInput placeholder="Повторите пароль" title="Повторите пароль" />
      <MySecondInput placeholder="11-11-1111" title="Введите вашу дату рождения" />

      <div class="flex gap-4 mt-[14px]">
        <MyCheckBox />
        <div class="text-[1vw]">Подтвердите условие участия в аукционах</div>
      </div>
      <div class="flex gap-6 items-center">
        <MyButton title="Зарегистрировать" />
        <div class="w-[150px] text-[0.6vw]">
          У вас уже есть аккаунт? Нажмите здесь, чтобы войти в учетную запись.
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
  background-size: 100%;
}
</style>
