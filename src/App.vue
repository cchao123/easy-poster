<template>
  <div id="app">
    <router-view v-if="$route.meta.fullpage"></router-view>
    <template v-else>
      <el-container class="ang-container" :style="containerStyl">
        <!-- 导航 -->
        <layout-nav v-if="!isNavFixed"
          :logo="navLogo"
          :title="navTitle"></layout-nav>
        <el-container :style="rightContentStyl" direction="vertical" class="ang-right">
          <!-- header -->
          <layout-header
            :logo="navLogo"
            :show-ctrl="isOuter"
            :user="userinfo"
            @userlogout="handleUserLogout"
            @userupdate="handleUserUpdate"></layout-header>
          <!-- 面包屑导航 -->
          <!-- <page-header v-show="$route.name !== 'index'"></page-header> -->
          <!-- 内容 -->
          <el-main class="ang-main">
            <router-view v-if="!$route.meta.fullpage"></router-view>
          </el-main>
          <!-- footer -->
          <layout-footer
            :copy-right-name="navTitle"></layout-footer>
        </el-container>
      </el-container>
      <!-- 固定的导航 -->
      <div class="ang-nav-fixed-box" v-if="isNavFixed">
        <div class="ang-nav-mask" @click="handleHideNav"></div>
        <layout-nav class="ang-nav-fixed"
          :logo="navLogo"
          :title="navTitle"
          @menuitemclick="handleHideNav"></layout-nav>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { COLLAPSE_STATUS, AUTH, IS_OUTERNET } from './common/const'
import * as $types from './store/mutation-types'
import LayoutNav from './components/LayoutNav'
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
// import PageHeader from './components/PageHeader'

export default {
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutFooter
    // PageHeader
  },
  data () {
    return {
      navLogo: '//mat1.gtimg.com/bbs/kameng-h5/img/logo.9af0e412.png', // 管理系统logo
      navTitle: '咖萌管理后台', // 管理系统名称
      collapseStatus: COLLAPSE_STATUS,
      containerStyl: 'opacity: 0;'
    }
  },
  methods: {
    handleUserLogout () {
      this.$store.dispatch('doLogout').then((res) => {
        if (res.code === 0) this.$router.push({ name: 'wait-login', query: { from: 'login' } })
        else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    handleUserUpdate () {
      this.$message('暂无该功能')
    },
    handleHideNav () {
      this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.hide)
    },
    getUserInfo () {
      this.$store.dispatch('getUserInfo').then((res) => {
        if (res.code === 0) {
          this.skip(res.data)
        } else {
          this.$message(res.message)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    skip (data) {
      if (!data.level) return
      if (data.level === AUTH.AuthLevel10) this.$router.replace({ name: 'audit' })
      if (data.level === AUTH.AuthStandardQC) this.$router.replace({ name: 'cs-quality' })
      if (data.level === AUTH.AuthStandard) this.$router.replace({ name: 'cs-post' })
      if (data.level === AUTH.AuthEdit) this.$router.replace({ name: 'ca-post' })
    }
  },
  created () {
    // 如果已经存在用户信息，则不请求
    if (this.isOuter) {
      this.skip(this.userinfo)
    }
    if (!this.$store.state.userinfo.level && !IS_OUTERNET()) {
      this.getUserInfo()
    }
  },
  watch: {
    '$route' (to, from) {
      // 如果不是要求全页面就展示
      if (!to.meta.fullpage) this.containerStyl = 'opacity: 1;'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      collapse: state => state.navCollapse,
      userinfo: state => state.userinfo,
      isOuter: state => state.isOuter
    }),
    isNavFixed () {
      return this.collapse === COLLAPSE_STATUS.show
    },
    rightContentStyl () {
      var styl = ''
      if (this.collapse === COLLAPSE_STATUS.unfold) {
        styl = 'margin-left: 240px;'
      }
      if (this.collapse === COLLAPSE_STATUS.fold) {
        styl = 'margin-left: 64px;'
      }
      return styl
    }
  }
}
</script>

<style lang="scss">
@import './statics/css/base.css';
@import './statics/css/reset.scss';
@import './statics/css/global.scss';
@import './statics/css/element.scss';
@import './statics/iconfont/iconfont.css';
#app {
  height: 100%;
}
.ang-container {
  opacity: 0;
  min-height: 100vh;
  background-color: #f0f2f5;
}
.ang-main {
  // overflow-y: auto;
  // overflow-x: hidden;
  margin: 20px;
  background-color: #fff;
  // height: 600px;
}
// .ang-right {
//   height: 100vh;
//   overflow-y: auto;
// }
.ang-nav-fixed-box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: var(--zindex-1000);
  .ang-nav-mask {
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
  }
  .ang-nav-fixed {
    position: fixed;
    top: 0;
  }
}
</style>
