<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div class="w-full max-w-md min-h-[600px] bg-gray-200 rounded-xl shadow-lg px-10 py-20 text-center">
      <h1 class="font-serif text-3xl font-semibold text-black mb-16 tracking-widest">SecondShot</h1>
      <i class="bi bi-envelope text-7xl text-red-600 mb-16"></i>
      <h2 class="text-xl font-bold text-black mt-8 mb-8 tracking-wide font-sans">Password Reset Link Sent</h2>
      <p class="mb-16 text-gray-700 text-base">
        We've sent a password reset link to your email address.
      </p>
      <router-link
        to="/"
        class="inline-block mt-8 bg-blue-600 text-white px-7 py-2 rounded-lg font-semibold hover:bg-blue-800 transition text-base"
      >
        Back to login
      </router-link>
      <router-link
        to="/forgot-password"
        class="block mt-6 text-blue-600 underline text-base cursor-pointer hover:no-underline text-center hover:text-blue-800 transition"
      >
        Didn't receive a link? Go back and change your email
      </router-link>
    </div>
  </div>
</template>