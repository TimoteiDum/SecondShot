<template>
  <div class="min-h-screen flex items-start justify-center pt-24 px-4">
    <div class="w-full max-w-2xl bg-white/95 rounded-xl shadow p-6">
      <h2 class="text-2xl font-bold mb-4">Account Details</h2>
      <p class="text-gray-600 mb-6">Update your name and shipping address below.</p>

      <div v-if="success" class="mb-4 text-green-700 font-medium">Saved successfully.</div>

      <form @submit.prevent="save">
        <label class="block text-sm text-gray-600">Full name</label>
        <input v-model="form.name" class="w-full mt-1 mb-4 p-2 border rounded" placeholder="Your full name" />

        <label class="block text-sm text-gray-600">Email (read-only)</label>
        <input :value="email" disabled class="w-full mt-1 mb-4 p-2 border rounded bg-gray-100" />

        <label class="block text-sm text-gray-600">Shipping address</label>
        <textarea v-model="form.address" class="w-full mt-1 mb-4 p-2 border rounded" rows="4" placeholder="Street, city, postal code"></textarea>

        <div class="flex gap-3">
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
          <router-link to="/profile" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'

const profile = useProfileStore()
const auth = useAuthStore()

const email = ref('')
const form = ref({ name: '', address: '' })
const success = ref(false)
let autosaveTimer = null

onMounted(() => {
  // get email from auth store if available
  try {
    auth.loadFromStorage()
    email.value = auth.user && auth.user.email ? auth.user.email : ''
  } catch (e) {
    email.value = ''
  }
  // load from profile store first
  try {
    profile.loadProfile()
    if (profile.profile) {
      form.value.name = profile.profile.name || ''
      form.value.address = profile.profile.address || ''
    }
  } catch (e) {
    // fallback to localStorage
    try {
      const rawProfile = localStorage.getItem('profile')
      const p = rawProfile ? JSON.parse(rawProfile) : null
      if (p) {
        form.value.name = p.name || ''
        form.value.address = p.address || ''
      }
    } catch (e2) {
      // ignore
    }
  }
})

// Autosave the profile form to localStorage (debounced)
watch(form, (newVal) => {
  clearTimeout(autosaveTimer)
  autosaveTimer = setTimeout(() => {
    try {
      localStorage.setItem('profile', JSON.stringify(newVal))
    } catch (e) {
      // ignore storage errors
    }
  }, 700)
}, { deep: true })

onUnmounted(() => {
  if (autosaveTimer) clearTimeout(autosaveTimer)
})

function save() {
  try {
    const payload = { name: form.value.name, address: form.value.address }
    // write through profile store when available
    try {
      profile.saveProfile(payload)
    } catch (e) {
      // fallback to localStorage
      localStorage.setItem('profile', JSON.stringify(payload))
    }
    success.value = true
    setTimeout(() => (success.value = false), 2500)
  } catch (e) {
    // ignore
  }
}
</script>
