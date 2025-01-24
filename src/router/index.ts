import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('@/pages/MainPage.vue'),
    },
    {
      path: '/auctions',
      name: 'AuctionPage',
      component: () => import('@/pages/AuctionPage.vue'),
    },
    {
      path: '/artists',
      name: 'ArtistPage',
      component: () => import('@/pages/ArtistPage.vue'),
    },
    {
      path: '/paintings',
      name: 'PaintingsPage',
      component: () => import('@/pages/PaintingsPage.vue'),
    },
    {
      path: '/lot',
      name: 'AuctionLotPage',
      component: () => import('@/pages/AuctionLotPage.vue'),
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('@/pages/ProfilePage.vue'),
    },
    {
      path: '/addPainting',
      name: 'AddPaintingPage',
      component: () => import('@/pages/AddPaintingPage.vue'),
    },
    {
      path: '/addLot',
      name: 'AddAuctionLotPage',
      component: () => import('@/pages/AddAuctionLotPage.vue'),
    },
    {
      path: '/profileSettings',
      name: 'ProfileSettingsPage',
      component: () => import('@/pages/ProfileSettingsPage.vue'),
    },
    {
      path: '/chat',
      name: 'ChatPage',
      component: () => import('@/pages/ChatPage.vue'),
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('@/pages/RegisterPage.vue'),
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('@/pages/AuthPage.vue'),
    },
  ],
})

export default router
