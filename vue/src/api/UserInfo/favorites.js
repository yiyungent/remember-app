import request from "@/utils/request.js";

// 我的收藏夹
const api = () => request("/api/userInfo/favorites", "get");

export default api;
