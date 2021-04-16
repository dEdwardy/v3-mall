import { createApp } from 'vue'
import router from './router'
import store from './store'
import VantUI from 'vant';
import 'vant/lib/index.css';
import 'reset.css'
import './common/index.scss'
// import Lazyload from  'vue3-lazyload'
import { Lazyload } from 'vant';
// import 'default-passive-events'
import App from './App.vue'
import loading from './assets/loading.gif'

createApp(App).use(router).use(store).use(VantUI).use(Lazyload,{
  lazyComponent: true,
  loading
}).mount('#app')
