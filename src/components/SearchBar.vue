<template>
  <div class="flex items-center bg-white rounded-lg shadow px-3 py-2 w-full">
    <i class="bi bi-search text-gray-400 text-xl mr-2"></i>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="flex-1 bg-transparent outline-none text-gray-800 text-base"
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