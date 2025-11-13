<template>
  <div class="home-page relative min-h-screen w-full flex">
    <!-- Sidebar Menu (hidden by default, toggled by button) -->
    <SidebarMenu :show="showSidebar" @close="showSidebar = false" />

    <!-- Main content area -->
    <div class="flex-1 relative">
      <!-- Top Navigation Bar -->
      <TopNavBar
        :search="search"
        @update:search="search = $event"
        @open-menu="showSidebar = true"
        @open-login="openLogin"
      />

      <!-- Background overlay -->
      <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <!-- Centered content -->
      <div class="relative z-20 flex flex-col items-center justify-start min-h-screen pt-24">
        <h1 class="baskerville text-5xl text-white font-semibold text-center tracking-widest mb-4">
          {{ welcomeMessage }}
        </h1>
        <div class="flex flex-col items-center mt-40">
          <LabelText
            label="Buy, sell or trade"
            text="Quality Used Cameras & Photo Gear"
            class="mb-8"
          />
          <!-- Increased gap between buttons -->
          <div class="flex gap-130 mt-20">
            <button
              class="bg-gray-600 hover:bg-gray-400 text-white font-bold py-4 px-10 rounded-xl shadow-lg text-xl transition duration-200 ease-in-out transform hover:scale-105"
              @click="handleBuy"
            >
              Buy
            </button>
            <button
              class="bg-gray-600 hover:bg-gray-400 text-white font-bold py-4 px-10 rounded-xl shadow-lg text-xl transition duration-200 ease-in-out transform hover:scale-105"
              @click="handleSell"
            >
              Sell
            </button>
          </div>
        </div>
      </div>

      <LoginModal v-if="showLogin" @close="closeLogin" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from '../pages/LoginModal.vue'
import LabelText from '@/components/LabelText.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import TopNavBar from '@/components/TopNavBar.vue'

const props = defineProps({
  welcomeMessage: {
    type: String,
    default: 'Welcome to SecondShot'
  }
})

const emit = defineEmits(['buy', 'sell'])

const showLogin = ref(false)
const showSidebar = ref(false)
const search = ref('')

function openLogin() {
  showLogin.value = true
}
function closeLogin() {
  showLogin.value = false
}

function handleBuy() {
  emit('buy')
}
function handleSell() {
  emit('sell')
}
</script>

<style scoped>
.home-page {
  background-image: url('/back.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.baskerville {
  font-family: 'Baskerville', serif;
  letter-spacing: 0.18em;
}
</style>