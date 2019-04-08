import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/filter'
import './common/lib/elementui'
import './common/lib/echarts'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 是否是外网访问的地址 - 是否外团访问的网址
  if ( false ) {
    store.commit(COM_IS_OUTER, true)
    if (isLogin()) { // 登录
      var userinfo = getUserInfoFromCookie()
      store.commit(COM_USER_INFO, userinfo)
      next()
    } else { // 未登录
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login',
          query: {
            from: 'login'
          }
        })
      }
    }
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
