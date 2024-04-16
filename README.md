# ttz-ui

对 elementPlus 进行二次封装的组件库

#### 介绍

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `types` 类型定义文件更改
- `wip` 开发中

#### 使用说明

- 安装依赖

```bash
npm install
```

- 运行测试

```bash
npm run dev
```

- 构建包

```bash
npm run build
```

- 提交 npm 包

```bash
npm run pub
```

#### 结构

- dist：存放打包好的组件库的文件夹；
- src/client：用于测试组件的文件目录；
- src/component： 是用来存放封装好的组件的；
- index.html：这是用来 npm run dev，由于组件库没有 html，这边就用 client 来当测试 demo，所以需要修改里面的配置；
- vite.config.ts：主要配置 build 的打包参数；
- src/index.ts：用于配置打包内容；
- package.json 修改配置，使其指向生成的库文件；以及基础的配置信息，方便上传到 npm 中。

#### 待办
- `BasicTable` 操作列，增删，分页，单选，多选，插槽
- `ApiTable` ，搜索表单
- `EditableTable`  rules校验，增删
