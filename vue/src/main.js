import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import axios from "axios";
import qs from "qs";
import * as filters from "./filters";
import { isLoginMethod } from "./utils/index";

import { Toast } from "vant";
Vue.use(Toast);

import VueAwesomeSwiper from "vue-awesome-swiper";
// require styles
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import ba from "vue-ba";
Vue.use(ba, "609c6fc1c238ea6c9fdc64fecbaf4794");
Vue.use(ba, { siteId: "609c6fc1c238ea6c9fdc64fecbaf4794" });

import FastClick from "fastclick";
FastClick.attach(document.body);

// 开发环境引入 mock
// process.env.VUE_APP_MOCK && require('@/mock')
require("@/mock");

// build 环境
// axios.defaults.baseURL = 'http://api.tikotiko.fun';
// axios.defaults.baseURL = 'http://localhost:4530/';
axios.defaults.baseURL = process.env.VUE_APP_API;

// axios 请求拦截 - 在发送请求之前做某件事
axios.interceptors.request.use(
  function(request) {
    // 解决跨域 post 变 OPTIONS，导致 404
    if (request.method === "post") {
      request.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      request.data = qs.stringify({
        ...request.data
      });
    }

    if (localStorage.token) {
      // 在 headers 中设置 Authorization 属性放token，token是存在缓存中的
      request.headers.Authorization = `Bearer ${localStorage.token}`;
    }

    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 为什么传这三个参数，官网有详细介绍
router.beforeEach((to, from, next) => {
  // 这里的meta就是我们刚刚在路由里面配置的meta
  if (to.meta.needLogin) {
    // 下面这个判断是自行实现到底是否有没有登录
    if (isLoginMethod()) {
      // 登录就继续
      next();
    } else {
      // 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    // 不需要登录的，可以继续访问
    next();
  }
});

// 注册常用全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
