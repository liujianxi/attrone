import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
const richText = () => import('@/components/richText')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/richtext',
      name: 'richtext',
      component: richText
    }
  ]
})
