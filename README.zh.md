# beautify-console-log

#### 介绍
这是“console”对象的进一步美化和封装，包括console.log、console.info、console.warn、console.error。
可以加入自定义的console打印前缀、对内容进行美化（规则参考 https://developer.mozilla.org/en-US/docs/Web/API/Console ），可随时关闭console打印

#### 软件架构
软件架构说明


#### 安装教程

```
npm i beautify-console --save
```
或
```
yarn add beautify-console
```

#### 使用说明

1.  简单使用
```
const log = BeautifyConsole.getInstance();
// 使用方式与正常的console.info()一致
log.info(1234, '4', [3, 5]);

```

2.  支持的console类型
```
const log = BeautifyConsole.getInstance();
log.info(1234, '4', [3, 5]);
log.log(1234, '4', [3, 5]);
log.warn(1234, '4', [3, 5]);
log.error(1234, '4', [3, 5]);
```
3.  加入自定义console日志头
```
const log = BeautifyConsole.getInstance();
log.setPadStartText('log', 'hello world').info(1234, '4', [3, 5]);
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
