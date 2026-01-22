<template>
  <div class="min-h-screen flex items-start justify-center pt-24 px-4 bg-cover bg-center relative" style="background-image: url('/background.jpg')">
  <div class="absolute inset-0 bg-black/40 pointer-events-none"></div>
  <div class="w-full max-w-4xl profile-panel p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
      
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

  <section class="md:col-span-3 profile-content p-4 rounded">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-1">Your Profile</h2>
            <p class="mb-4">Welcome back, <strong>{{ userEmail }}</strong></p>
          </div>
        </div>

  <div class="mt-4">
          <div v-if="active === 'account'">
            <h3 class="text-xl font-semibold mb-2">Account</h3>
            <p>
              <router-link to="/profile/account" class="underline hover:no-underline" style="color: #c7b3ff">Manage your account details such as name, email and shipping address.</router-link>
            </p>
            
            <div class="mt-4">
              <label class="block text-sm">Email</label>
              <div class="mt-1 font-medium">{{ userEmail }}</div>
            </div>
          </div>

          <div v-else-if="active === 'privacy'">
            <h3 class="text-xl font-semibold mb-2">Privacy</h3>
            <p>Adjust your privacy settings and data preferences.</p>
            
            <ul class="mt-3 list-disc list-inside">
              <li>Profile visibility</li>
              <li>Data sharing preferences</li>
              <li>Connected apps</li>
            </ul>
          </div>

          <div v-else>
            <h3 class="text-xl font-semibold mb-2">Notifications</h3>
            <p>Control which notifications you receive.</p>
            <div class="mt-3 flex flex-col gap-3">
              <label class="flex items-center gap-3">
                <input type="checkbox" class="form-checkbox" />
                <span>Email notifications</span>
              </label>
              <label class="flex items-center gap-3">
                <input type="checkbox" class="form-checkbox" />
                <span>SMS notifications</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-6 md:hidden">
          <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full">Log out</button>
        </div>
      </section>
      
      <button @click="handleLogout" class="hidden md:inline-flex fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg items-center" aria-label="Log out">
        <i class="bi bi-box-arrow-right mr-2 text-lg"></i>
        <span>Log out</span>
      </button>
      
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
onMounted(() => {
  profile.loadProfile()
  if (profile.profile && profile.profile.name) {
    if (profile.profile.name) {
      userEmail.value = profile.profile.name
    }
  } else if (auth.user) {
    userEmail.value = auth.user.email
  }
})
const active = ref('account')

onMounted(() => {
  try {
    if (route.query && route.query.tab) {
      active.value = route.query.tab
    }
  } catch {
  }
})

watch(active, (name) => {
  try {
    const q = { ...route.query, tab: name }
    router.replace({ path: route.path, query: q })
  } catch {
  }
})

function menuClass(name) {
  const base = 'text-left w-full px-4 py-3 rounded flex items-center transition'
  if (active.value === name) {
    return base + ' active-item'
  }
  return base + ' text-white/80 hover:bg-white/4'
}

function handleLogout() {
  const ok = window.confirm('Are you sure you want to log out?')
  if (!ok) return
  try {
    auth.logout()
  } catch {
  }
  const base = import.meta && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '/'
  window.location.href = base
}
</script>

<style scoped>
.profile-panel {
  position: relative;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  backdrop-filter: blur(10px) saturate(130%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 50px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
  border-radius: 1rem;
  color: #eef2ff;
}
.profile-content { background: transparent; color: #eef2ff }
.profile-panel h2, .profile-panel h3 { color: #ffffff }
.profile-panel p, .profile-panel li, .profile-panel label, .profile-panel span { color: rgba(255,255,255,0.85) }

.profile-panel .form-checkbox { accent-color: #7c3aed }

.profile-panel button {
  background: transparent;
  color: rgba(255,255,255,0.85);
}
.profile-panel button:hover { background: rgba(255,255,255,0.03) }
.profile-panel .active-item {
  background: linear-gradient(90deg, rgba(199,179,255,0.06), rgba(96,165,250,0.03));
  border-left: 4px solid rgba(124,58,237,0.9);
  color: #fff;
  font-weight: 600;
}

.profile-panel .fixed[aria-label="Log out"] { background: linear-gradient(90deg,#ef4444,#dc2626) }
.profile-panel .fixed[aria-label="Home"] { background: linear-gradient(90deg,#0891b2,#0ea5b7) }
</style>
