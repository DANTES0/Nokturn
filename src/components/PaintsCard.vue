<script setup lang="ts">
import { ref } from 'vue'
import testPhoto from '../assets/images/test1.jpg'
import testUserPhoto from '../assets/images/test3.png'

interface Props {
  userId?: number
  photo?: string
  username?: string
  photoName?: string
  userPhoto?: string
}

const props = withDefaults(defineProps<Props>(), {
  userId: 1,
  photo: testPhoto,
  username: 'Даниил',
  photoName: 'Осенний лист',
  userPhoto: testUserPhoto,
})

const active = ref(false)
</script>

<template>
  <div
    class="w-full relative cursor-pointer"
    @mouseover="() => (active = true)"
    @mouseleave="() => (active = false)"
  >
    <div
      class="w-full h-full absolute bottom-0 transition-all duration-500 gradient rounded-lg flex items-end"
      :class="{ 'opacity-100': active, 'opacity-0': !active }"
    >
      <div class="flex mb-3 ml-[20px]">
        <img class="w-16 h-16 rounded-full" :src="props.userPhoto" />
        <div class="text-white flex flex-col justify-around ml-[20px]">
          <label class="text-[24px] font-medium">{{ props.username }}</label>
          <label class="text-[18px] font-light">{{ props.photoName }}</label>
        </div>
      </div>
    </div>
    <img class="rounded-lg block w-full mb-2" :src="props.photo" />
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(rgba(106, 106, 106, 0) 0%, rgba(0, 0, 0, 1) 90%);
}
</style>
