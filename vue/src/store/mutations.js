/**
 * @name: mutations
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/4/2020 4:37 PM
 * @description：mutations
 * @update: 7/4/2020 4:37 PM
 */

import types from "./types";

export default {
  // this.$store.commit('方法的名称', '按需传递唯一的参数')
  // 获取当前登录账号并保存到 user
  [types.GET_USER](state, user) {
    state.user = user;
  },
  // 注销账号
  [types.LOGOUT](state) {
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
  }
};
