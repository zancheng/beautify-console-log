// 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
// 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
// 0 终端默认设置（黑底白字）
// 1 高亮显示
// 7 反显
// 8 不可见

const COLOR_CODE:Record<string, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  purple: 35,
  cyan: 36,
  white: 37,
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

const baseColor = (option: BaseColorType = {}):string => {
  const { color = 'white', colorBg = '' } = option;
  const colorBgCode = COLOR_CODE[colorBg] ? COLOR_CODE[colorBg] + 10 : 0
  const colorCode = COLOR_CODE[color] || 0
  return `${'\x1b'}[${colorBgCode};${colorCode}m`;
}
console.log('process')
const padText: Record<string, any> = {
    info() {
        if (typeof process === 'object') {
            return [baseColor({
                color: 'blue'
            }), 'beautify-console-log info: -> ']
        } else {
            return ['%cbeautify-console-log info: -> ', 'color: #5D8EF0;']
        }
    },
    error() {
        if (typeof process === 'object') {
            return [baseColor({
                color: 'red'
            }), 'beautify-console-log error: -> ']
        } else {
            return ['beautify-console-log error: -> ']
        }
    },
    warn() {
        if (typeof process === 'object') {
            return [baseColor({
                color: 'yellow'
            }), 'beautify-console-log warn: -> ']
        } else {
            return ['beautify-console-log warn: -> ']
        }
    },
    log() {
        if (typeof process === 'object') {
            return [baseColor({
                color: 'green'
            }), 'beautify-console-log log: -> ']
        } else {
            return ['%cbeautify-console-log log: -> ', 'color: green;']
        }
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
     * @param showLog type { boolean }
     */
    private setShowLog(showLog: boolean) {
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

    /**
     * 打开console日志
     * 
     * @returns BeautifyConsole
     */
    public openLog():BeautifyConsole {
        this.setShowLog(true)
        return this
    }

    /**
     * 关闭console日志
     * 
     * @returns BeautifyConsole
     */
    public closeLog():BeautifyConsole {
        this.setShowLog(false)
        return this
    }

    /**
     * 置开始的填充文本console日志
     * @param type type { consoleType }
     * @param text type { any }
     * @returns BeautifyConsole
     */
    public setPadStartText(type: 'info' | 'error' | 'warn' | 'log', ...text: any):BeautifyConsole {
        const setTextFunction = {
            info: () => {
                this.info = console.info.bind(this, ...text)
            },
            error: () => {
                this.error = console.error.bind(this, ...text)
            },
            warn: () => {
                this.warn = console.warn.bind(this, ...text)
            },
            log: () => {
                this.log = console.log.bind(this, ...text)
            },
            undefined: () => {
                console.log(undefined)
            }
        }
        setTextFunction[type || undefined]()
        return this
    }
}
