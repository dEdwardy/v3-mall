import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    changeLoadingState(state,value){
      console.log(state,value)
      state.loading = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
