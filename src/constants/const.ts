// 样式默认参数
const COMMON_STYLE = {
  width: 0,
  height: 0,
  url: '',
  radius: 0,
  textValue: '文本内容',
  fontColor: '#000',
  fontSize: 24,
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

// 本地存储key
export const HISTORTLIST_KEY = '__HISTORT_LIST';

// code输出类型
export enum OutputType {
  PIXI = 'PixiJs',
  HTML2CANVAS = 'html2Canvas',
}

// code类型
export enum CodeType {
  PIXI = 'PIXI',
  DOM = 'DOM',
  CSS = 'CSS',
}
// 模板组件类型
export enum TemplateType {
  BACKGROUND = 'background',
  CONTAINER = 'container',
  TEXT = 'text',
  HEAD = 'head',
  IMAGE = 'image',
  QRCODE = 'qrcode',
}

// 物料组件
export const MATERIAL_LIST = [
  {
    icon: 'background',
    type: TemplateType.BACKGROUND,
    name: '海报背景',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    // url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png',
    width: 750,
    height: 1334,
  },
  {
    icon: 'rongqi',
    type: TemplateType.CONTAINER,
    name: '元素容器',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    width: 200,
    height: 200,
    background: '#f2f2f2',
  },
  {
    icon: 'tupian',
    type: TemplateType.IMAGE,
    name: '图片素材',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
  },
  {
    icon: 'wenzi',
    type: TemplateType.TEXT,
    name: '文本内容',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
  },
  {
    icon: 'touxiang',
    type: TemplateType.HEAD,
    name: '用户头像',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://bizaladdin-image.baidu.com/0/pic/1080140929_-251358729_-1837083577.jpg',
    width: 100,
    height: 100,
    radius: 100,
  },
  {
    icon: 'erweima',
    type: TemplateType.QRCODE,
    name: '二维码',
    ...COMMON_STYLE,
    ...COMMON_PARAMS,
    url: 'https://github.com/cchao123',
    width: 110,
    height: 110,
  },
];

// 辅助遥控
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

