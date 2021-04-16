import axios from 'axios'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
// import store from '../store'
console.error(import.meta.env)
const mockInstance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/280895/',
  timeout: 5000
})
const instance = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL,
  // baseURL: 'http://localhost:3000',
  timeout: 5000
})
const whiteList = ['app-login', 'send-code']
// const requestNum = 0;
mockInstance.interceptors.request.use(
  (config) => {
    // ++requestNum
    // console.error(requestNum)
    // if (!store.state.loading) {
    //   store.commit('changeLoadingState', true)
    //   console.warn('loading  111111111111111')
    // }

    console.log(config)
    return config
  },
  (err) => {
    // store.commit('changeLoadingState', false)
    return Promise.reject(err)
  }
)

mockInstance.interceptors.response.use(
  (res) => {
    // requestNum = requestNum - 1
    // if (requestNum < 1 && store.state.loading) {
    //   store.commit('changeLoadingState', false)
    //   console.warn('loading 0000000000000000')
    // }
    return res
  },
  (err) => {
    // store.commit('changeLoadingState', false)
    return Promise.reject(err)
  }
)

instance.interceptors.request.use(
  (config: any) => {
    console.warn(config)
    const { headers, url } = config
    if (whiteList.some((i) => url.includes(i))) {
      return config
    } else {
      const token = localStorage.getItem('token')
      if (!token) {
        const router = useRouter()
        Toast.fail('请登录后再操作')
        router.replace('/login')
      } else {
        headers.Authorization = token
        // headers.token = token
        return config
      }
      // if(!headers.token){
      //   const router = useRouter()
      //   Toast.fail('请登录后再操作')
      //   router.replace('/login')
      // }else{
      //   return config
      // }
    }
    // return config
  },
  (err) => {
    // store.commit('changeLoadingState', false)
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    const { data } = res.data
    const status = data?.status
    if (status == 200) {
      return data
    } else if( status == 429){
      Toast.fail('请勿频繁操作')
      return Promise.reject('请勿频繁操作')
    }else {
      if (data.message) {
        console.error(data.message?.message ?? data.message?.error)
        Toast.fail(data.message?.message ?? data.message?.error)
        return Promise.reject(data.message?.message ?? data.message?.error)
      } 
      // else if (data) {
      //   console.error(data)
      //   return Promise.reject('网络出错啦')
      // }
    }
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)

export { mockInstance, instance }
