<template>
  <div class="cameras-page">
  <TopNavBar :isAuthenticated="auth.isAuthenticated" theme="accent" @open-menu="toggleSidebar" @open-login="openLogin" />
    <SidebarMenu :show="ui.showSidebar" @close="toggleSidebar" />

    <main class="min-h-screen pt-24 px-6 cameras-hero-bg">
      <div class="max-w-4xl mx-auto py-8 relative z-10">
        <div class="mb-6 text-center">
          <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-lg">
            Cameras
          </h1>
          <p class="mt-3 text-lg sm:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-500 to-red-500/90">
            Browse cameras available for sale.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <ProductCard v-for="product in products.byCategory('Cameras').slice(0, 3)" :key="product.id" :product="product" @add-to-cart="addToCart" @view-details="viewDetails" />
        </div>

        
        
        <transition name="dialog">
          <div v-if="showDetails" class="fixed inset-0 z-60 flex items-center justify-center px-4">
            
            <div class="absolute inset-0 glassy-overlay" @click="closeDetails"></div>
            <div class="relative details-modal max-w-2xl w-full z-20 text-white">
              <div class="flex items-start gap-4">
                <img :src="lastViewedProduct.image || '/camera.jpg'" alt="" class="w-40 h-28 object-contain object-center rounded-md bg-black/6 p-1" />
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
defineOptions({ name: 'CamerasPage' })
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

onMounted(async () => {
  try {
    await products.fetchProducts()
  } catch {
  }
})

// use products.byCategory(...) and auth.isAuthenticated directly to avoid extra computed

function toggleSidebar() {
  if (ui && ui.toggleSidebar) ui.toggleSidebar()
  else ui.showSidebar = !ui.showSidebar
}

function openLogin() {
  if (ui && ui.openLogin) ui.openLogin()
}

const showDetails = ref(false)
const lastViewedProduct = ref({})

function addToCart(p) {
  cart.addItem({ id: p.id, title: p.title, price: p.price, qty: 1 })
  try { ui.showToast(p && p.title ? p.title : '') } catch (e) { }
}

function viewDetails(p) {
  lastViewedProduct.value = p
  showDetails.value = true
}

function closeDetails() {
  showDetails.value = false
  lastViewedProduct.value = {}
}

watch(() => products.byCategory('Cameras'), (val) => {
  if (!val || val.length === 0) {
    products.fetchProducts().catch(() => {})
  }
})

watch(() => cart.items.length, (n) => {
  console.log('Cart now has', n, 'items')
})

 
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

.toast-enter-active, .toast-leave-active { transition: all 260ms cubic-bezier(.2,.9,.2,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-6px) scale(.98); }
.toast-enter-to, .toast-leave-from { opacity: 1; transform: translateY(0) scale(1); }

.cameras-hero-bg {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, rgba(251,146,60,0.14) 0%, rgba(249,115,22,0.12) 50%, rgba(220,38,38,0.12) 100%);
}
.cameras-hero-bg::before {
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
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.06));
  mix-blend-mode: overlay;
  z-index: 1;
}

.cameras-hero-bg > .max-w-4xl { z-index: 10; position: relative; }

.cameras-hero-bg .bg-white\/6 { background-color: rgba(10,8,6,0.12) !important; border: 1px solid rgba(255,255,255,0.04); }

.glassy-overlay {
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
