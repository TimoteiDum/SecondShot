<template>
  <div class="flex flex-col items-center mb-2">
    <label class="text-2xl text-gray-300 font-bold text-center mb-1">
      {{ label }}
    </label>
    <p class="text-lg text-gray-300 text-center">
      <slot>{{ text }}</slot>
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  text: String
})
</script>