import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    // seed with a few sample products (three cameras) so pages can render immediately
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
            { id: 101, title: 'Canon EOS R6', category: 'Cameras', price: 2499, description: 'Full-frame mirrorless with in-body image stabilization', image: '/canon.jpg' },
            { id: 102, title: 'Sony A7 IV', category: 'Cameras', price: 1999, description: 'High-resolution full-frame mirrorless with advanced AF', image: '/camera.jpg' },
            { id: 103, title: 'Fujifilm X-T4', category: 'Cameras', price: 1699, description: 'APS-C mirrorless with film simulation and IBIS', image: '/camera.jpg' },
            { id: 201, title: 'Standard Zoom 24-70mm', category: 'Lenses', price: 899, description: 'Versatile zoom for everyday shooting', image: '/downlad.jpg' }
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
