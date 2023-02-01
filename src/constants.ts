// 从这里扩展字段？ 然后插入
// 通用参数
const COMMON = {
  style: {
    width: '',
    height: '',
    color: '',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png',
    textValue: '文本内容',
    fontSize: '14',
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
    type: 'bg',
    text: '海报背景',
    ...COMMON,
  },
  {
    icon: 'rongqi',
    type: 'container',
    text: '元素容器',
    ...COMMON,
  },
  {
    icon: 'tupian',
    type: 'img',
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
  },
  {
    icon: 'erweima',
    type: 'qrcode',
    text: '二维码',
    ...COMMON,
  },
];

console.log(MATERIAL_LIST)