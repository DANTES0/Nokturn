<script setup lang="ts">
import { useScreenWidth } from '@/scripts/ScriptWindowSize'
import AuctionCard from '@/components/AuctionCard.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import MyButton from '@/UX/MyButton.vue'

import MyCheckBox from '@/UX/MyCheckBox.vue'
import MyInput from '@/UX/MyInput.vue'
import MySelectionInput from '@/UX/MySelectionInput.vue'
import { onMounted, ref } from 'vue'
import { config } from '@/scripts/config'
import type { lotType } from '@/types/lotType'
import formatDate from '@/scripts/formatDate'
import getUserById from '@/scripts/getUser'

const isMobile = useScreenWidth(1480)

const activeButtonFilter = ref(false)
const arrayData = ref<lotType[]>([])
const allLots = ref<lotType[]>([])
const categoryModel = ref('')
const nameLotModel = ref('')
const minStartPriceModel = ref('')
const maxStartPriceModel = ref('')
const maxCurrentPriceModel = ref('')
const minCurrentPriceModel = ref('')
const statusModel = ref(false)
async function getLotAuction() {
  try {
    const response = await fetch(
      `${config.url}/api/lot/filters/?${categoryModel.value !== '' ? 'category=' + categoryModel.value : ''}&${statusModel.value !== false ? 'lot_status=active' : ''}&${nameLotModel.value !== '' ? 'name=' + nameLotModel.value : ''}&${minStartPriceModel.value !== '' ? 'minStartPrice=' + minStartPriceModel.value : ''}&${maxStartPriceModel.value !== '' ? 'maxStartPrice=' + maxStartPriceModel.value : ''}&${minCurrentPriceModel.value !== '' ? 'minCurrentPrice=' + minCurrentPriceModel.value : ''}&${maxCurrentPriceModel.value !== '' ? 'maxCurrentPrice=' + maxCurrentPriceModel.value : ''}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      throw console.log('Не удалось получить данные о аукционе с сервера')
    } else {
      arrayData.value = await response.json()

      allLots.value = await Promise.all(
        arrayData.value.map(async (lot: lotType) => {
          if (!lot.userId) return lot
          try {
            const userData = await getUserById(lot.userId)
            return { ...lot, firstname: userData.firstname, lastname: userData.lastname }
          } catch (error) {
            console.error(`Ошибка при загрузке имени пользователя для userId: ${lot.userId}`, error)
            return { ...lot, firstname: 'Неизвестный' }
          }
        }),
      )
    }
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getLotAuction()
})
</script>
<template>
  <div class="flex justify-between w-full gap-[30px] px-[30px]">
    <div
      v-if="isMobile && !activeButtonFilter"
      @click="activeButtonFilter = !activeButtonFilter"
      class="flex items-center justify-center bg-white w-12 h-12 rounded-tr-2xl rounded-br-2xl shadow-container fixed z-40 left-0 top-16"
    >
      <IconRightArrow />
    </div>
    <Transition name="slide-right">
      <div
        v-if="activeButtonFilter || !isMobile"
        class="max-w-[350px] bg-[#FAFAFA] mt-[30px] shadow-container mb-[30px] top-[30px] flex flex-col overflow-y-scroll"
        :class="[
          { 'fixed w-full z-10  h-[75vh] left-0 rounded-tr-[32px] rounded-br-[32px]': isMobile },
          { 'sticky w-[25%] h-[90vh] rounded-[32px]': !isMobile },
        ]"
      >
        <div class="flex flex-col w-full px-[30px] flex-1">
          <div class="flex items-center mt-[20px] justify-between">
            <label class="text-[20px]">Фильтры</label>
            <div
              v-if="isMobile"
              class="bg-[#FAFAFA] w-10 h-10 rounded-full shadow-container absolute right-3 flex items-center justify-center"
            >
              <IconLeftArrow class="w-8 h-8" @click="activeButtonFilter = false" />
            </div>
          </div>
          <MyInput v-model="nameLotModel" title="Поиск" placeholder="Арбуз" class="mt-[16px]" />
          <MySelectionInput
            v-model="categoryModel"
            title="Категория"
            placeholder="Физическое искусство"
            class="mt-[30px]"
          />
          <div class="mt-[20px]">Начальная цена</div>
          <div class="flex gap-5">
            <MyInput v-model="minStartPriceModel" title="От" placeholder="100" class="mt-[14px]" />
            <MyInput
              v-model="maxStartPriceModel"
              title="До"
              placeholder="10000"
              class="mt-[14px]"
            />
          </div>
          <div class="mt-[10px]">Текущая цена</div>
          <div class="flex gap-5">
            <MyInput
              v-model="minCurrentPriceModel"
              title="От"
              placeholder="100"
              class="mt-[14px]"
            />
            <MyInput
              v-model="maxCurrentPriceModel"
              title="До"
              placeholder="10000"
              class="mt-[14px]"
            />
          </div>
          <div class="flex mt-[20px] gap-7 w-full">
            <MyCheckBox v-model="statusModel" class="w-6 h-6" />
            <label class="">Показывать текущие</label>
          </div>
          <div class="mt-[10px]">Размер картины</div>
          <div class="flex gap-5">
            <MyInput title="Длина" placeholder="100" class="mt-[14px]" />
            <MyInput title="Высота" placeholder="10000" class="mt-[14px]" />
          </div>
          <div class="w-full flex items-center justify-center mt-auto mb-[30px]">
            <MyButton
              @click="
                () => {
                  getLotAuction()
                }
              "
              title="Применить"
            />
          </div>
        </div>
      </div>
    </Transition>
    <div
      class="w-full bg-[#FAFAFA] mt-[30px] shadow-container rounded-[32px] relative mb-[30px] auc-card py-[30px] px-[30px]"
    >
      <AuctionCard
        v-for="item in allLots"
        :key="item.id"
        class="shadow-card rounded-lg"
        :id="item.id"
        :title="item.name"
        :image="item.image"
        :author="item.firstname || ''"
        :category="item.category"
        :size="item.size"
        :starting-bet="item.starting_bet.toString()"
        :begin-date="formatDate(item.begin_time_date)"
        :lot-status="item.lot_status"
      />
    </div>
  </div>
</template>
<style scoped>
.auc-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  row-gap: 2em;
  column-gap: 1em;
  justify-items: center;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
