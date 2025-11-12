<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-8 relative">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        aria-label="Close"
      >&times;</button>
      <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="flex flex-col items-start">
          <label for="login-email" class="mb-1 text-gray-700 text-sm font-medium">Email address:</label>
          <input
            id="login-email"
            type="email"
            placeholder="Introduce email address"
            class="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div class="flex flex-col items-start">
          <label for="login-password" class="mb-1 text-gray-700 text-sm font-medium">Password:</label>
          <input
            id="login-password"
            type="password"
            placeholder="Introduce password"
            class="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition"
        >
          Log In
        </button>
        <!-- Forgot password link below the button -->
        <p class="mt-2 text-center">
          <router-link to="/forgot-password" class="text-blue-600 underline hover:no-underline">
            Forgot password?
          </router-link>
        </p>
      </form>
      <div class="mt-6 text-center">
        <span class="text-gray-600">Don't have an account?</span>
        <button
          @click="goToJoin"
          class="ml-2 text-blue-600 underline font-semibold hover:no-underline"
        >
          Join now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['close'])

function handleLogin() {
  // Add your login logic here
  // Optionally emit close on successful login
  // emit('close')
}

function goToJoin() {
  emit('close')
  router.push('/signup')
}
</script>