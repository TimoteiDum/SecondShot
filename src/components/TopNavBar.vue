<template>
  <div class="w-full bg-black py-3 px-8 flex items-center justify-between z-50">
    <!-- Hamburger Menu Button -->
    <button
      @click="$emit('open-menu')"
      class="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-3xl shadow hover:bg-gray-700 transition"
      aria-label="Open menu"
    >
      <i class="bi bi-list"></i>
    </button>
    <!-- Logo and SearchBar -->
    <div class="flex-1 flex justify-center items-center gap-4">
      <img src="/logo1.png" alt="Logo" class="h-16 w-auto" />
      <SearchBar v-model="search" placeholder="Search products..." class="max-w-5xl w-full" />
    </div>
    <!-- Login button (right) -->
    <button
      @click="$emit('open-login')"
      class="w-12 h-12 rounded-full bg-gray-500 text-gray-800 flex items-center justify-center text-2xl shadow hover:bg-gray-300 transition"
    >
      <i class="bi bi-person"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'

const props = defineProps({
  search: String
})
const emit = defineEmits(['update:search', 'open-menu', 'open-login'])

const search = ref(props.search || '')

watch(search, value => emit('update:search', value))
</script>