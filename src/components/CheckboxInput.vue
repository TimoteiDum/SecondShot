<template>
  <div class="flex items-center gap-2 text-left">
    <input
      id="terms"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="accent-blue-600"
      required
    />
    <label for="terms" class="text-xs text-gray-700 select-none">
      I agree to the
      <a href="#" class="text-blue-600 underline">Terms of Service</a>
      and
      <a href="#" class="text-blue-600 underline">Privacy Policy</a>.
    </label>
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>