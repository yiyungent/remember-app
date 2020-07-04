/**
 * 登陆token是否无效（无效：1.无token，2.过期）
 * 若无效，则调用后会清除token,token_expire
 * @returns {boolean}
 */
var isTokenInvalid = () => {
  var currentUnixTime = Math.round(new Date().getTime() / 1000);
  if (
    !!localStorage.token &&
    !!localStorage.token_expire &&
    currentUnixTime < localStorage.token_expire
  ) {
    // token 存在 且 不为空 且 未过期
    return false;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");

    return true;
  }
};

export { isTokenInvalid };
