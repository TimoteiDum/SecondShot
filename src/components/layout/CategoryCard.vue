<template>
  <router-link
    :to="to"
    class="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center w-64 sm:w-72"
  >
    <div class="w-full flex items-center justify-center mb-4">
      <img v-if="icon" :src="icon" alt="" class="h-16 w-16 object-contain" />
      <i v-else :class="iconClass + ' icon-display'" aria-hidden="true"></i>
    </div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ subtitle }}</p>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: { type: String, default: '' },
  to: { type: [String, Object], required: true },
  icon: String,
  iconClass: { type: String, default: 'bi bi-camera' }
})
</script>

<style scoped>
.bi { font-size: 28px; }
.icon-display { font-size: 28px; color: #0ea5e9; /* sky-500 */ margin-bottom: 0.25rem; }
</style>
