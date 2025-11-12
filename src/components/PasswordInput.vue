<template>
  <div>
    <label for="password" class="block text-left text-gray-700 font-medium mb-1">Password:</label>
    <input
      id="password"
      type="password"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Password"
      class="border rounded w-full px-3 py-2"
      required
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>