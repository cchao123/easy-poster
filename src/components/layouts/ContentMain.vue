<template>
  <div class="main">
    <div class="iphone">
    </div>
  </div>
</template>

<style lang="postcss">
.main {
  flex: 1;
  height: 100%;
  width: 100%;
  background: radial-gradient(var(--ep-menu-border-color) 1px, transparent 0);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iphone {
  width: 375px;
  height: 667px;
  background-color: #f3f3f3;
  box-shadow: 0 16px 48px 16px var(--ep-menu-border-color), 0 1px 3px var(--ep-menu-border-color), 0 1px 6px -1px var(--ep-menu-border-color);
  background-color: #fff;
}
</style>