import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const EmptyContent = () => import('../components/Layout/EmptyContent.vue')

/**
 * 路由最多可以有三级嵌套，即：爷爷 - 爸爸 - 儿子
 * 路由部分字段说明
 * 注： children 字段下面的路由 path 请一律不要以 / 开头
 *
 * noshow: true           不在侧边导航栏显示
 * cnoshow: true          孩子导航是否显示
 * icon: 'iconfont icon-liebiao'      侧边栏icon的样式
 * meta: {
 *  auth: 100            用户权限
 *  title: '首页'         导航/面包屑显示的名称
 *  isChild: true         是否是孩子页面，如果是的话，就显示孩子页面，否则显示当前页面，页面中需要配合 router-view 来使用
 * }
 */
export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
      noshow: true,
      meta: {
        fullpage: true // 是否是全页面
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../views/Index/index.vue'),
      alias: '首页',
      icon: 'iconfont icon-shouye',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/content-admin',
      name: 'content-admin',
      component: EmptyContent,
      alias: '内容管理',
      icon: 'iconfont icon-fuwuneirong',
      meta: {
        title: '内容管理'
      },
      redirect: { name: 'ca-list' },
      children: [
        {
          name: 'ca-list',
          path: 'list',
          component: () => import(/* webpackChunkName: "content-admin-list" */ '../views/ContentAdmin/list.vue'),
          alias: '帖子列表',
          meta: {
            title: '帖子列表'
          }
        },
        {
          name: 'ca-edit',
          path: 'edit',
          component: () => import(/* webpackChunkName: "content-admin-edit" */ '../views/ContentAdmin/edit.vue'),
          alias: '帖子编辑',
          meta: {
            title: '帖子编辑'
          }
        }
      ]
    },
    {
      path: '*',
      noshow: true,
      redirect: { name: 'ca-list' }
    }
  ]
})
