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
  type: string,
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