<template>
  <div id="app">
    <router-view v-if="$route.meta.fullpage"></router-view>
    <template v-else>
      <el-container class="ang-container" :style="containerStyl">
        <!-- 导航 -->
        <layout-nav v-if="!isNavFixed"
          :logo="navLogo"
          :title="navTitle"></layout-nav>
        <el-container direction="vertical">
          <!-- header -->
          <layout-header
            :logo="navLogo"
            :show-ctrl="isShowCtrl"
            @userlogout="handleUserLogout"
            @userupdate="handleUserUpdate"></layout-header>
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
import { COLLAPSE_STATUS } from './common/const'
import * as $types from './store/mutation-types'
import LayoutNav from './components/LayoutNav'
import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'
export default {
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutFooter
  },
  data () {
    return {
      navLogo: '//mat1.gtimg.com/bbs/kameng-h5/img/logo.9af0e412.png', // 管理系统logo
      navTitle: '咖萌管理后台', // 管理系统名称
      isShowCtrl: false, // 是否显示头部用户的登出和修改操作
      collapseStatus: COLLAPSE_STATUS,
      containerStyl: 'opacity: 0;'
    }
  },
  methods: {
    handleUserLogout () {
      this.$message('user logout')
    },
    handleUserUpdate () {
      this.$message('user update')
    },
    handleHideNav () {
      this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.hide)
    }
  },
  mounted () {
    this.containerStyl = 'opacity: 1;'
  },
  computed: {
    ...mapState({
      collapse: state => state.navCollapse
    }),
    isNavFixed () {
      return this.collapse === COLLAPSE_STATUS.show
    }
  }
}
</script>

<style lang="scss">
@import url('./statics/css/base.css');
@import url('./statics/css/reset.scss');
@import url('./statics/iconfont/iconfont.css');
#app {
  height: 100%;
}
.ang-container {
  opacity: 0;
  min-height: 100vh;
  background-color: #f0f2f5;
}
.ang-main {
  margin: 20px;
  background-color: #fff;
}
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
