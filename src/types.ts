import { TemplateType } from './constants';
export interface CommonStyle {
  width: number;
  height: number;
  url: string;
  radius?: number;
  textValue: string;
  fontColor: string;
  fontSize: number;
  fontStyle: string;
  fontWeight: string;
  zIndex: number;
  background?: string;
}

export interface CommonParams {
  point: { x: number; y: number };
  dragDirFixed: string[];
}

export interface CompItem extends CommonStyle, CommonParams {
  icon: string,
  type: TemplateType,
  name: string,
  compId?: string,
  index?: number;
}

export interface HistoryItem {
  id: string,
  remarks: string,
  date: number,
  thumbnail: string,
  compList: CompItem[],
  canvasConfig?: CanvasConfig,
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

export interface PositionBtnItem {
  direction: Direction;
  content: string;
  class: string;
  placement: string;
}
export interface CanvasConfig {
  width: number;
  height: number;
  background: string;
}

export interface PsdTreeItem {
  isGroup?: any;
  _children?: any;
  layer: any;
  name: any;
  width?: any;
  height?: any;
  left?: any;
  top?: any;
}

export interface PsdFile {
  file: File,
  header: any,
  image: any,
  parsed: Boolean,
  resources: any,
  tree: any,
}