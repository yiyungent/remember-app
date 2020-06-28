import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/components/Login/Index')
const Home = () => import('@/views/Home/Index')
const Home_First = () => import('@/components/Home/First')
const Home_Channel = () => import('@/components/Channel/Index')
const Home_Dynamic = () => import('@/components/Dynamic/Index')

const Home_First_Hot = () => import('@/components/Home/Hot')
const Home_First_Last = () => import('@/components/Home/Last')
const Home_First_Recom = () => import('@/components/Home/Recom')

const MyFriends = () => import('@/components/MyFriends/Index')
const MyFriends_MyFollow = () => import('@/components/MyFriends/MyFollow')
const MyFriends_MyFans = () => import('@/components/MyFriends/MyFans')

const MyFav = () => import('@/components/MyFav/Index.vue')
const MyFav_ArticleBox = () => import('@/components/MyFav/ArticleBox.vue')
const Favorite = () => import('@/components/Favorite/Index.vue')
const CreateFavorite = () => import('@/components/Favorite/CreateFavorite.vue')


const ArticleBox = () => import('@/components/ArticleBox/Index')

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
      redirect: { name: 'Home_First' },
      children: [
        {
          name: 'Home_First',
          path: '/First',
          component: Home_First,
        },
        // 频道
        {
          name: 'Home_Channel',
          path: '/Channel',
          component: Home_Channel
        },
        // 动态
        {
          name: 'Home_Dynamic',
          path: '/Dynamic',
          component: Home_Dynamic
        },
      ]
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
