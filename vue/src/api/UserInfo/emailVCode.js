import request from "@/utils/request.js";

const api = (email, ticket, userId) => request("/api/userInfo/emailVCode", "post", { email, ticket, userId });

export default api;
