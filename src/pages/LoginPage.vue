<template>
  
  <Modal v-model="show" @close="onClose">
    <LoginModal @close="onClose" />
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/layout/Modal.vue'
import LoginModal from './LoginModal.vue'

const router = useRouter()
const show = ref(false)

onMounted(() => {
  show.value = true
})

function onClose() {
  show.value = false
  router.push('/')
}
</script>
