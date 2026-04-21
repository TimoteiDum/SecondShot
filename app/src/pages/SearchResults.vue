<template>
  <div class="min-h-screen pt-28 px-6 cameras-hero-bg">
    <div class="max-w-6xl mx-auto text-center relative z-10">
      <h2
        class="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-lg"
      >
        Search results for "{{ query }}"
      </h2>

      <div v-if="loading" class="py-12 text-center text-gray-400">Searching...</div>

      <div v-else>
        <div v-if="products.filteredProducts.length === 0" class="py-12 text-center text-gray-200">
          No products found. Try a different search.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="p in products.filteredProducts"
            :key="p.id"
            :product="p"
            @add-to-cart="onAddToCart"
            @view-details="onViewDetails"
          />
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
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useUIStore } from '../stores/ui'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()

const query = ref((route.query.q || '').toString())
const loading = ref(false)

const ui = useUIStore()

// use products.filteredProducts directly

async function doSearch(q) {
  loading.value = true
  try {
    if (!products.count) {
      await products.fetchProducts().catch(() => {})
    }
  } catch (e) {
    // ignore fetch errors
  }
  products.applyFilter(q)
  setTimeout(() => {
    loading.value = false
  }, 120)
}

onMounted(() => {
  doSearch(query.value)
})

watch(
  () => route.query.q,
  (q) => {
    query.value = (q || '').toString()
    doSearch(query.value)
  }
)

function onAddToCart(product) {
  cart.addItem(product)
  try {
    ui.showToast(product && product.title ? product.title : '')
  } catch (e) {}
}

function onViewDetails(product) {
  console.log('view details', product && product.id)
}
</script>

<style scoped>
.cameras-hero-bg {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(30, 58, 138, 0.18) 0%,
    rgba(37, 99, 235, 0.14) 50%,
    rgba(14, 165, 233, 0.12) 100%
  );
}
.cameras-hero-bg::before {
  content: '';
  position: absolute;
  inset: -22% -18% -28% -18%;
  background:
    radial-gradient(circle at 12% 18%, rgba(99, 102, 241, 0.3), transparent 22%),
    radial-gradient(circle at 88% 80%, rgba(59, 130, 246, 0.22), transparent 26%),
    radial-gradient(circle at 50% 60%, rgba(14, 165, 233, 0.16), transparent 28%);
  filter: blur(56px) saturate(140%);
  z-index: 0;
}
.cameras-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 11, 30, 0.06), rgba(2, 6, 23, 0.22));
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  backdrop-filter: blur(8px) saturate(120%);
  mix-blend-mode: overlay;
  z-index: 1;
}
.cameras-hero-bg > .max-w-6xl {
  z-index: 10;
  position: relative;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
