import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPageView.vue'
import LoginPageView from '../views/LoginPageView.vue';
import MoviesPageView from '../views/MoviesPageView.vue'
const routes = [
  {
    path: '/',
    name: 'signUp',
    component: SignUpPage
  },
  {
     path:'/login',
     name : 'login',
     component: LoginPageView
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesPageView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
