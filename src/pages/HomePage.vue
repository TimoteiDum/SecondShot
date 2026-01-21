<template>
  <div class="home-page relative min-h-screen w-full flex">
    <SidebarMenu :show="showSidebar" @close="showSidebar = false" />

    <div class="flex-1 relative">
      <TopNavBar
        :search="search"
        :is-authenticated="isAuthenticated"
        @update:search="search = $event"
        @open-menu="showSidebar = true"
        @open-login="openLogin"
      />

      <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <div class="relative z-20 flex flex-col items-center justify-start min-h-screen pt-24">
        <h1 class="baskerville text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-lg text-center">
          {{ welcomeComputed }}
        </h1>
        <div class="flex flex-col items-center mt-40">
          <LabelText class="mb-8">
            <!-- gradient label matching the Shop title -->
            <template #label>
              <span class="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-md">
                Buy, Sell & Trade
              </span>
            </template>

            <!-- premium subtitle using default slot -->
            <template #default>
              <span class="text-xl sm:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-md">
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

      <Modal v-model="showLogin" @close="closeLogin">
        <LoginModal v-if="showLogin" @close="closeLogin" />
      </Modal>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'HomePage' })
import { ref, computed, onMounted } from 'vue'
import LoginModal from '../pages/LoginModal.vue'
import Modal from '@/components/layout/Modal.vue'
import LabelText from '@/components/layout/LabelText.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  welcomeMessage: {
    type: String,
    default: 'Welcome to SecondShot'
  }
})

const emit = defineEmits(['buy', 'sell'])

const showLogin = ref(false)
const showSidebar = ref(false)
const search = ref('')
const auth = useAuthStore()
const isAuthenticated = computed(() => auth.isAuthenticated)

const welcomeComputed = computed(() => {
  // Always show the welcome message; do not echo the search term in the heading
  return props.welcomeMessage || 'Welcome to SecondShot'
})

function openLogin() {
  showLogin.value = true
}
function closeLogin() {
  showLogin.value = false
  // ensure auth store is loaded from storage (login writes through auth store)
  auth.loadFromStorage()
}

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // If we arrived with ?openLogin=1 open the login modal and remove the query param
  try {
    if (route.query && route.query.openLogin) {
      showLogin.value = true
      const q = { ...route.query }
      delete q.openLogin
      router.replace({ path: route.path, query: q })
    }
  } catch {
    // ignore
  }
})

// Watch for route query changes to open the login modal reactively
import { watch, onUnmounted } from 'vue'
let storageHandler = null
watch(() => route.query.openLogin, (open) => {
  try {
    if (open) {
      showLogin.value = true
      const q = { ...route.query }
      delete q.openLogin
      router.replace({ path: route.path, query: q })
    }
  } catch {
    // ignore
  }
})

// React to auth changes made in other tabs/windows and keep isAuthenticated reactive
storageHandler = (e) => {
  if (e.key === 'user') {
    // reload auth info in other tabs
    auth.loadFromStorage()
  }
}
window.addEventListener('storage', storageHandler)

// Watch local isAuthenticated to do any side-effects (placeholder)
watch(isAuthenticated, () => {
  // Example side-effect: log or trigger UI refresh
  // console.log('auth changed', val)
}, { immediate: false })

onUnmounted(() => {
  if (storageHandler) window.removeEventListener('storage', storageHandler)
})

function handleBuy() {
  // navigate to shop
  router.push('/shop')
  emit('buy')
}
function handleSell() {
  // navigate to signup to encourage users to sign up before selling
  router.push('/signup')
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