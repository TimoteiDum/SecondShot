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
    <div>
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
import { ref, watch, computed } from 'vue'
import SearchBar from '@/components/inputs/SearchBar.vue'

const props = defineProps({
  search: String,
  isAuthenticated: { type: Boolean, default: false }
})
const emit = defineEmits(['update:search', 'open-menu', 'open-login'])

const search = ref(props.search || '')
const isAuthenticated = props.isAuthenticated

const trimmedSearch = computed({
  get: () => search.value,
  set: v => { search.value = v.trimStart() }
})

watch(search, value => emit('update:search', value))
</script>
