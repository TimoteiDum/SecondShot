<template>
  <div class="min-h-screen pt-28 px-6 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-4">Search results for "{{ query }}"</h2>

      <div v-if="loading" class="py-12 text-center text-gray-500">Searching...</div>

      <div v-else>
        <div v-if="results.length === 0" class="py-12 text-center text-gray-600">
          No products found. Try a different search.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="p in results" :key="p.id" :product="p" @add-to-cart="onAddToCart" @view-details="onViewDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/layout/ProductCard.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()

const query = ref((route.query.q || '').toString())
const loading = ref(false)

const results = computed(() => products.filteredProducts)

function doSearch(q) {
  loading.value = true
  products.applyFilter(q)
  // small delay to feel responsive (could be removed)
  setTimeout(() => { loading.value = false }, 120)
}

onMounted(() => {
  doSearch(query.value)
})

watch(() => route.query.q, (q) => {
  query.value = (q || '').toString()
  doSearch(query.value)
})

function onAddToCart(product) {
  cart.addItem(product)
}

function onViewDetails(product) {
  // simple: navigate to product page or open modal — keep existing behaviour
  // For now we just console log; UI can wire a modal later.
  console.log('view details', product && product.id)
}
</script>

<style scoped>
/* minimal page styles; product card handles its own styling */
</style>
