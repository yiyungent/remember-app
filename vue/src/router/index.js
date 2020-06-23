import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../components/Login/Index')
const Home = () => import('@/components/Home/Index')
const Channel = () => import('@/components/Channel/Index')
const Home_Hot = () => import('../components/Home/Hot')
const Home_Last = () => import('../components/Home/Last')
const Home_Recom = () => import('../components/Home/Recom')

const MyFriends = () => import('../components/MyFriends/Index')
const MyFriends_MyFollow = () => import('../components/MyFriends/MyFollow')
const MyFriends_MyFans = () => import('../components/MyFriends/MyFans')

const MyFav = () => import('../components/MyFav/Index.vue')
const MyFav_ArticleBox = () => import('../components/MyFav/ArticleBox.vue')
const Favorite = () => import('../components/Favorite/Index.vue')
const CreateFavorite = () => import('../components/Favorite/CreateFavorite.vue')


const ArticleBox = () => import('../components/ArticleBox/Index')

const NotFound = () => import('@/components/NotFound')

Vue.use(Router)

// 必须登录才能访问的 route 添加 
// meta : {
//   needLogin: true, 
// },

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [

    // 登录页
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },

    // 首页及分类
    {
      name: 'Home',
      path: '/',
      component: Home,
      redirect: { name: 'Home_Recom' },
      children: [
        {
          name: 'Home_Hot',
          path: 'Hot',
          component: Home_Hot
        }, {
          name: 'Home_Recom',
          path: 'Recom',
          component: Home_Recom
        },
        {
          name: 'Home_Last',
          path: 'Last',
          component: Home_Last
        }
      ]
    },

    // 频道
    {
      name: 'Channel',
      path: '/Channel',
      component: Channel
    },

    // 我的好友 = 我的关注 + 我的粉丝
    {
      name: 'MyFriends',
      path: '/MyFriends',
      component: MyFriends,
      redirect: { name: 'MyFriends_MyFollow' },
      children: [
        {
          name: 'MyFriends_MyFollow',
          path: 'MyFollow',
          component: MyFriends_MyFollow,
          meta: {
            needLogin: true
          }
        },
        {
          name: 'MyFriends_MyFans',
          path: 'MyFans',
          component: MyFriends_MyFans,
          meta: {
            needLogin: true
          }
        }
      ]
    },

    // 我的收藏 = 我的文章收藏
    {
      name: 'MyFav',
      path: '/MyFav',
      component: MyFav,
      redirect: { name: 'MyFav_ArticleBox' },
      children: [
        {
          name: 'MyFav_ArticleBox',
          path: 'ArticleBox',
          component: MyFav_ArticleBox,
          meta: {
            needLogin: true
          }
        }
      ]
    },

    // 某收藏夹
    {
      name: 'Favorite',
      path: '/Favorite/:id',
      component: Favorite
    },
    {
      name: 'CreateFavorite',
      path: '/CreateFavorite',
      component: CreateFavorite
    },

    // 文章页
    {
      name: 'ArticleBox',
      path: '/ArticleBox/:id',
      component: ArticleBox,
      meta: { needLogin: true }
    },

    // 404 错误页面
    {
      name: 'NotFound',
      path: '*',
      component: NotFound
    }
  ]
})
