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
  styleCard?: string
}

const props = withDefaults(defineProps<Props>(), {
  userId: 1,
  photo: testPhoto,
  username: 'Даниил',
  photoName: 'Осенний лист',
  userPhoto: testUserPhoto,
  styleCard: 'standart',
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
      <div class="flex mb-3 items-center w-full justify-center">
        <img class="w-[25%] rounded-full aspect-square h-full" :src="props.userPhoto" />
        <div class="text-white flex flex-col justify-around ml-[16px]">
          <label class="font-medium">{{ props.username }}</label>
          <label class="font-light">{{ props.photoName }}</label>
        </div>
      </div>
    </div>
    <img
      v-if="styleCard === 'standart'"
      class="rounded-lg block w-full mb-2 object-cover"
      :src="props.photo"
    />
    <img
      v-if="styleCard === 'profile'"
      class="rounded-lg block h-full aspect-square mb-2 object-cover im"
      :src="props.photo"
    />
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(rgba(106, 106, 106, 0) 0%, rgba(0, 0, 0, 1) 90%);
}
.im {
  width: clamp(300px, 350px, 400px);
}
.tx {
  font-size: clamp(16px, 20px, 24px);
}
</style>
