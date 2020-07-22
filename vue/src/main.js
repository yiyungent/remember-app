/*
 * @Author: yiyun
 * @Description: remember-app
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import * as filters from "./filters";
import { isTokenInvalid } from "./utils";
import "@/assets/css/base.less";

import VueAwesomeSwiper from "vue-awesome-swiper";
// require styles
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

// 百度统计
// import ba from "vue-ba";
// Vue.use(ba, "609c6fc1c238ea6c9fdc64fecbaf4794");
// Vue.use(ba, { siteId: "609c6fc1c238ea6c9fdc64fecbaf4794" });

import FastClick from "fastclick";
FastClick.attach(document.body);

// 开发环境引入 mock
// process.env.VUE_APP_MOCK && require('@/mock')
require("@/mock");

// 引入http request，进行一些初始化配置操作，但不允许在vue component中直接操作http request，而是调用api
require("@/utils/request.js");
Vue.prototype.$http = function() {
  console.error("你不应当在组件中直接发送http请求，请调用api获取数据");
};

// 登陆状态token效验
router.beforeEach((to, from, next) => {
  // 这里的meta就是我们刚刚在路由里面配置的meta
  if (to.meta.needLogin) {
    // 下面这个判断是自行实现到底是否有没有登录
    if (isTokenInvalid()) {
      // token无效 -> （这种情况下，通常是登陆(token)过期） 清除 vuex中user
      store.state.user = null;
      // token无效 -> 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      // 登录就继续
      next();
    }
  } else {
    // 不需要登录的，可以继续访问
    next();
  }
});

// 注册常用全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

const VERSION = "0.0.1";
const GIT_HASH = "";
console.log(
  `${"\n"} %c remember-app v${VERSION} ${GIT_HASH} %c https://github.com/yiyungent/remember-app ${"\n"}${"\n"}`,
  "color: #fff; background: #030307; padding:5px 0;",
  "background: #ff80ab; padding:5px 0;"
);
