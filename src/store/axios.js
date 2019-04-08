import qs from 'qs'
import axios from 'axios'
import Vue from 'vue'

axios.default.withCredentials = true

// 转换formData
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data)
}]

axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

/**
 * 数据请求方法
 * @param {object} options 请求参数选项 - 请看axios的参数选项
 * {
 *  method: 'get',  // 请求方法
 *  url: '/v1/user', // 请求链接
 *  params: {}, // url 参数
 *  data: {}, // 请求体中的数据 ‘post’ 请求
 *  ... ...
 * }
 * @param {object} isJson 是否是以json的形式请求数据
 */
export function kmAxios (options, isJson) {
  if (isJson) {
    options.headers = {
      'Content-Type': 'application/json'
    }
    options.transformRequest = [
      function (data) {
        return JSON.stringify(data)
      }
    ]
  }
  return new Promise((resolve, reject) => {
    options.method = options.method || 'GET'
    axios(options).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      Vue.prototype.$message.error(err.message)
      reject(err)
    })
  })
}
