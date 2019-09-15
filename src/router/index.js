import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CourseBox from '@/components/CourseBox'
import CourseBoxCatalog from '@/components/CourseBoxCatalog'
import CourseInfo from '@/components/CourseInfo'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'CourseBox',
      path: '/CourseBox/:id',
      component: CourseBox,
      meta: { tabbarItem: 0 },
      children: [
        {
          // 当 /CourseBox/:id/Catalog 匹配成功，
          // CourseBoxDetails 会被渲染在 CourseBox 的 <router-view> 中
          path: 'Catalog',
          component: CourseBoxCatalog,
          meta: { tabbarItem: 2 }
        }
      ]
    },
    
    // 404 错误页面
    {
      name: 'NotFound',
      path: '*',
      component: NotFound
    }
  ]
})
