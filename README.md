# easy-poster

自用H5海报需求部分辅助开发工具

### [模板-element-plus-vite-starter](https://github.com/element-plus/element-plus-vite-starter)

## 项目结构
```
|- src
	|- codeTemplate     // 模板字符串
	|- components
		｜- layouts     // 页面布局
		｜- template    // 组件UI层
	｜- composables
	｜- constants
		｜- defaultTemp // 预设海报
		｜- driver      // 预设指引	
	｜- styles          // Custom theme
｜- dist
```
## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

## Usage

```bash
git clone https://github.com/cchao123/easy-poster
cd easy-poster
npm i
npm run dev
```

### Custom theme

See `src/styles/element/index.scss`.

TODOLIST：
1.处理：import顺序
2.定义全局类型
3.postcss
4.demo项目Monorepos改造