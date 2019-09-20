import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login/Index'
import Home from '@/components/Home/Index'
import Home_Cat1 from '../components/Home/Cat1'
import Home_Cat2 from '../components/Home/Cat2'
import Home_Cat3 from '../components/Home/Cat3'
import Home_Cat4 from '../components/Home/Cat4'
import Home_Cat5 from '../components/Home/Cat5'
import Home_Cat6 from '../components/Home/Cat6'

import MyFriends from '../components/MyFriends/Index'
import MyFriends_MyFollow from '../components/MyFriends/MyFollow'
import MyFriends_MyFans from '../components/MyFriends/MyFans'

import CourseBox from '../components/CourseBox/Index'

import NotFound from '@/components/NotFound'

Vue.use(Router)

// 必须登录才能访问的 route 添加 
// meta : {
//   needLogin: true, 
// },

export default new Router({
  mode: 'history',
  // mode: 'hash',
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
        }, {
          name: 'Home_Cat3',
          path: 'Cat3',
          component: Home_Cat3
        }, {
          name: 'Home_Cat4',
          path: 'Cat4',
          component: Home_Cat4
        }, {
          name: 'Home_Cat5',
          path: 'Cat5',
          component: Home_Cat5
        }, {
          name: 'Home_Cat6',
          path: 'Cat6',
          component: Home_Cat6
        }
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
