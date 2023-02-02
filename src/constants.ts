// 从这里扩展字段？ 然后插入
// 通用参数
let COMMON = {
  style: {
    isFixed: false,
    width: '',
    height: '',
    color: '',
    url: '',
    textValue: '文本内容',
    fontColor: '#000',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '',
  },
  point: {
    x: 0,
    y: 0,
  }
}

export const MATERIAL_LIST = [
  {
    icon: 'background',
    type: 'background',
    text: '海报背景',
    ...COMMON,
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png',
  },
  {
    icon: 'rongqi',
    type: 'container',
    text: '元素容器',
    ...COMMON,
  },
  {
    icon: 'tupian',
    type: 'image',
    text: '图片素材',
    ...COMMON,
  },
  {
    icon: 'wenzi',
    type: 'text',
    text: '文本内容',
    ...COMMON,
  },
  {
    icon: 'touxiang',
    type: 'head',
    text: '用户头像',
    ...COMMON,
    url: 'https://bizaladdin-image.baidu.com/0/pic/1080140929_-251358729_-1837083577.jpg',
  },
  {
    icon: 'erweima',
    type: 'qrcode',
    text: '二维码',
    ...COMMON,
    url: 'https://github.com/cchao123',
  },
];

console.log(MATERIAL_LIST)