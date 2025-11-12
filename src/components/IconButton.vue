<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded-full p-2 transition',
      'hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400',
      customClass
    ]"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <i :class="icon" class="text-xl"></i>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true }, // e.g. 'bi bi-person'
  type: { type: String, default: 'button' },
  ariaLabel: { type: String, default: '' },
  customClass: { type: String, default: '' }
})
defineEmits(['click'])
</script>