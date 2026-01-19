<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-8 relative">
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
      <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <EmailInput v-model="email" />
        <PasswordInput v-model="password" />
        <button
          :disabled="isLoginDisabled"
          type="submit"
          class="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Log In
        </button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
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
  // Simulate successful login: store a minimal user record and navigate home
  const user = { email: email.value }
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    // ignore localStorage errors in restricted environments
  }
  emit('close')
  router.push('/')
}
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const isLoginDisabled = computed(() => !(isEmailValid.value && password.value.length >= 6))
function goToJoin() {
  emit('close')
  router.push('/signup')
}
</script>