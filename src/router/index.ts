import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
