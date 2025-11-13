<template>
  <div class="w-full mt-2">
    <div class="h-2 rounded bg-gray-200 overflow-hidden">
      <div
        :class="barClass"
        :style="{ width: strengthPercent + '%' }"
        class="h-2 transition-all duration-300"
      ></div>
    </div>
    <div class="text-xs mt-1 font-semibold" :class="textClass">
      {{ strengthLabel }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  password: { type: String, required: true }
})

const strength = computed(() => {
  const pwd = props.password
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
})

const strengthPercent = computed(() => [0, 33, 66, 100][strength.value])
const strengthLabel = computed(() => {
  switch (strength.value) {
    case 0: return 'Too short'
    case 1: return 'Weak'
    case 2: return 'Medium'
    case 3: return 'Strong'
    case 4: return 'Very strong'
    default: return ''
  }
})
const barClass = computed(() => {
  switch (strength.value) {
    case 0: return 'bg-gray-300'
    case 1: return 'bg-red-500'
    case 2: return 'bg-yellow-400'
    case 3: return 'bg-green-500'
    case 4: return 'bg-blue-600'
    default: return 'bg-gray-300'
  }
})
const textClass = computed(() => {
  switch (strength.value) {
    case 0: return 'text-gray-400'
    case 1: return 'text-red-500'
    case 2: return 'text-yellow-600'
    case 3: return 'text-green-600'
    case 4: return 'text-blue-600'
    default: return 'text-gray-400'
  }
})
</script>