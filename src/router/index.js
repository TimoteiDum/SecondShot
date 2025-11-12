import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Login from '../components/login.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import PasswordResetSent from '../components/PasswordResetSent.vue'
import Signup from '../components/Signup.vue' // <-- Import Signup

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-sent', component: PasswordResetSent },
  { path: '/signup', component: Signup } // <-- Add Signup route
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router