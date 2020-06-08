import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecommendPage from '../views/main-page/recommend-page'
import ImgInput from '../views/user-publish/img-input'
import UserRegister from '../views/user-page/user-register'
import UserPage from '../views/main-page/user-page'
import QuestionPage from '../views/main-page/question-page'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: RecommendPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/recommend-page',
    component: RecommendPage
  },
  {
    path:'/img-input',
    component:ImgInput
  },
  {
    path:'/user-register',
    component:UserRegister
  },
  {
    path:'/user-page',
    component:UserPage
  },
  {
    path:'/question-page',
    component:QuestionPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), //路由跳转后页面回到顶部
  routes
})

export default router
