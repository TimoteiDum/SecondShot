<template>
  <header class="w-full fixed top-0 left-0 right-0 z-50">
    <!-- full-bleed translucent panel -->
    <div
      :class="headerClasses"
      :style="headerStyle"
    >
      <!-- left control (edge) -->
      <div class="absolute left-6 top-1/2 -translate-y-1/2 z-30">
        <button
          @click="$emit('open-menu')"
          class="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-3xl shadow hover:shadow-md hover:bg-white/20 transition-transform duration-200 transform"
          aria-label="Open menu"
        >
          <i class="bi bi-list"></i>
        </button>
      </div>

      <!-- right controls (edge) -->
      <div class="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex items-center gap-3">
        <router-link to="/cart" class="relative flex items-center justify-center w-14 h-14 rounded-full hover:shadow-lg transition">
          <div :class="(props.theme === 'accent' ? 'w-12 h-12 bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 rounded-full flex items-center justify-center text-white shadow-sm' : 'w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-sm ring-1 ring-white/20') + ' cursor-pointer hover:shadow-md transition-shadow'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </div>
          <span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">{{ totalItems }}</span>
        </router-link>

        <div class="relative flex items-center justify-center w-14 h-14 rounded-full hover:shadow-lg transition">
          <router-link v-if="isAuthenticated" to="/profile" class="w-12 h-12 flex items-center justify-center" aria-label="Profile">
            <div :class="buttonAccent() + ' cursor-pointer hover:shadow-md transition-shadow'">
              <i class="bi bi-person"></i>
            </div>
          </router-link>

          <button
            v-else
            @click="openLogin"
            class="w-12 h-12 flex items-center justify-center"
            aria-label="Open login"
          >
            <div :class="buttonAccent() + ' cursor-pointer hover:shadow-md transition-shadow'">
              <i class="bi bi-person"></i>
            </div>
          </button>
        </div>
      </div>

      <!-- centered content inside full-bleed panel -->
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex items-center justify-center px-4 py-2">
          <div class="flex-1 flex items-center justify-center px-6">
            <router-link to="/" class="flex items-center mr-6">
              <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/logo1.png" alt="Logo" class="h-10 w-10 object-cover rounded-full" />
              </div>
            </router-link>

            <div class="flex-1 max-w-4xl">
              <SearchBar v-model="trimmedSearch" placeholder="Search products..." class="w-full" @submit="onSearchSubmit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, computed, toRef, onUnmounted } from 'vue'
import SearchBar from '@/components/inputs/SearchBar.vue'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'

const props = defineProps({
  search: String,
  isAuthenticated: { type: Boolean, default: false },
  theme: { type: String, default: 'default' }
})
const emit = defineEmits(['update:search', 'open-menu', 'open-login'])

const search = ref(props.search || '')
const isAuthenticated = toRef(props, 'isAuthenticated')

const trimmedSearch = computed({
  get: () => search.value,
  set: v => { search.value = v.trimStart() }
})

watch(search, value => emit('update:search', value))

// Persist last search to localStorage with debounce to avoid excessive writes
let persistTimer = null
watch(trimmedSearch, (val) => {
  clearTimeout(persistTimer)
  persistTimer = setTimeout(() => {
    try {
      localStorage.setItem('lastSearch', val)
    } catch (e) {
      // ignore
    }
  }, 400)
})

// Cart store for badge count
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
const ui = useUIStore()
const router = useRouter()

// theme-driven classes/styles
import { computed as vueComputed } from 'vue'
const headerClasses = vueComputed(() => {
  if (props.theme === 'accent') return 'w-full bg-gradient-to-r from-orange-400/12 via-orange-600/10 to-red-600/10 border-b border-white/8 shadow-2xl relative'
  return 'w-full bg-gradient-to-r from-white/12 via-white/10 to-white/8 border-b border-white/10 shadow-2xl relative'
})
const headerStyle = vueComputed(() => {
  if (props.theme === 'accent') return "-webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); background-color: rgba(10,8,6,0.06);"
  return "-webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); background-color: rgba(255,255,255,0.06);"
})

const buttonAccent = (cls = '') => props.theme === 'accent' ? `w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white flex items-center justify-center text-3xl shadow hover:shadow-md transition ${cls}` : `w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-3xl shadow hover:shadow-md transition ${cls}`

function openLogin() {
  // keep backward-compatible emit and also open the global UI modal
  emit('open-login')
  if (ui && ui.openLogin) ui.openLogin()
}

function onSearchSubmit(val) {
  const q = (val || trimmedSearch.value || '').toString().trim()
  if (!q) return
  // navigate to the app-level search page
  router.push({ path: '/search', query: { q } })
}

onUnmounted(() => {
  if (persistTimer) clearTimeout(persistTimer)
})
</script>
