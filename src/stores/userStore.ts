import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { id: string; firstname: string; mail: string; birthday_date: string },
  }),
  actions: {
    setUser(userData: { id: string; firstname: string; mail: string; birthday_date: string }) {
      this.user = userData
    },
    clearUser() {
      this.user = null
    },
  },
})
