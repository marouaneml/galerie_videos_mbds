import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import New from '@/components/New'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/nouvelle-video',
      name: 'New',
      component: New
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    }
  ]
})
