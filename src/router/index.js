import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/login')
  },
  {
    path: '/todo',
    component: () => import('../views/todo')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token === null || token === 'null') {
    if (to.path === '/') {
      next()
    } else {
      next('/')
    }
  } else {
    if (to.path === '/') {
      next('/todo')
    } else {
      next()
    }
  }
})

export default router
