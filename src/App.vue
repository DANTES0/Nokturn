<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import MobileNavBar from './components/MobileNavBar.vue'
import { useScreenWidth } from './scripts/ScriptWindowSize'
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from './stores/userStore'
import { disconnectSocket } from '@/scripts/socket'
import { useThemeStore } from './stores/themeStore'
const route = useRoute()
const isMobile = useScreenWidth(800)
const userStore = useUserStore()
const themeStore = useThemeStore()

onMounted(async () => {
  themeStore.initTheme()
  userStore.fetchUser()
  window.addEventListener('beforeunload', disconnectSocket)
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', disconnectSocket)
})
</script>

<template>
  <div class="flex items-center justify-center flex-col dark:bg-[#1C1C1C]">
    <NavBar v-if="!isMobile && route.path !== '/register' && route.path !== '/auth'"></NavBar>
    <div></div>
    <MobileNavBar v-if="route.path !== '/register' && route.path !== '/auth' && isMobile" />
    <!-- <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
    <RouterView />
  </div>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />


    </div>
  </header>

   -->
</template>

<style>
/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */
</style>
