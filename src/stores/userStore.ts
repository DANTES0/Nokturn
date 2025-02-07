import { defineStore } from 'pinia'

interface User {
  id: string
  firstname: string
  mail: string
  birthday_date: string
  lastname: string
  vk_link: string
  tg_link: string
  description: string
  profile_photo: string
  profile_header_photo: string
  special_info: string
  name_visible: boolean
  rating: number
  created_at: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(userData: { id: string; firstname: string; mail: string; birthday_date: string }) {
      this.user = { ...this.user, ...userData } as User
    },
    clearUser() {
      this.user = null
    },
  },
})
