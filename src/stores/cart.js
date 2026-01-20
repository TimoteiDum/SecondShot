import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + (i.qty || 1), 0),
    totalPrice: (state) => state.items.reduce((s, i) => s + ((i.price || 0) * (i.qty || 1)), 0)
  },
  actions: {
    addItem(item) {
      const idx = this.items.findIndex(i => i.id === item.id)
      if (idx !== -1) {
        this.items[idx].qty = (this.items[idx].qty || 1) + (item.qty || 1)
      } else {
        this.items.push({ ...item, qty: item.qty || 1 })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clearCart() {
      this.items = []
    }
  }
})
