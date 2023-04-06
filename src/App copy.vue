<template>
  <tr v-for="i in All" :key="i.m">
    <td>{{ i.month }}</td>
    <td>{{ i.ShenBaoJinE }}</td>
    <td>{{ i.ShenbaoShuiE }}</td>
    <td>{{ i.ZhuanXiangKouChu }}</td>
    <td>{{ needMoney }}</td>
    <td>实际出入</td>
    <td>{{ i.money }}</td>
  </tr>
</template>

<script setup>

const needMoney =1;
const Y2023 = [
  {
    month: '2023-02',
    ShenBaoJinE: 1,
    ShenbaoShuiE: 1,
    ZhuanXiangKouChu: 1,
    money: 16512.84,
  },
  {
    month: '2023-01',
    ShenBaoJinE: 15684.06,
    ShenbaoShuiE: 1,
    ZhuanXiangKouChu: 1,
    money: 15684.06,
  }
]

const Y2022 = []

const All = [...Y2023, ...Y2022]

console.log(All)

</script>

<style lang="postcss">
body,
html,
#app {
  height: 100%;
  user-select: none;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* color: var(--ep-text-color-primary);
  color: var(--color); */
}

.el-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

::-webkit-scrollbar {
  height: 10px;
  width: 100%;
}

::-webkit-scrollbar-thumb {
  background-color: #7d7d7d;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: #939393;
}
</style>