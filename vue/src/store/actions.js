/**
 * @name: actions
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/4/2020 4:37 PM
 * @description：actions
 * @update: 7/4/2020 4:37 PM
 */

import apiUserGet from "@/api/UserInfo/get";
import types from "./types";

export default {
  [types.GET_USER]({ commit }) {
    apiUserGet().then(res => {
      if (res.code > 0) {
        commit(types.GET_USER, res.data);
      } else {
        // 获取用户信息失败-未登录/ token 失效
        commit(types.LOGOUT);
      }
    });
  },
  [types.LOGOUT]({ commit }) {
    commit(types.LOGOUT);
  }
};
