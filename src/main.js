import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './common.vue'
import './plugins/element.js'

// 将引入的全局设置文件绑定到Vue的COMMON属性上
Vue.prototype.COMMON = global

// 折纸axios
Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
