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
  ],
})

export default router
