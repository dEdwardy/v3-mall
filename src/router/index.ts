import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import '../common/nprogress.css'
import { Toast } from 'vant'
import { useNProgress } from '@vueuse/integrations'
import { useLocalStorage } from '@vueuse/core'
const { progress } = useNProgress()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'lead',
    component: () => import(/* webpackChunkName: "lead" */ '../views/Lead.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue')
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import(/* webpackChunkName: "travel" */ '../views/Travel.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/hotel-info/:id?',
    name: 'hotel-info',
    component: () => import(/* webpackChunkName: "hotel-info" */ '../views/HotelInfo.vue')
  },
  {
    path: '/hotel-detail/:id?',
    name: 'hotel-detail',
    component: () => import(/* webpackChunkName: "hotel-detail" */ '../views/HotelDetail.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
  }
]
const start = () => {
  progress.value = 0
}
const done = () => {
  progress.value = 1.0
}
const router = createRouter({
  history: createWebHistory('/v3-mall'),
  routes
})
const whiteList = ['/','/login']
router.beforeEach((to, from, next) => {
  // console.error('start')
  console.warn(to)
  if (whiteList.some((i) => to.path=== i)) {
    console.error('white')
    start()
    next()
  } else {
    const token = useLocalStorage('token')
    if (!token.value) {
      console.error('home')
      Toast.fail('请登录后在操作')
      next({ path: '/login' })
    } else {
      console.error('continus')
      start()
      next()
    }
  }
})
router.afterEach(() => {
  // console.error('end')
  done()
})
router.onError((err) => alert(err))
export default router
