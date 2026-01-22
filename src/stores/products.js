import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: ['Cameras','Video Cameras','Lenses','Accessories'],
    filter: null
  }),
  getters: {
    byCategory: (state) => (cat) => state.products.filter(p => p.category === cat),
    byId: (state) => (id) => state.products.find(p => p.id === id),
    count: (state) => state.products.length,
    uniqueCategories: (state) => Array.from(new Set(state.products.map(p => p.category).filter(Boolean))),
    filteredProducts: (state) => {
      if (!state.filter) return state.products
      const normalize = (s) => (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, ' ')
      const f = normalize(state.filter)
      const tokens = f.split(/\s+/).filter(Boolean)
      if (!tokens.length) return state.products
      return state.products.filter(p => {
        const hay = normalize(`${p.title || ''} ${p.description || ''} ${p.category || ''}`)
        return tokens.every(t => hay.includes(t))
      })
    },
    featured: (state) => state.products.slice(0, 4),
    priceRange: (state) => {
      if (!state.products.length) return { min: 0, max: 0 }
      const prices = state.products.map(p => p.price || 0)
      return { min: Math.min(...prices), max: Math.max(...prices) }
    }
  },
  
  actions: {
    setProducts(items) {
      this.products = items
    },
    async fetchProducts() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sample = [
            { id: 101, title: 'Canon EOS R6', category: 'Cameras', price: 2499, description: 'Full-frame mirrorless with in-body image stabilization', image: '/canon.jpg' },
            { id: 102, title: 'Sony A7 IV', category: 'Cameras', price: 1999, description: 'High-resolution full-frame mirrorless with advanced AF', image: '/sony.jpg' },
            { id: 103, title: 'Fujifilm X-T4', category: 'Cameras', price: 1699, description: 'APS-C mirrorless with film simulation and IBIS', image: '/fuji.jpg' },
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
