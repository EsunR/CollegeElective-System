import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VePie from 'v-charts/lib/pie.common.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './common.vue'
import './plugins/element.js'
import './assets/style.css'

// 将引入的全局设置文件绑定到Vue的COMMON属性上
Vue.prototype.COMMON = global

// 引入v-charts
Vue.component(VePie.name, VePie)

// 折纸axios
Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

Vue.filter('identity', function (str) {
  switch (str) {
    case "student":
      return "学生";
    case "teacher":
      return "教师";
    case "admin":
      return "管理员";
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
