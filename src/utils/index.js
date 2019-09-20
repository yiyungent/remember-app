var isLoginMethod = () => {
    var currentUnixTime = Math.round(new Date().getTime() / 1000);
    if (!!localStorage.token && !!localStorage.token_expire && currentUnixTime < localStorage.token_expire) {
        // token 存在 且 不为空 且 未过期
        return true;
    } else {
        localStorage.removeItem('token');

        return false;
    }
}

export {
    isLoginMethod
}