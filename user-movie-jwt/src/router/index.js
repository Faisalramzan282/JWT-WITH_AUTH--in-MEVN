import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPageView.vue'
import LoginPageView from '../views/LoginPageView.vue';
import MoviesPageView from '../views/MoviesPageView.vue'
import UserHomePage from '../views/UserHomePageview.vue'
import ModeratorHome from '../views/ModeratorHomeView.vue'
import UnauthorizedPage from '../views/UnauthorizedPagevie.vue'
import AdminPannel from '../views/AdminPannelView.vue'
import store from '@/store';
const routes = [
  {

     path: '/adminPannel',
     name : 'adminPannel',
     component: AdminPannel, 
     beforeEnter: (to, from, next) => {
      if(store.state.user.tokens)
      {
        next()
      }
      else{
        next('/login')
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
    // meta: { requiresAuth: true }
  }, 
  {
    path: '/user',
    name: 'user',
    component: UserHomePage,
    meta: {
      requiresAuth: true 
    },
    // beforeEnter: (to, from, next) => {
    //   const user_roles = store.state.user.roles_Store;
    //   const user_tokens = store.state.user.tokens;
    //   // console.log("checking user roles", user_roles);
    //   // console.log("tokens in store router configuration ===>", store.state.user.tokens)
    //   // console.log("Matched requiresAuth:", to.matched.some(record => record.meta.requiresAuth));
    //   // console.log("Route Name:", to.name);

    //   if (to.matched.some(record => record.meta.requiresAuth) && user_roles === 'user'
    //    && user_tokens
    //   ) {
    //     console.log("inside block of if");
    //     next();
    //   } else {
    //     console.log("inside block of else");
    //     next('/unauthorize'); // Redirect to an unauthorized route if access is denied
    //   }
    // }
  }, 
  {
    path: '/moderator',
    name : 'moderator',
    component: ModeratorHome
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const user_roles = store.state.user.roles_Store;
//   console.log("checking user roles", user_roles);

//   console.log("Matched requiresAuth:", to.matched.some(record => record.meta.requiresAuth));
//   console.log("Route Name:", to.name);

//   if (to.matched.some(record => record.meta.requiresAuth) && user_roles === 'user') {
//     console.log("inside block of if");
//     next({
//       name: "user",
//     });
//   } else {
//     console.log("inside block of else");
//     next();
//   }
// });


export default router
