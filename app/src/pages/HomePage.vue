<template>
  <div class="home-page relative min-h-screen w-full flex">
    <SidebarMenu :show="showSidebar" @close="showSidebar = false" />

    <div class="flex-1 relative">
      <TopNavBar
        :search="search"
        :is-authenticated="auth.isAuthenticated"
        @update:search="search = $event"
        @open-menu="showSidebar = true"
      />

      <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <div class="relative z-20 flex flex-col items-center justify-start min-h-screen pt-24">
        <h1
          class="baskerville text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-lg text-center"
        >
          {{ welcomeMessage || 'Welcome to SecondShot' }}
        </h1>
        <div class="flex flex-col items-center mt-40">
          <LabelText class="mb-8">
            <template #label>
              <span
                class="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-md"
              >
                Buy, Sell & Trade
              </span>
            </template>

            <template #default>
              <span
                class="text-xl sm:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-md"
              >
                Quality Used Cameras & Photo Gear
              </span>
            </template>
          </LabelText>
          <div class="flex gap-6 sm:gap-12 md:gap-24 mt-20">
            <button
              class="bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white font-extrabold py-6 sm:py-8 px-14 sm:px-16 rounded-lg shadow-[0_20px_40px_rgba(255,92,51,0.14)] text-2xl sm:text-3xl transition duration-200 ease-in-out transform hover:scale-105 hover:brightness-110 min-w-[160px] sm:min-w-[220px] md:min-w-[320px]"
              @click="handleBuy"
            >
              Buy
            </button>
            <button
              class="bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white font-extrabold py-6 sm:py-8 px-14 sm:px-16 rounded-lg shadow-[0_20px_40px_rgba(255,92,51,0.14)] text-2xl sm:text-3xl transition duration-200 ease-in-out transform hover:scale-105 hover:brightness-110 min-w-[160px] sm:min-w-[220px] md:min-w-[320px]"
              @click="handleSell"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'HomePage' })
import { ref, onMounted } from 'vue'
import LoginModal from './LoginModal.vue'
import Modal from '@/components/layout/Modal.vue'
import LabelText from '@/components/layout/LabelText.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  welcomeMessage: {
    type: String,
    default: 'Welcome to SecondShot',
  },
})

const emit = defineEmits(['buy', 'sell'])

const showSidebar = ref(false)
const search = ref('')
const auth = useAuthStore()
// use auth.isAuthenticated directly and the welcomeMessage prop in the template

import { useRouter, useRoute } from 'vue-router'
import { useUIStore } from '../stores/ui'
const router = useRouter()
const route = useRoute()
const ui = useUIStore()

onMounted(() => {
  try {
    if (route.query && route.query.openLogin) {
      if (ui && ui.openLogin) ui.openLogin()
      const q = { ...route.query }
      delete q.openLogin
      router.replace({ path: route.path, query: q })
    }
  } catch {}
})

import { watch, onUnmounted } from 'vue'
let storageHandler = null
watch(
  () => route.query.openLogin,
  (open) => {
    try {
      if (open) {
        if (ui && ui.openLogin) ui.openLogin()
        const q = { ...route.query }
        delete q.openLogin
        router.replace({ path: route.path, query: q })
      }
    } catch {}
  }
)

storageHandler = (e) => {
  if (e.key === 'user') {
    auth.loadFromStorage()
  }
}
window.addEventListener('storage', storageHandler)

// removed unused watcher for isAuthenticated (access auth.isAuthenticated directly)

onUnmounted(() => {
  if (storageHandler) window.removeEventListener('storage', storageHandler)
})

function handleBuy() {
  router.push('/shop')
  emit('buy')
}
function handleSell() {
  router.push('/sell')
  emit('sell')
}
</script>

<style scoped>
.home-page {
  background-image: url('/back.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.baskerville {
  font-family: 'Baskerville', serif;
  letter-spacing: 0.18em;
}
</style>
