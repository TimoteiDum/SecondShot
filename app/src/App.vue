<template>
  <router-view />

  <Modal v-model="showLogin" variant="glassy" @close="handleClose">
    <LoginModal @close="handleClose" />
  </Modal>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import axios from 'axios'
import { useUIStore } from './stores/ui'
import Modal from '@/components/layout/Modal.vue'
import LoginModal from '@/pages/LoginModal.vue'

const ui = useUIStore()

const showLogin = computed({
  get: () => !!ui.showLogin,
  set: (v) => {
    if (!v && ui && ui.closeLogin) ui.closeLogin()
    if (v && ui && ui.openLogin) ui.openLogin()
  },
})

function handleClose() {
  if (ui && ui.closeLogin) ui.closeLogin()
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/test')
    console.log('Backend response:', response.data)
  } catch (error) {
    console.error('Error connecting to backend:', error)
  }
})
</script>

<style scoped>
@import 'tailwindcss';
</style>