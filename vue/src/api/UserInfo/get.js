/**
 * @name: get
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/4/2020 4:30 PM
 * @description：get
 * @update: 7/4/2020 4:30 PM
 */

import request from "@/utils/request.js";

const api = () => request("/api/userInfo", "get");

export default api;
