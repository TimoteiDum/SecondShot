import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import PasswordResetSent from '../components/PasswordResetSent.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-sent', component: PasswordResetSent }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
