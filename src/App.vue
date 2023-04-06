<template>
  <table border="1"
         cellspacing="0"
         width="800">
    <thead>
      <tr>
        <td>申报月份</td>
        <td>申报金额</td>
        <td>已申报税额</td>
        <td>本期专项扣除</td>
        <td>应到手金额</td>
        <td>工资卡实收</td>
        <td>差额</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in All"
          :key="i.m">
        <td>{{ i.month }}</td>
        <td>{{ i.ShenBaoJinE }}</td>
        <td>{{ i.ShenbaoShuiE }}</td>
        <td>{{ i.ZhuanXiangKouChu }}</td>
        <td>{{ needMoney(i).toFixed(2) }}</td>
        <td>{{ i.money }}</td>
        <td class="color green"
            :class="{red: missMoney(i)> 0}">{{ missMoney(i).toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
  <div class="aaaa" @click="sum">{{ sumnum }}</div>
</template>

<script  setup>
import { ref } from 'vue';
const Y2023 = [
  {
    month: '2023-02',
    ShenBaoJinE: 17183.96,
    ShenbaoShuiE: 237.65,
    ZhuanXiangKouChu: 1262.25,
    money: 16512.84,
  },
  {
    month: '2023-01',
    ShenBaoJinE: 14632.12,
    ShenbaoShuiE: 251.1,
    ZhuanXiangKouChu: 1262.25,
    money: 15684.06,
  }
]

const Y2022 = [
  {
    month: '2022-12',
    ShenBaoJinE: 19000,
    ShenbaoShuiE: 2222.91,
    ZhuanXiangKouChu: 1262.25,
    money: 13118.77,
  },
  {
    month: '2022-11',
    ShenBaoJinE: 18120.82,
    ShenbaoShuiE: 1185.86,
    ZhuanXiangKouChu: 1262.25,
    money: 15514.84,
  },
  {
    month: '2022-10',
    ShenBaoJinE: 17034.71,
    ShenbaoShuiE: 1077.24,
    ZhuanXiangKouChu: 1262.25,
    money: 15672.71,
  },
  {
    month: '2022-9',
    ShenBaoJinE: 20310.35,
    ShenbaoShuiE: 1404.81,
    ZhuanXiangKouChu: 1262.25,
    money: 14695.22,
  },
  {
    month: '2022-8',
    ShenBaoJinE: 23750,
    ShenbaoShuiE: 1748.78,
    ZhuanXiangKouChu: 1262.25,
    money: 17643.29,
  },
  {
    month: '2022-7',
    ShenBaoJinE: 14250,
    ShenbaoShuiE: 822.42,
    ZhuanXiangKouChu: 1025.8,
    money: 15988.97,
  },
  {
    month: '2022-6',
    ShenBaoJinE: 22494.25,
    ShenbaoShuiE: 1496.84,
    ZhuanXiangKouChu: 1025.8,
    money: 12401.78 + 4750,
  },
  {
    month: '2022-5',
    ShenBaoJinE: 28991.37,
    ShenbaoShuiE: 2146.56,
    ZhuanXiangKouChu: 1025.8,
    money: 19971.61,
  },
  {
    month: '2022-4',
    ShenBaoJinE: 14250,
    ShenbaoShuiE: 616.72,
    ZhuanXiangKouChu: 1025.8,
    money: 21069.01,
  },
  {
    month: '2022-3',
    ShenBaoJinE: 19873.56,
    ShenbaoShuiE: 370.43,
    ZhuanXiangKouChu: 1025.8,
    money: 12607.48 + 4750,
  },
  {
    month: '2022-2',
    ShenBaoJinE: 23641.03,
    ShenbaoShuiE: 483.46,
    ZhuanXiangKouChu: 1025.8,
    money: 18477.33,
  },
  {
    month: '2022-1',
    ShenBaoJinE: 14267.10,
    ShenbaoShuiE: 202.24,
    ZhuanXiangKouChu: 1025.8,
    money: 17381.77,
  },
]

const Y2021 = [
  {
    month: '2021-12',
    ShenBaoJinE: 19017.10,
    ShenbaoShuiE: 1897.08,
    ZhuanXiangKouChu: 1025.8,
    money: 13039.06,
  },
  {
    month: '2021-11',
    ShenBaoJinE: 22018.18,
    ShenbaoShuiE: 1599.23,
    ZhuanXiangKouChu: 1025.8,
    money: 16094.22,
  },
  {
    month: '2021-10',
    ShenBaoJinE: 14250,
    ShenbaoShuiE: 822.42,
    ZhuanXiangKouChu: 1025.8,
    money: 14643.15,
  },
  {
    month: '2021-9',
    ShenBaoJinE: 19000,
    ShenbaoShuiE: 1297.42,
    ZhuanXiangKouChu: 1025.8,
    money: 12401.78 + 4750,
  },
  {
    month: '2021-8',
    ShenBaoJinE: 23750,
    ShenbaoShuiE: 1772.42,
    ZhuanXiangKouChu: 1025.8,
    money: 16676.78,
  },
  {
    month: '2021-7',
    ShenBaoJinE: 14250,
    ShenbaoShuiE: 835.43,
    ZhuanXiangKouChu: 895.75,
    money: 16201.78,
  },
  {
    month: '2021-6', // ? 过账？
    ShenBaoJinE: 19000,
    ShenbaoShuiE: 1310.42,
    ZhuanXiangKouChu: 895.75,
    money: 12518.82 + 4750,
  },
  {
    month: '2021-5',
    ShenBaoJinE: 18017.36,
    ShenbaoShuiE: 1213.31,
    ZhuanXiangKouChu: 884.26,
    money: 16793.83,
  },
  {
    month: '2021-4',
    ShenBaoJinE: 18006.20,
    ShenbaoShuiE: 1212.20,
    ZhuanXiangKouChu: 884.26,
    money: 15919.79,
  },
  {
    month: '2021-3',
    ShenBaoJinE: 18006.20,
    ShenbaoShuiE: 388.83,
    ZhuanXiangKouChu: 884.26,
    money: 15909.74,
  },
  {
    month: '2021-2',
    ShenBaoJinE: 18006.20,
    ShenbaoShuiE: 363.66,
    ZhuanXiangKouChu: 884.26,
    money: 16733.11,
  },
  {
    month: '2021-1',
    ShenBaoJinE: 18000,
    ShenbaoShuiE: 363.47,
    ZhuanXiangKouChu: 884.26,
    money: 16758.28,
  },
]

const Y2020 = [
  {
    month: '2020-12',
    ShenBaoJinE: 18000,
    ShenbaoShuiE: 2423.14,
    ZhuanXiangKouChu: 884.26,
    money: 16752.27,
  },
  {
    month: '2020-11',
    ShenBaoJinE: 18230,
    ShenbaoShuiE: 2184.71,
    ZhuanXiangKouChu: 884.26,
    money: 14692.6,
  },
  {
    month: '2020-10',
    ShenBaoJinE: 17770,
    ShenbaoShuiE: 1188.57,
    ZhuanXiangKouChu: 884.26,
    money: 15161.03,
  },
  {
    month: '2020-9',
    ShenBaoJinE: 21310.34,
    ShenbaoShuiE: 1542.61,
    ZhuanXiangKouChu: 884.26,
    money: 15697.17,
  },
  {
    month: '2020-8',
    ShenBaoJinE: 18000,
    ShenbaoShuiE: 1211.57,
    ZhuanXiangKouChu: 884.26,
    money: 18883.47,
  },
  {
    month: '2020-7',
    ShenBaoJinE: 22145.56,
    ShenbaoShuiE: 1625.74,
    ZhuanXiangKouChu: 888.2,
    money: 15904.17,
  },
  {
    month: '2020-6',
    ShenBaoJinE: 18006.2,
    ShenbaoShuiE: 1211.8,
    ZhuanXiangKouChu: 888.2,
    money: 19631.62,
  },
  {
    month: '2020-5',
    ShenBaoJinE: 26284.92,
    ShenbaoShuiE: 2039.67,
    ZhuanXiangKouChu: 888.2,
    money: 15906.2,
  },
  {
    month: '2020-4',
    ShenBaoJinE: 24310.34,
    ShenbaoShuiE: 1739.58,
    ZhuanXiangKouChu: 888.2,
    money: 23357.05,
  },
  {
    month: '2020-3',
    ShenBaoJinE: 16500,
    ShenbaoShuiE: 318.35,
    ZhuanXiangKouChu: 888.2,
    money: 21682.56,
  },
  {
    month: '2020-2',
    ShenBaoJinE: 16592,
    ShenbaoShuiE: 321.12,
    ZhuanXiangKouChu: 888.2,
    money: 15293.45,
  },
  {
    month: '2020-1',
    ShenBaoJinE: 19106,
    ShenbaoShuiE: 396.54,
    ZhuanXiangKouChu: 888.2,
    money: 15382.68,
  },
]

const Y2019 = [
  {
    month: '2019-12',
    ShenBaoJinE: 18949.81,
    ShenbaoShuiE: 1306.16,
    ZhuanXiangKouChu: 888.2,
    money: 17821.62,
  },
  {
    month: '2019-11',
    ShenBaoJinE: 16537.20,
    ShenbaoShuiE: 1064.9,
    ZhuanXiangKouChu: 888.2,
    money: 16755.45,
  },
  {
    month: '2019-10',
    ShenBaoJinE: 17925.29,
    ShenbaoShuiE: 1203.71,
    ZhuanXiangKouChu: 888.2,
    money: 14584.1,
  },
  {
    month: '2019-9',
    ShenBaoJinE: 18000,
    ShenbaoShuiE: 1211.8,
    ZhuanXiangKouChu: 888.2,
    money: 15833.38,
  },
  {
    month: '2019-8',
    ShenBaoJinE: 16500,
    ShenbaoShuiE: 1061.18,
    ZhuanXiangKouChu: 888.2,
    money: 15900.62,
  },
  {
    month: '2019-7',
    ShenBaoJinE: 18350.57,
    ShenbaoShuiE: 1256.22,
    ZhuanXiangKouChu: 788.33,
    money: 14550.62,
  },
  {
    month: '2019-6',
    ShenBaoJinE: 22626.44,
    ShenbaoShuiE: 1683.82,
    ZhuanXiangKouChu: 788.33,
    money: 16306.02,
  },
  {
    month: '2019-5',
    ShenBaoJinE: 16925.29,
    ShenbaoShuiE: 1113.69,
    ZhuanXiangKouChu: 788.33,
    money: 20154.29,
  },
  {
    month: '2019-4',
    ShenBaoJinE: 15500,
    ShenbaoShuiE: 490.62,
    ZhuanXiangKouChu: 788.33,
    money: 15023.27,
  },
  {
    month: '2019-3',
    ShenBaoJinE: 15500,
    ShenbaoShuiE: 291.35,
    ZhuanXiangKouChu: 788.33,
    money: 14221.05,
  },
  {
    month: '2019-2',
    ShenBaoJinE:  15500,
    ShenbaoShuiE: 291.35,
    ZhuanXiangKouChu: 788.33,
    money: 14420.32,
  },
  {
    month: '2019-1',
    ShenBaoJinE: 15500,
    ShenbaoShuiE: 291.35,
    ZhuanXiangKouChu: 788.33,
    money: 14420.32,
  },
]



// const All = [...Y2019]
const All = [...Y2023, ...Y2022, ...Y2021, ...Y2020, ...Y2019]
const sumarr = ref([]);
const sumnum = ref(0);
const sum = () => {
  const node = document.querySelectorAll('.color');
  node.forEach((item, i) => {
    sumnum.value += Number(item.innerHTML);
  })
}

const missMoney = (i) => {
  return (i.ShenBaoJinE - i.ShenbaoShuiE - i.ZhuanXiangKouChu) - i.money;
}

const needMoney = (i) => {
  return i.ShenBaoJinE - i.ShenbaoShuiE - i.ZhuanXiangKouChu;
}


</script>

<style lang="postcss">
body,
html,
#app {
  /* height: 100%; */
  background-color: #dfd1d1;
  user-select: none;
  /* overflow: hidden; */
}

table {
  margin: 0 auto;
}
#app {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* color: var(--ep-text-color-primary);
  color: var(--color); */
  font-weight: bold;
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

.green {
  color: green;
}

.red {
  color: red;
}

.aaaa {
  margin: 0 auto;
  width: 800px;
  text-align: right;
}
</style>