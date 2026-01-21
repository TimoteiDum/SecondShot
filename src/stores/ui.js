import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showLogin: false,
    showSidebar: false
  }),
  getters: {
    isLoginOpen: (state) => !!state.showLogin,
    isSidebarOpen: (state) => !!state.showSidebar
  },
  actions: {
    openLogin() { this.showLogin = true },
    closeLogin() { this.showLogin = false },
    toggleSidebar() { this.showSidebar = !this.showSidebar }
  }
})
