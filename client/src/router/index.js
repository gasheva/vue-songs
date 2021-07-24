import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    // редирект на /song
    path: '/',
    name: 'Home',
    redirect: { name: 'Songs' }
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: "empty", notAuth: true },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: "empty", notAuth: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/songs',
    name: 'Songs',
    meta: { layout: "main" },
    component: () => import('../views/Songs.vue')
  },
  {
    path: '/songs/:id',
    name: 'Song',
    meta: { layout: "main" },
    component: () => import('../views/Song.vue')
  },

  {
    path: '/create-song',
    name: 'CreateSong',
    meta: { layout: "main" },
    component: () => import('../views/CreateSong.vue')
  },
  {
    path: '/*',
    name: "Error",
    meta: { layout: "empty" },
    component: () => import('../views/404.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// проверка на аутентификацию перед переходом на страницу
router.beforeEach((to, from, next) => {
  const requireNotAuth = to.matched.some(record => record.meta.notAuth);
  const isAuth = store.getters.isAuthenticated;
  // переход на страницу логина и регистрации только для 
  // не аутентифицированных пользователей
  if (requireNotAuth && isAuth) {
    next({path: from.fullPath, query: { message: "you_are_login" }})
  } else
      next();
})

export default router
