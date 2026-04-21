<template>
  <div class="min-h-screen pt-24 px-6 bg-gray-50">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">Your Cart</h1>
      <p class="text-gray-600 mb-6">Review the items you plan to purchase.</p>

      <div v-if="cart.items.length === 0" class="bg-white p-8 rounded shadow text-center">
        <p class="text-gray-700">Your cart is empty.</p>
        <router-link
          to="/shop"
          class="inline-block mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
          >Shop now</router-link
        >
      </div>

      <div v-else class="bg-white p-6 rounded shadow">
        <ul class="divide-y">
          <li
            v-for="it in cart.items"
            :key="it.id"
            class="py-4 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <div class="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">📷</div>
              <div>
                <div class="font-semibold">{{ it.title }}</div>
                <div class="text-sm text-gray-500">{{ it.category }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-gray-700">{{ currency(it.price) }}</div>
              <div class="text-sm text-gray-600">x{{ it.qty || 1 }}</div>
              <button @click="removeItem(it.id)" class="text-red-600 hover:text-red-800">
                Remove
              </button>
            </div>
          </li>
        </ul>

        <div class="mt-6 flex items-center justify-between">
          <div class="text-lg font-medium">Total: {{ currency(cart.totalPrice) }}</div>
          <div class="flex gap-3">
            <button @click="clearCart" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
              Clear
            </button>
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CartPage' })
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

function removeItem(id) {
  cart.removeItem(id)
}
function clearCart() {
  cart.clearCart()
}
function currency(v) {
  return v != null ? `$${v.toFixed(2)}` : '$0.00'
}
</script>
