import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CourseBox from '@/components/CourseBox'
import CourseBoxDetails from '@/components/CourseBoxDetails'
import VuxDemo from '@/components/VuxDemo'

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
      path: '/CourseBox',
      name: 'CourseBox',
      component: CourseBox,
      children: [
        {
          path: '/CourseBox/Details/:id',
          component: CourseBoxDetails
        }
      ]
    },
    {
      path: '/VuxDemo',
      name: 'VuxDemo',
      component: VuxDemo
    }
  ]
})
