<template>
  <!-- Background image with dark overlay to make cards stand out -->
  <div class="min-h-screen pt-24 px-6 bg-cover bg-center relative" style="background-image: url('/camera.jpg')">
    <div class="absolute inset-0 bg-black/60"></div>

  <div class="relative z-10 flex flex-col items-center justify-center text-center text-white py-50 min-h-[70vh]">
      <div class="max-w-3xl w-full px-4">
        <h1 class="text-4xl font-bold mb-3">Welcome to SecondShot</h1>
        <p class="text-gray-200 mb-12">Shop by category</p>

        <!-- 2x2 centered grid with larger gaps -->
  <div class="mx-auto w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-y-24 gap-x-12 mt-12">
          <div class="flex justify-center">
            <CategoryCard title="Cameras" subtitle="DSLR, mirrorless & compact" :to="'/shop/cameras'" iconClass="bi bi-camera" />
          </div>
          <div class="flex justify-center">
            <CategoryCard title="Video Cameras" subtitle="Camcorders & cinema" :to="'/shop/videocameras'" iconClass="bi bi-camera-reels" />
          </div>
          <div class="flex justify-center">
            <CategoryCard title="Lenses" subtitle="Prime & zoom lenses" :to="'/shop/lenses'" iconClass="bi bi-stopwatch" />
          </div>
          <div class="flex justify-center">
            <CategoryCard title="Accessories" subtitle="Bags, tripods, batteries" :to="'/shop/accessories'" iconClass="bi bi-box-seam" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryCard from '@/components/layout/CategoryCard.vue'
</script>
