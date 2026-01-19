import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Login from '../pages/LoginModal.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import PasswordResetSent from '../pages/PasswordResetSent.vue'
import Signup from '../pages/Signup.vue'
import Terms from '../pages/Terms.vue'
import Privacy from '../pages/Privacy.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-sent', component: PasswordResetSent },
  { path: '/signup', component: Signup }
  ,{ path: '/terms', component: Terms }
  ,{ path: '/privacy', component: Privacy }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
