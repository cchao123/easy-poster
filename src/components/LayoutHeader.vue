<template>
  <el-header class="ang-header" :height="'50px'">
    <a href="/" class="logo-box" v-if="collapse === collapseStatus.hide">
      <img class="logo" :src="logo" alt="logo" v-if="logo">
    </a>
    <div class="collapse" :class="isShow.show" @click="handleCollapse()">
      <i class="iconfont" :class="isShow.fa"></i>
    </div>
    <!-- 面包屑导航 -->
    <page-header v-show="$route.name !== 'index'"></page-header>
    <div class="ang-header-right">
      <el-dropdown v-if="showCtrl" @command="handleCommand">
        <div class="el-dropdown-link">
          <img class="ang-header-photo" :src="user.headimg" /> {{ user.name }}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userlogout">退出登录</el-dropdown-item>
          <!-- <el-dropdown-item divided command="userupdate">修改</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <div class="el-dropdown-link" v-else>
        <img class="ang-header-photo" :src="user.headimg" /> {{ user.name }}
      </div>
    </div>
  </el-header>
</template>

<script>
import { mapState } from 'vuex'
import * as $types from '../store/mutation-types.js'
import { COLLAPSE_STATUS, DEFAULT_HEADER_IMG } from '../common/const'
import PageHeader from './PageHeader'

export default {
  name: 'layout-header',
  components: {
    PageHeader
  },
  props: {
    logo: String,
    user: {
      type: Object,
      default: () => {
        return {
          name: '未知',
          headimg: DEFAULT_HEADER_IMG
        }
      }
    },
    showCtrl: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapseStatus: COLLAPSE_STATUS,
      defaultHeadimg: DEFAULT_HEADER_IMG
    }
  },
  methods: {
    handleCommand (command) {
      this.$emit(command)
    },
    handleCollapse () {
      switch (this.$store.state.navCollapse) {
        case 'unfold':
          this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.fold)
          break
        case 'fold':
          this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.unfold)
          break
        case 'hide':
          this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.show)
          break
        case 'show':
          this.$store.commit($types.COM_NAV_COLLAPSE, COLLAPSE_STATUS.hide)
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapState({
      collapse: state => state.navCollapse
    }),
    isFold () {
      return (this.collapse === COLLAPSE_STATUS.fold || this.collapse === COLLAPSE_STATUS.show)
    },
    isShow () {
      if (this.isFold) {
        return { show: 'open', fa: 'icon-menu-unfold' }
      } else {
        return { show: 'close', fa: 'icon-menu-fold' }
      }
    }
  }
}
</script>

<style lang="scss">
.el-header.ang-header {
  position: relative;
  padding: 0;
  display: flex;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  overflow: hidden;
  .logo-box {
    padding: 0 12px;
    display: inline-block;
    .logo {
      margin-bottom: 5px;
      width: 32px;
      border-radius: 100%;
      vertical-align: middle;
    }
  }
  .collapse {
    display: inline-block;
    padding: 0 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    .iconfont {
      font-size: 20px;
    }
  }
  .collapse:hover {
    background-color: rgba(0,0,0,.025);
  }
  .el-dropdown-link {
    padding: 0 15px 0 10px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
  }
  .ang-header-right {
    position: absolute;
    top: 0;
    right: 0;
    float: right;
  }
  .ang-header-photo {
    margin-right: 4px;
    width: 24px;
    border-radius: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
