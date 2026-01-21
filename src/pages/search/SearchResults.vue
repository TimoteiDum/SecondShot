<template>
  <div class="min-h-screen pt-28 px-6 cameras-hero-bg">
    <div class="max-w-6xl mx-auto text-center relative z-10">
      <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-lg">
        Search results for "{{ query }}"
      </h2>

      <div v-if="loading" class="py-12 text-center text-gray-400">Searching...</div>

      <div v-else>
        <div v-if="results.length === 0" class="py-12 text-center text-gray-200">
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
defineOptions({ name: 'SearchResultsPage' })
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/layout/ProductCard.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()

const query = ref((route.query.q || '').toString())
const loading = ref(false)

const ui = useUIStore()

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
  // add to cart through store
  cart.addItem(product)
  // show global toast via ui store (TopNavBar displays it)
  try { ui.showToast(product && product.title ? product.title : '') } catch (e) { /* ignore */ }
}

function onViewDetails(product) {
  // simple: navigate to product page or open modal — keep existing behaviour
  // For now we just console log; UI can wire a modal later.
  console.log('view details', product && product.id)
}
</script>

<style scoped>
/* Reuse a simplified version of the Cameras hero glassy background so search results match the product pages */
.cameras-hero-bg {
  position: relative;
  overflow: hidden;
  /* bluish glassy base */
  background: linear-gradient(90deg, rgba(96,165,250,0.08) 0%, rgba(59,130,246,0.06) 50%, rgba(14,165,233,0.06) 100%);
}
.cameras-hero-bg::before {
  content: '';
  position: absolute;
  inset: -20% -15% -25% -15%;
  background: radial-gradient(circle at 15% 20%, rgba(96,165,250,0.22), transparent 24%),
              radial-gradient(circle at 85% 75%, rgba(59,130,246,0.16), transparent 28%),
              radial-gradient(circle at 50% 60%, rgba(14,165,233,0.10), transparent 30%);
  filter: blur(48px) saturate(120%);
  z-index: 0;
}
.cameras-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(6,11,30,0.06));
  mix-blend-mode: overlay;
  z-index: 1;
}
.cameras-hero-bg > .max-w-6xl { z-index: 10; position: relative; }

/* toast animation */
.toast-enter-active, .toast-leave-active { transition: all 260ms cubic-bezier(.2,.9,.2,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-6px) scale(.98); }
.toast-enter-to, .toast-leave-from { opacity: 1; transform: translateY(0) scale(1); }
</style>
