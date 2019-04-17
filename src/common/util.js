/**
 * 防抖动函数
 * @param {function} fn 回调函数
 * @param {number} delay delay时间
 */
export const debounce = (fn, delay) => {
  // 维护一个 timer
  let timer = null

  return function () {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this
    let args = arguments

    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
