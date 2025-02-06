<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import MobileNavBar from './components/MobileNavBar.vue'
import { useScreenWidth } from './assets/scripts/ScriptWindowSize'
import { onMounted } from 'vue'
import getCurrentUser from './assets/scripts/middlewareAuth'
import { useUserStore } from './stores/userStore'
const route = useRoute()
const router = useRouter()
const isMobile = useScreenWidth(800)
const userStore = useUserStore()
onMounted(async () => {
  const token = localStorage.getItem('token')

  if (token) {
    const user = await getCurrentUser(token)
    if (user) {
      userStore.setUser(user)
    } else {
      router.push('/auth')
    }
  } else {
    router.push('/auth')
  }
})
</script>

<template>
  <div class="flex items-center justify-center flex-col">
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
