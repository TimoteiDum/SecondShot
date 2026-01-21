<template>
  <transition name="modal" appear>
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="emitClose"></div>
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-8 relative modal-panel">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineOptions({ name: 'ModalPanel' })
defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'close'])
function emitClose() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
/* Modal transition: fade backdrop + pop dialog */
.modal-enter-active, .modal-leave-active {
  transition: opacity 180ms ease-out;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-to, .modal-leave-from {
  opacity: 1;
}

/* animate the inner panel for a pop effect */
.modal-enter-active .modal-panel, .modal-leave-active .modal-panel {
  transition: transform 200ms cubic-bezier(.2,.9,.3,1), opacity 180ms ease-out;
}
.modal-enter-from .modal-panel {
  transform: translateY(-8px) scale(0.96);
  opacity: 0;
}
.modal-enter-to .modal-panel {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.modal-leave-from .modal-panel {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.modal-leave-to .modal-panel {
  transform: translateY(-6px) scale(0.96);
  opacity: 0;
}
</style>
