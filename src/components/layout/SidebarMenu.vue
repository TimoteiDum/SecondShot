<template>
  <transition name="fade">
    <aside
      v-if="show"
      class="fixed inset-0 z-60 flex"
      @click.self="$emit('close')"
    >
      <!-- glassy panel slides in from left -->
      <transition name="slide">
        <div v-show="show" class="panel w-72 md:w-80 lg:w-96 h-full flex flex-col">
          <div class="panel-inner px-6 py-5 flex items-center justify-between">
            <div class="text-2xl font-bold text-white/95"><slot name="title">Menu</slot></div>
            <button @click="$emit('close')" class="text-2xl text-white/80 hover:text-white">&times;</button>
          </div>

          <nav class="flex-1 px-4 py-6">
            <ul class="space-y-3">
              <li>
                <router-link to="/" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                  <span class="w-8 h-8 rounded-md bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white">
                    <i class="bi bi-house-fill"></i>
                  </span>
                  <span class="text-sm font-medium text-white">Home</span>
                </router-link>
              </li>
              <li>
                <router-link to="/shop" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                  <span class="w-8 h-8 rounded-md bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white">
                    <i class="bi bi-shop"></i>
                  </span>
                  <span class="text-sm font-medium text-white">Shop</span>
                </router-link>
              </li>
              <li>
                <router-link to="/profile" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                  <span class="w-8 h-8 rounded-md bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white">
                    <i class="bi bi-person-fill"></i>
                  </span>
                  <span class="text-sm font-medium text-white">Your profile</span>
                </router-link>
              </li>
            </ul>
          </nav>

          <div class="px-6 py-4 border-t border-white/10 text-sm text-gray-300">
            <slot name="footer">© 2025 SecondShot</slot>
          </div>
        </div>
      </transition>

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

/* glassy panel styling */
.panel {
  background: rgba(255,255,255,0.06);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  backdrop-filter: blur(12px) saturate(120%);
  border-right: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 10px 30px rgba(2,6,23,0.6);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  overflow: hidden;
}

.panel-inner {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
}

.panel a:hover { background: rgba(255,255,255,0.04); }

/* slide-in animation for the panel */
.slide-enter-active, .slide-leave-active {
  transition: transform 320ms cubic-bezier(.2,.9,.2,1);
}
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
.slide-enter-to, .slide-leave-from { transform: translateX(0); }

/* small tweak for the overlay so it feels softer */
.bg-black\/40 { background-color: rgba(0,0,0,0.4); }
</style>
