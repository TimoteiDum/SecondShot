<template>
  <button
    :type="type"
    :class="[
      'bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold transition',
      'hover:bg-blue-800',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      customClass
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' }
})
defineEmits(['click'])
</script>