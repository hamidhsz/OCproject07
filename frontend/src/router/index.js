import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'  
import LoginView from '../views/LoginView.vue'  
import UserProfilePage from '../views/UserProfilePage.vue'  


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { 
      path: '/',
      name: 'Home',
      component: HomeView
    },
    { path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register', 
      component: RegisterView
    },
    {
      path: '/userprofile',
      name: 'User', 
      component: UserProfilePage
    }

  ]
})

export default router