<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <CardComponent customClass="w-full max-w-md min-h-[600px] px-10 py-20 text-center">
      <h1 class="font-serif text-3xl font-semibold text-black mb-16 tracking-widest">SecondShot</h1>
      <i class="bi bi-envelope text-7xl text-red-600 mb-16"></i>
      <LabelText
        label="Password Reset Link Sent"
        text="We've sent a password reset link to your email address."
        class="mb-16"
      />
      <ButtonComponent
        customClass="inline-block mt-8 px-7 py-2 text-base"
        @click="handleBack"
      >
        Back to login
      </ButtonComponent>
      <router-link
        to="/forgot-password"
        class="block mt-6 text-blue-600 underline text-base cursor-pointer hover:no-underline text-center hover:text-blue-800 transition"
      >
        Didn't receive a link? Go back and change your email
      </router-link>
    </CardComponent>
  </div>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import LabelText from '@/components/LabelText.vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['back'])
const router = useRouter()

function handleBack() {
  emit('back')
  router.push('/')
}
</script>