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

Vue.filter('toWeek', function (value) {
  switch (value) {
    case '1':
      return '周一';
    case '2':
      return '周二';
    case '3':
      return '周三';
    case '4':
      return '周四';
    case '5':
      return '周五';
  }
})

Vue.filter('proptype', function(value){
  switch (value){
    case '0': 
      return '选修';
    case '1':
      return '必修';
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
