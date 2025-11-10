<template>
  <div class="login-page">
    <!-- Left side: welcome text -->
    <div class="left-side">
      <img src="/logo.png" alt="SecondShot Logo" class="logo" />
      <h1 class="brand">SecondShot</h1>
      <p class="tagline">Your next adventure is just a login away.</p>
    </div>

    <!-- Right side: login card -->
    <div class="right-side">
      <div class="card" role="main" aria-labelledby="login-title">
        <h2 id="login-title">Welcome Back!</h2>

        <form @submit.prevent="submit" novalidate>
          <label class="field">
            <span>Email</span>
            <input
              type="email"
              v-model.trim="email"
              :class="{ invalid: errors.email }"
              required
              placeholder="you@example.com"
            />
            <small class="error" v-if="errors.email">{{ errors.email }}</small>
          </label>

          <label class="field">
            <span>Password</span>
            <div class="pw-row">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :class="{ invalid: errors.password }"
                required
                placeholder="••••••••"
              />
              <button type="button" class="toggle" @click="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <small class="error" v-if="errors.password">{{ errors.password }}</small>
          </label>

          <label class="checkbox">
            <input type="checkbox" v-model="remember" />
            <span>Remember me</span>
          </label>

          <div class="actions">
            <button type="submit" :disabled="loading">
              <span v-if="!loading">Log In</span>
              <span v-else class="spinner" aria-hidden="true"></span>
            </button>
          </div>

          <p class="server-error" v-if="serverError" role="alert">{{ serverError }}</p>
        </form>
        <p class="signup-text">
              Don’t have an account?
             <a href="/signup">Sign up</a>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const serverError = ref('')
const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email = ''
  errors.password = ''
  serverError.value = ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) errors.email = 'Email is required.'
  else if (!emailRegex.test(email.value)) errors.email = 'Enter a valid email.'

  if (!password.value) errors.password = 'Password is required.'
  else if (password.value.length < 6) errors.password = 'Password must be at least 6 characters.'

  return !errors.email && !errors.password
}

async function submit() {
  if (!validate()) return

  loading.value = true
  serverError.value = ''

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        remember: remember.value,
      }),
    })

    if (!res.ok) throw new Error('Authentication failed')

    const data = await res.json()
    const token = data?.token
    if (!token) throw new Error('No token received from server')

    if (remember.value) localStorage.setItem('auth_token', token)
    else sessionStorage.setItem('auth_token', token)

    emit('login-success', { token, user: data?.user })
  } catch (err) {
    serverError.value = err?.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  /* background image */
  background-image: url('/login-bg.jpeg');
  background-size: cover;
  background-position: center;
}


.signup-text {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #4b5563;
}

.signup-text a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}

.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  object-fit: contain;
}

.login-page {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
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



.card {
  width: 100%;
  max-width: 500px;
  /* background: white; */ /* ← comment this out for testing */
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(30, 40, 60, 0.08);
  padding: 48px 36px;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 1.4rem;
  color: #111827;
  text-align: center;
}

.field {
  display: block;
  margin-bottom: 15px;
}

.field span {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #374151;
}

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #fff;
}

.invalid {
  border-color: #ef4444;
}

.error {
  display: block;
  margin-top: 6px;
  color: #ef4444;
  font-size: 0.85rem;
}

.pw-row {
  display: flex;
  gap: 8px;
}

.toggle {
  background: #f3f4f6;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #374151;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  color: #374151;
  font-size: 0.95rem;
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

button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  vertical-align: middle;
}

.server-error {
  margin-top: 12px;
  color: #b91c1c;
  font-size: 0.95rem;
}

.signup-link {
  margin-top: 18px;
  text-align: center;
  font-size: 0.98rem;
  color: #374151;
}
.signup-link a {
  color: #2563eb;
  text-decoration: underline;
  margin-left: 4px;
  cursor: pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 900px) {
  .login-page {
    flex-direction: column;
  }
  .left-side {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}
</style>