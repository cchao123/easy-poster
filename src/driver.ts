import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

const MESSAGE = [
  {
    element: '.aside-material',
    popover: {
      title: '1️⃣ 物料区域',
      description: '拖拽所需物料至画板预览',
      position: 'right',
    },
  },
  {
    element: '.h5-view',
    popover: {
      title: '2️⃣ 操作面板',
      description: '拖拽至此, 用于预览编辑视图',
      position: 'right',
    },
  },
  {
    element: '.formWrap',
    popover: {
      title: '3️⃣ 参数设置',
      description: '参数修改',
      position: 'left',
    },
  },
  {
    element: '.codeWrap',
    popover: {
      title: '4️⃣ 代码预览',
      description: '代码预览',
      position: 'left',
    },
  },
  // {
  //   element: '.el-header',
  //   popover: {
  //     title: '5️⃣ 按钮区域',
  //     description: '预览代码',
  //     position: 'bottom',
  //   },
  // },
];

export const driverFun = new Driver({
  animate: true,
});

export const setDriveMessage = (cb: ()=> void)=> {
  driverFun.defineSteps(MESSAGE);
  if (cb) cb();
}
