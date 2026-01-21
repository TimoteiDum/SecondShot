<template>
  <div class="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full">
    <i class="bi bi-search text-gray-400 text-2xl mr-3"></i>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('submit', $event.target.value)"
      class="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base"
      type="text"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Search...'
  }
})
defineEmits(['update:modelValue'])
</script>
