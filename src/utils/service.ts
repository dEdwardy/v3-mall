import axios from 'axios'
// import store from '../store'

const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/280895/'
})

// const requestNum = 0;
instance.interceptors.request.use(config => {
  // ++requestNum
  // console.error(requestNum)
  // if (!store.state.loading) {
  //   store.commit('changeLoadingState', true)
  //   console.warn('loading  111111111111111')
  // }

  console.log(config)
  return config
}, err => {
  // store.commit('changeLoadingState', false)
  return Promise.reject(err);
})

instance.interceptors.response.use(res => {
  // requestNum = requestNum - 1
  // if (requestNum < 1 && store.state.loading) {
  //   store.commit('changeLoadingState', false)
  //   console.warn('loading 0000000000000000')
  // }
  return res
}, err => {
  // store.commit('changeLoadingState', false)
  return Promise.reject(err);
})
export default instance;


// const { data, finished } = useAxios('/posts', instance)