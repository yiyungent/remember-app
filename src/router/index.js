import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CourseBox from '@/components/CourseBox'
import CourseBoxCatalog from '@/components/CourseBoxCatalog'
import CourseInfo from '@/components/CourseInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/CourseBox/:id',
      name: 'CourseBox',
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
  ]
})
