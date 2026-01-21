import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => (state.user ? state.user.email : ''),
    userName: (state) => (state.user && (state.user.name || state.user.username) ? (state.user.name || state.user.username) : ''),
    initials: (state) => {
      if (!state.user || !(state.user.name || state.user.username)) return ''
      const n = (state.user.name || state.user.username).trim().split(' ')
      return n.length === 1 ? n[0].slice(0,1).toUpperCase() : (n[0].slice(0,1) + n[n.length-1].slice(0,1)).toUpperCase()
    },
    hasToken: (state) => !!state.token
  },
  actions: {
    login(user) {
      this.user = user
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch {
        // ignore
      }
    },
    logout() {
      this.user = null
      this.token = null
      try {
        localStorage.removeItem('user')
      } catch {
        // ignore
      }
    },
    loadFromStorage() {
      try {
        const raw = localStorage.getItem('user')
        this.user = raw ? JSON.parse(raw) : null
      } catch {
        this.user = null
      }
    }
  }
})
