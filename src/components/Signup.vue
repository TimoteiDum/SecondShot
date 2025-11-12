<script setup>
import { ref } from 'vue'
import NameInput from '@/components/NameInput.vue'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import ConfirmPasswordInput from '@/components/ConfirmPasswordInput.vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  alert('Account created!')
}
</script>

<template>
  <div class="signup-page flex justify-center items-center min-h-screen">
    <div class="w-full max-w-sm bg-gray-300 rounded-xl shadow-2xl px-6 py-8 text-center">
      <h1 class="text-2xl font-serif font-semibold text-black mb-6 tracking-widest">Sign Up</h1>
      <form @submit.prevent="handleSignup" class="flex flex-col gap-5">
        <NameInput v-model="fullName" />
        <EmailInput v-model="email" />
        <PasswordInput v-model="password" />
        <ConfirmPasswordInput v-model="confirmPassword" />

        <button
          type="submit"
          class="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-800 transition mt-2"
        >
          Create an account
        </button>
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