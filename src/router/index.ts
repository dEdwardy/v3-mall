import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import '../common/nprogress.css'
import { useNProgress } from '@vueuse/integrations'
const { progress } = useNProgress(null,{
  showSpinner:true
})
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },{
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue')
  },{
    path: '/travel',
    name: 'travel',
    component: () => import(/* webpackChunkName: "travel" */ '../views/Travel.vue')
  },{
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },{
    path: '/hotel-info/:id?',
    name: 'hotel-info',
    component: () => import(/* webpackChunkName: "hotel-info" */ '../views/HotelInfo.vue')
  },{
    path: '/hotel-detail/:id?',
    name: 'hotel-detail',
    component: () => import(/* webpackChunkName: "hotel-detail" */ '../views/HotelDetail.vue')
  },{
    path: '/lead',
    name: 'lead',
    component: () => import(/* webpackChunkName: "lead" */ '../views/Lead.vue')
  },{
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
  history: createWebHistory('/'),
  routes
})
router.beforeEach((to, from, next) => {
  // console.error('start')
  start()
  next()
})
router.afterEach(() => {
  // console.error('end')
  done()
})
router.onError(err => alert(err))
export default router
