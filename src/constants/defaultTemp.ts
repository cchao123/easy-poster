import { olympic, centralaxis } from './thumbnail';

export const DEFAULT_TEMP = [
  {
    id: 'centralaxis',
    date: 1677742012611,
    remarks: '示例海报1',
    thumbnail: centralaxis,
    compList: [
      {
        "icon":"background",
        "type":"background",
        "name":"海报背景",
        "width":375,
        "height":667,
        "url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png",
        "textValue":"文本内容",
        "fontColor":"#000",
        "fontSize":12,
        "fontStyle":"normal",
        "fontWeight":"normal",
        "zIndex":0,
        "point":{
            "x":0,
            "y":0
        },
        "dragDirFixed":[],
        "compId":0
      }
    ],
  },
  {
    id: 'olympic',
    date: 1677742012611,
    remarks: '示例海报2',
    thumbnail: olympic,
    compList: [{"icon":"background","type":"background","name":"海报背景","width":375,"height":667,"url":"https://new.inews.gtimg.com/tnews/940fc8aa/b4fa/940fc8aa-b4fa-4a62-8a2b-8e724778db70.jpg","textValue":"文本内容","fontColor":"#000","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":0,"y":0},"dragDirFixed":["X","Y"],"compId":0},{"icon":"wenzi","type":"text","name":"文本内容","width":158,"height":20,"url":"","textValue":"看着我的眼睛 获得英雄卡","fontColor":"rgba(255, 220, 165, 1)","fontSize":14,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":128.5,"y":348.5},"dragDirFixed":[],"compId":"_5AH"},{"icon":"wenzi","type":"text","name":"文本内容","width":131,"height":15,"url":"","textValue":"NO. 2023012345678910","fontColor":"rgba(255, 220, 165, 1)","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":4,"y":5},"dragDirFixed":["X"],"compId":"_9T6"},{"icon":"touxiang","type":"head","name":"用户头像","width":20,"height":20,"url":"https://bizaladdin-image.baidu.com/0/pic/1080140929_-251358729_-1837083577.jpg","textValue":"文本内容","fontColor":"#000","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":98.5,"y":347.5},"dragDirFixed":[],"compId":"_E0W"},{"icon":"wenzi","type":"text","name":"文本内容","width":60,"height":17,"url":"","textValue":"长按二维码","fontColor":"rgba(255, 220, 165, 1)","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":225.5,"y":615},"dragDirFixed":[],"compId":"_UCF"},{"icon":"wenzi","type":"text","name":"文本内容","width":96,"height":17,"url":"","textValue":"揭秘你的冰雪英雄","fontColor":"rgba(255, 220, 165, 1)","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":191,"y":635},"dragDirFixed":[],"compId":"_A7H"},{"icon":"erweima","type":"qrcode","name":"二维码","width":55,"height":55,"url":"https://new.qq.com/qqfile/tnewsh5/2022olympic/2022olympic.html","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":305,"y":597},"dragDirFixed":[],"compId":"_QSV"}],
  }
]


export const HISTORTLIST_KEY = '__HISTORT_LIST'