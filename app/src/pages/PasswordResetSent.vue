<template>
  <div class="flex justify-center items-center min-h-screen forgot-hero">
    <div class="w-full max-w-md min-h-[560px] forgot-panel px-8 py-12 text-center">
      <h1
        class="font-serif text-3xl font-extrabold mb-6 tracking-widest bg-clip-text text-transparent"
        style="background-image: linear-gradient(90deg, #c084fc, #60a5fa)"
      >
        SecondShot
      </h1>
      <i class="bi bi-envelope text-7xl mb-12" style="color: #d6c7ff"></i>
      <LabelText
        label="Password Reset Link Sent"
        text="We've sent a password reset link to your email address."
        class="mb-12"
      />
      <ButtonComponent
        customClass="inline-block mt-4 px-7 py-2 text-base rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600 transition"
        @click="handleBack"
      >
        Back to login
      </ButtonComponent>
      <router-link
        to="/forgot-password"
        class="block mt-6 underline text-base cursor-pointer hover:no-underline"
        style="color: #d6c7ff"
        >Didn't receive a link? Go back and change your email</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.forgot-hero {
  background: linear-gradient(180deg, #0b1020 0%, #2b0f3a 45%, #4c1d95 100%);
  position: relative;
}
.forgot-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(600px 300px at 10% 20%, rgba(124, 58, 237, 0.18), transparent 10%),
    radial-gradient(400px 200px at 90% 80%, rgba(59, 130, 246, 0.08), transparent 12%);
  pointer-events: none;
}
.forgot-panel {
  position: relative;
  z-index: 10;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02));
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  backdrop-filter: blur(10px) saturate(130%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 20px 50px rgba(2, 6, 23, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  border-radius: 1rem;
  color: #eef2ff;
}
.forgot-panel .text-muted {
  color: rgba(255, 255, 255, 0.8);
}
.forgot-panel input,
.forgot-panel textarea {
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
}
.forgot-panel ::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 640px) {
  .forgot-panel {
    padding: 1.25rem;
  }
}
</style>

<script setup>
defineOptions({ name: 'PasswordResetSentPage' })
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import CardComponent from '@/components/layout/CardComponent.vue'
import LabelText from '@/components/layout/LabelText.vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['back'])
const router = useRouter()

function handleBack() {
  emit('back')
  router.push('/')
}
</script>
