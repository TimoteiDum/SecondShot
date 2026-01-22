<template>
  <div class="w-full mt-2">
    <div class="h-2 rounded bg-gray-200 overflow-hidden">
      <div
        :class="metrics.barClass"
        :style="{ width: metrics.percent + '%' }"
        class="h-2 transition-all duration-300"
      ></div>
    </div>
    <div class="text-xs mt-1 font-semibold" :class="metrics.textClass">
      {{ metrics.label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ password: { type: String, required: true } })

const metrics = computed(() => {
  const pwd = props.password || ''
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  const percent = [0, 33, 66, 100, 100][score]

  let label = ''
  switch (score) {
    case 0: label = 'Too short'; break
    case 1: label = 'Weak'; break
    case 2: label = 'Medium'; break
    case 3: label = 'Strong'; break
    case 4: label = 'Very strong'; break
    default: label = ''
  }

  let barClass = 'bg-gray-300'
  let textClass = 'text-gray-400'
  switch (score) {
    case 0: barClass = 'bg-gray-300'; textClass = 'text-gray-400'; break
    case 1: barClass = 'bg-red-500'; textClass = 'text-red-500'; break
    case 2: barClass = 'bg-yellow-400'; textClass = 'text-yellow-600'; break
    case 3: barClass = 'bg-green-500'; textClass = 'text-green-600'; break
    case 4: barClass = 'bg-blue-600'; textClass = 'text-blue-600'; break
  }

  return { percent, label, barClass, textClass }
})
</script>
