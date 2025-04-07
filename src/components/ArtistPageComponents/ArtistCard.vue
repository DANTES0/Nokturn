<script setup lang="ts">
import { useScreenWidth } from '@/scripts/ScriptWindowSize'
import { computed, onMounted, ref, watch } from 'vue'
import AvatarCanvas from '../AvatarCanvas.vue'
import { config } from '@/scripts/config'
import PaintsCard from '../PaintsCard.vue'

interface Props {
  id: string
  photo: string
  firstname: string
  lastname?: string
  specialinfo: string
  art?: [
    {
      id: number
      image: string
      name: string
    },
  ]
}

const props = withDefaults(defineProps<Props>(), {
  id: '0',
  photo: '',
  firstname: 'Даниил',
  lastname: 'Осенний лист',
  specialinfo: 'standart',
})

const isMobile = useScreenWidth(1300)

const sizeArrayImage = ref(5)

watch(isMobile, () => {
  if (isMobile.value) {
    sizeArrayImage.value = 3
  } else sizeArrayImage.value = 5
})
const linkProfile = computed(() => `/profile/${props.id}`)
onMounted(() => {
  if (isMobile.value) {
    sizeArrayImage.value = 3
  }
  console.log(props.art)
})
</script>

<template>
  <div
    class="bg-white dark:text-[#CCCCCC] dark:bg-[#1c1c1c] shadow-card dark:shadow-none dark:border dark:border-[#383838] p-[30px] rounded-2xl flex w-full"
  >
    <div class="flex items-center mobile:flex-row flex-col">
      <RouterLink :to="linkProfile" class="w-24 h-24" v-if="props.photo">
        <img
          class="w-24 h-24 rounded-full shadow-card object-cover"
          :src="config.url + props.photo"
        />
      </RouterLink>
      <RouterLink :to="linkProfile" class="w-24 h-24" v-else>
        <AvatarCanvas class="rounded-full shadow-card" :size="96" :name="props.firstname" />
      </RouterLink>
      <div
        class="flex flex-col mobile:ml-[20px] mobile:max-w-[300px] max-w-[200px] w-[200px] gap-3 mobile:border-r mobile:border-black dark:mobile:border-[#383838] mobile:pr-[10px]"
      >
        <span class="mt-[10px] text-[18px] mobile:text-start text-center"
          >{{ props.firstname }} {{ props.lastname }}</span
        >
        <span class="mb-[10px] text-[14px] font-light mobile:text-start text-center">{{
          props.specialinfo
        }}</span>
      </div>
    </div>
    <div class="flex w-full ml-[20px] gap-4 items-center justify-center mobile:flex-row flex-col">
      <div v-for="item in props.art" :key="item.id" class="w-[196px] h-[196px] aspect-square">
        <PaintsCard
          :photo="item.image"
          :user-id="props.id"
          :photo-name="item.name"
          :user-photo="props.photo"
          :username="props.firstname"
          :style-card="'profile'"
        />
      </div>
      <!-- <img
          v-if="item.image"
          class="mobile:w-[11vw] w-[100px] h-auto rounded-2xl max-w-[160px] max-h-[160px]"
          :src="config.url + item.image"
        /> -->
    </div>
  </div>
</template>

<style scoped></style>
