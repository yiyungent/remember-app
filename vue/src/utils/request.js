import axios from "axios"
import qs from "qs";

// build 环境
// axios.defaults.baseURL = 'http://api.tikotiko.fun';
// axios.defaults.baseURL = 'http://localhost:4530/';
axios.defaults.baseURL = process.env.VUE_APP_API;

// axios 请求拦截 - 在发送请求之前做某件事
axios.interceptors.request.use(
    function (request) {
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
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * 发送http请求
 * @param {String} url 目标rl
 * @param {String} method 方法get,post,put etc.
 * @param {Object} params 对象参数
 * @returns {Promise<unknown>}
 */
const request = function (url, method, params) {
    return new Promise((resolve, reject) => {
        if (method == "get") {
            axios({
                url: url,
                method: "get",
                params: params
            })
                .then(res => {
                    res.data.status = res.status;
                    resolve(res.data);
                })
                .catch(err => {
                    err.data.status = err.status;
                    reject(err.data)
                })
        } else {
            axios({
                url: url,
                method: method,
                data: params
            })
                .then(res => {
                    res.data.status = res.status;
                    resolve(res.data);
                })
                .catch(err => {
                    err.data.status = err.status;
                    reject(err.data)
                })
        }
    });
};

export default request;
