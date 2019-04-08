<template>
  <transition name="el-fade-in">
    <el-aside class="ang-menu-box" :width="isMenuFold ? '240px' : '64px'" v-if="isShow">
      <div class="ang-sidebar">
        <!-- logo -->
        <div class="ang-logo">
          <a href="/">
            <img class="logo" :src="logo" alt="logo" v-if="logo">
            <h1 class="title" v-if="isMenuFold">{{ title }}</h1>
          </a>
        </div>
        <!-- 侧边导航 -->
        <el-menu :default-active="defaultActiveIndex" class="ang-menu"
          :router="true"
          :collapse="isNavFold"
          :collapse-transition="false"
          :unique-opened="true"
          :menu-trigger="'click'">
          <template v-for="(nav, index) in menu">
            <!-- 一级 -->
            <el-submenu :key="index" v-if="(nav.children || nav.cnoshow) && isAuthShow(nav.meta.auth)" :index="nav.path" :route="{name: nav.name}" class="ang-submenu">
              <template slot="title">
                <i :class="nav.icon"></i>
                <span slot="title">{{ nav.meta.title }}</span>
              </template>
              <!-- 二级 -->
              <div class="ang-submenu-inline" v-for="(cnav, k) in nav.children" :key="k">
                <el-menu-item
                  @click="handleMenuItemClick"
                  :index="formatChildrenPath(nav.path, cnav.path)"
                  :route="{name: cnav.name}"
                  v-if="(!cnav.children || cnav.cnoshow) && isAuthShow(cnav.meta.auth) && !cnav.noshow">{{ cnav.meta.title }}</el-menu-item>
                <!-- 三级 -->
                <el-submenu :index="cnav.path" v-else-if="cnav.children && isAuthShow(cnav.meta.auth) && !cnav.noshow">
                  <template slot="title">{{ cnav.meta.title }}</template>
                  <template v-for="(ccnav, kk) in cnav.children">
                    <el-menu-item
                      @click="handleMenuItemClick"
                      :index="formatCChildrenPath(nav.path, cnav.path, ccnav.path)"
                      :route="{name: ccnav.name}"
                      :key="kk"
                      v-if="isAuthShow(ccnav.meta.auth) && !ccnav.noshow">{{ ccnav.meta.title }}</el-menu-item>
                  </template>
                </el-submenu>
              </div>
            </el-submenu>
            <el-menu-item :key="index" :index="nav.path" :route="{name: nav.name}" class="ang-submenu" @click="handleMenuItemClick"
              v-else-if="!nav.children && !nav.noshow && isAuthShow(nav.meta.auth)">
              <i :class="nav.icon"></i>
              <span slot="title">{{ nav.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-aside>
  </transition>
</template>

<script>
// import { inArray } from '@tencent/anghost-util/array'
import { mapState } from 'vuex'
import { COLLAPSE_STATUS } from '../common/const'
import { debounce } from '../common/util'
import * as $types from '../store/mutation-types'

export default {
  name: 'layout-nav',
  props: {
    logo: String,
    title: {
      type: String,
      default: '管理后台'
    }
  },
  data () {
    return {
      defaultActive: '',
      collapseStatus: COLLAPSE_STATUS
    }
  },
  created () {
    this.getCollapseStatus()
    this.resize()
  },
  methods: {
    formatChildrenPath (p, s) {
      return p + '/' + s
    },
    formatCChildrenPath (p, s, ss) {
      return p + '/' + s + '/' + ss
    },
    resize () {
      window.addEventListener('resize', debounce(this.getCollapseStatus.bind(this), 300))
    },
    getCollapseStatus () {
      var innerWidth = window.innerWidth
      console.log(innerWidth)
      if (innerWidth >= 1000) this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.unfold)
      else if (innerWidth < 1000 && innerWidth >= 600) this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.fold)
      else if (innerWidth < 600) {
        if (this.collapse === COLLAPSE_STATUS.show) return
        this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.hide)
      }
    },
    handleMenuItemClick () {
      this.$emit('menuitemclick')
    },
    isAuthShow (arr) {
      // return inArray(this.userinfo.level, arr) !== -1
      return true
    }
  },
  computed: {
    ...mapState({
      collapse: state => state.navCollapse,
      userinfo: state => state.userinfo
    }),
    menu () {
      return this.$router.options.routes
    },
    isMenuFold () { // 是否展开
      return (this.collapse === this.collapseStatus.unfold ||
        this.collapse === this.collapseStatus.show)
    },
    isNavFold () {
      return (this.collapse === this.collapseStatus.fold ||
        this.collapse === this.collapseStatus.hide)
    },
    isShow () {
      return this.collapse !== this.collapseStatus.hide
    },
    defaultActiveIndex () { // 当前激活的index
      if (this.$route.meta.isChild) {
        var path = this.$route.path.split('/')
        path.splice(path.length - 1, 1)
        return path.join('/')
      } else {
        return this.$route.path
      }
    }
  }
}
</script>

<style lang="scss">
@import url('../statics/css/base.css');
.ang-menu-box {
  position: fixed;
  z-index: 10000;
  // min-height: 100vh;
  height: 100%;
  background-color: var(--sidebar-bg);
}
.ang-sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 1;
  overflow: auto;
  // height: 100%;
  .el-menu {
    border: 0;
  }
}
.ang-logo {
  display: flex;
  padding-left: 16px;
  height: var(--header-height);
  line-height: var(--header-height);
  background-color: var(--sidebar-logo-bg);
  align-items: align;
  .title {
    display: inline-block;
    margin-left: 10px;
    font-size: var(--font-size-h4);
    color: #fff;
  }
  .logo {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    border-radius: 100%;
    margin-bottom: 5px;
  }
}
.ang-menu {
  overflow: auto;
  background-color: var(--sidebar-menu-bg);
  color: var(--sidebar-menu-text);
  .ang-submenu.el-menu-item.is-active,
  .ang-submenu.el-menu-item:hover,
  .el-submenu__title:focus,
  .el-submenu__title:hover,
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent;
    color: #fff;
    span,
    .iconfont {
      color: #fff;
    }
  }
  .el-submenu__title {
    color: var(--sidebar-menu-text);
  }
  .el-menu.el-menu--inline {
    background-color: var(--sidebar-menu-bg);
  }
  .ang-submenu {
    background-color: var(--sidebar-menu-bg);
    .iconfont,
    span {
      color: var(--sidebar-menu-text);
    }
    .iconfont {
      margin-right: 10px;
    }
  }
  .ang-submenu-inline {
    background-color: var(--sidebar-menu-sub-bg);
    li {
      color: var(--sidebar-menu-text);
    }
    .el-menu-item.is-active {
      background-color: var(--sidebar-menu-item-selected-bg);
      color: var(--sidebar-menu-item-selected-text);
    }
  }
  .ang-submenu-inline:hover {
    li {
      color: #fff;
    }
  }
  .ang-submenu.el-menu-item.is-active,
  .ang-submenu.el-menu-item.is-active:hover {
    background-color: var(--sidebar-menu-item-selected-bg);
    color: var(--sidebar-menu-item-selected-text);
  }
  .ang-submenu.el-menu-item:hover {
    background-color: var(--sidebar-menu-sub-bg);
  }
}
</style>
