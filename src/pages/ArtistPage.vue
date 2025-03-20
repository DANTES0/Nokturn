<script setup lang="ts">
import ArtistCard from '@/components/ArtistPageComponents/ArtistCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { config } from '@/scripts/config'
import type { UserType } from '@/types/UserType'
import { ref, watch, onMounted } from 'vue'

const dataUsers = ref<UserType[]>([])
const searchQuery = ref('')

let debounceTimer: number | null = null

async function getUsers(query: string = '') {
  try {
    const url = query
      ? `${config.url}/api/users/?search=${encodeURIComponent(query)}`
      : `${config.url}/api/users`
    const response = await fetch(url, { method: 'GET' })
    dataUsers.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUsers()
})

watch(searchQuery, (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    getUsers(newQuery)
  }, 500)
})
</script>

<template>
  <div class="w-[90%] mt-[30px]">
    <div class="relative mr-auto w-full max-w-[400px]">
      <input
        v-model="searchQuery"
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
