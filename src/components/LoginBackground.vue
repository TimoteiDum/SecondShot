<template>
  <div class="login-page">
    <div class="left-side">
      <img src="/logo.png" alt="SecondShot Logo" class="logo" />
      <h1 class="brand">SecondShot</h1>
      <p class="tagline">Your next adventure is just a login away.</p>
    </div>
    <div class="right-side">
      <slot />
      <img src="/camera.jpg" alt="Decorative" class="side-image" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['prompt-response'])

function handlePrompt() {
  const name = window.prompt('What is your name?')
  if (name) {
    emit('prompt-response', name)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
}
.left-side {
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  text-align: center;
  border-right: 1px solid #e5e7eb;
}
.left-side .brand {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}
.left-side .tagline {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 300px;
}
.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  object-fit: contain;
}
.prompt-btn {
  margin-top: 2rem;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background-image: url('/camera.jpg');
  background-size: cover;
  background-position: center;
}
.side-image {
  position: absolute;
  right: 32px;
  bottom: 32px;
  max-width: 180px;
  max-height: 220px;
  object-fit: contain;
  z-index: 1;
  opacity: 0.85;
  pointer-events: none;
}
@media (max-width: 900px) {
  .login-page {
    flex-direction: column;
  }
  .left-side {
    border-right: none;
  }
}
</style>