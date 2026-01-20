<template>
  <div class="w-full bg-black py-3 px-8 flex items-center justify-between z-50">
    <button
      @click="$emit('open-menu')"
      class="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-3xl shadow hover:bg-gray-700 transition"
      aria-label="Open menu"
    >
      <i class="bi bi-list"></i>
    </button>
    <div class="flex-1 flex justify-center items-center gap-4">
      <router-link to="/" class="flex items-center">
        <img src="/logo1.png" alt="Logo" class="h-16 w-auto" />
      </router-link>
        <SearchBar v-model="trimmedSearch" placeholder="Search products..." class="max-w-5xl w-full" />
    </div>
    <div class="flex items-center gap-3">
  <!-- big SearchBar is in the center; remove duplicate here -->
  <!-- Cart button with badge -->
      <router-link to="/cart" class="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
        <div class="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700">
          <!-- simple cart icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>
        <span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ totalItems }}</span>
      </router-link>

      <router-link v-if="isAuthenticated" to="/profile" class="w-12 h-12 inline-flex rounded-full bg-gray-500 text-gray-800 items-center justify-center text-2xl shadow hover:bg-gray-300 transition">
        <i class="bi bi-person"></i>
      </router-link>
      <button
        v-else
        @click="$emit('open-login')"
        class="w-12 h-12 rounded-full bg-gray-500 text-gray-800 flex items-center justify-center text-2xl shadow hover:bg-gray-300 transition"
      >
        <i class="bi bi-person"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, toRef, onUnmounted } from 'vue'
import SearchBar from '@/components/inputs/SearchBar.vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  search: String,
  isAuthenticated: { type: Boolean, default: false }
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

onUnmounted(() => {
  if (persistTimer) clearTimeout(persistTimer)
})
</script>
