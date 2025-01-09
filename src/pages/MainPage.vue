<script setup lang="ts"></script>
<template>
  <div
    class="w-[90%] h-[500px] bg-white mt-[30px] shadow-container rounded-2xl relative max-w-[1382px] max-h-[80vh]"
  >
    <div class="trapezoid">
      <p>Торги художника<br />Name</p>
    </div>
    <div class="trapezoid2">
      <p>Торги художника<br />Name</p>
    </div>
  </div>
</template>

<style scoped>
.trapezoid {
  position: absolute;

  width: 60%; /* Ширина трапеции */
  height: 90%; /* Высота трапеции */
  margin-left: 30px;
  margin-top: 25px;
  background: url('../assets/images/test1.jpg');
  background-size: 100% 100%; /* Цвет фона */
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  color: white; /* Цвет текста */
  display: flex; /* Центрирование текста */
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%);
  /* Параметры clip-path:
     - 10% 0% — верхний левый угол сдвинут внутрь на 10%
     - 90% 0% — верхний правый угол сдвинут внутрь на 10%
     - 100% 100% — правый нижний угол
     - 0% 100% — левый нижний угол */
}
.trapezoid2 {
  position: absolute;
  right: 0;
  width: 60%; /* Ширина трапеции */
  height: 90%; /* Высота трапеции */
  margin-top: 25px;
  margin-right: 30px;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background: url('../assets/images/test2.jpg');
  background-size: 100% 100%; /* Цвет фона */
  color: white; /* Цвет текста */
  display: flex; /* Центрирование текста */
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
  /* Параметры clip-path:
     - 10% 0% — верхний левый угол сдвинут внутрь на 10%
     - 90% 0% — верхний правый угол сдвинут внутрь на 10%
     - 100% 100% — правый нижний угол
     - 0% 100% — левый нижний угол */
}
</style>
