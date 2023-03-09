// 样式默认参数
const COMMON_STYLE = {
  width: 0,
  height: 0,
  url: '',
  radius: 0,
  textValue: '文本内容',
  fontColor: '#000',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  zIndex: 0,
}

// 交互默认参数
const COMMON_PARAMS = {
  point: {
    x: 0,
    y: 0,
  },
  dragDirFixed: [],
}

export const MATERIAL_LIST = [
  {
    icon: 'background',
    type: 'background',
    name: '海报背景',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    // url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png',
    width: 375,
    height: 667,
  },
  {
    icon: 'rongqi',
    type: 'container',
    name: '元素容器',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    width: 100,
    height: 100,
    background: '#f2f2f2',
  },
  {
    icon: 'tupian',
    type: 'image',
    name: '图片素材',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    width: 60,
    height: 60,
  },
  {
    icon: 'wenzi',
    type: 'text',
    name: '文本内容',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
  },
  {
    icon: 'touxiang',
    type: 'head',
    name: '用户头像',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://bizaladdin-image.baidu.com/0/pic/1080140929_-251358729_-1837083577.jpg',
    width: 50,
    height: 50,
    radius: 100,
  },
  {
    icon: 'erweima',
    type: 'qrcode',
    name: '二维码',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://github.com/cchao123',
    width: 55,
    height: 55,
  },
];

export const POSITION_BUTTON = [
  {
    direction: 'center',
    content: '水平居中',
    class: 'icon-shangxiajuzhong',
    placement: 'left',
  },
  {
    direction: 'middle',
    content: '垂直居中',
    class: 'icon-shangxiajuzhong',
    placement: 'right',
  },
  {
    direction: 'left',
    content: '靠左',
    class: 'icon-kaozuo',
    placement: 'left',
  },
  {
    direction: 'right',
    content: '靠右',
    class: 'icon-kaozuo',
    placement: 'right',
  },
  {
    direction: 'top',
    content: '靠上',
    class: 'icon-kaoshang',
    placement: 'top',
  },
  {
    direction: 'bottom',
    content: '靠下',
    class: 'icon-kaoshang',
    placement: 'bottom',
  },
];

export const CHECK_ALL_VALUE = ['X', 'Y'];
export const CHECK_MAX_LENGTH = CHECK_ALL_VALUE.length;

