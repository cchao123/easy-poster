import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

const MESSAGE = [
  {
    element: '.aside-material',
    popover: {
      title: '1. 物料区域',
      description: '拖拽所需物料至画板预览',
      position: 'right',
    },
  },
  {
    element: '.h5-view',
    popover: {
      title: '2️. 操作面板',
      description: '拖拽至此, 用于预览编辑视图',
      position: 'right',
    },
  },
  {
    element: '.formWrap',
    popover: {
      title: '3️. 参数设置',
      description: '个性化参数修改',
      position: 'left',
    },
  },
  {
    element: '.codeWrap',
    popover: {
      title: '4️. 代码预览',
      description: '当前编辑组件代码预览',
      position: 'left',
    },
  },
  {
    element: '.el-btn-container',
    popover: {
      title: '5️. 操作区',
      description: '上传psd、查看/保存编辑记录、查看最终产物',
      position: 'bottom',
    },
  },
];

export const driverFun = new Driver({
  animate: true,
});

export const setDriveMessage = (cb: ()=> void)=> {
  driverFun.defineSteps(MESSAGE);
  if (cb) cb();
}
