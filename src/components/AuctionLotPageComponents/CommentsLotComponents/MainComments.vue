<script setup lang="ts">
import AvatarCanvas from '@/components/AvatarCanvas.vue'
import { config } from '@/scripts/config'
import type { CommentType } from '@/types/CommentType'
import { ref } from 'vue'

const activeMainChildElements = ref(false)
const emit = defineEmits(['reply'])

const props = withDefaults(defineProps<CommentType>(), {
  id: 0,
  userId: '2213123',
  lotId: 0,
  commentsText: 'текст',
  parentId: 0,
  timeDateCreated: '123',
  isDeleted: false,
})

function formatDateTimeIntl(dateString: string) {
  const dateObj = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(dateObj)
  const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { formattedDate: formattedDate.replace(/\./g, '.'), formattedTime }
}
function handleReply() {
  emit('reply', {
    parentId: props.id,
    firstname: props.user?.firstname,
    lastname: props.user?.lastname,
  })
}
</script>

<template>
  <div class="flex text-[16px] items-center w-full mt-[30px]" v-if="!props.parentId">
    <img
      v-if="props.user?.profile_photo"
      class="rounded-full h-14 w-14 shadow-cardImage object-cover"
      :src="config.url + props.user?.profile_photo"
    />
    <AvatarCanvas
      class="shadow-cardImage"
      :name="props.user?.firstname ?? 'Аноним'"
      :size="56"
      v-else
    />
    <div class="flex flex-col ml-[20px] gap-2">
      <div class="flex items-center">
        <div class="font-light">{{ props.user?.firstname }} {{ props.user?.lastname }}</div>
        <div class="font-light text-[12px] ml-[30px]">
          {{ formatDateTimeIntl(props.timeDateCreated).formattedTime }}
        </div>
        <div class="font-light text-[12px] ml-[10px]">
          {{ formatDateTimeIntl(props.timeDateCreated).formattedDate }}
        </div>
      </div>
      <div class="text-[14px]">
        {{ props.commentsText }}
      </div>
      <div class="flex items-center gap-6">
        <div
          @click="handleReply"
          class="font-extralight text-[12px] cursor-pointer hover:text-[#444444]"
        >
          Ответить
        </div>
        <div
          @click="
            () => {
              activeMainChildElements = !activeMainChildElements
            }
          "
          class="text-[12px] cursor-pointer underline hover:text-[#5f5f5f]"
        >
          <div v-if="!activeMainChildElements && props.replies?.length != 0">
            Показать ({{ props.replies?.length }}) ответа
          </div>
          <div v-if="activeMainChildElements">скрыть ответы</div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="activeMainChildElements && props.replies?.length != 0" class="">
    <div
      class="flex items-center ml-[40px] mt-4"
      v-for="itemChild in props.replies"
      :key="itemChild.id"
    >
      <img
        class="rounded-full h-14 w-14 shadow-cardImage object-cover"
        :src="config.url + itemChild.user?.profile_photo"
      />
      <div class="flex flex-col ml-[20px] gap-2">
        <div class="flex items-center">
          <div class="font-light text-[16px]">{{ itemChild.user?.firstname }}</div>
          <div class="font-light text-[12px] ml-[30px]">
            {{ formatDateTimeIntl(props.timeDateCreated).formattedTime }}
          </div>
          <div class="font-light text-[12px] ml-[10px]">
            {{ formatDateTimeIntl(props.timeDateCreated).formattedDate }}
          </div>
        </div>
        <div class="text-[14px]">
          {{ itemChild.commentsText }}
        </div>
        <!-- <div class="font-extralight text-[12px]">Ответить</div> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
