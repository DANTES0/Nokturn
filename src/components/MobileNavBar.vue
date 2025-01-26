<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import IconMail from './icons/IconMail.vue'
import IconGear from './icons/IconGear.vue'
import IconLogout from './icons/IconLogout.vue'
import IconUser from './icons/IconUser.vue'
import IconBell from './icons/IconBell.vue'
import IconPlus from './icons/IconPlus.vue'
import IconHome from './icons/IconHome.vue'
import IconAuc from './icons/IconAuc.vue'
import IconPainter from './icons/IconPainter.vue'
import IconArtists from './icons/IconArtists.vue'

const isMenuOpen = ref(false)
const isProfileDropdown = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropMenu = () => {
  isProfileDropdown.value = !isProfileDropdown.value
}

const closeMenu = (event: Event) => {
  const target = event.target as HTMLElement
  const menuElement = document.querySelector('.burger-menu')
  if (menuElement && !menuElement.contains(target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div
    :class="[
      'w-full px-[10px] items-center h-[48px] border-b border-[#7A7A7A] flex justify-between relative',
    ]"
  >
    <div class="font-[LeviBrushRus] text-[20px] flex h-full items-end">Ноктюрн</div>
    <div class="flex gap-6 items-center">
      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105"
      >
        <IconPlus />
      </button>

      <button
        class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
      >
        <div
          class="w-[12px] h-[12px] bg-red-600 border border-black absolute rounded-full top-[-6px] right-[-6px]"
        ></div>
        <IconBell />
      </button>
      <RouterLink to="/chat">
        <button
          class="w-[32px] h-[32px] border-2 border-black rounded-tr-lg rounded-bl-lg flex items-center justify-center hover:scale-105 relative"
        >
          <div
            class="w-[14px] h-[14px] border border-black bg-white absolute top-[-6px] right-[-8px] flex items-center justify-center rounded-tr-[4px] rounded-bl-[4px]"
          >
            <div class="text-[9px] font-bold text-black">22</div>
          </div>
          <IconMail />
        </button>
      </RouterLink>
      <div class="h-full items-center justify-center flex" @click.stop="toggleMenu">
        <div class="flex flex-col justify-between h-[20px] cursor-pointer">
          <div class="w-[30px] h-[2px] bg-black"></div>
          <div class="w-[30px] h-[2px] bg-black"></div>
          <div class="w-[30px] h-[2px] bg-black"></div>
        </div>
      </div>
    </div>
    <Transition name="burger">
      <div
        class="bg-white w-[200px] absolute right-0 top-[48px] rounded-bl-lg shadow-container flex flex-col text-[20px] pt-[10px] z-40 burger-menu"
        v-if="isMenuOpen"
      >
        <div>
          <div class="flex items-center" @click="toggleDropMenu">
            <button
              class="w-[40px] h-[40px] border border-black rounded-tl-lg rounded-br-lg flex items-center justify-center ml-[10px]"
            >
              <!-- <IconUser /> -->
              <img
                src="../assets/images/test3.png"
                class="rounded-tl-md rounded-br-lg h-full object-cover"
                alt=""
              />
            </button>
            <div class="text-[14px]">
              <div class="ml-[10px] text-[16px]">Даниил</div>
              <div class="ml-[10px]">Ехлаков</div>
            </div>
          </div>
          <Transition name="dropdown" appear>
            <div class="flex flex-col justify-center gap-2" v-if="isProfileDropdown">
              <RouterLink to="/profile" class="ml-[10px] flex gap-2 items-center mt-[6px]">
                <IconUser />
                <div>Профиль</div>
              </RouterLink>
              <div class="ml-[10px] flex gap-2 items-center">
                <IconMail />
                <div>Сообщения</div>
              </div>
              <div class="ml-[10px] flex gap-2 items-center">
                <IconGear />
                <div>Настройки</div>
              </div>
              <div class="ml-[10px] flex gap-2 items-center">
                <IconLogout />
                <div>Выход</div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="w-full h-[1px] bg-black mt-[4px]"></div>
        <RouterLink to="/" class="flex gap-2 items-center ml-2 mt-4" @click="isMenuOpen = false">
          <IconHome />
          <div class="">Главная</div>
        </RouterLink>
        <hr class="mt-2" />
        <RouterLink
          to="/auctions"
          class="flex items-center gap-2 ml-2 mt-2"
          @click="isMenuOpen = false"
        >
          <IconAuc />
          <div class="">Аукционы</div>
        </RouterLink>
        <hr class="mt-2" />
        <RouterLink
          to="/artists"
          class="flex gap-2 items-center ml-2 mt-2"
          @click="isMenuOpen = false"
        >
          <IconArtists />
          <div class="">Художники</div>
        </RouterLink>
        <hr class="mt-2" />
        <RouterLink
          to="/paintings"
          class="flex gap-2 items-center ml-2 mt-2 mb-2"
          @click="isMenuOpen = false"
        >
          <IconPainter />
          <div class="">Работы</div>
        </RouterLink>
      </div>
    </Transition>
  </div>
  <div
    class="w-full bottom-0 left-0 fixed bg-white h-[60px] border-t border-black z-50 rounded-tl-2xl rounded-tr-2xl mob"
  >
    <nav class="mt-auto flex text-[18px] justify-center px-[10px] items-center h-full gap-8">
      <RouterLink to="/" class="nav-link flex flex-col items-center">
        <IconHome class="w-8 h-8" />
        <div class="text-[12px]">Главная</div>
      </RouterLink>
      <RouterLink to="/auctions" class="nav-link flex flex-col items-center">
        <IconAuc class="w-8 h-8" />
        <div class="text-[12px]">Аукционы</div>
      </RouterLink>
      <RouterLink to="/artists" class="nav-link flex flex-col items-center">
        <IconArtists class="w-8 h-8" />
        <div class="text-[12px]">Художники</div>
      </RouterLink>
      <RouterLink to="/paintings" class="flex flex-col items-center">
        <IconPainter class="w-8 h-8" />
        <div class="text-[12px]">Работы</div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

nav > *:hover {
  color: #4c4c4c;
}

nav a.router-link-exact-active {
  position: relative;
  color: #aaaaaa;
}

/* nav a.router-link-exact-active::after {
  position: absolute;
  content: '';
  width: 0;
  height: 2px;
  background-color: black;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: growFromCenter 0.5s ease forwards;
} */

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

.burger-enter-active,
.burger-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.burger-enter-from {
  opacity: 0;
}
.burger-enter-to {
  opacity: 1;
}
.burger-leave-from {
  opacity: 1;
}
.burger-leave-to {
  opacity: 0;
}
</style>
