/**
 * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
 * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
 * 0 终端默认设置（黑底白字）
 * 1 高亮显示
 * 7 反显
 * 8 不可见
 */
const COLOR_CODE:Record<string, number> = {
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
}

interface BaseColorType {
    color?: string
    colorBg?: string
}

type logType = 'info' | 'error' | 'warn' | 'log'

interface PadStartStyle {
    color: string
    text: string
}

/**
 * 转换node使用的日志颜色
 * @param option 颜色类型配置
 * @param text 日志起始填充文本内容
 * @param type 日志类型
 * @returns string
 */
const baseColor = (option: BaseColorType = {}, text: string, type: logType):string => {
  const { color = 'white'} = option;
  const colorCode = COLOR_CODE[color] || 0
  if (typeof process === 'object' && process.title === 'node') {
    return `\x1b[${colorCode + 10};97;1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}\x1b[0m`;
  } else {
    return `\x1b[${colorCode + 10};97;1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}`;
  }
}

/**
 * 日志左侧填充的文字
 */
const padText: Record<string, any> = {
    info(text: string = "beautify-console-log info: -> ") {
        return [baseColor({
            color: 'blue',
        }, text, 'info')]
    },
    error(text: string = "beautify-console-log error: -> ") {
        return [baseColor({
            color: 'red'
        }, text, 'error')]
    },
    warn(text: string = "beautify-console-log warn: -> ") {
        return [baseColor({
            color: 'yellow'
        }, text, 'warn')]
    },
    log(text: string = "beautify-console-log log: -> ") {
        return [baseColor({
            color: 'green'
        }, text, 'log')]
    }
}

const infoKey = 'info'
const warnKey = 'warn'
const errorKey = 'error'
const logKey = 'log'

/**
 * BeautifyConsole 是console日志工具
 * 
 * 目前只有常用的 info、log、error、warn类型
 * 
 * 1.使用：Log.getInstance().log(1, [2, 3], '4')
 * 
 * 2.设置打开console日志显示：Log.openLog()
 * 
 * 3.设置关闭console日志显示：Log.closeLog()
 * 
 * 4.设置开始的填充文本console日志：Log.setPadStartText()
 * 
 * 
 * 可参考 https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
export class BeautifyConsole {

    private infoPadStartText: string[] = padText[infoKey]()
    private errorPadStartText: string[] = padText[errorKey]()
    private warnPadStartText: string[] = padText[warnKey]()
    private logPadStartText: string[] = padText[logKey]()
    
    info = console.info.bind(this, ...this.infoPadStartText)
    error = console.error.bind(this, ...this.errorPadStartText)
    warn = console.warn.bind(this, ...this.warnPadStartText)
    log = console.log.bind(this, ...this.logPadStartText)

    private static instance: BeautifyConsole

    public static getInstance(): BeautifyConsole {
        if (!this.instance) {
            this.instance = new BeautifyConsole()
        }
        return this.instance
    }

    /**
     * 设置显示/隐藏console日志
     * @param showLog 是否打印日志 type { boolean }
     * @param type 需要设置的日志类型日志 type { logType }
     */
    private setShowLog(showLog: boolean, type: logType | undefined) {
        const setShowLogFunction = {
            info: () => {
                this.info = showLog ? console.info.bind(this, ...this.infoPadStartText) : (...parasm: any) => undefined
            },
            error: () => {
                this.error = showLog ? console.error.bind(this, ...this.errorPadStartText) : (...parasm: any) => undefined
            },
            warn: () => {
                this.warn = showLog ? console.warn.bind(this, ...this.warnPadStartText) : (...parasm: any) => undefined
            },
            log: () => {
                this.log = showLog ? console.log.bind(this, ...this.logPadStartText) : (...parasm: any) => undefined
            },
        }
        // 如果传入了要修改的console日志类型，就只改对应的显示隐藏，否则就更改所有的
        if (type) {
            if (setShowLogFunction[type]) {
                setShowLogFunction[type]()
            } else {
                console.error(`type:${type} not supported`)
            }
        } else {
            if (showLog) {
                this.info = console.info.bind(this, ...this.infoPadStartText)
                this.error = console.error.bind(this, ...this.errorPadStartText)
                this.warn = console.warn.bind(this, ...this.warnPadStartText)
                this.log = console.log.bind(this, ...this.logPadStartText)
            } else {
                this.info = (...parasm: any) => undefined
                this.error = (...parasm: any) => undefined
                this.warn = (...parasm: any) => undefined
                this.log = (...parasm: any) => undefined
            }
        }
    }

    /**
     * 打开console日志
     * 
     * @param type 需要设置的日志类型日志 type { logType }
     * 
     * @returns BeautifyConsole
     */
    public open(type?: logType):BeautifyConsole {
        this.setShowLog(true, type)
        return this
    }

    /**
     * 关闭console日志
     * 
     * @param type 需要设置的日志类型日志 type { logType }
     * 
     * @returns BeautifyConsole
     */
    public close(type?: logType):BeautifyConsole {
        this.setShowLog(false, type)
        return this
    }

    /**
     * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
     * @param type type { consoleType }
     * @param text type { any }
     * @returns BeautifyConsole
     */
    public setPadStartText(type: logType, text: string):BeautifyConsole {
        const setTextFunction = {
            info: () => {
                this.info = console.info.bind(this, ...padText[infoKey](text))
            },
            error: () => {
                this.error = console.error.bind(this, ...padText[errorKey](text))
            },
            warn: () => {
                this.warn = console.warn.bind(this, ...padText[warnKey](text))
            },
            log: () => {
                this.log = console.log.bind(this, ...padText[logKey](text))
            },
        }
        if (setTextFunction[type]) {
            setTextFunction[type]()
        } else {
            console.error(`type:${type} not supported`)
        }
        return this
    }

    /**
     * 设置自定义填充美化
     * @param type 日志类型 type {logType}
     * @param style 自定义美化 type {PadStartStyle}
     */
    // public setPadStartStyle(type: logType, style: PadStartStyle) {
    //     const setStyleFunction = {
    //         info: () => {
    //             this.infoPadStartText[1] = style.text
    //             this.info = console.info.bind(this, ...this.infoPadStartText)
    //         },
    //         error: () => {
    //             this.errorPadStartText[1] = style.text
    //             this.error = console.error.bind(this, ...this.errorPadStartText)
    //         },
    //         warn: () => {
    //             this.warnPadStartText[1] = style.text
    //             this.warn = console.warn.bind(this, ...this.warnPadStartText)
    //         },
    //         log: () => {
    //             this.logPadStartText[1] = style.text
    //             this.log = console.log.bind(this, ...this.logPadStartText)
    //         },
    //     }
    //     if (setStyleFunction[type]) {
    //         setStyleFunction[type]()
    //     } else {
    //         console.error(`type:${type} not supported`)
    //     }
    //     return this
    // }
}


