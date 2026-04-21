<template>
  <router-link
    :to="to"
    class="relative block p-6 bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center w-64 sm:w-72 ring-1 ring-white/40"
  >
    <div class="w-full flex items-center justify-center mb-4">
      <div :class="['w-20 h-20 rounded-full flex items-center justify-center', circleBgClass()]">
        <img v-if="icon" :src="icon" alt="" class="h-12 w-12 object-contain" />
        <i
          v-else
          :class="iconClass + ' icon-display'"
          :style="{ color: iconColor() }"
          aria-hidden="true"
        ></i>
      </div>
    </div>

    <h3 class="text-lg font-semibold mb-1 text-slate-900">{{ title }}</h3>
    <p class="text-sm text-gray-600 mb-2">{{ subtitle }}</p>

    <div :class="['mt-2 w-16 h-1 rounded-full', underlineClass()]"></div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: { type: String, default: '' },
  to: { type: [String, Object], required: true },
  icon: String,
  iconClass: { type: String, default: 'bi bi-camera' },
  theme: { type: String, default: 'orange' },
})

// simple helpers instead of computed to reduce global computed count
function circleBgClass() {
  return props.theme === 'blue'
    ? 'bg-gradient-to-tr from-sky-50 to-indigo-50'
    : 'bg-gradient-to-tr from-orange-50 to-red-50'
}

function underlineClass() {
  return props.theme === 'blue'
    ? 'bg-gradient-to-r from-sky-400 to-indigo-600'
    : 'bg-gradient-to-r from-orange-400 to-red-500'
}

function iconColor() {
  return props.theme === 'blue' ? '#0284c7' : '#f97316'
}
</script>

<style scoped>
.bi {
  font-size: 28px;
}
.icon-display {
  font-size: 36px;
  color: #f97316;
  margin-bottom: 0.25rem;
}

a {
  text-decoration: none;
}

@media (min-width: 768px) {
  .icon-display {
    font-size: 40px;
  }
}
</style>
