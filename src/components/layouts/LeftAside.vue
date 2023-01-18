<template>
  <div class="aside-material">
    <div class="material-items">
      <div class="material-icon">
        <div class="iconfont icon-suffix-psd"></div>
      </div>
      <div class="material-name">解析PSD</div>
    </div>
    <div class="material-items"
         @dragstart="dragstart">
      <div class="material-icon">
        <div class="iconfont icon-rongqi"></div>
      </div>
      <div class="material-name">元素容器</div>
    </div>
    <div class="material-items"
         @dragstart="dragstart">
      <div class="material-icon">
        <div class="iconfont icon-background"></div>
      </div>
      <div class="material-name">海报背景</div>
    </div>
    <div class="material-items">
      <div class="material-icon">
        <div class="iconfont icon-tupian"></div>
      </div>
      <div class="material-name">图片素材</div>
    </div>
    <div class="material-items">
      <div class="material-icon">
        <div class="iconfont icon-wenzi"></div>
      </div>
      <div class="material-name">文本内容</div>
    </div>
    <div class="material-items">
      <div class="material-icon">
        <div class="iconfont icon-touxiang"></div>
      </div>
      <div class="material-name">用户头像</div>
    </div>
    <div class="material-items">
      <div class="material-icon">
        <div class="iconfont icon-erweima"></div>
      </div>
      <div class="material-name">二维码</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.aside-material {
  width: 100px;
  border-right: solid 1px var(--ep-menu-border-color);
}

.material-items {
  cursor: move;
  margin-top: 20px;
  border-radius: 3px;
}

.material-icon {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  /* border-bottom: 1px solid var(--el-text-color-regular); */
  display: flex;
  justify-content: center;
  align-items: center;
}
.material-icon .iconfont {
  font-size: 35px;
}
.material-name {
  margin-top: 10px;
  font-size: 14px;
}
</style> 