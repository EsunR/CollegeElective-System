import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 233,
    account: '16031210105',
    name: '张三',
    identity: 'admin',
    faculty: '计算机'
  },
  mutations: {
    setData(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {
    
  }
})
