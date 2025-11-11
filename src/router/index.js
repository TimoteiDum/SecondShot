import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'

const routes = [
  { path: '/', component: Login }
  // Add more routes here as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router