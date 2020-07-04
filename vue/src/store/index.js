import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default store;
