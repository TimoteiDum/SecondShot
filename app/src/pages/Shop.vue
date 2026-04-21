<template>
  <TopNavBar
    :isAuthenticated="auth.isAuthenticated"
    @open-login="openLogin"
    @open-menu="toggleSidebar"
  />
  <SidebarMenu :show="ui.showSidebar" @close="toggleSidebar" />

  <div
    class="min-h-screen pt-24 px-6 bg-cover bg-center relative"
    style="background-image: url('/camera.jpg')"
  >
    <div class="absolute inset-0 bg-black/60"></div>
    <div
      class="relative z-10 flex flex-col items-center text-center text-white pt-16 pb-28 min-h-[55vh]"
    >
      <div class="max-w-5xl w-full px-6">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-lg whitespace-nowrap"
        >
          Shop by category
        </h1>

        <div class="mx-auto w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-8 mt-8">
          <div class="flex justify-center">
            <CategoryCard
              title="Cameras"
              subtitle="DSLR, mirrorless & compact"
              :to="'/shop/cameras'"
              iconClass="bi bi-camera"
            />
          </div>
          <div class="flex justify-center">
            <CategoryCard
              title="Video Cameras"
              subtitle="Camcorders & cinema"
              :to="'/shop/videocameras'"
              iconClass="bi bi-camera-reels"
            />
          </div>
          <div class="flex justify-center">
            <CategoryCard
              title="Lenses"
              subtitle="Prime & zoom lenses"
              :to="'/shop/lenses'"
              iconClass="bi bi-stopwatch"
            />
          </div>
          <div class="flex justify-center">
            <CategoryCard
              title="Accessories"
              subtitle="Bags, tripods, batteries"
              :to="'/shop/accessories'"
              iconClass="bi bi-box-seam"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'ShopPage' })

import CategoryCard from '@/components/layout/CategoryCard.vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'

const auth = useAuthStore()
const ui = useUIStore()

function openLogin() {
  if (ui && ui.openLogin) ui.openLogin()
}

function toggleSidebar() {
  if (ui && ui.toggleSidebar) ui.toggleSidebar()
}
</script>
