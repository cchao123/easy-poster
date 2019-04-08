<template>
  <el-breadcrumb>
    <template v-for="(item) in levelList">
      <el-breadcrumb-item :key="item.path" v-if="item.meta.title">
        <router-link :to="item.redirect || item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'page-header',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched
      const first = matched[0]
      if (first && first.name !== 'index') {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss">
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  // padding: 15px;
  // border-top: 5px solid #f2f2f2;
  background-color: #fff;
}
</style>
