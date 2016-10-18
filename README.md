# gizwits-docs

[![Build Status](https://travis-ci.org/gizwits-docs/gizwits-docs.svg?branch=master)](https://travis-ci.org/gizwits-docs/gizwits-docs)


# 文档编写
- 统一放在`/source`文件夹里，中文文档放在`/source/zh-cn`目录下，英文文档放在`/source/en-us`目录下。
- 增加一个类别需要在对应目录下新建一个文件夹
- 文档文件为.md后缀的markdown文件，文件名（及文件夹名）统一规范为英文（不使用空格及特殊符号）；为了方便文档管理，中英文文档使用相同的文件夹路径及文件名
- 文档编写格式为
```
title: {{ title }}
---
{{ content }}
```
- {{ title }}会自动生成文章标题，{{ content }}使用[标准markdown语法](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
- 文章h1, h2, h3标题会在页面左边自动生成文章导航

# 目录编辑
- 目录修改路径为 `/source/_data`，`/source/_data/menu-en-us.yml`为英文版目录，`/source/_data/menu-zh-cn.yml`为中文版目录
- 目录格式为
```
主菜单名:
  副菜单名:
    文章名:
      path: /path/to/article.html
```
- 最多支持三级菜单（文章名为第三级菜单），`:`必须使用英文输入法的符号，该符号左边为显示在头部导航目录名称。
- `path:`右边为文章路径，相对应于`/source/en-us` 或 `／source/zh-cn`文件夹，路径结尾为`.html`后缀
- 从属关系需严格使用`两个空格`缩进
- 对于只有少于三级目录的只需在最后一级目录名称下写上`path:`即可

### 例子
```
文档目录如下

 * source
   * en-us
     * overview.md
     * quickstart
       * android
         * starter-kid.md
       * ios
         * starter-kid.md
   * zh-cn
     * overview
       overview.md
     * quickstart
       * android
         * starter-kit.md
       * ios
         * starter-kit.md
```

```
相对应的菜单文件为

. /source/_data/menu-en-us.yml

overview:
  path: /overview/overview.html
quickstart:
  android:
    android-qs:
      path: /quickstart/android/starter-kit.html
  ios:
    ios-qs:
      path: /quickstart/ios/starter-kit.html
      
--------------------------------------------------------

. /source/_data/menu-zh-cn.yml

概述:
  path: /overview/overview.html
快速入门:
  安卓:
    安卓开发套件:
      path: /quickstart/android/starter-kit.html
  苹果:
    苹果开发套件:
      path: /quickstart/ios/starter-kit.html
```

# 插入图片
- 图片统一放在`/assets`目录下，可以在该目录下建立子文件夹
- markdown图片路径和图片文件目录位置一致，例如一张图片存放位置为`/assets/demo.jpg`，则markdown路径名为
```
![demo](/assets/demo.jpg)
```
- 图片直接上传到github repo相应文件后，github会自动生成预览
- 过期或无用的图片直接从repo删除即可