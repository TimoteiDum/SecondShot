<template>
  <div>
    <label for="fullName" class="block text-left text-gray-700 font-medium mb-1">Full Name:</label>
    <input
      id="fullName"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Full Name"
      class="border rounded w-full px-3 py-2"
      required
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>