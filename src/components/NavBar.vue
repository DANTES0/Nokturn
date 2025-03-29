<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import IconPlus from './icons/IconPlus.vue'
import IconBell from './icons/IconBell.vue'
import IconMail from './icons/IconMail.vue'
import profileImage from '../assets/images/test2.jpg'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import ModalProfile from './NavBarComponents/ModalProfile.vue'
import { useUserStore } from '@/stores/userStore'
import { config } from '@/scripts/config'
import AvatarCanvas from './AvatarCanvas.vue'
import IconAuc from './icons/IconAuc.vue'
import IconPainter from './icons/IconPainter.vue'
import { getSocket } from '@/scripts/socket'
import ModalNotification from './NavBarComponents/ModalNotification.vue'

const activeProfileModal = ref(false)
const activeAddModal = ref(false)
const activeNotificationModal = ref(false)

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const isProfileRoute = computed(() => /^\/profile(\/.*)?$/.test(route.path))

function logout() {
  userStore.logout()
  router.push('/auth')
}

onMounted(() => {
  console.log(user)
})

const unreadMessages = ref(0)
const notificationRead = ref(0) // Добавим флаг для отображения круга
const unreadNotifications = ref<any[]>([])
// const userStore = useUserStore()
// const user = computed(() => userStore.user)
const socket = getSocket()
// const socket = io('http://localhost:3000') // Укажи свой адрес сервера
const betNotifications = ref<{ lotId: number; newBid: number; timestamp: string }[]>([])
onMounted(() => {
  socket.on('notificationsReadConfirmed', (userId) => {
    console.log(`Все уведомления для пользователя ${userId} помечены как прочитанные`)

    // Обновляем локальное состояние
    unreadNotifications.value = []
    notificationRead.value = 0
  })

  const unsubscribe = watch(
    () => user.value,
    (newUser) => {
      if (user.value?.id) {
        console.log('User id exists:', newUser.id)

        socket.emit('joinUserRoom', newUser.id)

        console.log('Отправка события requestUnreadCount с id:', user.value.id)
        socket.emit('requestUnreadCount', newUser.id)
        socket.on('updateTotalUnreadCount', (count) => {
          console.log('Обновлено количество всех непрочитанных сообщений:', count)
          unreadMessages.value = count
        })

        socket.on('newNotification', (notification) => {
          console.log('⚠️ Получено уведомление о перебитой ставке:', notification)
          console.log('Уведомление о ставке', notification)
          betNotifications.value.unshift(notification)
          notificationRead.value = 1
        })

        console.log('Запрашиваем непрочитанные уведомления')
        socket.emit('requestAllNotifications', newUser.id)

        socket.on('allNotifications', (notifications) => {
          console.log('✅ Получены непрочитанные уведомления:', notifications)
          unreadNotifications.value = notifications.filter((notification) => !notification.isRead)

          notificationRead.value = unreadNotifications.value.length
          const { newBidNotifications, otherNotifications } = notifications.reduce(
            (acc, notification) => {
              if (notification.type === 'new_bid') {
                acc.newBidNotifications.push(notification)
              } else {
                acc.otherNotifications.push(notification)
              }
              return acc
            },
            { newBidNotifications: [], otherNotifications: [] },
          )
          betNotifications.value = newBidNotifications
          console.log('New Bid Notifications:', newBidNotifications)
          console.log('Other Notifications:', otherNotifications)
        })

        unsubscribe()
      } else {
        console.log('User id не найден')
      }
    },
  )
})

onUnmounted(() => {
  if (user.value?.id) {
    socket.emit('leaveUserRoom', user.value.id)
  }
  socket.off('updateTotalUnreadCount')
  socket.off('newNotification')
})

const markNotificationsAsRead = () => {
  // Отправляем запрос на сервер для пометки всех уведомлений как прочитанных
  socket.emit('markNotificationsAsRead', user.value?.id)

  // Обновляем локальное состояние: очищаем список непрочитанных уведомлений
  unreadNotifications.value = []
  unreadMessages.value = 0
}
</script>
<template>
  <Transition name="slide-down" appear>
    <ModalProfile
      v-if="activeProfileModal"
      :onLogout="logout"
      :onClose="() => (activeProfileModal = false)"
    />
  </Transition>
  <Transition name="slide-down" appear>
    <ModalNotification v-if="activeNotificationModal" :betInfo="betNotifications" />
  </Transition>
  <Transition name="slide-down" appear>
    <div
      v-if="activeAddModal"
      class="absolute z-10 bg-white w-[250px] h-[76px] shadow-container right-[272px] top-[56px] rounded-xl"
    >
      <ul class="text-[14px] flex flex-col justify-between px-[20px] py-[10px] gap-1">
        <RouterLink to="/addLot" @click="activeAddModal = false"
          ><li class="pl-1 flex items-center gap-1">
            <IconAuc class="w-[16px]" />Добавить лот
          </li></RouterLink
        >
        <hr />
        <RouterLink to="/addPainting" @click="activeAddModal = false"
          ><li class="pl-1 flex items-center gap-1">
            <IconPainter class="w-[16px]" />Добавить работу
          </li></RouterLink
        >
      </ul>
    </div>
  </Transition>
  <div
    :class="[
      'w-full laptop:px-24 mobile:px-4 items-center h-[48px] border-b border-[#7A7A7A] flex justify-between',
      { 'absolute top-0 bg-[rgba(0,0,0,0.35)] text-white': isProfileRoute },
    ]"
  >
    <RouterLink
      to="/"
      class="font-[LeviBrushRus] text-[24px] hover:text-[#4C4C4C] cursor-pointer mt-auto"
      :class="{ 'hover:text-[#DDDDDD]': isProfileRoute }"
      >Ноктюрн</RouterLink
    >
    <nav class="mr-auto mt-auto laptop:ml-[100px] mobile:ml-8 flex gap-7 text-[18px]">
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/">Главная</RouterLink>
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/auctions"
        >Аукционы</RouterLink
      >
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/artists"
        >Художники</RouterLink
      >
      <RouterLink :class="{ 'hover:!text-[#DDDDDD]': isProfileRoute }" to="/paintings"
        >Работы</RouterLink
      >
    </nav>
    <div class="flex gap-6 items-end">
      <button
        @click="
          () => {
            activeProfileModal = false
            activeNotificationModal = false
            activeAddModal = !activeAddModal
          }
        "
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105"
        :class="{ '!border-[#CCCCCC]': isProfileRoute }"
      >
        <IconPlus />
      </button>
      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
        :class="{ '!border-[#CCCCCC]': isProfileRoute }"
        @click="
          () => {
            activeProfileModal = false
            activeAddModal = false
            activeNotificationModal = !activeNotificationModal
            markNotificationsAsRead()
          }
        "
      >
        <div
          v-if="notificationRead > 0"
          class="w-[12px] h-[12px] bg-red-600 border border-black absolute rounded-full top-[-6px] right-[-6px]"
        ></div>
        <IconBell />
      </button>
      <RouterLink to="/chat">
        <button
          class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
          :class="{ '!border-[#CCCCCC]': isProfileRoute }"
        >
          <div
            v-if="unreadMessages > 0"
            class="w-[14px] h-[14px] border border-black bg-white absolute top-[-6px] right-[-8px] flex items-center justify-center rounded-tr-[4px] rounded-bl-[4px]"
          >
            <div class="text-[9px] font-bold text-black">{{ unreadMessages }}</div>
          </div>
          <IconMail />
        </button>
      </RouterLink>

      <button
        @click="
          () => {
            activeAddModal = false
            activeNotificationModal = false
            activeProfileModal = !activeProfileModal
          }
        "
        class="w-[40px] h-[40px] border-2 border-black rounded-tl-lg rounded-br-lg flex items-center justify-center"
        :class="{ '!border-[#CCCCCC]': isProfileRoute }"
      >
        <!-- <IconUser /> -->
        <img
          v-if="user?.profile_photo"
          :src="config.url + user.profile_photo"
          class="rounded-tl-md rounded-br-lg w-full h-full object-cover"
          alt=""
        />
        <AvatarCanvas
          v-if="!user?.profile_photo"
          :name="user?.firstname ?? ''"
          :size="40"
          :style="'header'"
        />
      </button>
    </div>
  </div>
</template>
<style scoped>
ul li:hover {
  background-color: #ededed;
  cursor: pointer;
  border-radius: 4px;
}
nav > *:hover {
  color: #4c4c4c;
}

nav a.router-link-exact-active {
  position: relative;
}

nav a.router-link-exact-active::after {
  position: absolute;
  content: '';
  width: 0;
  height: 2px;
  background-color: black;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: growFromCenter 0.5s ease forwards;
}

@keyframes growFromCenter {
  0% {
    width: 0;
    transform: translateX(-50%);
  }
  100% {
    width: 100%;
    transform: translateX(-50%);
  }
}

/* .slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
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
  transform: translateX(100%);
  opacity: 0;
} */

.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
