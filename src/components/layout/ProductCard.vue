<template>
  <div class="bg-white/6 backdrop-blur rounded-xl p-3 shadow-md flex flex-col h-full">
    <img :src="product.image || '/camera.jpg'" alt="" class="w-full h-36 object-cover rounded-md mb-3" />
    <h2 class="text-lg font-semibold text-white">{{ product.title }}</h2>
    <p class="text-sm text-gray-300 mt-1 mb-3 flex-1">{{ product.description || 'Great camera for photography.' }}</p>
    <div class="flex items-center justify-between mt-2">
      <div class="text-xl font-bold text-white">{{ formattedPrice }}</div>
     <div class="flex items-center gap-3">
        <!-- cart icon button -->
        <button @click.prevent="$emit('add-to-cart', product)" title="Add to cart" class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white shadow-md hover:scale-105 transition">
          <i class="bi bi-cart-plus-fill" aria-hidden="true"></i>
        </button>
        <!-- details button (theme gradient for visibility) -->
        <button @click.prevent="$emit('view-details', product)" title="View details" class="bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white px-3 py-2 rounded-md font-medium hover:brightness-105 transition">
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['add-to-cart', 'view-details'])

const formattedPrice = computed(() => {
  return `$${props.product.price}`
})

// watch for product changes (example of using watch in a component)
watch(() => props.product, (newVal, oldVal) => {
  // simple debug hook - could be replaced with analytics / lazy image loading
  // eslint-disable-next-line no-console
  console.log('Product changed:', newVal && newVal.id)
})
</script>
