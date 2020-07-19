import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios'

// global import element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// axios interceptors
const axios = Axios.create({
  baseURL: 'http://193.112.128.94:3000',
  timeout: 5000
})
axios.interceptors.request.use(request => {
  const token = sessionStorage.getItem('token')
  if (token !== null) {
    request.headers.Authorization = 'Bearer ' + token
  }
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
