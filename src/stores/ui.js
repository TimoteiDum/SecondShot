import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showLogin: false,
    showSidebar: false
  }),
  actions: {
    openLogin() { this.showLogin = true },
    closeLogin() { this.showLogin = false },
    toggleSidebar() { this.showSidebar = !this.showSidebar }
  }
})
