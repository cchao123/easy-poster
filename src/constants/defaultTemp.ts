import { olympic, centralaxis } from './thumbnail';

export const DEFAULT_TEMP = [
  {
    id: 'centralaxis',
    date: 1677742012611,
    remarks: '预设示例1',
    thumbnail: centralaxis,
    canvasConfig: {
      width: 720,
      height: 1444,
      background: '#fff',
    },
    compList: [{"icon":"background","type":"background","name":"海报背景","width":750,"height":1444,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png","textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":0,"y":0},"dragDirFixed":["X","Y"],"compId":0},{"icon":"tupian","type":"image","name":"图片素材","width":130,"height":32,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-text1.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":66,"y":140},"dragDirFixed":[],"compId":"_MF6"},{"icon":"tupian","type":"image","name":"图片素材","width":324,"height":32,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-text2.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":254,"y":140},"dragDirFixed":[],"compId":"_AGU"},{"icon":"touxiang","type":"head","name":"用户头像","width":54,"height":54,"url":"https://avatars1.githubusercontent.com/u/24643401","radius":200,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":64,"y":62},"dragDirFixed":[],"compId":"_HNI"},{"icon":"wenzi","type":"text","name":"文本内容","width":20,"height":22,"url":"","radius":0,"textValue":"20","fontColor":"rgba(70, 53, 37, 1)","fontSize":36,"fontStyle":"normal","fontWeight":"bold","zIndex":0,"point":{"x":176,"y":298},"dragDirFixed":[],"compId":"_WK0"},{"icon":"wenzi","type":"text","name":"文本内容","width":48,"height":17,"url":"","radius":0,"textValue":"解锁景点","fontColor":"rgba(126, 84, 42, 1)","fontSize":24,"fontStyle":"normal","fontWeight":"bold","zIndex":0,"point":{"x":158,"y":354},"dragDirFixed":[],"compId":"_RMY"},{"icon":"wenzi","type":"text","name":"文本内容","width":25,"height":22,"url":"","radius":0,"textValue":"7.8","fontColor":"rgba(70, 53, 37, 1)","fontSize":36,"fontStyle":"normal","fontWeight":"bold","zIndex":0,"point":{"x":534,"y":300},"dragDirFixed":[],"compId":"_IEJ"},{"icon":"wenzi","type":"text","name":"文本内容","width":55,"height":17,"url":"","radius":0,"textValue":"里程(公里)","fontColor":"rgba(126, 84, 42, 1)","fontSize":24,"fontStyle":"normal","fontWeight":"bold","zIndex":0,"point":{"x":504,"y":354},"dragDirFixed":[],"compId":"_ACW"},{"icon":"tupian","type":"image","name":"图片素材","width":666,"height":780,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-map-bg.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":42,"y":418},"dragDirFixed":["X","Y"],"compId":"_B6B"},{"icon":"tupian","type":"image","name":"图片素材","width":668,"height":168,"url":"https://www.cchao.cc/images/poster-btm-1.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":41,"y":1230},"dragDirFixed":[],"compId":"_AEE"},{"icon":"tupian","type":"image","name":"图片素材","width":214,"height":120,"url":"https://www.cchao.cc/images/poster-btm-2.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":330,"y":1236},"dragDirFixed":[],"compId":"_KOD"},{"icon":"erweima","type":"qrcode","name":"二维码","width":120,"height":120,"url":"https://new.qq.com/qqfile/tnewsh5/short-term/centralAxis/centralAxis.html","radius":0,"textValue":"data:image/png;base64,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","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":576,"y":1234},"dragDirFixed":[],"compId":"_BLM"},{"icon":"wenzi","type":"text","name":"文本内容","width":28,"height":20,"url":"","radius":0,"textValue":"游客","fontColor":"#000","fontSize":28,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":136,"y":70},"dragDirFixed":[],"compId":"_3KS"},{"icon":"tupian","type":"image","name":"图片素材","width":135,"height":32,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-text3.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":66,"y":198},"dragDirFixed":[],"compId":"_PQK"},{"icon":"tupian","type":"image","name":"图片素材","width":170,"height":32,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-title-hj.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":218,"y":198},"dragDirFixed":[],"compId":"_9EG"},{"icon":"wenzi","type":"text","name":"文本内容","width":18,"height":19,"url":"","radius":0,"textValue":"20","fontColor":"#E52E34","fontSize":32,"fontStyle":"normal","fontWeight":"blod","zIndex":0,"point":{"x":208,"y":138},"dragDirFixed":[],"compId":"_G35"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":58,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-gulou.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":392,"y":444},"dragDirFixed":[],"compId":"_9QR"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":59,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-zhonglou.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":12,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":314,"y":508},"dragDirFixed":[],"compId":"_EPZ"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":70,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-wanningqiao.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":416,"y":582},"dragDirFixed":[],"compId":"_VBK"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":112,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-neidajie.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":296,"y":596},"dragDirFixed":[],"compId":"_PRH"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":62,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-gugong.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":440,"y":744},"dragDirFixed":[],"compId":"_Q4P"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":72,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-shejitan.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":162,"y":752},"dragDirFixed":[],"compId":"_P3D"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":58,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-duanmen.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":310,"y":764},"dragDirFixed":[],"compId":"_GZS"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":72,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-tiananmen.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":440,"y":818},"dragDirFixed":[],"compId":"_X88"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":78,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-zhengyangmen.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":298,"y":916},"dragDirFixed":[],"compId":"_EVU"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":105,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-tiananmengc.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":398,"y":880},"dragDirFixed":[],"compId":"_09K"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":87,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-qianmen.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":274,"y":1004},"dragDirFixed":[],"compId":"_IKV"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":68,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-xiannongtan.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":194,"y":1060},"dragDirFixed":[],"compId":"_YY9"},{"icon":"tupian","type":"image","name":"图片素材","width":38,"height":86,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-yongdingmen.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":292,"y":1096},"dragDirFixed":[],"compId":"_54T"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":102,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-nandajie.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":438,"y":1058},"dragDirFixed":[],"compId":"_YP9"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":60,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-tiantan.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":558,"y":1064},"dragDirFixed":[],"compId":"_03G"},{"icon":"tupian","type":"image","name":"图片素材","width":20,"height":60,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-jingshan.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":408,"y":652},"dragDirFixed":[],"compId":"_4R2"},{"icon":"tupian","type":"image","name":"图片素材","width":24,"height":85,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-jinshuiqiao.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":278,"y":850},"dragDirFixed":[],"compId":"_7BQ"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":60,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-taimiao.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":590,"y":760},"dragDirFixed":[],"compId":"_9BL"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":67,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-ydm.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":404,"y":1118},"dragDirFixed":[],"compId":"_P56"},{"icon":"tupian","type":"image","name":"图片素材","width":19,"height":111,"url":"https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/tag-waidajie.png","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":440,"y":550},"dragDirFixed":[],"compId":"_E1E"}]
  },
  {
    id: 'olympic',
    date: 1677742012611,
    remarks: '预设示例2',
    thumbnail: olympic,
    canvasConfig: {
      width: 750,
      height: 1334,
      background: '#fff',
    },
    compList: [{"icon":"background","type":"background","name":"海报背景","width":750,"height":1334,"url":"https://new.inews.gtimg.com/tnews/940fc8aa/b4fa/940fc8aa-b4fa-4a62-8a2b-8e724778db70.jpg","textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":0,"y":0},"dragDirFixed":["X","Y"],"compId":"_C1C"},{"icon":"wenzi","type":"text","name":"文本内容","width":316,"height":40,"url":"","textValue":"看着我的眼睛 获得英雄卡","fontColor":"rgba(255, 220, 165, 1)","fontSize":28,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":257,"y":697},"dragDirFixed":[],"compId":"_5AH"},{"icon":"wenzi","type":"text","name":"文本内容","width":262,"height":30,"url":"","textValue":"NO. 2023012345678910","fontColor":"rgba(255, 220, 165, 1)","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":8,"y":10},"dragDirFixed":["X"],"compId":"_9T6"},{"icon":"touxiang","type":"head","name":"用户头像","width":40,"height":40,"url":"https://avatars1.githubusercontent.com/u/24643401","textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":197,"y":695},"dragDirFixed":[],"compId":"_E0W"},{"icon":"wenzi","type":"text","name":"文本内容","width":120,"height":34,"url":"","textValue":"长按二维码","fontColor":"rgba(255, 220, 165, 1)","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":451,"y":1230},"dragDirFixed":[],"compId":"_UCF"},{"icon":"wenzi","type":"text","name":"文本内容","width":192,"height":34,"url":"","textValue":"揭秘你的冰雪英雄","fontColor":"rgba(255, 220, 165, 1)","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":382,"y":1270},"dragDirFixed":[],"compId":"_A7H"},{"icon":"erweima","type":"qrcode","name":"二维码","width":110,"height":110,"url":"https://new.qq.com/qqfile/tnewsh5/2022olympic/2022olympic.html","radius":0,"textValue":"文本内容","fontColor":"#000","fontSize":24,"fontStyle":"normal","fontWeight":"normal","zIndex":0,"point":{"x":610,"y":1194},"dragDirFixed":[],"compId":"_QSV"}]
  }
]
