/**
 * @name: index.js
 * @author: yiyun <yiyungent@gmail.com>
 * @profile: https://github.com/yiyungent
 * @date: 7/4/2020 3:53 PM
 * @description：index.js
 * @update: 7/4/2020 3:53 PM
 */

const Mock = require("mockjs");

Mock.mock(/\/api\/userInfo\/login\?*/i, "post", {
  code: 1,
  data: {
    token: "djaidjadqfnngfqfqfnnfnqnf",
    expire: 1993849755
  },
  message: "success"
});

Mock.mock(/\/api\/userInfo\?*/i, "get", {
  code: 1,
  data: {
    id: 56,
    userName: "白鸽",
    desc: "此用户很懒，没有写任何备注",
    fansNum: 135784,
    followNum: 5245,
    credit: 1312,
    avatar: "/images/default-avatar.jpg",
    dynamicNum: 35
  },
  message: "success"
});

Mock.mock(/\/api\/userInfo\/emailVCode\?*/i, "post", {
  code: 1,
  data: {},
  message: "success"
});

Mock.mock(/\/api\/userInfo\/registerByEmail\?*/i, "post", {
  code: 1,
  data: {},
  message: "success"
});