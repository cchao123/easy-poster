export interface ElementType {
  type: String,
  style: {
    width?: Number,
    height?: Number,
    color?: String,
    // img
    url?: String,
    // 文字
    textValue?: String,
    fontSize?: String,
    fontStyle: String,
    fontWeight?: String,
    letterSpacing?: String,
  },
  point: {
    x: Number,
    y: Number,
  }
}

export interface SchemeType {
  config: {
    w: Number,
    h: Number,
    backgroundColor: String,
  },
  element: ElementType[];
}
