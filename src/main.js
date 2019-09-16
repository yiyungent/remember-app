// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'

import vuetify from "./plugins/vuetify";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

// import FastClick from 'fastclick'

// FastClick.attach(document.body)

// axios 请求拦截 - 在发送请求之前做某件事
axios.interceptors.request.use(function(response){
  // 在 headers 中设置authorization 属性放token，token是存在缓存中的
  response.headers.token = localStorage["token"]
  return response
}, function (error) {
  return Promise.reject(error);
})

Vue.config.productionTip = false
Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>'
})
