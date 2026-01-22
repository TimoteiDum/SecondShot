<template>
  <div>
    <AlertMessage
      :show="showAlert"
      :message="alertMessage"
      @close="showAlert = false"
    />

    <button
      @click="$emit('close')"
      class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
      aria-label="Close"
    >&times;</button>
    <h2 class="text-2xl font-extrabold mb-6 text-center bg-clip-text text-transparent" style="background-image: linear-gradient(90deg,#7c3aed,#06b6d4);">Log In</h2>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <EmailInput v-model="email" />
      <PasswordInput v-model="password" />
      <button
        :disabled="isLoginDisabled"
        type="submit"
        class="rounded px-4 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        :class="isLoginDisabled ? 'bg-gray-500 text-white' : 'bg-gradient-to-tr from-indigo-600 to-sky-500 text-white hover:from-indigo-700 hover:to-sky-600'"
      >
        Log In
      </button>
      <p class="mt-2 text-center">
        <router-link to="/forgot-password" @click="$emit('close')" class="underline hover:no-underline" style="color: rgba(199,179,255,0.95);">
          Forgot password?
        </router-link>
      </p>
    </form>
    <div class="mt-6 text-center">
      <span class="text-muted">Don't have an account?</span>
      <button
        @click="goToJoin"
        class="ml-2 underline font-semibold hover:no-underline"
        style="color: #c7b3ff"
      >
        Join now
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'LoginModal' })
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import EmailInput from '@/components/inputs/EmailInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import AlertMessage from '@/components/feedback/AlertMessage.vue'

const router = useRouter()
const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')
const showAlert = ref(false)
const alertMessage = ref('')

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function handleLogin() {
  if (!validateEmail(email.value)) {
    alertMessage.value = 'Email is incorrect!'
    showAlert.value = true
    return
  }
  if (password.value.length < 6) {
    alertMessage.value = 'Password is incorrect or too short!'
    showAlert.value = true
    return
  }
  const auth = useAuthStore()
  const user = { email: email.value }
  auth.login(user)
  emit('close')
  router.push('/')
}
const isLoginDisabled = computed(() => !(validateEmail(email.value) && password.value.length >= 6))
function goToJoin() {
  emit('close')
  router.push('/signup')
}
</script>