/**
 * 是否为 Node 运行环境
 *
 * 这里使用 process.versions.node 判断，而不是 process.title：
 * 后者在 pm2、Electron、pkg 等打包运行场景下不等于 'node'，会造成误判
 */
const isNodeEnv = (): boolean =>
  typeof process !== "undefined" &&
  process.versions !== undefined &&
  process.versions.node !== undefined;

/**
 * 用于切割格式字符串的占位符
 */
const TOKEN_SPLITTER = /(%[sdof])/g;

/**
 * 是否为占位符（锚定匹配，避免普通文本里出现 %s 时被误处理）
 */
const TOKEN_PATTERN = /^%[sdof]$/;
const isToken = (fragment: string): boolean => TOKEN_PATTERN.test(fragment);

/**
 * 处理 %o 占位符对应的值
 *
 * Error 的 message / stack 不可枚举，需要显式声明白名单才能序列化；
 * 浏览器保留原始对象，交给 DevTools 折叠展示；Node 环境序列化成字符串
 */
const formatObject = (value: any): any => {
  if (value instanceof Error) {
    return JSON.stringify(value, ["message", "stack", "type", "name"]);
  }
  if (!isNodeEnv()) {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch (error) {
    // 循环引用
    return "[Circular]";
  }
};

/**
 * 格式化字符串，用于兼容console.log('string=%s number=%d', 'string', 1)的写法，把参数进行格式化
 * @param params any[]
 * @returns
 */
export const formatConsoleStr = (...params: any[]): any[] => {
  if (params.length < 2 || typeof params[0] !== "string") {
    return params.slice(1);
  }

  // 'a=%s b' -> ['a=', '%s', ' b']
  const result: any[] = params[0].split(TOKEN_SPLITTER);
  // 消费参数的游标，从 1 开始跳过格式字符串本身
  let cursor = 1;

  for (let index = 0; index < result.length; index++) {
    const token = result[index];
    if (!isToken(token)) {
      continue;
    }
    const value = params[cursor];
    // 参数不足时保留占位符原样，不补 undefined
    if (value === undefined) {
      break;
    }
    cursor += 1;
    switch (token) {
      case "%s":
        result[index] = String(value);
        break;
      case "%d":
        result[index] = Number(value);
        break;
      case "%f":
        result[index] = Number.parseFloat(String(value));
        break;
      case "%o":
        result[index] = formatObject(value);
        break;
    }
  }

  // 没有被占位符消费掉的参数原样追加
  for (; cursor < params.length; cursor++) {
    result.push(params[cursor]);
  }

  return result;
};
