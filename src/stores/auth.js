import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => (state.user ? state.user.email : '')
  },
  actions: {
    login(user) {
      this.user = user
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e) {
        // ignore
      }
    },
    logout() {
      this.user = null
      this.token = null
      try {
        localStorage.removeItem('user')
      } catch (e) {
        // ignore
      }
    },
    loadFromStorage() {
      try {
        const raw = localStorage.getItem('user')
        this.user = raw ? JSON.parse(raw) : null
      } catch (e) {
        this.user = null
      }
    }
  }
})
