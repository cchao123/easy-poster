// http://echarts.baidu.com/option.html#title
import Vue from 'vue'
import echarts from 'echarts/lib/echarts'
// 线
require('echarts/lib/chart/line')
// 柱
require('echarts/lib/chart/bar')
// 鼠标事件
require('echarts/lib/component/dataZoom')
// 操作框
require('echarts/lib/component/toolbox')
// 标题
require('echarts/lib/component/title')
// 提示框
require('echarts/lib/component/tooltip')
// 图例
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts
