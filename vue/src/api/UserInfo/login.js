/**
 * @name: login.js
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/4/2020 4:30 PM
 * @description：login.js
 * @update: 7/4/2020 4:30 PM
 */

import request from "@/utils/request.js";

const api = (account, password, ticket, userId) =>
  request("/api/userInfo/login", "post", { account, password, ticket, userId });

export default api;
