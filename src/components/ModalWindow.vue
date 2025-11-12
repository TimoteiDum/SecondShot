<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-xl shadow-xl p-8 relative min-w-[300px] max-w-full">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        aria-label="Close"
      >&times;</button>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean
})
defineEmits(['close'])
</script>