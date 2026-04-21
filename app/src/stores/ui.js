import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showLogin: false,
    showSidebar: false,
    // global toast state
    toastVisible: false,
    toastTitle: '',
  }),
  getters: {
    isLoginOpen: (state) => !!state.showLogin,
    isSidebarOpen: (state) => !!state.showSidebar,
  },
  actions: {
    openLogin() {
      this.showLogin = true
    },
    closeLogin() {
      this.showLogin = false
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    showToast(title = '', ms = 2500) {
      this.toastTitle = title || ''
      this.toastVisible = true
      try {
        if (this._toastTimer) clearTimeout(this._toastTimer)
      } catch (e) {
        // ignore
      }
      this._toastTimer = setTimeout(() => {
        this.toastVisible = false
        this.toastTitle = ''
        this._toastTimer = null
      }, ms)
    },
    hideToast() {
      this.toastVisible = false
      this.toastTitle = ''
      try {
        if (this._toastTimer) clearTimeout(this._toastTimer)
      } catch {}
      this._toastTimer = null
    },
  },
})
