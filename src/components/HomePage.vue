<template>
  <div class="home-page relative min-h-screen w-full">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black/40 pointer-events-none"></div>

    <!-- Login button (top right) -->
    <button
      @click="openLogin"
      class="absolute top-8 right-12 w-12 h-12 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-2xl z-30 hover:bg-gray-300 transition"
    >
      <i class="bi bi-person"></i>
    </button>

    <!-- Centered content -->
    <div class="relative z-20 flex flex-col items-center justify-start min-h-screen pt-24">
      <h1 class="baskerville text-5xl text-white font-semibold text-center tracking-widest mb-4">
        Welcome to SecondShot
      </h1>
      <div class="flex flex-col items-center mt-6">
        <h2 class="text-2xl text-gray-300 mb-2 text-center">Buy, sell or trade</h2>
        <p class="text-lg text-gray-300 text-center">Quality Used Cameras &amp; Photo Gear</p>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal v-if="showLogin" @close="closeLogin" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from './LoginModal.vue'

const showLogin = ref(false)

function openLogin() {
  showLogin.value = true
}
function closeLogin() {
  showLogin.value = false
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