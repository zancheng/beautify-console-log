"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeautifyConsole = void 0;
const model_1 = require("./model");
/**
 * 转换node使用的日志颜色
 * @param option 颜色类型配置
 * @param text 日志起始填充文本内容
 * @param type 日志类型
 * @returns string
 */
const baseColor = (option = {}, text, type) => {
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
    const backgroundColor = (Number(bgColor) || 0) + 10;
    const textColor = Number(color) || 0;
    if (typeof process === "object" && process.title === "node") {
        return `\x1b[${backgroundColor};${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}\x1b[0m`;
    }
    else {
        return `\x1b[${backgroundColor};${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}`;
    }
};
/**
 * 日志左侧填充的文字
 */
const padText = {
    info(text = "beautify-console-log ", style = { bgColor: model_1.ColorType.blue, color: model_1.ColorType.white }) {
        return [baseColor(style, text, model_1.LogType.info)];
    },
    error(text = "beautify-console-log ", style = { bgColor: model_1.ColorType.red, color: model_1.ColorType.white }) {
        return [baseColor(style, text, model_1.LogType.error)];
    },
    warn(text = "beautify-console-log ", style = {
        bgColor: model_1.ColorType.yellow,
        color: model_1.ColorType.black,
    }) {
        return [baseColor(style, text, model_1.LogType.warn)];
    },
    log(text = "beautify-console-log ", style = { bgColor: model_1.ColorType.green, color: model_1.ColorType.white }) {
        return [baseColor(style, text, model_1.LogType.log)];
    },
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
        const { type = [model_1.LogType.info, model_1.LogType.error, model_1.LogType.warn, model_1.LogType.log], title, } = config;
        if (type.length > 0) {
            this.setShowLog(false);
            type.forEach((item) => this.setShowLog(true, item));
        }
        if (title) {
            type.forEach((item) => this.setPadStartText({
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
                    : (...parasm) => undefined;
            },
            error: () => {
                this.error = showLog
                    ? console.error.bind(this, ...this.errorPadStartText)
                    : (...parasm) => undefined;
            },
            warn: () => {
                this.warn = showLog
                    ? console.warn.bind(this, ...this.warnPadStartText)
                    : (...parasm) => undefined;
            },
            log: () => {
                this.log = showLog
                    ? console.log.bind(this, ...this.logPadStartText)
                    : (...parasm) => undefined;
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
                this.info = (...parasm) => undefined;
                this.error = (...parasm) => undefined;
                this.warn = (...parasm) => undefined;
                this.log = (...parasm) => undefined;
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
                    this.info = console.info.bind(this, ...padText[model_1.LogType.info](config.title, config.style));
                },
                error: () => {
                    this.error = console.error.bind(this, ...padText[model_1.LogType.error](config.title, config.style));
                },
                warn: () => {
                    this.warn = console.warn.bind(this, ...padText[model_1.LogType.warn](config.title, config.style));
                },
                log: () => {
                    this.log = console.log.bind(this, ...padText[model_1.LogType.log](config.title, config.style));
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
            this.error(error);
        }
        return this;
    }
}
exports.BeautifyConsole = BeautifyConsole;
