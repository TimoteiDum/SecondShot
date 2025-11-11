<template>
  <div class="forgot-page">
    <div class="card">
      <h1 class="app-title">SecondShot</h1>
      <h2>Forgot your password?</h2>
      <p>Enter your email address below and we'll send you a link to reset your password.</p>
      <form @submit.prevent="submit">
        <label class="field">
          <span>Email address</span>
           <div class="input-icon-wrapper"></div>
          <input
            type="email"
            v-model="email"
            :class="{ invalid: emailError }"
            required
            placeholder="you@example.com"
            @input="emailError = ''"
          />
          <small v-if="emailError" class="error">{{ emailError }}</small>
        </label>
        <div class="actions">
          <button type="submit">Send Reset Link</button>
        </div>
      </form>
      <router-link to="/" class="back-to-login">Back to login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()   

const email = ref('')
const emailError = ref('')

function validateEmail(value) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function submit() {
  if (!validateEmail(email.value)) {
    emailError.value = 'Email is invalid'
    return
  }
  emailError.value = ''
router.push('/reset-sent')}
</script>

<style scoped>
.email-page-icon {
  font-size: 5.5rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
}
.input-icon-wrapper {
  position: relative;
  width: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon-wrapper i {
  position: absolute;
  left: 12px;
  color: #2563eb;
  font-size: 1.2rem;
  pointer-events: none;
}

.input-icon-wrapper input[type="email"] {
  padding-left: 2.2rem; /* Add space for the icon */
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 1rem;
}
.back-to-login {
  display: block;
  margin-top: 1.5rem;
  color: #2563eb;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
}
.back-to-login:hover {
  text-decoration: none;
}
.forgot-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #ffffff;
}
.card {
  width: 100%;
  max-width: 400px;
  min-height: 600px;
  background: rgb(222, 218, 218);
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(30,40,60,0.08);
  padding: 120px 36px 64px 36px;
  text-align: center;
}
.card h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 6rem;
  margin-top: 2rem; /* Adjust as needed */
  letter-spacing: 0.5px;
  font-family: 'Arial', sans-serif; /* Or any font you like */
}
.app-title {
  font-family: 'Baskerville', serif;
  font-size: 2.2rem;
  font-weight: 500;
  color: #000000;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  margin-top: 0;           
  margin-bottom: 3rem;     
  letter-spacing: 5px;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  text-align: center;
  margin-bottom: 4rem;    
}
.field span {
  margin-bottom: 6px;
  font-size: 0.98rem;
  color: #374151;
  text-align: center; 
}
.field input[type="email"] {
  width: 80%;
  box-sizing: border-box;
  text-align: center; 
  margin-bottom: 1rem;    

}
.field input.invalid {
  border: 2px solid #ef4444;
}
.error {
  color: #ef4444;
  font-size: 0.92rem;
  margin-top: 4px;
  text-align: center; 
}
.card p {
  margin-top: 2.5rem;   /* Increase to move it further down */
  margin-bottom: 2rem;  /* Adjust as needed for spacing below */
  color: #444;
  font-size: 1rem;
}
.actions {
  margin-top: 12px;
}
button[type='submit'] {
  width: 80%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 12px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;    
}
</style>