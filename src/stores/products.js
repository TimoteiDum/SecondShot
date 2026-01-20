import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: ['Cameras','Video Cameras','Lenses','Accessories'],
    filter: null
  }),
  getters: {
    byCategory: (state) => (cat) => state.products.filter(p => p.category === cat),
    count: (state) => state.products.length
  },
  actions: {
    setProducts(items) {
      this.products = items
    },
    async fetchProducts() {
      // placeholder: simulate async fetch
      return new Promise((resolve) => {
        setTimeout(() => {
          const sample = [
            { id: 1, title: 'Camera A', category: 'Cameras', price: 499 },
            { id: 2, title: 'Lens B', category: 'Lenses', price: 299 }
          ]
          this.products = sample
          resolve(sample)
        }, 400)
      })
    },
    applyFilter(f) {
      this.filter = f
    }
  }
})
