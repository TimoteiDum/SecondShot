<template>
  <LoginBackground>
    <div class="card">
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password.</p>
      <form @submit.prevent="submit">
        <label class="field">
          <span>Email</span>
          <input type="email" v-model="email" required placeholder="you@example.com" />
        </label>
        <div class="actions">
          <button type="submit">Send Reset Link</button>
        </div>
      </form>
    </div>
  </LoginBackground>
</template>

<script setup>
import { ref } from 'vue'
import LoginBackground from './LoginBackground.vue'
const email = ref('')
function submit() {
  alert(`Reset link sent to ${email.value}`)
}
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(30, 40, 60, 0.08);
  padding: 48px 36px;
}
.field {
  display: block;
  margin-bottom: 15px;
}
.actions {
  margin-top: 8px;
}
button[type='submit'] {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 12px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>