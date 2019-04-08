import Vue from 'vue'

// 格式化时间
Vue.filter('formatTime', (timestamp, format) => {
  format = format || 'yyyy/MM/dd hh:mm:ss'
  timestamp = timestamp * 1000
  return formatTime(timestamp, format)
})
