<script setup lang="ts"></script>
<template>
  <div
    class="w-[90%] bg-white mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px] gap-[30px]"
  >
    <div class="ml-[30px] mt-[30px]">
      <img class="rounded-2xl w-[450px] h-[450px]" src="../assets/images/test5.jpg" />
      <div class="text-[20px] mt-[20px] font-light">Дополнительные изображения</div>
      <div
        class="w-[450px] h-[160px] bg-white mt-[20px] shadow-container rounded-2xl relative flex items-center justify-center gap-8"
      >
        <img class="w-[110px] h-[110px] rounded-lg" src="../assets/images/test6.jpg" />
        <img class="w-[110px] h-[110px] rounded-lg" src="../assets/images/test6.jpg" />
        <img class="w-[110px] h-[110px] rounded-lg" src="../assets/images/test6.jpg" />
      </div>
      <div class="text-[20px] mt-[20px] font-light">Описание</div>
      <div
        class="w-[450px] h-auto bg-white mt-[20px] shadow-container rounded-2xl relative flex items-center justify-center gap-8 mb-[30px]"
      >
        <div class="m-8 text-justify">
          Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
          Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение
          шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается
          при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие
          программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по
          умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много
          веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem
          Ipsum получил много версий.
        </div>
      </div>
    </div>
    <div class="flex flex-col h-full w-full">
      <div class="flex justify-between h-[350px] w-full flex-wrap mt-[30px]">
        <div
          class="w-[400px] h-full bg-white shadow-container rounded-2xl relative flex flex-col text-[18px]"
        >
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Название:</label>
            <label class="ml-[30px] font-medium font-[InterItalic]">Долина ветвей</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Номер лота:</label>
            <label class="ml-[30px]">Лот №123</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Автор:</label>
            <label class="ml-[30px] border-b border-black font-[InterItalic]">Даниил Даниил</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Категория:</label>
            <label class="ml-[30px] text-[16px]">Физическое искусство</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Размеры:</label>
            <label class="ml-[30px] text-[16px]">1920 x 1080</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-extralight font-[InterItalic]">живопись</label>
          </div>
        </div>
        <div
          class="w-[400px] h-full bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px]"
        >
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Начальная ставка:</label>
            <label class="ml-[30px] font-[InterItalic]">5000₽</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Текущая ставка:</label>
            <label class="ml-[30px] font-medium">5000₽</label>
          </div>
          <div class="mt-[20px] ml-[20px] text-[16px]">
            <label class="font-[InterItalic] font-light">Дата начала:</label>
            <label class="ml-[30px] font-[InterItalic]">10:00</label>
            <label class="ml-[30px] font-[InterItalic]">29.11.2024</label>
          </div>
          <div class="mt-[20px] ml-[20px] text-[16px]">
            <label class="font-[InterItalic] font-light">Дата конца:</label>
            <label class="ml-[30px] font-[InterItalic]">10:00</label>
            <label class="ml-[30px] font-[InterItalic]">29.11.2024</label>
          </div>
          <div class="mt-[20px] ml-[20px]">
            <label class="font-[InterItalic]">Осталось до конца:</label>
            <label class="ml-[30px] text-[16px]">07 дн 00 ч 00 м</label>
          </div>
          <div class="mt-[20px] ml-[20px] flex">
            <label class="font-[InterItalic]">Предложить ставку</label>
            <input
              class="ml-[30px] w-[80px] border border-black rounded-bl-xl rounded-tr-xl text-center text-[14px]"
              placeholder="8000"
              type="text"
            />
          </div>
          <div class="flex items-center justify-center mt-[20px]">
            <button
              class="w-[90%] border border-black rounded-tl-lg rounded-br-lg pt-[4px] pb-[4px] shadow-cardImage"
            >
              Подтвердить ставку
            </button>
          </div>
        </div>
      </div>
      <div class="text-[20px] mt-[20px] font-light mb-[20px]">История ставок</div>
      <div
        class="w-(calc(100%-30px)) h-[260px] bg-white shadow-container rounded-2xl relative flex flex-col text-[18px] mr-[30px] items-center overflow-x-hidden overflow-y-auto scrollingbox"
      >
        <table class="w-[90%] border-separate border-spacing-y-3">
          <thead>
            <tr class="text-[12px]">
              <th scope="col">Пользователь</th>
              <th scope="col">Ставка</th>
              <th scope="col">Время</th>
              <th scope="col">Дата</th>
            </tr>
          </thead>
          <tbody class="mt-[10px]">
            <tr v-for="i in 8" :key="i" class="text-center shadow-card rounded-lg">
              <td>Пользователь</td>
              <td>6000₽</td>
              <td>10:00</td>
              <td>21.12.2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scrollingbox {
  scrollbar-color: rgb(0, 0, 0) transparent;
  scrollbar-width: thin;
}
</style>
