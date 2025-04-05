<script setup lang="ts">
import { config } from '@/scripts/config'
import { type UserType } from '@/types/UserType'
import AvatarCanvas from './AvatarCanvas.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = withDefaults(defineProps<UserType>(), {})
</script>

<template>
  <div
    @click="router.push(`/profile/${props.id}`)"
    class="w-full cursor-pointer h-[320px] shadow-card dark:shadow-none dark:border-[#4b4b4b] dark:border rounded-3xl hover:scale-105 relative flex flex-col items-center max-w-[400px] ml-[20px] mr-[20px] dark:bg-[#1c1c1c]"
  >
    <div class="w-full h-[55%] bg-black flex rounded-tl-2xl rounded-tr-2xl bro">
      <img
        v-for="item in arts?.slice(0, 3)"
        :key="item.id"
        class="object-cover w-1/3 flex-1"
        :src="config.url + item.image"
      />
      <!-- <img class="object-cover w-1/3 flex-1" src="../assets/images/test1.jpg" />
      <img class="object-cover w-1/3 flex-1" src="../assets/images/test2.jpg" />
      <img class="object-cover w-1/3 flex-1" src="../assets/images/test1.jpg" /> -->
    </div>
    <img
      v-if="props.profile_photo"
      class="absolute laptop:w-22 laptop:h-22 w-20 h-20 rounded-full bg-transparent shadow-cardImage top-[35%] object-cover"
      :src="config.url + profile_photo"
    />
    <AvatarCanvas
      v-if="!props.profile_photo"
      class="absolute laptop:w-22 laptop:h-22 w-20 h-20 rounded-full bg-transparent shadow-cardImage top-[35%] object-cover"
      :name="props.firstname"
      :size="80"
    />
    <div class="mt-[40px] w-full flex flex-col gap-2">
      <span class="laptop:text-[20px] text-[16px] font-medium"
        >{{ props.firstname }} {{ props.lastname }}</span
      >
      <div class="font-light">
        {{ props.special_info }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bro img:first-child {
  border-top-left-radius: 16px;
}

.bro img:last-child {
  border-top-right-radius: 16px;
}
</style>
