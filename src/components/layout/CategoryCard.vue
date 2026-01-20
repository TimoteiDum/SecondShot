<template>
  <router-link
    :to="to"
    class="relative block p-6 bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center w-64 sm:w-72 ring-1 ring-white/40"
  >
  <div class="w-full flex items-center justify-center mb-4">
      <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-50 to-red-50 flex items-center justify-center">
        <img v-if="icon" :src="icon" alt="" class="h-12 w-12 object-contain" />
        <i v-else :class="iconClass + ' icon-display'" aria-hidden="true"></i>
      </div>
    </div>

  <h3 class="text-lg font-semibold mb-1 text-slate-900">{{ title }}</h3>
  <p class="text-sm text-gray-600 mb-2">{{ subtitle }}</p>

    <!-- accent underline -->
    <div class="mt-2 w-16 h-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
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
.icon-display { font-size: 36px; color: #f97316; /* orange-500 */ margin-bottom: 0.25rem; }

/* ensure router-link doesn't get underlined */
a { text-decoration: none; }

/* small responsive tweak */
@media (min-width: 768px) {
  .icon-display { font-size: 40px; }
}

</style>
