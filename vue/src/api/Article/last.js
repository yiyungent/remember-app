/**
 * @name: last
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/1/2020 8:29 PM
 * @description：last
 * @update: 7/1/2020 8:29 PM
 */

import request from "@/utils/request.js";

const api = page => request("/api/article/last", "get", { page: page });

export default api;
