<script setup lang="ts">
import { computed, ref } from 'vue'
import testPhoto from '../assets/images/test1.jpg'
import testUserPhoto from '../assets/images/test3.png'
import ImageModal from './ImageModal.vue'
import { config } from '@/scripts/config'
import AvatarCanvas from './AvatarCanvas.vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const user = computed(() => userStore.user)
const route = useRoute()
interface Props {
  id?: number
  userId?: string
  photo?: string
  username?: string
  photoName?: string
  userPhoto?: string
  styleCard?: string
  getArts?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  userId: '0',
  photo: testPhoto,
  username: 'Даниил',
  photoName: 'Осенний лист',
  userPhoto: '',
  styleCard: 'standart',
})

async function deleteArt() {
  try {
    const response = await fetch(`${config.url}/api/art/${props.id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      console.log(await response.json())
      props.getArts()
      return
    } else {
      console.log('Ошибка удаления')
      return
    }
  } catch (error) {
    throw console.error(error)
  }
}

const active = ref(false)

const modalRef = ref<InstanceType<typeof ImageModal> | null>(null)

function openImage() {
  modalRef.value?.open(config.url + props.photo)
}
</script>

<template>
  <div
    class="w-full relative cursor-pointer"
    @mouseover="() => (active = true)"
    @mouseleave="() => (active = false)"
    @click="openImage"
  >
    <button
      v-if="user?.id == route.params.id && active"
      @click.stop.prevent="
        (event: Event) => {
          event.stopPropagation()
          event.preventDefault()
          deleteArt()
        }
      "
      class="z-10 pointer-events-auto absolute top-[-8px] right-[-8px] bg-white text-black text-[20px] hover:text-white shadow-container w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600"
    >
      ×
    </button>
    <div
      class="w-full h-full absolute bottom-0 transition-all duration-500 gradient rounded-lg flex items-end"
      :class="{ 'opacity-100': active, 'opacity-0': !active }"
    >
      <div class="flex mb-3 items-center w-full justify-center">
        <img
          v-if="props.userPhoto"
          class="w-[25%] rounded-full aspect-square h-full object-cover"
          :src="config.url + props.userPhoto"
        />
        <AvatarCanvas v-if="!props.userPhoto" :name="props.username" :size="50" />
        <div class="text-white flex flex-col justify-around ml-[16px]">
          <label class="font-medium">{{ props.username }}</label>
          <label class="font-light">{{ props.photoName }}</label>
        </div>
      </div>
    </div>
    <img
      v-if="styleCard === 'standart'"
      class="rounded-lg block w-full mb-2 object-cover"
      :src="config.url + props.photo"
    />
    <img
      v-if="styleCard === 'profile'"
      class="rounded-lg block h-full aspect-square mb-2 object-cover im shadow-container"
      :src="config.url + props.photo"
    />
  </div>

  <!-- <div
    v-if="isModalOpen"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50"
    @click="closeModal"
  >
    <div class="relative max-w-[90%] max-h-[90%] flex items-center justify-center">
      <img :src="props.photo" class="w-[90%] max-h-[100vh] rounded-lg" />
    </div>
    <button
      class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
      @click.stop="closeModal"
    >
      ✖
    </button>
  </div> -->
  <ImageModal ref="modalRef" />
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
