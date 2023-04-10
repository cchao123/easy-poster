export interface CommonStyle {
  width: number;
  height: number;
  url: string;
  radius: number;
  textValue: string;
  fontColor: string;
  fontSize: number;
  fontStyle: string;
  fontWeight: string;
  zIndex: number;
  background: string;
}

export interface CommonParams {
  point: { x: number; y: number };
  dragDirFixed: string[];
}

export interface CompItem extends CommonStyle, CommonParams {
  icon: string,
  type: string,
  name: string,
  compId?: string,
}

export interface DirFun {
  bottom: () => void;
  top: () => void;
  left: () => void;
  right: () => void;
  center: () => void;
  middle: () => void;
}

export type Direction = keyof DirFun;


export interface CanvasConfig {
  width: number;
  height: number;
  background: string;
}