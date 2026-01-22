<template>
  <div class="flex justify-center items-center min-h-screen forgot-hero">
    <div class="w-full max-w-md min-h-[560px] forgot-panel px-8 py-12 text-center">
      <h1 class="font-serif text-3xl font-extrabold mb-6 tracking-widest bg-clip-text text-transparent" style="background-image: linear-gradient(90deg,#c084fc,#60a5fa);">SecondShot</h1>
      <h2 class="text-2xl font-bold mt-3 mb-6 tracking-wide font-sans">Forgot your password?</h2>
      <p class="mb-6 text-muted text-base">
        Enter your email address below and we'll send you a link to reset your password.
      </p>
      <form @submit.prevent="submit">
        <div class="mb-8">
          <EmailInput v-model="email" />
          <small v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</small>
        </div>
        <div class="mt-3">
          <button
            :disabled="!validateEmail(email.value)"
            type="submit"
            class="w-4/5 py-2 rounded-lg font-semibold transition mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="validateEmail(email.value) ? 'bg-gradient-to-tr from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600' : 'bg-gray-600 text-white'">
            Send Reset Link
          </button>
        </div>
      </form>
      <router-link to="/" class="block mt-6 underline text-base cursor-pointer hover:no-underline" style="color: #d6c7ff">Back to login</router-link>
    </div>
  </div>
</template>

<style scoped>
.forgot-hero {
  background: linear-gradient(180deg,#0b1020 0%, #2b0f3a 45%, #4c1d95 100%);
  position: relative;
}
.forgot-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(600px 300px at 10% 20%, rgba(124,58,237,0.18), transparent 10%), radial-gradient(400px 200px at 90% 80%, rgba(59,130,246,0.08), transparent 12%);
  pointer-events: none;
}
.forgot-panel {
  position: relative;
  z-index: 10;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  backdrop-filter: blur(10px) saturate(130%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 20px 50px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
  border-radius: 1rem;
  color: #eef2ff;
}
.forgot-panel .text-muted { color: rgba(255,255,255,0.8); }
.forgot-panel input, .forgot-panel textarea { background: rgba(255,255,255,0.02); color: #fff }
.forgot-panel ::placeholder { color: rgba(255,255,255,0.6); }

@media (max-width: 640px) {
  .forgot-panel { padding: 1.25rem }
}
</style>

<script setup>
defineOptions({ name: 'ForgotPasswordPage' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EmailInput from '@/components/inputs/EmailInput.vue'

const router = useRouter()
const email = ref('')
const emailError = ref('')

// use validateEmail(email.value) directly in template

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