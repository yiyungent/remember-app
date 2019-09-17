import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Index'
import Home_Cat1 from '../components/Home/Cat1'
import Home_Cat2 from '../components/Home/Cat2'
import Home_Cat3 from '../components/Home/Cat3'
import Home_Cat4 from '../components/Home/Cat4'
import Home_Cat5 from '../components/Home/Cat5'
import Home_Cat6 from '../components/Home/Cat6'

import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      redirect: { name: 'Home' }
    },
    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'Home_Cat1',
          path: 'Cat1',
          component: Home_Cat1
        },{
          name: 'Home_Cat2',
          path: 'Cat2',
          component: Home_Cat2
        },{
          name: 'Home_Cat3',
          path: 'Cat3',
          component: Home_Cat3
        },{
          name: 'Home_Cat4',
          path: 'Cat4',
          component: Home_Cat4
        },{
          name: 'Home_Cat5',
          path: 'Cat5',
          component: Home_Cat5
        },{
          name: 'Home_Cat6',
          path: 'Cat6',
          component: Home_Cat6
        }
      ]
    },
    // {
    //   name: 'CourseBox',
    //   path: '/CourseBox/:id',
    //   component: CourseBox,
    //   meta: { tabbarItem: 0 },
    //   children: [
    //     {
    //       // 当 /CourseBox/:id/Catalog 匹配成功，
    //       // CourseBoxDetails 会被渲染在 CourseBox 的 <router-view> 中
    //       path: 'Catalog',
    //       component: CourseBoxCatalog,
    //       meta: { tabbarItem: 2 }
    //     }
    //   ]
    // },
    
    // 404 错误页面
    {
      name: 'NotFound',
      path: '*',
      component: NotFound
    }
  ]
})
