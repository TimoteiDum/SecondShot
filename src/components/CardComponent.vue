<template>
  <div
    :class="[
      'bg-gray-300 rounded-xl shadow-2xl px-6 py-8 text-center w-full',
      customClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  customClass: { type: String, default: '' }
})
</script>