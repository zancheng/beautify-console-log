"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeautifyConsole = void 0;
const model_1 = require("./model");
const utils_1 = require("../utils");
/**
 * ColorType 对应的 CSS 颜色值（浏览器端 %c 样式使用），取 ANSI 亮色系的近似色
 */
const CSS_COLORS = {
    [model_1.ColorType.black]: "#555555",
    [model_1.ColorType.red]: "#ff5555",
    [model_1.ColorType.green]: "#55ff55",
    [model_1.ColorType.yellow]: "#ffff55",
    [model_1.ColorType.blue]: "#5555ff",
    [model_1.ColorType.purple]: "#ff55ff",
    [model_1.ColorType.cyan]: "#55ffff",
    [model_1.ColorType.white]: "#ffffff",
};
/**
 * 转成 CSS 颜色：枚举值映射成十六进制色；
 * 没匹配上枚举的字符串（如 'pink'）直接当作 CSS 颜色名使用
 */
const toCssColor = (value) => { var _a; return typeof value === "string" ? value : (_a = CSS_COLORS[value]) !== null && _a !== void 0 ? _a : "#ffffff"; };
/**
 * 关闭日志时的空实现
 *
 * 保持返回 undefined，让 close() 之后的 log.info() 等调用行为和原来一致
 */
const noop = () => undefined;
/**
 * 生成日志头部（类型徽章 + 自定义标题）的 console 参数
 *
 * - Node 环境返回 ANSI 转义字符串（单元素数组）
 * - 浏览器环境返回 %c 格式串 + CSS 样式参数：
 *   ANSI 的亮色背景码（100-107）在部分浏览器/旧版 DevTools 上渲染不出来
 *   （例如 105 亮紫红），%c 是 MDN 规范做法，所有浏览器都支持
 *
 * @param option 颜色类型配置
 * @param type 日志类型
 * @param text 日志起始填充文本内容
 * @returns string[] bind 到 console 方法上的前缀参数
 */
const baseColor = (option = {}, type, text) => {
    let { color = model_1.ColorType.white, bgColor = model_1.ColorType.white } = option;
    if (typeof color === 'string') {
        const keys = Object.keys(model_1.ColorType);
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if (element === color) {
                color = model_1.ColorType[element];
                break;
            }
        }
    }
    if (typeof bgColor === 'string') {
        const keys = Object.keys(model_1.ColorType);
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if (element === bgColor) {
                bgColor = model_1.ColorType[element];
                break;
            }
        }
    }
    // 如果字色和底色相同（例如都设成 red），文本会和背景融为一体，
    // 这里自动 fallback 成对比色，保证 header 始终可见
    if (color === bgColor) {
        color =
            bgColor === model_1.ColorType.yellow || bgColor === model_1.ColorType.white
                ? model_1.ColorType.black
                : model_1.ColorType.white;
    }
    // 用 process.versions.node 判断，而不是 process.title：
    // 后者在 pm2、Electron、pkg 等打包运行场景下不等于 'node'，会造成误判
    if ((0, utils_1.isNodeEnv)()) {
        const backgroundColor = (Number(bgColor) || 0) + 10;
        const textColor = Number(color) || 0;
        if (text !== '' && text !== undefined && text !== null) {
            return [
                `\x1b[${backgroundColor};${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}${' '}\x1b[0m`,
            ];
        }
        return [`\x1b[${backgroundColor};${textColor};1m ${type.toUpperCase()} \x1b[0m`];
    }
    // 只映射 ANSI 里用到的三项：背景色、字色、加粗（ANSI 的 1），不加圆角/内边距，
    // 保持和 Node 端 ANSI 输出一致的观感（格式串里的空格已经起到留白作用）
    const badgeStyle = `background:${toCssColor(bgColor)};color:${toCssColor(color)};font-weight:bold;`;
    if (text !== '' && text !== undefined && text !== null) {
        // 标题里的 % 要转义成 %%，避免被当成 %c/%s 等格式化占位符
        const safeTitle = String(text).replace(/%/g, "%%");
        return [
            `%c ${type.toUpperCase()} %c ${safeTitle} `,
            badgeStyle,
            `background:${toCssColor(model_1.ColorType.black)};color:${toCssColor(model_1.ColorType.white)};`,
        ];
    }
    return [`%c ${type.toUpperCase()} `, badgeStyle];
};
/**
 * 日志左侧填充的文字
 */
const createPadText = (logType, defaultStyle) => {
    return (text = "beautify-console-log", style = defaultStyle) => {
        return baseColor(Object.assign(Object.assign({}, defaultStyle), style), logType, text);
    };
};
const padText = {
    info: createPadText(model_1.LogType.info, { bgColor: model_1.ColorType.blue, color: model_1.ColorType.white }),
    log: createPadText(model_1.LogType.log, { bgColor: model_1.ColorType.green, color: model_1.ColorType.white }),
    warn: createPadText(model_1.LogType.warn, { bgColor: model_1.ColorType.yellow, color: model_1.ColorType.black }),
    error: createPadText(model_1.LogType.error, { bgColor: model_1.ColorType.red, color: model_1.ColorType.white }),
};
/**
 * BeautifyConsole 是console日志工具
 *
 * 目前只有常用的 info、log、error、warn类型
 *
 * 1.使用：
 * ```
 *
 * import BeautifyConsole from "beautify-console-log";
 * const log = BeautifyConsole.getInstance();
 * log.log(1, [2, 3], '4');
 * ```
 *
 * 2.设置打开console日志显示：Log.open()
 *
 * 3.设置关闭console日志显示：Log.close()
 *
 * 4.设置开始的填充文本console日志：Log.setPadStartText()
 *
 *
 * ```
 *  {
 *    info: (...args: any[]) => void;
 *    error: (...args: any[]) => void;
 *    warn: (...args: any[]) => void;
 *    log: (...args: any[]) => void;
 *    static getInstance(): BeautifyConsole;
 *    config(config: {
 *        type?: LogType[] | ('info' | 'log' | 'warn' | 'error')[];
 *        title?: string;
 *    }): void;
 *    reset(): BeautifyConsole;
 *    open(type?: LogType): BeautifyConsole;
 *    close(type?: LogType): BeautifyConsole;
 *    setPadStartText(config: PadStartText): BeautifyConsole;
 *  }
 *  ```
 *
 * 可参考 https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
class BeautifyConsole {
    constructor() {
        this.infoPadStartText = padText[model_1.LogType.info]();
        this.errorPadStartText = padText[model_1.LogType.error]();
        this.warnPadStartText = padText[model_1.LogType.warn]();
        this.logPadStartText = padText[model_1.LogType.log]();
        /**
         * Print info type information
         */
        this.info = console.info.bind(this, ...this.infoPadStartText);
        /**
         * Print error type information
         */
        this.error = console.error.bind(this, ...this.errorPadStartText);
        /**
         * Print warn type information
         */
        this.warn = console.warn.bind(this, ...this.warnPadStartText);
        /**
         * Print log type information
         */
        this.log = console.log.bind(this, ...this.logPadStartText);
    }
    /**
     * Singleton mode
     */ static getInstance() {
        if (!this.instance) {
            this.instance = new BeautifyConsole();
        }
        return this.instance;
    }
    /**
     * 初始化配置项
     * @param config 是否打印日志 type { BaseConfig: {type?: LogType[] | ('info' | 'log' | 'warn' | 'error')[]; title?: string} }
     * 如果配置了type，就只显示配置的日志类型
     */
    config(config) {
        var _a;
        // logType 作为 type 的别名兼容：示例/旧文档里曾用过 setPadStartText 的命名习惯
        const { type = (_a = config.logType) !== null && _a !== void 0 ? _a : [
            model_1.LogType.info,
            model_1.LogType.error,
            model_1.LogType.warn,
            model_1.LogType.log,
        ], title, } = config;
        // 允许传单个类型，统一成数组处理，避免 type: 'info' 时 forEach 报错
        const types = Array.isArray(type)
            ? type
            : [type];
        if (types.length > 0) {
            this.setShowLog(false);
            types.forEach((item) => this.setShowLog(true, item));
        }
        if (title) {
            types.forEach((item) => this.setPadStartText({
                logType: item,
                title,
            }));
        }
    }
    /**
     * 设置显示/隐藏console日志
     * @param showLog 是否打印日志 type { boolean }
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     */
    setShowLog(showLog, type) {
        const setShowLogFunction = {
            info: () => {
                this.info = showLog
                    ? console.info.bind(this, ...this.infoPadStartText)
                    : noop;
            },
            error: () => {
                this.error = showLog
                    ? console.error.bind(this, ...this.errorPadStartText)
                    : noop;
            },
            warn: () => {
                this.warn = showLog
                    ? console.warn.bind(this, ...this.warnPadStartText)
                    : noop;
            },
            log: () => {
                this.log = showLog
                    ? console.log.bind(this, ...this.logPadStartText)
                    : noop;
            },
        };
        // 如果传入了要修改的console日志类型，就只改对应的显示隐藏，否则就更改所有的
        if (type) {
            if (setShowLogFunction[type]) {
                setShowLogFunction[type]();
            }
            else {
                console.error(`type:${type} not supported`);
            }
        }
        else {
            if (showLog) {
                this.info = console.info.bind(this, ...this.infoPadStartText);
                this.error = console.error.bind(this, ...this.errorPadStartText);
                this.warn = console.warn.bind(this, ...this.warnPadStartText);
                this.log = console.log.bind(this, ...this.logPadStartText);
            }
            else {
                this.info = noop;
                this.error = noop;
                this.warn = noop;
                this.log = noop;
            }
        }
    }
    /**
     * 重置console日志
     *
     * @returns BeautifyConsole
     */
    reset() {
        this.setShowLog(true);
        return this;
    }
    /**
     * 打开console日志
     *
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     *
     * @returns BeautifyConsole
     */
    open(type) {
        this.setShowLog(true, type);
        return this;
    }
    /**
     * 关闭console日志
     *
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     *
     * @returns BeautifyConsole
     */
    close(type) {
        this.setShowLog(false, type);
        return this;
    }
    /**
     * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
     * @param title type { string }
     * @param logType type { logType | 'info' | 'log' | 'warn' | 'error' }
     * @param style type { PadStartStyle }
     * @returns BeautifyConsole
     */
    setPadStartText(config) {
        try {
            const setTextFunction = {
                info: () => {
                    // 同步回填，否则 open/close/reset/config 重建绑定时会用回旧的默认标题
                    this.infoPadStartText = padText[model_1.LogType.info](config.title, config.style);
                    this.info = console.info.bind(console, ...this.infoPadStartText);
                },
                error: () => {
                    this.errorPadStartText = padText[model_1.LogType.error](config.title, config.style);
                    this.error = console.error.bind(console, ...this.errorPadStartText);
                },
                warn: () => {
                    this.warnPadStartText = padText[model_1.LogType.warn](config.title, config.style);
                    this.warn = console.warn.bind(console, ...this.warnPadStartText);
                },
                log: () => {
                    this.logPadStartText = padText[model_1.LogType.log](config.title, config.style);
                    this.log = console.log.bind(console, ...this.logPadStartText);
                },
            };
            if (setTextFunction[config.logType]) {
                setTextFunction[config.logType]();
            }
            else {
                console.error(`type:${config.logType} not supported`);
            }
        }
        catch (error) {
            // 这里用原生 console.error，避免 this.error 被 close() 置空后把异常静默吞掉
            console.error(error);
        }
        return this;
    }
}
exports.BeautifyConsole = BeautifyConsole;
