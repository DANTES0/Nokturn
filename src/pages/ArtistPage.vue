<script setup lang="ts">
import ArtistCard from '@/components/ArtistPageComponents/ArtistCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { config } from '@/scripts/config'
import type { UserType } from '@/types/UserType'
import { onMounted, ref } from 'vue'
const dataUsers = ref<UserType[]>([])
async function getUsers() {
  try {
    const response = await fetch(`${config.url}/api/users/`, {
      method: 'GET',
    })
    dataUsers.value = await response.json()
  } catch (error) {
    throw console.error(error)
  }
}
onMounted(getUsers)
</script>
<template>
  <div class="w-[90%] mt-[30px]">
    <div class="relative mr-auto w-full max-w-[400px]">
      <input
        class="border border-black w-full h-[30px] rounded-bl-lg rounded-tr-lg pl-4 pr-[40px] max-w-[400px]"
        type="text"
        placeholder="Поиск"
      />
      <IconSearch class="absolute right-[8px] top-[4px]" />
    </div>
  </div>
  <div
    class="w-[90%] bg-white mt-[30px] shadow-container rounded-[32px] relative flex mb-[30px] gap-[30px] flex-col px-[30px] py-[30px] text-center items-center"
  >
    <ArtistCard
      v-for="item in dataUsers"
      :key="item.id"
      :id="item.id"
      :lastname="item.lastname"
      :firstname="item.firstname"
      :photo="item.profile_photo"
      :specialinfo="item.special_info"
      :art="item.arts"
    />
  </div>
</template>
<style scoped></style>
