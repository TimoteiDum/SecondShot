<template>
  <div class="bg-white/6 backdrop-blur rounded-xl p-4 shadow-md flex flex-col h-full min-h-72">
    <img
      :src="product.image || '/camera.jpg'"
      alt=""
      class="w-full h-40 object-contain object-center rounded-md mb-4 bg-black/6 p-2"
    />
    <h2 class="text-xl sm:text-2xl font-semibold text-white">{{ product.title }}</h2>
    <p class="text-sm sm:text-base text-gray-300 mt-2 mb-4 flex-1">
      {{ product.description || 'Great camera for photography.' }}
    </p>
    <div class="flex items-center justify-between mt-2">
      <div class="text-2xl sm:text-3xl font-extrabold text-white">{{ formattedPrice }}</div>
      <div class="flex items-center gap-3">
        <button
          @click.prevent="$emit('add-to-cart', product)"
          title="Add to cart"
          class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white shadow-md hover:scale-105 transition"
        >
          <i class="bi bi-cart-plus-fill" aria-hidden="true"></i>
        </button>

        <button
          @click.prevent="$emit('view-details', product)"
          title="View details"
          class="bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 text-white px-4 py-2 rounded-md font-medium hover:brightness-105 transition"
        >
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
    required: true,
  },
})

const formattedPrice = computed(() => {
  return `$${props.product.price}`
})

watch(
  () => props.product,
  (newVal) => {
    console.log('Product changed:', newVal && newVal.id)
  }
)
</script>
