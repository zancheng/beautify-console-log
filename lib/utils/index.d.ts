/**
 * 是否为 Node 运行环境
 *
 * 这里使用 process.versions.node 判断，而不是 process.title：
 * 后者在 pm2、Electron、pkg 等打包运行场景下不等于 'node'，会造成误判
 *
 * 再叠加一层 window 判断：浏览器里如果被注入了 process 垫片
 * （如 node-polyfill-webpack-plugin），process.versions.node 也会存在，
 * 此时应按浏览器处理；Electron 渲染进程同理
 */
export declare const isNodeEnv: () => boolean;
/**
 * 格式化字符串，用于兼容console.log('string=%s number=%d', 'string', 1)的写法，把参数进行格式化
 * @param params unknown[]
 * @returns 逐段拼接后的结果，数字/对象等非字符串片段保持原类型
 */
export declare const formatConsoleStr: (...params: unknown[]) => unknown[];
