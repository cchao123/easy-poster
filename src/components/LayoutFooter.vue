<template>
  <el-footer>
    <div class="ang-copyright">
      Copyright © {{ nowYear }} {{ copyRightName }}
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'layout-footer',
  props: {
    copyRightName: {
      type: String,
      default: '管理系统'
    }
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.ang-copyright {
  text-align: center;
}
</style>
