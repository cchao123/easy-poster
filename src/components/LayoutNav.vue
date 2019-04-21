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
        <el-menu :default-active="$route.path" class="ang-menu"
          :router="true"
          :collapse="isNavFold"
          :unique-opened="true"
          :menu-trigger="'click'">
          <template v-for="(nav, index) in menu">
            <el-submenu :key="index" v-if="nav.children" :index="nav.path" :route="{name: nav.name}" class="ang-submenu">
              <template slot="title">
                <i :class="nav.icon"></i>
                <span slot="title">{{ nav.alias }}</span>
              </template>
              <div class="ang-submenu-inline" v-for="(cnav, k) in nav.children" :key="k">
                <el-menu-item
                  @click="handleMenuItemClick"
                  :index="formatChildrenPath(nav.path, cnav.path)"
                  :route="{name: cnav.name}" v-if="!cnav.children">{{ cnav.alias }}</el-menu-item>
                <el-submenu :index="cnav.path" v-else>
                  <template slot="title">{{ cnav.alias }}</template>
                  <el-menu-item v-for="(ccnav, kk) in cnav.children"
                    @click="handleMenuItemClick"
                    :index="formatCChildrenPath(nav.path, cnav.path, ccnav.path)"
                    :route="{name: ccnav.name}"
                    :key="kk">{{ ccnav.alias }}</el-menu-item>
                </el-submenu>
              </div>
            </el-submenu>
            <el-menu-item :key="index" :index="nav.path" :route="{name: nav.name}" class="ang-submenu" @click="handleMenuItemClick"
              v-else-if="!nav.children && !nav.noshow">
              <i :class="nav.icon"></i>
              <span slot="title">{{ nav.alias }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-aside>
  </transition>
</template>

<script>
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
      if (innerWidth >= 1000) this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.unfold)
      else if (innerWidth < 1000 && innerWidth >= 600) this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.fold)
      else if (innerWidth < 600) {
        if (this.collapse === COLLAPSE_STATUS.show) return
        this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.hide)
      }
    },
    handleMenuItemClick () {
      this.$emit('menuitemclick')
    }
  },
  computed: {
    ...mapState({
      collapse: state => state.navCollapse
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
    }
  }
}
</script>

<style lang="scss">
@import url('../statics/css/base.css');
.ang-menu-box {
  height: 100vh;
  background-color: var(--sidebar-bg);
}
.ang-sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 1;
  overflow: auto;
  height: 100%;
  overflow-x: hidden; overflow-y: auto;
  
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
