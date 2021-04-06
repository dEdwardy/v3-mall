import axios from 'axios'
// import { useAxios } from '@vueuse/integrations'

const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/280895/'
})

export default  instance;


// const { data, finished } = useAxios('/posts', instance)