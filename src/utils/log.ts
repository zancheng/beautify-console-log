/**
 * console日志工具
 * 
 * 目前只有常用的 info、log、error、warn类型
 * 
 * 1.使用：Log.getInstance(true).log(1, [2, 3], '4')
 * 
 * 2.设置显示/隐藏console日志：Log.setShowLog(true/false)
 * 
 * 3.设置开始的填充文本console日志：Log.setPadStartText()
 */
export class Log {
    info = (...parasm: any) => {}
    error = (...parasm: any) => {}
    warn = (...parasm: any) => {}
    log = (...parasm: any) => {}

    infoPadStartText: string[] = ['%cAIOT Wechat SDK info: -> ', 'color: #5D8EF0;']
    errorPadStartText: string[] = ['AIOT Wechat SDK error: -> ']
    warnPadStartText: string[] = ['AIOT Wechat SDK warn: -> ']
    logPadStartText: string[] = ['%cAIOT Wechat SDK log: -> ', 'color: green;']

    showLog:boolean = true

    private static instance: Log

    public static getInstance(): Log {
        if (!this.instance) {
            this.instance = new Log()
        }
        return this.instance
    }

    constructor () {}

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
            this.info = (...parasm: any) => {}
            this.error = (...parasm: any) => {}
            this.warn = (...parasm: any) => {}
            this.log = (...parasm: any) => {}
        }
    }

    /**
     * 打开console日志
     */
    public openLog() {
        this.setShowLog(true)
    }

    /**
     * 关闭console日志
     */
    public closeLog() {
        this.setShowLog(false)
    }

    /**
     * 置开始的填充文本console日志
     * @param type type { consoleType }
     * @param text type { any }
     */
    public setPadStartText(type: 'info' | 'error' | 'warn' | 'log', ...text: any) {
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
        setTextFunction[type]()
    }
}
