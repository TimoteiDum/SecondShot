<template>
  <div class="cameras-page">
    <TopNavBar :isAuthenticated="isAuthenticated" theme="accent" @open-menu="toggleSidebar" @open-login="openLogin" />
    <SidebarMenu :show="ui.showSidebar" @close="toggleSidebar" />

    <main class="min-h-screen pt-24 px-6 cameras-hero-bg">
      <div class="max-w-4xl mx-auto py-8 relative z-10">
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
            <div class="pointer-events-auto inline-flex items-center gap-4 bg-white/6 backdrop-blur-lg border border-white/10 rounded-full px-5 py-3 shadow-2xl">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 flex items-center justify-center text-white">
                <i class="bi bi-cart-check-fill"></i>
              </div>
              <div class="text-left">
                <div class="text-sm text-gray-200">Added to cart</div>
                <div class="text-white font-semibold">{{ lastAddedTitle }}</div>
              </div>
            </div>
          </div>
        </transition>

        <!-- details modal (animated) -->
        <transition name="dialog">
          <div v-if="showDetails" class="fixed inset-0 z-60 flex items-center justify-center px-4">
            <!-- glassy overlay: frosted backdrop similar to SidebarMenu panel -->
            <div class="absolute inset-0 glassy-overlay" @click="closeDetails"></div>
            <div class="relative details-modal max-w-2xl w-full z-20 text-white">
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
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/layout/ProductCard.vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

const products = useProductsStore()
const cart = useCartStore()
const auth = useAuthStore()
const ui = useUIStore()

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

const isAuthenticated = computed(() => auth.isAuthenticated)

function toggleSidebar() {
  if (ui && ui.toggleSidebar) ui.toggleSidebar()
  else ui.showSidebar = !ui.showSidebar
}

function openLogin() {
  if (ui && ui.openLogin) ui.openLogin()
}

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

/* glassy orange premium background for cameras page */
.cameras-hero-bg {
  position: relative;
  overflow: hidden;
  /* use the same orange→red theme as the buttons but semi-transparent for a glassy look */
  background: linear-gradient(90deg, rgba(251,146,60,0.14) 0%, rgba(249,115,22,0.12) 50%, rgba(220,38,38,0.12) 100%);
}
.cameras-hero-bg::before {
  /* blurred gradient glows matching the theme colors */
  content: '';
  position: absolute;
  inset: -25% -20% -30% -20%;
  background: radial-gradient(circle at 10% 10%, rgba(251,146,60,0.28), transparent 24%),
              radial-gradient(circle at 90% 80%, rgba(249,115,22,0.22), transparent 28%),
              radial-gradient(circle at 50% 60%, rgba(220,38,38,0.12), transparent 30%);
  filter: blur(64px) saturate(140%);
  transform: translateZ(0);
  z-index: 0;
}
.cameras-hero-bg::after {
  /* subtle glass overlay to mute and add contrast */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.06));
  mix-blend-mode: overlay;
  z-index: 1;
}

/* make page content sit above the blurred glow */
.cameras-hero-bg > .max-w-4xl { z-index: 10; position: relative; }

/* ensure translucent cards remain readable with a slightly darker tint */
.cameras-hero-bg .bg-white\/6 { background-color: rgba(10,8,6,0.12) !important; border: 1px solid rgba(255,255,255,0.04); }

/* glassy overlay and modal styling to match SidebarMenu look */
.glassy-overlay {
  /* stronger opaque tint + blur so underlying text is not readable */
  background: linear-gradient(180deg, rgba(6,6,6,0.72), rgba(12,12,12,0.66));
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  backdrop-filter: blur(18px) saturate(120%);
  border: none;
  mix-blend-mode: normal;
  z-index: 10;
}
.details-modal {
  background: rgba(255,255,255,0.06);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  backdrop-filter: blur(8px) saturate(120%);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 18px 50px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.08);
}
</style>
