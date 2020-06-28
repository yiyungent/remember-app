const Mock = require("mockjs")

Mock.mock(/\/api\/article\/hot\?*/i, "get", {
    "code": 1,
    "data|10-20": [{
        article: {
            id: "@increment(10)",
            title: "热门@increment(1)-@ctitle(1,30)",
            picUrl: "@image('200x100', '#50B347', '#0FF', '@name')"
        },
        "favNum|13-254": 0
    }],
    "message": "success"
})

Mock.mock(/\/api\/article\/last\?*/i, "get", {
    "code": 1,
    "data|10-20": [{
        article: {
            id: "@increment(10)",
            title: "最新@increment(1)-@ctitle(1,30)",
            picUrl: "@image('200x100', '#f8e71c', '#0FF', '@name')"
        },
        "favNum|13-254": 0
    }],
    "message": "success"
})

Mock.mock(/\/api\/article\/recom\?*/i, "get", {
    "code": 1,
    "data|10-20": [{
        article: {
            id: "@increment(10)",
            title: "推荐@increment(1)-@ctitle(1,30)",
            picUrl: "@image('200x100', '#50e3c2', '#0FF', '@name')"
        },
        "favNum|13-254": 0
    }],
    "message": "success"
})
