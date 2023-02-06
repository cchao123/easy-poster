// 样式默认参数
const COMMON_STYLE = {
  width: 0,
  height: 0,
  color: '',
  url: '',
  textValue: '文本内容',
  fontColor: '#000',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
}

// 交互默认参数
const COMMON_PARAMS = {
  point: {
    x: 0,
    y: 0,
  },
  drag: {
    directionFixed: [],
  },
}

export const MATERIAL_LIST = [
  {
    icon: 'background',
    type: 'background',
    text: '海报背景',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png',
  },
  {
    icon: 'rongqi',
    type: 'container',
    text: '元素容器',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    width: 100,
    height: 100,
    background: '#f2f2f2'
  },
  {
    icon: 'tupian',
    type: 'image',
    text: '图片素材',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
  },
  {
    icon: 'wenzi',
    type: 'text',
    text: '文本内容',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
  },
  {
    icon: 'touxiang',
    type: 'head',
    text: '用户头像',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://bizaladdin-image.baidu.com/0/pic/1080140929_-251358729_-1837083577.jpg',
  },
  {
    icon: 'erweima',
    type: 'qrcode',
    text: '二维码',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://github.com/cchao123',
  },
];

export const POSITION_BUTTON = [
  {
    content: '水平居中',
    class: 'icon-shangxiajuzhong icon-r-90',
  },
  {
    content: '垂直居中',
    class: 'icon-shangxiajuzhong',
  },
  {
    content: '靠左',
    class: 'icon-kaozuo',
  },
  {
    content: '靠右',
    class: 'icon-kaozuo icon-r-180',
  },
  {
    content: '靠上',
    class: 'icon-kaoshang',
  },
  {
    content: '靠下',
    class: 'icon-kaoshang icon-r-180',
  },
];

export const CHECK_ALL_VALUE = ['X', 'Y'];
export const CHECK_MAX_LENGTH = CHECK_ALL_VALUE.length;