/* eslint-disable no-param-reassign */
import {
  Sprite,
  Loader,
  Text,
  TextStyle,
  ITextStyle,
  Application,
  Graphics,
  Container,
  TextStyleAlign,
} from 'pixi.js-legacy';

/**
 * @description pixi loader
 * @images 图片列表
 * @onProgress loder进度
 * @onLoad 加载完成
 */
// imgLoader
interface LoaderImages {
  name: string;
  url: string;
}
interface ImgLoaderParam {
  images: LoaderImages[];
  onProgress?: any;
  onLoad?: any;
}
interface ImgLoaderRes {
  loader: Loader | null;
  resources: any;
}
export const imgLoader = async (params: ImgLoaderParam) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { images = [], onProgress = () => {}, onLoad = () => {} } = params;
  return new Promise<ImgLoaderRes>((resolve) => {
    const loader = Loader.shared;
    if (!loader) {
      resolve({
        loader: null,
        resources: null,
      });
    }
    loader.reset();
    loader.load();
    images.forEach((item) => {
      loader.add(item.name, item.url);
    });
    loader.onProgress.add((res: any) => {
      onProgress(res.progress);
    });

    loader.load((loaderRes, resources) => {
      onLoad();
      resolve({
        loader: loaderRes,
        resources,
      });
    });
  });
};

// pixi.js 图片配置
export interface ImageSpriteConfig {
  url?: string; // 图片地址
  width?: number; // 图片宽度
  height?: number; // 图片高度
  offsetX?: number; // 图片相对容器 X 轴偏移
  offsetY?: number; // 图片相对容器 Y 轴偏移
  [key: string]: any; // 默认接受任何参数，但是不做处理
}

/**
 * @description 创建 Pixi 图片 Sprite
 * @param param Sprite 配置
 * @param scale 图片的放大倍数，默认为 1
 * @returns Sprite
 */
const createImageSprite = (param: ImageSpriteConfig, scale = 1, resources: any) => {
  const { url = '', width, height, offsetX = 0, offsetY = 0 } = param;
  const resourcesForName = resources[`${param.name}`];
  const sprite = Sprite.from(resourcesForName?.texture || url);
  if (width !== undefined) {
    sprite.width = width * scale;
  }
  if (height !== undefined) {
    sprite.height = height * scale;
  }
  sprite.x = offsetX;
  sprite.y = offsetY;
  return sprite;
};

/**
 * @description pixi text
 * @content string 文字内容
 * @textStyle TextStyle 样式
 */
interface TextParams {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: string;
  fill?: string[] | string; // gradient
  stroke?: string;
  strokeThickness?: number;
  dropShadow?: boolean;
  dropShadowColor?: string;
  dropShadowBlur?: number;
  dropShadowAngle?: number;
  dropShadowDistance?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  lineJoin?: string;
  align?: TextStyleAlign;
  zIndex?: number;
  lineHeight?: number;
}
const createPixiText = (content: string, styles?: TextParams) => {
  const defaultParam = { fontWeight: '200', align: 'left' };
  const paramStyle = { ...defaultParam, ...styles };
  const style = new TextStyle(paramStyle as ITextStyle);
  const text = new Text(content, style);
  return text;
};

interface RectangleParams {
  bgColor?: number;
  borderColor?: number;
  borderSize?: number;
  borderRadius?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
}
// 绘制矩形
/**
 * @description 绘制矩形
 * @bgColor 背景色
 * @borderColor 边框色
 * @borderSize 边框大小
 * @borderRadius 圆角大小
 * @width 宽度
 * @height 高度
 * @x x坐标
 * @y y坐标
 */
export const drawRectangle = (params: RectangleParams) => {
  const { bgColor, borderColor, borderSize = 1, borderRadius, width = 0, height = 0, x = 0, y = 0, scale = 1 } = params;
  const graphics = new Graphics();
  if (bgColor !== undefined) {
    graphics.beginFill(bgColor);
  }
  if (borderColor !== undefined) {
    graphics.lineStyle(borderSize, borderColor, 1);
  }
  if (borderRadius !== undefined) {
    graphics.drawRoundedRect(x * scale, y * scale, width * scale, height * scale, borderRadius * scale);
  } else {
    graphics.drawRect(x * scale, y * scale, width * scale, height * scale);
  }
  return graphics;
};

export type PosterClipType = 'image' | 'rectangle' | 'text' | 'group' | 'table';

export interface DrawTableParams {
  x?: number;
  y?: number;
  position?: 'absolute' | 'static';
  scale: number;
  data: PosterData[][];
  resources?: any;
}
// 绘制表格
export const drawTable = (params: DrawTableParams, wraper: Container) => {
  const { data, scale = 1, resources } = params;
  let tableTotalHeight = 0;
  const drawTableLine = (lineData: any, tableContainer: Container) => {
    const lineWrap = new Container();
    let lineTop = 0;
    lineData.forEach((item: any) => {
      item.position = 'static';
      item.direction = 'horizontal';
      if (item.y > lineTop) {
        lineTop = item.y * scale;
      }
      item.y = 0;
    });
    tableTotalHeight += lineTop;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    drawPosterData({
      data: lineData,
      scale,
      wraper: tableContainer,
      resources,
    });
    tableContainer.addChild(lineWrap);
  };
  data.forEach((item) => {
    const itemContainer = new Container();
    drawTableLine(item, itemContainer);
    itemContainer.y = tableTotalHeight;
    wraper.addChild(itemContainer);
    tableTotalHeight += itemContainer.height;
  });
};

export interface PosterData {
  type: PosterClipType;
  url?: string;
  text?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  borderRadius?: number | number[];
  data?: PosterData[];
  position?: 'static' | 'absolute';
  textStyle?: TextParams;
  padding?: number[];
  direction?: 'horizontal' | 'vertical';
  fullHeight?: boolean;
  alpha?: number;
  name?: string;
  bottom?: number;
  align?: 'left' | 'right' | 'center';
  zIndex?: number;
  bgColor?: number;
}

export interface DrawPosterDataParam {
  data: PosterData[] | PosterData[][];
  wraper: Container;
  scale: number;
  resources?: any;
}
// 绘制矩形borderRaius如果为数组，则通过补边角的方式进行处理
const drawRectangleForRaduis = (params: RectangleParams) => {
  const { borderRadius = [0, 0, 0, 0], width = 0, height = 0, scale = 1 } = params;
  if (typeof borderRadius === 'number') {
    return drawRectangle(params);
  }
  const rectWraper = new Container();
  if (typeof borderRadius === 'object') {
    // 先提取borderRadius中不为0的数字，作为基础圆角：（不支持多尺寸圆觉，例如左上8，右上10）
    let radiu = 0;
    borderRadius.forEach((item) => {
      if (item > 0) {
        radiu = item;
      }
    });
    const rectBg = drawRectangle({ ...params, ...{ borderRadius: radiu } });
    rectWraper.addChild(rectBg);
    const raduisPosition: any = {
      0: {
        x: 0,
        y: 0,
      },
      1: {
        x: (width - radiu) * scale,
        y: 0,
      },
      2: {
        x: (width - radiu) * scale,
        y: (height - radiu) * scale,
      },
      3: {
        x: 0,
        y: (height - radiu) * scale,
      },
    };
    borderRadius.forEach((item, index) => {
      if (item !== 0) {
        return;
      }
      const itemRect = drawRectangle({
        ...params,
        ...{ borderRadius: 0, width: radiu, height: radiu, position: 'absolute' },
      });
      const { x, y } = raduisPosition[index];
      itemRect.x = x;
      itemRect.y = y;
      rectWraper.addChild(itemRect);
    });
  }
  return rectWraper;
};

interface DrawTextForPosterParams {
  content: string;
  width?: number;
  styles?: TextParams;
  scale?: number;
}
// 文本类型处理
export const drawTextForPoster = (params: DrawTextForPosterParams) => {
  const { content = '', styles = { fontSize: 12 }, scale = 1, width } = params;
  const { fontSize = 12, wordWrapWidth = 1000, lineHeight = 14, align } = styles;
  const fontStyle = {
    ...styles,
    ...{ fontSize: fontSize * scale, wordWrapWidth: wordWrapWidth * scale, lineHeight: lineHeight * scale },
  };
  if (width !== undefined) {
    const textWraper = new Container();
    textWraper.width = width * scale;
    const textClip = createPixiText(content, fontStyle);
    textWraper.addChild(textClip);
    if (align === 'center') {
      textClip.x = (width * scale - textClip.width) / 2;
    } else if (align === 'right') {
      textClip.x = width * scale - textClip.width;
    }
    return textWraper;
  }
  return createPixiText(content, fontStyle);
};

// 处理传入data
const drawPosterData = (params: DrawPosterDataParam) => {
  const { data, wraper, scale = 1, resources } = params;
  let totalHeight = 0;
  let totalWidth = 0;
  const clips: any = [];
  const createItemForType = (item: any) => {
    const { x = 0, y = 0, fullHeight, bottom = 0, width = 0, height = 0, textStyle, text } = item;
    const typeObject: any = {
      image: () => {
        if (!item.url) {
          return;
        }

        const itemClip = createImageSprite(item, scale, resources);
        itemClip.x = x * scale;
        itemClip.y = y * scale;
        return itemClip;
      },
      rectangle: () => {
        const clipHeight = fullHeight ? wraper.height / scale - y - bottom : height;
        const itemClip = drawRectangleForRaduis({ ...item, ...{ scale, height: clipHeight } });
        return itemClip;
      },
      group: () => {
        const itemClip = new Container();
        itemClip.sortableChildren = true;
        itemClip.x = x * scale;
        itemClip.y = y * scale;
        drawPosterData({
          data,
          wraper: itemClip,
          scale,
          resources,
        });
        return itemClip;
      },
      table: () => {
        const itemClip = new Container();
        itemClip.sortableChildren = true;
        itemClip.x = x * scale;
        itemClip.y = y * scale;
        drawTable({ ...item, ...{ scale, resources } }, itemClip);
        return itemClip;
      },
      text: () => {
        // itemClip = createPixiText(text, { ...textStyle, ...{ fontSize: fontSize * scale } });
        const itemClip = drawTextForPoster({
          content: text,
          width,
          styles: textStyle,
          scale,
        });
        itemClip.x = x * scale;
        itemClip.y = y * scale;
        return itemClip;
      },
    };
    return typeObject;
  };
  data.forEach((item: any) => {
    const { zIndex, alpha = 1, position, direction, x, align, y } = item;
    const itemClip = createItemForType(item)[item.type]();
    wraper.addChild(itemClip);
    itemClip.zIndex = zIndex;
    itemClip.alpha = alpha;
    if (position === 'static') {
      if (direction === 'horizontal') {
        totalWidth += x * scale;
        itemClip.x = totalWidth;
        totalWidth += itemClip.width;
      } else {
        totalHeight += y * scale;
        itemClip.y = totalHeight;
        totalHeight += itemClip.height;
      }
    }
    // 设置居中对齐
    if (align === 'center') {
      itemClip.x = (wraper.width - itemClip.width) / 2;
    }
    // 设置右对齐
    if (align === 'right') {
      itemClip.x = wraper.width - itemClip.width;
    }
    clips.push(itemClip);
  });
  return clips;
};

// 筛选type = images的元素
interface FilterImagesParams {
  data: PosterData[] | PosterData[][];
}
export const filterImages = (params: FilterImagesParams) => {
  const { data } = params;
  let images: LoaderImages[] = [];
  data.forEach((item: any) => {
    if (item.type === 'image') {
      images.push({
        name: item.name,
        url: item.url,
      });
    }
    if (item.type === 'group') {
      images = images.concat(
        filterImages({
          data: item.data,
        }),
      );
    }
    if (item.type === 'table') {
      item.data.forEach((tableItem: any) => {
        images = images.concat(
          filterImages({
            data: tableItem,
          }),
        );
      });
    }
  });
  return images;
};

export interface PosterAddChildParams {
  app: Application;
  data: PosterData[];
  scale?: number;
  container: Container;
}

export const posterAddChild = async (params: PosterAddChildParams) => {
  const { data, container, scale = 1, app } = params;
  // 找出类型为image的元素，先load
  const images = filterImages({ data });
  const { resources } = await imgLoader({
    images,
  });
  // 根据传入的data，渲染画布内容
  drawPosterData({
    data,
    wraper: container,
    scale,
    resources,
  });
  return app;
};

interface PixiPosterParams {
  container: string;
  width?: number;
  height?: number;
  antialias?: boolean;
  backgroundColor?: number;
  designWidth?: number;
  scale?: number;
  data: PosterData[];
  bottom?: number;
  autoHeight?: boolean;
}
/**
 * @description 创建pixi海报
 * @container 容器id
 * @width 海报宽度
 * @height 海报高度
 * @antialias 抗锯齿
 * @backgroundColor 背景色
 */
export const createPixiPoster = async (params: PixiPosterParams) => {
  const {
    container,
    width = innerWidth,
    height = innerHeight,
    antialias = true,
    backgroundColor = 0xffffff,
    scale = 1,
    bottom = 0,
    autoHeight = false,
    data = [],
  } = params;
  const appConfig = {
    width: width * scale,
    height: height * scale,
    antialias,
    backgroundColor,
  };
  const app = new Application(appConfig);
  const pixiWraper = document.getElementById(container);
  const pixiContainer = new Container();
  pixiContainer.sortableChildren = true;
  app.view.style.width = `${innerWidth}px`;
  await app.stage.addChild(pixiContainer);
  await posterAddChild({
    app,
    container: pixiContainer,
    scale,
    data,
  });
  if (autoHeight) {
    app.view.height = pixiContainer.height + bottom * scale;
  }
  await pixiWraper?.appendChild(app.view);
  return {
    app,
    pixiContainer,
  };
};

export const pixiDestroy = (app: Application) => {
  const container = app.stage.children[0] as Container;
  const removeChildrens = container.removeChildren(0, container.children.length);
  removeChildrens.forEach((item) => {
    item.destroy({
      children: true,
      texture: true,
      baseTexture: true,
    });
  });
};
