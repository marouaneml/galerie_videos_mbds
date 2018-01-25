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
      path: '/details/:id',
      name: 'details',
      component: Show
    },
    {
      path: '/search-results/:from/:to',
      
      component: Main
    },
    {
      path: '*',
      name: 'NotFound',
      component: {
        template: '<p>Page Not Found</p>'
      }
    }
  ]
})
