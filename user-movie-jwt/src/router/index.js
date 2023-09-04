import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPageView.vue'
import LoginPageView from '../views/LoginPageView.vue';
import MoviesPageView from '../views/MoviesPageView.vue'
import UserHomePage from '../views/UserHomePageview.vue'
import UnauthorizedPage from '../views/UnauthorizedPagevie.vue'
import AdminPannel from '../views/AdminPannelView.vue'
import OrderMoviesView from '../views/OrderMoviesview.vue'
import store from '@/store';
const routes = [
  {

     path: '/adminPannel',
     name : 'adminPannel',
     component: AdminPannel, 
    beforeEnter: (to, from, next) => {
      if(store.state.user.user.tokens)
      {
        next()
      }
      else{
        next('/unauthorize')
      }
     }
  },
  {
    path:'/unauthorize',
    name: 'unauthorize', 
    component: UnauthorizedPage
  },
  {
    path: '/',
    name: 'signUp',
    component: SignUpPage,
   
  },
  {
     path:'/login',
     name : 'login',
     component: LoginPageView,
     meta:{
      requiresAth : true
 }
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesPageView,
    beforeEnter: (to, from, next) => {
      if(store.state.user.user.tokens)
      {
        next()
      }
      else{
        next('/unauthorize')
      }
     }  }, 
  {
    path: '/user',
    name: 'user',
    // redirect: '/user/order',
    component: UserHomePage,
    beforeEnter: (to, from, next) => {
      if(store.state.user.user.tokens)
      {
        next()
      }
      else{
        next('/unauthorize')
      }
     },
  }, 
  {
    path: '/user/order',
    name: 'order',
    component: OrderMoviesView,
    beforeEnter: (to, from, next) => {
      if(store.state.user.user.tokens)
      {
        next()
      }
      else{
        next('/unauthorize')
      }
     },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
