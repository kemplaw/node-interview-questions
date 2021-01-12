# Node.js 面试题整理

### 面试真题1

nodejs 是什么

  - 基于 Chrome v8 引擎（解释引擎）的 js 运行时（runtime/运行环境）
  - nodejs 出现之前，js 只能在浏览器运行
  - nodejs 出现之后，js 可以在任何安装 nodejs 的环境运行

nodejs 和 前端 js 的区别

  - 语法层面
    1. 都使用 es 语法
    2. 前端 js 使用 js web api，例如 dom bom ajax
    3. nodejs 使用 node api，例如 http querystring

  - 应用层面
    1. 前端js用于网页，在浏览器运行
    2. nodejs 可用于服务端，如开发 web server
    3. nodejs 也可以用于本机，如 webpack 等本机的工具


nodejs 如何调试

  - 启动 nodejs 服务时，使用 inspect
    - 如 `node --inspect=9027 app.js`
  - 代码中 使用 debugger 断点
  - 使用 chrome 调试 - chrome://inspect


### 真题2

当前文件和目录的路径，如何获取？

  - __filename
  - __dirname
  - 两个都是全局变量

commonjs 和 es6 module 的区别

  - 语法不同
  - commonjs 是动态引入，执行时引入
  - es6 是静态引入，编译时引入，例如 webpack 的 tree shaking 只能支持 es6 ，因为不能在编译时去获取 commonjs 引入的模块

  ```
    // es6 静态引入，编译时引入，必须放在最上层
    import { sum, test } from './utils'

    // 放在语句中会在编译时就报错
    if (condition) {
      import { sum, test } from './utils'
    }

    // commonjs 就不会报错
    if (condition) {
      const _ = require('anyModule')
    }
  ```

path.resolve 和 join 的区别

  - 两者都是用于拼接文件路径
  - path.resolve 获取绝对路径 `/xx/xx/x.js`
  - path.join 获取相对路径 `../xxx/xxx.js`


### 真题3

**事件循环（event loop）在 nodejs 和 **浏览器中的区别**

  - 回答前提：
    - 了解 js 异步、单线程
    - 了解浏览器中的 event loop 过程
    - nodejs 中的 event loop 有何不同

    - 浏览器 js 的异步
      - 宏任务：setTimeout setInterval ajax 等
      - 微任务：Promise async/await
      - 微任务比宏任务更早执行

    - js event loop 机制解释
      - call stack（调用栈） 空闲时，将触发 event loop 机制，执行宏任务
      - 而触发 event loop 之前，会将现有的微任务都执行完
      - 所以微任务比宏任务执行时机更早

  - 区别：

    - nodejs 中 异步 api更多，宏任务类型也更多
    - nodejs 的 event loop 分为 6个阶段，要按照顺序执行
    - 微任务中 process.nextTick 优先级更高
    - 新版 nodejs 已和浏览器趋同，即 兼容代码 在两者执行的结构都是一样的
    - 
    

  - nodejs 中的异步
    - 宏任务（具有异步特性的api）
      - setTimeout setInterval
      - setImmediate
      - I/O 文件 网络操作
      - socket连接，如连接 mysql 宏任务

    - 微任务
      - Promise async/await - 微任务
      - process.nextTick - 微任务

    - 基本执行步骤
      - 执行同步代码
      - 执行微任务
      - 执行宏任务，执行完毕回到第二步

    - 特点
      - 微任务不多
      - 宏任务类型较多
      - 如果 宏任务都放在一个 callback queue 中，不好管理
        - nodejs 事件循环的 6 个阶段，**执行宏任务之前，都要先执行完当前的微任务**
          - **timers** - 执行 `setTimeout` 以及 `setInterval` 的回调
          - **I/O callbacks** - 处理网络、流、TCP 的错误回调
          - **idle, prepare** - 闲置阶段，node 内部使用
          - **poll** - 执行 poll 中的 I/O 队列，检查定时器是否到时间
          - **check** - 存放 `setImmediate` 回调
          - **close callbacks** - 关闭回调，例如 `Socket.on('close')`
          - 每个阶段结束后，都要执行微任务
          - 微任务中，process.nextTick 优先级最高，最早被执行
          - 但是 process.nextTick 现已不推荐使用，因为会堵塞 io
    
    - 几个细节：
      - setTimeout 比 setImmediate 执行更早
      - process.nextTick 比 Promise.then 执行更早
      - 建议用 setImmediate 代替 process.nextTick




session 如何实现登录

描述 koa2 和 express 的中间件机制

### 真题4

代码场景题 - async/await 执行顺序的考察

描述 koa2洋葱圈模型

如何逐行读取一个 1g 大小的日志文件

### 真题5

nodejs 线上环境为何要开启多进程

