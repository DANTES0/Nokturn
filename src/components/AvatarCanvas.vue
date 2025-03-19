<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  name: string
  size?: number
  style?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  style: 'normal',
})

const avatarSrc = ref<string>('')

const generateAvatar = () => {
  const canvas = document.createElement('canvas')
  canvas.width = props.size * 2
  canvas.height = props.size * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const hash = Array.from(props.name).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  // const color = `hsl(${hash % 360}, 70%, 50%)`
  // ctx.fillStyle = color
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  // gradient.addColorStop(0, color)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(1, '#FFFFFF') // Полупрозрачный белый
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = `${canvas.width / 2}px Arial`
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(props.name.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2)

  avatarSrc.value = canvas.toDataURL()
}

onMounted(generateAvatar)
</script>

<template>
  <img
    :src="avatarSrc"
    :alt="`Avatar of ${name}`"
    :width="size"
    :height="size"
    :class="{
      'rounded-tl-lg rounded-br-lg': props.style == 'header',
      'rounded-full': props.style == 'normal',
    }"
  />
</template>
