// screenUtils.ts

import { ref } from 'vue'

/**
 * Функция для отслеживания ширины экрана и возврата состояния, если оно соответствует заданной ширине.
 * @param targetWidth - ширина, на которую мы хотим проверить.
 * @returns {boolean} - true если ширина экрана соответствует targetWidth.
 */
export function useScreenWidth(targetWidth: number) {
  const isTargetWidth = ref(window.innerWidth < targetWidth)

  // Функция для обновления состояния при изменении ширины экрана
  const checkScreenWidth = () => {
    isTargetWidth.value = window.innerWidth < targetWidth
  }

  // Добавляем слушатель события resize
  window.addEventListener('resize', checkScreenWidth)

  // Возвращаем реактивное состояние
  return isTargetWidth
}
