<template>
  <div class="min-h-screen pt-24 px-6">
    <div class="max-w-6xl mx-auto py-8">
        <div class="mb-6">
          <h1 class="text-4xl font-extrabold">Cameras</h1>
          <p class="text-gray-400 mt-2">Browse cameras available for sale.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          <ProductCard v-for="product in cameras" :key="product.id" :product="product" @add-to-cart="addToCart" @view-details="viewDetails" />
        </div>

        <!-- premium toast shown when product added -->
        <transition name="toast">
          <div v-if="showToast" class="fixed left-1/2 top-6 transform -translate-x-1/2 z-[9999] pointer-events-none px-4">
            <div class="pointer-events-auto inline-flex items-center gap-4 toast-panel rounded-full px-5 py-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 flex items-center justify-center text-white shadow-sm">
                <i class="bi bi-cart-check-fill"></i>
              </div>
              <div class="text-left">
                <div class="text-sm text-orange-100">Added to cart</div>
                <div class="text-white font-semibold">{{ lastAddedTitle }}</div>
              </div>
            </div>
          </div>
        </transition>

      <!-- details modal (animated) -->
      <transition name="dialog">
        <div v-if="showDetails" class="fixed inset-0 z-60 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/50" @click="closeDetails"></div>
          <div class="relative bg-white/6 backdrop-blur-md rounded-xl p-6 max-w-2xl w-full z-10 text-white">
            <div class="flex items-start gap-4">
              <img :src="lastViewedProduct.image || '/camera.jpg'" alt="" class="w-48 h-36 object-cover rounded-md" />
              <div class="flex-1">
                <h3 class="text-2xl font-bold">{{ lastViewedProduct.title }}</h3>
                <p class="text-gray-300 mt-2">{{ lastViewedProduct.description }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-2xl font-extrabold">${{ lastViewedProduct.price }}</div>
                  <div class="flex items-center gap-3">
                    <button @click="addToCart(lastViewedProduct)" class="bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white px-4 py-2 rounded-md">Add to cart</button>
                    <button @click="closeDetails" class="bg-white/6 text-white px-4 py-2 rounded-md">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/layout/ProductCard.vue'

const products = useProductsStore()
const cart = useCartStore()

// ensure sample products are loaded (fetchProducts simulates an async fetch)
onMounted(async () => {
  // always refresh sample products on mount to pick up any runtime changes (e.g. updated image paths)
  try {
    await products.fetchProducts()
  } catch (e) {
    // ignore fetch errors
  }
})

// computed view of first 3 camera products
const cameras = computed(() => products.byCategory('Cameras').slice(0, 3))

// friendly confirmation state when a product is added
const lastAddedTitle = ref('')
const showToast = ref(false)
let toastTimer = null

// details modal state
const showDetails = ref(false)
const lastViewedProduct = ref({})

function addToCart(p) {
  cart.addItem({ id: p.id, title: p.title, price: p.price, qty: 1 })
  // show premium toast
  lastAddedTitle.value = p.title
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
    lastAddedTitle.value = ''
    toastTimer = null
  }, 2500)
}

function viewDetails(p) {
  lastViewedProduct.value = p
  showDetails.value = true
}

function closeDetails() {
  showDetails.value = false
  lastViewedProduct.value = {}
}

// watch cameras list for changes (example of watch usage)
watch(cameras, (val) => {
  // if no cameras are present, attempt to fetch products again
  if (!val || val.length === 0) {
    products.fetchProducts().catch(() => {})
  }
})

// watch cart items for debugging or future analytics
watch(() => cart.items.length, (n) => {
  // eslint-disable-next-line no-console
  console.log('Cart now has', n, 'items')
})

// imported ProductCard is available to the template in <script setup>
</script>

<style scoped>
.dialog-enter-active, .dialog-leave-active {
  transition: all 240ms cubic-bezier(.2,.9,.2,1);
}
.dialog-enter-from, .dialog-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(.98);
}
.dialog-enter-to, .dialog-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* toast animation */
.toast-enter-active, .toast-leave-active { transition: all 260ms cubic-bezier(.2,.9,.2,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-6px) scale(.98); }
.toast-enter-to, .toast-leave-from { opacity: 1; transform: translateY(0) scale(1); }

/* premium glassy orange toast panel */
.toast-panel {
  background: linear-gradient(135deg, rgba(255,148,78,0.12), rgba(255,69,58,0.08));
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  backdrop-filter: blur(10px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 12px 40px rgba(255,120,60,0.12);
  color: #fff;
}

.toast-panel .bi { font-size: 18px; }
</style>
