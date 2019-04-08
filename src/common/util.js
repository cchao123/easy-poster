import { KM_IMAGE_TAGS } from './const'

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

/**
 * 获取图像链接
 * @param {string} imageid 图像id
 * @param {string} size 图像大小
 */
export const getImageUrl = (imageid, size) => {
  return `https://p.kameng.qq.com/comeon/${imageid}/${size}`
}

/**
 * 格式化帖子对象信息
 * @param {object} elem 帖子对象信息
 * @param {object} comments 帖子对应评论对象
 */
export function doPostFormat (elem, comments) {
  elem.image_tag = elem.image_tags ? elem.image_tags[0][0] : 0 // 图片标签
  if (KM_IMAGE_TAGS.video === elem.image_tag) { // 视频类型帖子
    elem.head_img = elem.image_scales[0][0]
  } else {
    elem.head_img = elem.image_scales[218][0]
  }
  elem.head_img_source = elem.image_scales[0][0] // 原封面图
  if (comments) elem.comment_count = comments[elem.comment_id]
  elem.image_id = elem.image_ids[0]
  elem.channelArr = elem.channels || []
  return elem
}
