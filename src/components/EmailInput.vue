<template>
  <div>
    <label for="email" class="block text-left text-gray-700 font-medium mb-1">Email Address:</label>
    <input
      id="email"
      type="email"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Email"
      class="border rounded w-full px-3 py-2"
      required
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>