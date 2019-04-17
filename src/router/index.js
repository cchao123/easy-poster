import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 路由最多可以有三级嵌套，即：爷爷 - 爸爸 - 儿子
 * 路由部分字段说明
 *
 * noshow: true           不在侧边导航栏显示
 * alias: '首页'          导航/面包屑显示的名称
 * icon: 'iconfont icon-liebiao'      侧边栏icon的样式
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
      path: '/data-statistic',
      name: 'data-statistic',
      component: () => import(/* webpackChunkName: "data-statistic" */ '../views/DataStatistic/index.vue'),
      alias: '数据概览',
      icon: 'iconfont icon-shuju'
    },
    {
      path: '/content-admin',
      name: 'content-admin',
      component: () => import(/* webpackChunkName: "content-admin-post" */ '../views/ContentAdmin/post.vue'),
      alias: '内容管理',
      icon: 'iconfont icon-fuwuneirong',
      children: [
        {
          name: 'ca-post',
          path: 'post',
          component: () => import(/* webpackChunkName: "content-admin-post" */ '../views/ContentAdmin/post.vue'),
          alias: '帖子管理'
        },
        {
          name: 'ca-challenge',
          path: 'challenge',
          component: () => import(/* webpackChunkName: "content-admin-challenge" */ '../views/ContentAdmin/challenge.vue'),
          alias: '挑战管理'
        },
        {
          name: 'ca-channel',
          path: 'channel',
          component: () => import(/* webpackChunkName: "content-admin-channel" */ '../views/ContentAdmin/channel.vue'),
          alias: '频道管理'
        },
        {
          name: 'ca-group',
          path: 'group',
          component: () => import(/* webpackChunkName: "content-admin-group" */ '../views/ContentAdmin/group.vue'),
          alias: '圈子管理'
        },
        {
          name: 'ca-app-realtime',
          path: 'app-realtime',
          component: () => import(/* webpackChunkName: "content-admin-app-realtime" */ '../views/ContentAdmin/appRealTime.vue'),
          alias: 'APP实时展示'
        }
      ]
    },
    {
      path: '/content-standard',
      name: 'content-standard',
      component: () => import(/* webpackChunkName: "content-standard-quality" */ '../views/ContentStandard/quality.vue'),
      alias: '内容标准化',
      icon: 'iconfont icon-biaozhun',
      children: [
        {
          name: 'cs-quality',
          path: 'quality',
          component: () => import(/* webpackChunkName: "content-standard-quality" */ '../views/ContentStandard/quality.vue'),
          alias: '内容标准化质检'
        },
        {
          name: 'cs-data',
          path: 'data',
          component: () => import(/* webpackChunkName: "content-standard-data" */ '../views/ContentStandard/data.vue'),
          alias: '标准化数据概览'
        },
        {
          name: 'cs-post',
          path: 'post',
          component: () => import(/* webpackChunkName: "content-standard-post" */ '../views/ContentStandard/post.vue'),
          alias: '帖子内容标准化'
        },
        {
          name: 'cs-emotion',
          path: 'emotion',
          component: () => import(/* webpackChunkName: "content-standard-emotion" */ '../views/ContentStandard/emotion.vue'),
          alias: '表情内容标准化'
        },
        {
          name: 'cs-tag',
          path: 'tag',
          component: () => import(/* webpackChunkName: "content-standard-tag" */ '../views/ContentStandard/tag.vue'),
          alias: '标签内容标准化'
        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "account" */ '../views/Account/official.vue'),
      alias: '账号管理',
      icon: 'iconfont icon-yuangongzhanghaoguanli',
      children: [
        {
          name: 'acc-official',
          path: 'official',
          component: () => import(/* webpackChunkName: "account-official" */ '../views/Account/official.vue'),
          alias: '官方账号'
        },
        {
          name: 'acc-outside',
          path: 'outside',
          component: () => import(/* webpackChunkName: "account-outside" */ '../views/Account/outside.vue'),
          alias: '外团账号'
        },
        {
          name: 'acc-user',
          path: 'user',
          component: () => import(/* webpackChunkName: "account-user" */ '../views/Account/user.vue'),
          alias: '用户账号'
        }
      ]
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import(/* webpackChunkName: "audit" */ '../views/Audit/user.vue'),
      alias: '用户审核',
      icon: 'iconfont icon-tubiaolunkuo-'
    },
    {
      path: '/emotion',
      name: 'emotion',
      component: () => import(/* webpackChunkName: "emotion" */ '../views/Emotion/index.vue'),
      alias: '表情管理',
      icon: 'iconfont icon-biaoqing2'
    },
    {
      path: '/data-extract',
      name: 'data-extract',
      component: () => import(/* webpackChunkName: "account" */ '../views/DataExtract/content.vue'),
      alias: '数据抓取',
      icon: 'iconfont icon-dongtaixinxizhuaqu',
      children: [
        {
          name: 'de-content',
          path: 'content',
          component: () => import(/* webpackChunkName: "data-extract-content" */ '../views/DataExtract/content.vue'),
          alias: '抓取内容'
        },
        {
          name: 'de-account',
          path: 'account',
          component: () => import(/* webpackChunkName: "data-extract-account" */ '../views/DataExtract/account.vue'),
          alias: '抓取账号'
        }
      ]
    },
    {
      path: '/update',
      name: 'update',
      component: () => import(/* webpackChunkName: "updata" */ '../views/Update/index.vue'),
      alias: '更新管理',
      icon: 'iconfont icon-APPku'
    },
    {
      path: '*',
      noshow: true,
      redirect: { name: 'ca-post' }
    }
  ]
})
