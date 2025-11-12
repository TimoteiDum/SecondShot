<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div class="w-full max-w-md min-h-[600px] bg-gray-200 rounded-xl shadow-lg px-9 py-20 text-center">
      <h1 class="font-serif text-3xl font-semibold text-black mb-12 tracking-widest">SecondShot</h1>
      <h2 class="text-xl font-bold text-black mt-8 mb-12 tracking-wide font-sans">Forgot your password?</h2>
      <p class="mb-8 text-gray-700 text-base">
        Enter your email address below and we'll send you a link to reset your password.
      </p>
      <form @submit.prevent="submit">
        <label class="flex flex-col items-center mb-8 text-center w-full">
          <span class="mb-2 text-base text-gray-700">Email address</span>
          <div class="relative w-4/5 flex items-center justify-center">
            <input
              type="email"
              v-model="email"
              :class="[
                'w-full pl-9 py-2 rounded border text-center mb-2',
                emailError ? 'border-red-500' : 'border-gray-300'
              ]"
              required
              placeholder="you@example.com"
              @input="emailError = ''"
            />
            <!-- Uncomment below if you want an icon inside the input -->
            <!-- <i class="bi bi-envelope absolute left-3 text-blue-600 text-lg pointer-events-none"></i> -->
          </div>
          <small v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</small>
        </label>
        <div class="mt-3">
          <button
            type="submit"
            class="w-4/5 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition mb-8"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      <router-link
        to="/"
        class="block mt-6 text-blue-600 underline text-base cursor-pointer hover:no-underline text-center"
      >
        Back to login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const emailError = ref('')

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function submit() {
  if (!validateEmail(email.value)) {
    emailError.value = 'Email is invalid'
    return
  }
  emailError.value = ''
  router.push('/reset-sent')
}
</script>