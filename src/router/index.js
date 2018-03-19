import Vue from 'vue'
import Router from 'vue-router'
import RecipesList from '@/components/RecipesList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecipesList',
      component: RecipesList
    }
  ]
})
