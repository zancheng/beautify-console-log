"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeautifyConsole = void 0;
/**
 * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
 * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
 * 0 终端默认设置（黑底白字）
 * 1 高亮显示
 * 7 反显
 * 8 不可见
 */
const COLOR_CODE = {
    black: 90,
    red: 91,
    green: 92,
    yellow: 93,
    blue: 94,
    purple: 95,
    cyan: 96,
    white: 97,
    // black_bg: 40,
    // red_bg: 41,
    // green_bg: 42,
    // yellow_bg: 43,
    // blue_bg: 44,
    // purple_bg: 45,
    // cyan_bg: 46,
    // white_bg: 47,
};
/**
 * 转换node使用的日志颜色
 * @param option 颜色类型配置
 * @param text 日志起始填充文本内容
 * @param type 日志类型
 * @returns string
 */
const baseColor = (option = {}, text, type) => {
    const { color = 'white', bgColor = 'white' } = option;
    const backgroundColor = COLOR_CODE[bgColor] || 0;
    const textColor = COLOR_CODE[color] || 0;
    if (typeof process === 'object' && process.title === 'node') {
        return `\x1b[${backgroundColor + 10};${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}\x1b[0m`;
    }
    else {
        return `\x1b[${backgroundColor + 10};${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}`;
    }
};
/**
 * 日志左侧填充的文字
 */
const padText = {
    info(text = "beautify-console-log info: -> ", style = { bgColor: 'blue', color: 'white' }) {
        return [baseColor(style, text, 'info')];
    },
    error(text = "beautify-console-log error: -> ", style = { bgColor: 'red', color: 'white' }) {
        return [baseColor(style, text, 'error')];
    },
    warn(text = "beautify-console-log warn: -> ", style = { bgColor: 'yellow', color: 'black' }) {
        return [baseColor(style, text, 'warn')];
    },
    log(text = "beautify-console-log log: -> ", style = { bgColor: 'green', color: 'white' }) {
        return [baseColor(style, text, 'log')];
    }
};
const infoKey = 'info';
const warnKey = 'warn';
const errorKey = 'error';
const logKey = 'log';
/**
 * BeautifyConsole 是console日志工具
 *
 * 目前只有常用的 info、log、error、warn类型
 *
 * 1.使用：
 * ```
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
 * 可参考 https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
class BeautifyConsole {
    constructor() {
        this.infoPadStartText = padText[infoKey]();
        this.errorPadStartText = padText[errorKey]();
        this.warnPadStartText = padText[warnKey]();
        this.logPadStartText = padText[logKey]();
        this.info = console.info.bind(this, ...this.infoPadStartText);
        this.error = console.error.bind(this, ...this.errorPadStartText);
        this.warn = console.warn.bind(this, ...this.warnPadStartText);
        this.log = console.log.bind(this, ...this.logPadStartText);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new BeautifyConsole();
        }
        return this.instance;
    }
    /**
     * 初始化配置项
     */
    config(config) {
        const { type = [infoKey, errorKey, warnKey, logKey], title } = config;
        if (type.length > 0) {
            this.setShowLog(false);
            type.forEach(item => this.setShowLog(true, item));
        }
        if (title) {
            type.forEach(item => this.setPadStartText({
                logType: item,
                title
            }));
        }
    }
    /**
     * 设置显示/隐藏console日志
     * @param showLog 是否打印日志 type { boolean }
     * @param type 需要设置的日志类型日志 type { logType }
     */
    setShowLog(showLog, type) {
        const setShowLogFunction = {
            info: () => {
                this.info = showLog ? console.info.bind(this, ...this.infoPadStartText) : (...parasm) => undefined;
            },
            error: () => {
                this.error = showLog ? console.error.bind(this, ...this.errorPadStartText) : (...parasm) => undefined;
            },
            warn: () => {
                this.warn = showLog ? console.warn.bind(this, ...this.warnPadStartText) : (...parasm) => undefined;
            },
            log: () => {
                this.log = showLog ? console.log.bind(this, ...this.logPadStartText) : (...parasm) => undefined;
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
     * @param type 需要设置的日志类型日志 type { logType }
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
     * @param type 需要设置的日志类型日志 type { logType }
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
     * @param type 需要设置的日志类型日志 type { logType }
     *
     * @returns BeautifyConsole
     */
    close(type) {
        this.setShowLog(false, type);
        return this;
    }
    /**
     * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
     * @param type type { consoleType }
     * @param text type { any }
     * @returns BeautifyConsole
     */
    setPadStartText(config) {
        try {
            const setTextFunction = {
                info: () => {
                    this.info = console.info.bind(this, ...padText[infoKey](config.title, config.style));
                },
                error: () => {
                    this.error = console.error.bind(this, ...padText[errorKey](config.title, config.style));
                },
                warn: () => {
                    this.warn = console.warn.bind(this, ...padText[warnKey](config.title, config.style));
                },
                log: () => {
                    this.log = console.log.bind(this, ...padText[logKey](config.title, config.style));
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
