import { createApp } from 'vue'
import router from './router'
import store from './store'
import VantUI from "vant";
import 'vant/lib/index.css';
import App from './App.vue'

createApp(App).use(router).use(store).use(VantUI).mount('#app')
