<template>
  <transition name="modal" appear>
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="emitClose"></div>
      <div :class="['modal-panel', variant === 'glassy' ? 'modal-glassy' : 'modal-default']">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineOptions({ name: 'ModalPanel' })
defineProps({
  modelValue: { type: Boolean, default: false },
  variant: { type: String, default: 'default' },
})
const emit = defineEmits(['update:modelValue', 'close'])
function emitClose() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 180ms ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition:
    transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1),
    opacity 180ms ease-out;
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

.modal-default {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(2, 6, 23, 0.2);
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
}

.modal-glassy {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 10px 40px rgba(2, 6, 23, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  border-radius: 1rem;
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  color: #eef2ff;
}

.modal-glassy .text-muted {
  color: rgba(255, 255, 255, 0.72);
}
.modal-glassy a {
  color: #c7b3ff;
}
</style>
