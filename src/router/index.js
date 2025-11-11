import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/login.vue'
// import Signup from '../components/signup.vue' // Uncomment if you have it

const router = createRouter({
  history: createWebHashHistory(), // ✅ works on GitHub Pages
  routes: [
    { path: '/', component: Login }, // 👈 Default route goes to Login
    // { path: '/signup', component: Signup },
  ],
})

export default router
