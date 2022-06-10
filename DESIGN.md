# 设计

laboratoire 的设计思路

## 目标

目的是要完成一个类似于 jupyter notebook 的一样的实验室，可以把代码放在一个个 block 里的，所有的代码 block 共享一个上下文，上下文跑在沙箱里，不会污染外部环境。整个环境可以自由地导入 npm 依赖直接在代码块引入使用。具体实现分为多个阶段。

### phrase 1

纯 JS 执行，就类似浏览器里的 interpreter，带沙箱。

### phrase 2

import npm 依赖以及运行 react 应用。

### phrase 3

可通过 preset 选择不同的环境，支持大部分主流的应用与框架。

## 实现

jupiter notebook 里的代码块，每次执行本质上都是修改全局的 context，同一个 code block 反复执行结果不同只是因为 context 变了。
所以我们只要有一个全局的 context 就行了，每次 code block 执行的使用貌似只要用全局最新的 context 去 eval 就可以了。
至于全局的 context，直接在一个 JS 环境执行自己就会有吧。

至于沙箱，最简单的方法就是把所有 JS 的执行扔在一个隐藏的 iframe 里，然后通过 postMessage 和主页面通信。
或者就是 qiankun 那种模式，通过 with + proxy + eval 的方式。
