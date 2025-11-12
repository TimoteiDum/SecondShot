<template>
  <div
    v-if="show"
    class="fixed top-8 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 px-6 py-4 rounded shadow-lg z-50 min-w-[250px] max-w-md"
    role="alert"
  >
    <div class="flex items-center justify-between">
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="ml-4 text-xl font-bold text-yellow-700 hover:text-yellow-900">&times;</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String
})
defineEmits(['close'])
</script>