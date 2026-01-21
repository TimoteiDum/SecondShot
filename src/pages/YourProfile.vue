<template>
  <div class="min-h-screen flex items-start justify-center pt-24 px-4 bg-cover bg-center relative" style="background-image: url('/background.jpg')">
    <!-- dark overlay to make the background a little darker -->
    <div class="absolute inset-0 bg-black/40 pointer-events-none"></div>
    <div class="w-full max-w-4xl bg-white/90 rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
      <!-- Sidebar -->
      <aside class="md:col-span-1 bg-transparent">
        <nav class="flex flex-col gap-2">
          <button :class="menuClass('account')" @click="active = 'account'" :aria-pressed="active === 'account'">
            <i class="bi bi-person-circle mr-3 text-lg"></i>
            <span>Account</span>
          </button>
          <button :class="menuClass('privacy')" @click="active = 'privacy'">
            <i class="bi bi-shield-lock mr-3 text-lg"></i>
            <span>Privacy</span>
          </button>
          <button :class="menuClass('notifications')" @click="active = 'notifications'">
            <i class="bi bi-bell mr-3 text-lg"></i>
            <span>Notifications</span>
          </button>
        </nav>
      </aside>

      <!-- Content -->
      <section class="md:col-span-3 bg-white p-4 rounded">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-1">Your Profile</h2>
            <p class="text-gray-700 mb-4">Welcome back, <strong>{{ userEmail }}</strong></p>
          </div>
        </div>

  <div class="mt-4">
          <div v-if="active === 'account'">
            <h3 class="text-xl font-semibold mb-2">Account</h3>
            <p class="text-gray-600">
              <router-link to="/profile/account" class="text-blue-600 underline hover:no-underline">Manage your account details such as name, email and shipping address.</router-link>
            </p>
            <!-- Placeholder fields -->
            <div class="mt-4">
              <label class="block text-sm text-gray-600">Email</label>
              <div class="mt-1 text-gray-800 font-medium">{{ userEmail }}</div>
            </div>
          </div>

          <div v-else-if="active === 'privacy'">
            <h3 class="text-xl font-semibold mb-2">Privacy</h3>
            <p class="text-gray-600">Adjust your privacy settings and data preferences.</p>
            <!-- Placeholder content -->
            <ul class="mt-3 list-disc list-inside text-gray-700">
              <li>Profile visibility</li>
              <li>Data sharing preferences</li>
              <li>Connected apps</li>
            </ul>
          </div>

          <div v-else>
            <h3 class="text-xl font-semibold mb-2">Notifications</h3>
            <p class="text-gray-600">Control which notifications you receive.</p>
            <div class="mt-3 flex flex-col gap-3">
              <label class="flex items-center gap-3">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-gray-700">Email notifications</span>
              </label>
              <label class="flex items-center gap-3">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-gray-700">SMS notifications</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Mobile logout button (visible on small screens) -->
        <div class="mt-6 md:hidden">
          <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full">Log out</button>
        </div>
      </section>
      <!-- Logout floating button (desktop) -->
      <button @click="handleLogout" class="hidden md:inline-flex fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg items-center" aria-label="Log out">
        <i class="bi bi-box-arrow-right mr-2 text-lg"></i>
        <span>Log out</span>
      </button>
      <!-- Home floating button (desktop) - left bottom, soft contrasting color -->
      <router-link to="/" class="hidden md:inline-flex fixed bottom-6 left-6 bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-full shadow-lg items-center" aria-label="Home">
        <i class="bi bi-house-fill mr-2 text-lg"></i>
        <span>Home</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const profile = useProfileStore()
const userEmail = ref(auth.user && auth.user.email ? auth.user.email : 'Guest')
// if profile store has a name, prefer it
onMounted(() => {
  profile.loadProfile()
  if (profile.profile && profile.profile.name) {
    // prefer saved name
    if (profile.profile.name) {
      userEmail.value = profile.profile.name
    }
  } else if (auth.user) {
    userEmail.value = auth.user.email
  }
})
const active = ref('account')

onMounted(() => {
  // restore active tab from query param if present
  try {
    if (route.query && route.query.tab) {
      active.value = route.query.tab
    }
  } catch {
    // ignore
  }
})

// Sync active tab to the URL so sections are bookmarkable
watch(active, (name) => {
  try {
    const q = { ...route.query, tab: name }
    router.replace({ path: route.path, query: q })
  } catch {
    // ignore
  }
})

function menuClass(name) {
  const base = 'text-left w-full px-4 py-3 rounded flex items-center transition'
  if (active.value === name) {
    return base + ' bg-gray-100 font-semibold border-l-4 border-blue-600 text-gray-900'
  }
  return base + ' text-gray-700 hover:bg-gray-50'
}

function handleLogout() {
  // ask for confirmation first
  const ok = window.confirm('Are you sure you want to log out?')
  if (!ok) return
  try {
    auth.logout()
  } catch {
    // ignore
  }
  // navigate to the app base (forces a full reload and avoids router push/race)
  const base = import.meta && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '/'
  window.location.href = base
}
</script>
