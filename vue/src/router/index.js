import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../components/Login/Index')
const Home = () => import('@/components/Home/Index')
const Channel = () => import('@/components/Channel/Index')
const Home_Cat1 = () => import('../components/Home/Cat1')
const Home_Cat2 = () => import('../components/Home/Cat2')
// const Home_Cat3 = () => import('../components/Home/Cat3')
// const Home_Cat4 = () => import('../components/Home/Cat4')
// const Home_Cat5 = () => import('../components/Home/Cat5')
// const Home_Cat6 = () => import('../components/Home/Cat6')

const MyFriends = () => import('../components/MyFriends/Index')
const MyFriends_MyFollow = () => import('../components/MyFriends/MyFollow')
const MyFriends_MyFans = () => import('../components/MyFriends/MyFans')

const MyFav = () => import('../components/MyFav/Index.vue')
const MyFav_CourseBox = () => import('../components/MyFav/CourseBox.vue')
const Favorite = () => import('../components/Favorite/Index.vue')
const CreateFavorite = () => import('../components/Favorite/CreateFavorite.vue')


const CourseBox = () => import('../components/CourseBox/Index')

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
      redirect: { name: 'Home_Cat2' },
      children: [
        {
          name: 'Home_Cat1',
          path: 'Cat1',
          component: Home_Cat1
        }, {
          name: 'Home_Cat2',
          path: 'Cat2',
          component: Home_Cat2
        },
        // {
        //   name: 'Home_Cat3',
        //   path: 'Cat3',
        //   component: Home_Cat3
        // }, {
        //   name: 'Home_Cat4',
        //   path: 'Cat4',
        //   component: Home_Cat4
        // }, {
        //   name: 'Home_Cat5',
        //   path: 'Cat5',
        //   component: Home_Cat5
        // }, {
        //   name: 'Home_Cat6',
        //   path: 'Cat6',
        //   component: Home_Cat6
        // }
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

    // 我的收藏 = 我的课程收藏
    {
      name: 'MyFav',
      path: '/MyFav',
      component: MyFav,
      redirect: { name: 'MyFav_CourseBox' },
      children: [
        {
          name: 'MyFav_CourseBox',
          path: 'CourseBox',
          component: MyFav_CourseBox,
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

    // 课程页
    {
      name: 'CourseBox',
      path: '/CourseBox/:id',
      component: CourseBox,
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
