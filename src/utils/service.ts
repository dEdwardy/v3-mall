import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
// import store from '../store'

const mockInstance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/280895/'
})
const instance = axios.create({
  baseURL: 'http://localhost:3000/'
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
  (config) => {
    console.warn(config)
    const { headers, url } = config
    if (whiteList.some((i) => url?.includes(i))) {
      return config
    } else {
      const token = useLocalStorage('token')
      if (!token.value) {
          const router = useRouter()
          Toast.fail('请登录后在操作')
          router.replace('/login')
      } else {
        headers.token = `Bear ${token.value}`
        return config
      }
      // if(!headers.token){
      //   const router = useRouter()
      //   Toast.fail('请登录后在操作')
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
    if (data.status == 200) {
      return data
    } else {
      Toast.fail(data.message.message)
      return Promise.reject(data.message.message)
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export { mockInstance, instance }
