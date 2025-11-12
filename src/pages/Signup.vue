<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NameInput from '@/components/NameInput.vue'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import ConfirmPasswordInput from '@/components/ConfirmPasswordInput.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import IconButton from '@/components/IconButton.vue'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const showAlert = ref(false)
const alertMessage = ref('')

function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alertMessage.value = 'Passwords do not match!'
    showAlert.value = true
    return
  }
  alertMessage.value = 'Account created!'
  showAlert.value = true
}
</script>

<template>
  <div class="signup-page flex justify-center items-center min-h-screen">
    <!-- Home Icon Button -->
    <IconButton
      icon="bi bi-house"
      aria-label="Home"
      customClass="absolute top-8 left-8 bg-gray-300 text-gray-800 w-12 h-12 text-2xl shadow z-50"
      @click="router.push('/')"
    />
    <AlertMessage :show="showAlert" :message="alertMessage" @close="showAlert = false" />
    <div class="w-full max-w-sm bg-gray-300 rounded-xl shadow-2xl px-6 py-8 text-center">
      <h1 class="text-2xl font-serif font-semibold text-black mb-6 tracking-widest">Sign Up</h1>
      <form @submit.prevent="handleSignup" class="flex flex-col gap-5">
        <NameInput v-model="fullName" />
        <EmailInput v-model="email" />
        <PasswordInput v-model="password" />
        <ConfirmPasswordInput v-model="confirmPassword" />

        <ButtonComponent type="submit" customClass="mt-2">
          Create an account
        </ButtonComponent>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  background-image: url('/downlad.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>