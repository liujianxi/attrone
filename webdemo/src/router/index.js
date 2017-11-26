import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
const richText = () => import('@/components/richText')
const textList = () => import('@/components/textlist')
const textDetail = () => import('@/components/textDetail')
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
    },
    {
      path: '/textlist',
      name: 'textlist',
      component: textList
    },
    {
      path: '/textdetail',
      name: 'textdetail',
      component: textDetail
    }
  ]
})
