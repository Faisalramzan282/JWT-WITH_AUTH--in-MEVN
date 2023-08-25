import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPageView.vue'
import LoginPageView from '../views/LoginPageView.vue';
import MoviesPageView from '../views/MoviesPageView.vue'
// import store from '@/store';
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
    component: MoviesPageView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach((to,from,next)=>{
//   if(to.matched.some((record)=>record.meta.requiresAuth))
//   {
//     if(store.state.user.tokens !== null)
//     {
//       next('/movies');
//     }
//     else{
//       next()
//     }
//   }
//   else{
//     next();
//   }
// })
export default router
