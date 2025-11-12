<template>
  <div>
    <label for="confirmPassword" class="block text-left text-gray-700 font-medium mb-1">Confirm Password:</label>
    <input
      id="confirmPassword"
      type="password"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Confirm Password"
      class="border rounded w-full px-3 py-2"
      required
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>