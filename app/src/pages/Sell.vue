<template>
  <div>
    <TopNavBar
      :search="search"
      :is-authenticated="auth.isAuthenticated"
      @open-menu="showSidebar = true"
    />
    <SidebarMenu :show="showSidebar" @close="showSidebar = false" />

    <div
      class="min-h-screen pt-24 px-6 bg-cover bg-center relative"
      style="background-image: url('/sell.jpg')"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div
        class="relative z-10 flex flex-col items-center text-center text-white pt-16 pb-28 min-h-[55vh]"
      >
        <div class="max-w-5xl w-full px-6">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-lg whitespace-nowrap"
          >
            Sell by category
          </h1>

          <div
            class="mx-auto w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-8 mt-8"
          >
            <div class="flex justify-center">
              <CategoryCard
                theme="blue"
                title="Cameras"
                subtitle="DSLR, mirrorless & compact"
                :to="'/shop/cameras'"
                iconClass="bi bi-camera"
              />
            </div>
            <div class="flex justify-center">
              <CategoryCard
                theme="blue"
                title="Video Cameras"
                subtitle="Camcorders & cinema"
                :to="'/shop/videocameras'"
                iconClass="bi bi-camera-reels"
              />
            </div>
            <div class="flex justify-center">
              <CategoryCard
                theme="blue"
                title="Lenses"
                subtitle="Prime & zoom lenses"
                :to="'/shop/lenses'"
                iconClass="bi bi-stopwatch"
              />
            </div>
            <div class="flex justify-center">
              <CategoryCard
                theme="blue"
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
  </div>
</template>

<script setup>
defineOptions({ name: 'SellPage' })
import { ref } from 'vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import CategoryCard from '@/components/layout/CategoryCard.vue'
import { useAuthStore } from '../stores/auth'

const showSidebar = ref(false)
const search = ref('')
const auth = useAuthStore()
</script>

<style scoped></style>
