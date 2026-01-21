import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {
      name: '',
      address: ''
    }
  }),
  getters: {
    hasProfile: (state) => !!(state.profile && (state.profile.name || state.profile.address)),
    fullName: (state) => (state.profile && state.profile.name ? state.profile.name : ''),
    profileComplete: (state) => !!(state.profile && state.profile.name && state.profile.address),
    addressLine: (state) => (state.profile && state.profile.address ? state.profile.address : '')
  },
  actions: {
    saveProfile(payload) {
      this.profile = { ...this.profile, ...payload }
      try {
        localStorage.setItem('profile', JSON.stringify(this.profile))
      } catch {
        // ignore
      }
    },
    loadProfile() {
      try {
        const raw = localStorage.getItem('profile')
        this.profile = raw ? JSON.parse(raw) : { name: '', address: '' }
      } catch {
        this.profile = { name: '', address: '' }
      }
    }
  }
})
