# beautify-console-log



#### Introduction

This is a further beautification and encapsulation of the 'console' object, including console. log, console. info, console. warn, and console. error.

You can add custom console printing prefixes and beautify the content (rule reference https://developer.mozilla.org/en-US/docs/Web/API/Console ,  node environment reference https://en.wikipedia.org/wiki/ANSI_escape_code#Colors）, can close console printing at any time, supporting node.js environments.
Please view the effect on the console.



#### Software Architecture

Software Architecture Description




#### Installation Tutorial



```

npm i beautify-console-log --save

```

or

```

yarn add beautify-console-log

```



#### Instructions for use



1. Simple use

```

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


2. Supported console types

```

const log = BeautifyConsole.getInstance();

Log.info(1234, '4', [3, 5]);

Log.log(1234, '4', [3, 5]);

Log.warn(1234, '4', [3, 5]);

Log.error(1234, '4', [3, 5]);

```

3. Add custom console log headers

```

const log = BeautifyConsole.getInstance();

Log.setPadStartText('log ','hello world').info(1234,'4 ', [3, 5]);

```
4. Close log
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

5. Open log
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


#### Participation contribution



1. Fork warehouse

2. Create a new Feat_Xxx branch

3. Submit Code

4. Create a new Pull Request