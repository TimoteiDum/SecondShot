<!-- filepath: /Users/timoteidumbraveanu/Documents/universitate/SecondShot/src/components/SidebarMenu.vue -->
<template>
  <transition name="fade">
    <aside
      v-if="show"
      class="fixed inset-0 z-50 flex"
      @click.self="$emit('close')"
    >
      <div class="w-64 bg-gray-900 text-white shadow-lg h-full flex flex-col">
        <div class="px-6 py-4 text-2xl font-bold border-b border-gray-700 flex items-center justify-between">
          <slot name="title">Menu</slot>
          <button @click="$emit('close')" class="text-2xl text-gray-400 hover:text-white">&times;</button>
        </div>
        <nav class="flex-1 px-4 py-6">
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition">
                <i class="bi bi-house"></i>
                Home
              </router-link>
            </li>
            <!-- Remove Login and Signup links -->
          </ul>
        </nav>
        <div class="px-6 py-4 border-t border-gray-700 text-sm text-gray-400">
          <slot name="footer">© 2025 SecondShot</slot>
        </div>
      </div>
      <!-- Optional: overlay for click outside -->
      <div class="flex-1 bg-black/40" @click="$emit('close')"></div>
    </aside>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean
})
defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>