<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PaintsCard from '@/components/PaintsCard.vue'
import type { ArtType } from '@/types/ArtTypes'
import { ref, watch } from 'vue'
import { config } from '@/scripts/config'

const dataArtCards = ref<ArtType[]>([])
const searchQuery = ref('')

let debounceTimer: number | null = null

async function getArts(query: string) {
  try {
    const response = await fetch(`${config.url}/api/art/?search=${encodeURIComponent(query)}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.log('Не удалось получить арты')
    } else {
      dataArtCards.value = await response.json()
    }
  } catch (error) {
    console.error(error)
  }
}

watch(searchQuery, (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    getArts(newQuery)
  }, 500)
})

getArts('')
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
  <div class="gallery !mt-[20px]">
    <PaintsCard
      v-for="item in dataArtCards"
      :key="item.id"
      :photo="item.image"
      :user-id="item.userId"
      :photo-name="item.name"
      :user-photo="item.user?.profile_photo"
      :username="item.user?.firstname"
    />
  </div>
</template>

<style scoped>
.gallery {
  width: min(100%, 90%);
  margin: 0 auto;
  columns: 5 200px;
  column-gap: 1em;
}
</style>
