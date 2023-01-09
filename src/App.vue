<template>
  <el-config-provider namespace="ep">
    <div class="main-container">
      <BaseSide />
      <div class="content">
        <BaseHeader />
        <router-view />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
body, html,#app {
  height: 100%;
}
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}
.main-container {
  display: flex;
  min-height: 100%;
}
.content {
  width: 100%;
  /* background-color: skyblue; */
}
</style>
