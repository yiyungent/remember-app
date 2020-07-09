import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("@/components/Account/Login");
const Register = () => import("@/components/Account/Register");
const Home = () => import("@/views/Home/Index");
const Home_Index = () => import("@/components/Home/Index");
const Home_Channel = () => import("@/components/Channel/Index");
const Home_Dynamic = () => import("@/components/Dynamic/Index");

const MyFriends = () => import("@/components/MyFriends/Index");
const MyFriends_MyFollow = () => import("@/components/MyFriends/MyFollow");
const MyFriends_MyFans = () => import("@/components/MyFriends/MyFans");

const MyFav = () => import("@/components/MyFav/Index.vue");
const MyFav_Article = () => import("@/components/MyFav/Article.vue");
const Favorite = () => import("@/components/Favorite/Index.vue");
const CreateFavorite = () => import("@/components/Favorite/CreateFavorite.vue");

const Article = () => import("@/components/Article/Index");

const NotFound = () => import("@/components/NotFound");

Vue.use(VueRouter);

// 必须登录才能访问的 route 添加
// meta : {
//   needLogin: true,
// },
const routes = [
    // 登录页
    {
        name: "Login",
        path: "/Login",
        component: Login
    },
    // 注册页
    {
        name: "Register",
        path: "/Register",
        component: Register
    },

    // 首页及分类
    {
        name: "Home",
        path: "/",
        component: Home,
        redirect: {name: "Home_Index"},
        children: [
            {
                name: "Home_Index",
                path: "/Index",
                component: Home_Index
            },
            // 频道
            {
                name: "Home_Channel",
                path: "/Channel",
                component: Home_Channel
            },
            // 动态
            {
                name: "Home_Dynamic",
                path: "/Dynamic",
                component: Home_Dynamic
            }
        ]
    },

    // 我的好友 = 我的关注 + 我的粉丝
    {
        name: "MyFriends",
        path: "/MyFriends",
        component: MyFriends,
        redirect: {name: "MyFriends_MyFollow"},
        children: [
            {
                name: "MyFriends_MyFollow",
                path: "MyFollow",
                component: MyFriends_MyFollow,
                meta: {
                    needLogin: true
                }
            },
            {
                name: "MyFriends_MyFans",
                path: "MyFans",
                component: MyFriends_MyFans,
                meta: {
                    needLogin: true
                }
            }
        ]
    },

    // 我的收藏 = 我的文章收藏
    {
        name: "MyFav",
        path: "/MyFav",
        component: MyFav,
        redirect: {name: "MyFav_Article"},
        children: [
            {
                name: "MyFav_Article",
                path: "Article",
                component: MyFav_Article,
                meta: {
                    needLogin: true
                }
            }
        ]
    },

    // 某收藏夹
    {
        name: "Favorite",
        path: "/Favorite/:id",
        component: Favorite
    },
    {
        name: "CreateFavorite",
        path: "/CreateFavorite",
        component: CreateFavorite
    },

    // 文章页
    {
        name: "Article",
        path: "/Article/:id",
        component: Article,
        meta: {needLogin: true}
    },

    // 404 错误页面
    {
        name: "NotFound",
        path: "*",
        component: NotFound
    }
];

const router = new VueRouter({
    // mode: 'history',
    mode: "hash",
    routes
});

export default router;
