<template>
    <div class="login-page">
        <div class="card" role="main" aria-labelledby="login-title">
            <h1 id="login-title">Sign in</h1>

            <form @submit.prevent="submit" novalidate>
                <label class="field">
                    <span>Email</span>
                    <input
                        type="email"
                        v-model.trim="email"
                        :class="{ invalid: errors.email }"
                        required
                        autocomplete="username"
                        aria-invalid="false"
                        aria-describedby="email-error"
                        placeholder="you@example.com"
                    />
                    <small id="email-error" class="error" v-if="errors.email">{{ errors.email }}</small>
                </label>

                <label class="field">
                    <span>Password</span>
                    <div class="pw-row">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            :class="{ invalid: errors.password }"
                            required
                            autocomplete="current-password"
                            aria-describedby="password-error"
                            placeholder="••••••••"
                        />
                        <button type="button" class="toggle" @click="showPassword = !showPassword" :aria-pressed="showPassword">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <small id="password-error" class="error" v-if="errors.password">{{ errors.password }}</small>
                </label>

                <label class="checkbox">
                    <input type="checkbox" v-model="remember" />
                    <span>Remember me</span>
                </label>

                <div class="actions">
                    <button type="submit" :disabled="loading">
                        <span v-if="!loading">Sign in</span>
                        <span v-else class="spinner" aria-hidden="true"></span>
                    </button>
                </div>

                <p class="server-error" v-if="serverError" role="alert">{{ serverError }}</p>
            </form>
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
        // Replace the URL below with your real authentication endpoint.
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                remember: remember.value,
            }),
        })

        if (!res.ok) {
            // Try to read error from response, fallback to status text
            let msg = res.statusText
            try {
                const body = await res.json()
                msg = body?.message || body?.error || msg
            } catch {}
            throw new Error(msg || 'Authentication failed')
        }

        const data = await res.json()
        const token = data?.token

        if (!token) throw new Error('No token received from server')

        // Persist token (example)
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
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #f5f7fb, #ffffff);
    padding: 24px;
}

.card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(30, 40, 60, 0.08);
    padding: 28px;
}

h1 {
    margin: 0 0 16px 0;
    font-size: 1.25rem;
    color: #111827;
}

.field {
    display: block;
    margin-bottom: 12px;
}

.field span {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 6px;
    color: #374151;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    box-sizing: border-box;
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
    background: transparent;
    border: none;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    color: #374151;
    background: #f3f4f6;
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

button[type="submit"] {
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
    border: 2px solid rgba(255,255,255,0.3);
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

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>