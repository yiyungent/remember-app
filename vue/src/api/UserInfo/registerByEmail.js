import request from "@/utils/request.js";

const api = (email, vCode, password) =>
    request("/api/userInfo/registerByEmail", "post", { email, vCode, password });

export default api;
