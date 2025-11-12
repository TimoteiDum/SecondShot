<!-- components/FormInput.vue -->
<template>
  <div class="text-left">
    <label :for="id" class="text-gray-700 font-medium">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border rounded w-full px-4 py-2 mt-1"
      required
    />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
