import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Login from '@/pages/auth/LoginPage.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import PasswordResetSent from '@/pages/auth/PasswordResetSent.vue'
import Signup from '@/pages/auth/Signup.vue'
import Terms from '../pages/Terms.vue'
import Privacy from '../pages/Privacy.vue'
import Cart from '@/pages/account/Cart.vue'
import YourProfile from '@/pages/account/YourProfile.vue'
import Shop from '../pages/Shop.vue'
import Cameras from '../pages/shop/Cameras.vue'
import VideoCameras from '../pages/shop/VideoCameras.vue'
import Lenses from '../pages/shop/Lenses.vue'
import Accessories from '../pages/shop/Accessories.vue'
import AccountDetails from '@/pages/account/AccountDetails.vue'
import SearchResults from '@/pages/search/SearchResults.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  { path: '/reset-sent', component: PasswordResetSent },
  { path: '/signup', component: Signup }
  ,{ path: '/terms', component: Terms }
  ,{ path: '/privacy', component: Privacy }
  ,{ path: '/profile', component: YourProfile }
  ,{ path: '/shop', component: Shop }
  ,{ path: '/shop/cameras', component: Cameras }
  ,{ path: '/shop/videocameras', component: VideoCameras }
  ,{ path: '/shop/lenses', component: Lenses }
  ,{ path: '/shop/accessories', component: Accessories }
  ,{ path: '/profile/account', component: AccountDetails }
  ,{ path: '/search', component: SearchResults }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
