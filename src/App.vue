<template>
  <router-view />
  <Modal v-model="showLogin" @close="handleClose">
    <LoginModal @close="handleClose" />
  </Modal>
</template>

<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import Modal from '@/components/layout/Modal.vue'
import LoginModal from '@/pages/LoginModal.vue'

const ui = useUIStore()
const showLogin = computed({
  get: () => !!ui.showLogin,
  set: (v) => { if (!v && ui && ui.closeLogin) ui.closeLogin(); if (v && ui && ui.openLogin) ui.openLogin() }
})

function handleClose() {
  if (ui && ui.closeLogin) ui.closeLogin()
}
</script>

<style scoped>
@import "tailwindcss";
</style>