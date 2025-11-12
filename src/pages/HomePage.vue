<template>
  <div class="home-page relative min-h-screen w-full">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black/40 pointer-events-none"></div>

    <!-- Login button (top right) -->
    <button
      @click="openLogin"
      class="absolute top-8 right-12 w-12 h-12 rounded-full bg-gray-500 text-gray-800 flex items-center justify-center text-2xl z-30 hover:bg-gray-300 transition"
    >
      <i class="bi bi-person"></i>
    </button>

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
        <div class="flex gap-20 mt-20">
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
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from '../pages/LoginModal.vue'
import LabelText from '@/components/LabelText.vue'


const props = defineProps({
  welcomeMessage: {
    type: String,
    default: 'Welcome to SecondShot'
  }
})


const emit = defineEmits(['buy', 'sell'])

const showLogin = ref(false)

function openLogin() {
  showLogin.value = true
}
function closeLogin() {
  showLogin.value = false
}

// Emit events when buttons are clicked
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