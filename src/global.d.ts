
export {}
 
declare global {
    interface Window {
      Prism: any; //全局变量名
    }
}

declare module 'psd.js';