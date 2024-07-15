# beautify-console-log

[中文介绍](https://github.com/zancheng/beautify-console-log/blob/master/README.zh.md)

## Introduction

Due to most log beautification plugins not being able to locate the **code line**, I implemented this library myself.
- This is a further beautification and encapsulation of the "console" object, including console. log console.info、console.warn、console.error。
- It can display the number of rows where the log is printed, add custom console printing prefixes, and beautify the content (web side rule reference) [https://developer.mozilla.org/en-US/docs/Web/API/Console](https://developer.mozilla.org/en-US/docs/Web/API/Console) Node environment reference [https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97](https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)） ）, can close console printing at any time, supports node environment.
> Please check the effect on the console.

## Menu
- [Effect](#Effect)
- [Tutorial](#Tutorial)
- [API](#API)
- [Use](#Use)
- [Contribution](#Contribution)

## Effect
<p>
<img src="./img/3.jpg" style="width: 500px">
</p>
<p>
<img src="./img/4.jpg" style="width: 500px">
</p>
<p>
<img src="./img/5.jpg" style="width: 500px">
</p>


## Tutorial


```

npm i beautify-console-log --save

```

or

```

yarn add beautify-console-log

```

## API

### config
|param                          |type                         |description                         |
|-------------------------------|-----------------------------|-----------------------------|
|title                          |String                       |Custom log header                   |
|logType                        |Array<String>               |The type of log displayed, set to only display the corresponding log type(`"info"`、`"log"`、`"warn"`、`"error"`)|
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.config({
    title: 'custom title',
    logType: ['info', 'error']
})
// The usage method is consistent with the normal console.info
log.info(1234, '4', [3, 5]);
```
### log
> The usage method is consistent with the normal console.log
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.log(1234, '4', [3, 5]);
log.log({
    "name": "chengzan"
});
```

### info
> The usage method is consistent with the normal console.info
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.info(1234, '4', [3, 5]);
log.info({
    "name": "chengzan"
});
```

### warn
> The usage method is consistent with the normal console.warn
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();=
log.warn(1234, '4', [3, 5]);
log.warn('warn');
```

### error
> The usage method is consistent with the normal console.error
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.error(1234, '4', [3, 5]);
log.error('warn');
```

### open
After using `log.close()` to close the log, you can use `log.open()` to open the corresponding log type. When opening all types of logs, no parameters are passed (support chain calling).
|type                         |description                         |
|-----------------------------|-----------------------------|
|String?                       |`info`、`log`、`warn`、`error`, Or not transmitted|
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.open() // Open all types of logs
// 或者
log.open('info') // Open the info log
// 或者
log.open('info').open('error') // Open the info log
```

### close
Closing logs allows you to close all logs or a certain type of log.
|type                         |description                         |
|-----------------------------|-----------------------------|
|String?                       |`info`、`log`、`warn`、`error`, Or not transmitted|
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.close() // Close all types of logs
// 或者
log.close('info') // Close the info log
// 或者
log.close('info').open('log')
```

### setPadStartText
Set the text content and style of the log header
|param                          |type                         |description                         |
|-------------------------------|-----------------------------|-----------------------------|
|title                          |String                       |Custom log header                   |
|logType                        |String              |`info`,`log`,`warn`,`error`|
|style                        |Object              |`info`,`log`,`warn`,`error`|
|                        |├──color              |`black`,`red`,`green`,`yellow`,`blue`,`purple`,`cyan`,`white`|
|                        |└──bgColor              |`black`,`red`,`green`,`yellow`,`blue`,`purple`,`cyan`,`white`|
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();
log.close() // Close all types of logs
// 或者
log.close('info') // Close the info log
// 或者
log.close('info').open('log')
```

### reset
After setting custom log headers or closing some logs, you can reset them through `log.reset()`.
```
import BeautifyConsole from "beautify-console-log";
const log = BeautifyConsole.getInstance();

log.config({
    title: 'custom title',
    logType: ['info', 'error']
})

log.reset() // 打开所有类型日志
log.info('reset log')
```

## Use



1. Simple use

```
import BeautifyConsole from "beautify-console-log";

const log = BeautifyConsole.getInstance();

//The usage is consistent with the normal console.info()

Log.info(1234, '4', [3, 5]);

```
 or
```

const log = new BeautifyConsole();

//The usage is consistent with the normal console.info()

Log.info(1234, '4', [3, 5]);

```
Or directly use the `dist/index. js` file
```
<script src="./dist/index.js">
```

```
const log = BeautifyConsole.default.getInstance()

log.info(1234, '4', [3, 5])

log.log(1234)

log.close().warn('no show')

log.open().log('show log')

log.error(1234)

log.setPadStartText('log', 'hello world').log(1234)
```

2.  initial configuration
```
const log = BeautifyConsole.getInstance();
log.config({
    title: 'example pad start text', // Log header content filled on the left
    logType: ['info', 'error', 'warn', 'log'], // Display partial log types
})
log.info(1234, '4', [3, 5]);
log.log(1234, '4', [3, 5]);
log.warn(1234, '4', [3, 5]);
log.error(1234, '4', [3, 5]);
```

3. Supported console types

```

const log = BeautifyConsole.getInstance();

Log.info(1234, '4', [3, 5]);

Log.log(1234, '4', [3, 5]);

Log.warn(1234, '4', [3, 5]);

Log.error(1234, '4', [3, 5]);

```

4. Add custom console log headers

```

const log = BeautifyConsole.getInstance();

Log.setPadStartText('log ','hello world').info(1234,'4 ', [3, 5]);

```
5. Close log
Close the corresponding console log types when passing in parameters, and close all types without passing them.
supports chain calling.
```
const log = BeautifyConsole.getInstance();
log.close('info');
log.close('log');
log.close('warn');
log.close('error');
log.close();
log.close().open('error');

// or
log.open('error').open('log').open('warn').open('info');

// or
log.close('error').info('closed error');
log.close('error').error('closed error');

// or
log.close('error').open('info');
log.close('error').open('info').info('info...');

```

6. Open log
Open the corresponding console log types when passing in parameters, and open all types without passing them.
supports chain calling.

```
const log = BeautifyConsole.getInstance();
log.open('info');
log.open('log');
log.open('warn');
log.open('error');
log.open().close('info');

//or
log.open('error').open('log').open('warn').open('info');

// or
log.open().info('closed error');
log.open('error').error('closed error');

// or
log.close('error').open('info');
log.close('error').open('info').info('info...');

```


## Contribution



1. Fork warehouse

2. Create a new Feat_Xxx branch

3. Submit Code

4. Create a new Pull Request