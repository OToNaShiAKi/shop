import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home/Home'

import Main from '../views/home/children/main/Main'
const Cart = () => import('../views/home/children/cart/Cart')
const Category = () => import('../views/home/children/category/Category')
const CheckLog = () => import('../views/home/children/checklog/CheckLog')

const Mine = () => import('../views/home/children/mine/Mine')
const SetInfo = () => import('../views/home/children/mine/children/SetInfo')

const Order = () => import('../views/order/Order')

const Login = () => import('../views/login/Login')

import store from '@/store/index'

Vue.use(VueRouter)

const beforeEnter = (to, from, next) => {
  if (store.state.user && store.state.user.token) next();
  else next('/home/checklog')
}

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: '/home',
    redirect: '/home/main',
  }, {
    path: "main",
    name: "Main",
    component: Main,
  }, {
    path: "mine",
    name: "Mine",
    component: Mine,
    beforeEnter,
    children: [{
      path: "setinfo",
      name: "SetInfo",
      component: SetInfo,
    }]
  }, {
    path: "cart",
    name: "Cart",
    component: Cart,
    beforeEnter
  }, {
    path: "category",
    name: "Category",
    component: Category,
  }, {
    path: "checklog",
    name: "CheckLog",
    component: CheckLog,
  }]
}, {
  path: '/order',
  name: 'Order',
  component: Order,
  beforeEnter
}, {
  path: '/login',
  name: 'Login',
  component: Login,
}]

const router = new VueRouter({
  routes
})

export default router