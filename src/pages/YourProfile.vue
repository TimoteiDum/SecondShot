<template>
  <div class="min-h-screen flex items-start justify-center pt-24">
    <div class="w-full max-w-2xl bg-white/90 rounded-xl shadow p-8">
      <h2 class="text-3xl font-bold mb-4">Your Profile</h2>
      <p class="text-gray-700 mb-6">Welcome back, <strong>{{ userEmail }}</strong></p>
      <div class="flex gap-4">
        <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Log out</button>
        <router-link to="/" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const raw = localStorage.getItem('user')
let parsed
try {
  parsed = raw ? JSON.parse(raw) : null
} catch (e) {
  parsed = null
}
const userEmail = ref(parsed && parsed.email ? parsed.email : 'Guest')

function handleLogout() {
  try {
    localStorage.removeItem('user')
  } catch (e) {
    // ignore
  }
  // navigate home and reload to ensure nav updates
  router.push('/')
  window.location.reload()
}
</script>
