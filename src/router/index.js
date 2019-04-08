import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../components/HelloWorld'),
      icon: 'iconfont icon-tubiaolunkuo-',
      meta: {
        title: '首页'
      }
    }
  ]
})
