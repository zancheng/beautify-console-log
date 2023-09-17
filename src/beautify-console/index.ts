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

    private infoPadStartText: string[] = ['%cbeautify-console info: -> ', 'color: #5D8EF0;']
    private errorPadStartText: string[] = ['beautify-console error: -> ']
    private warnPadStartText: string[] = ['beautify-console warn: -> ']
    private logPadStartText: string[] = ['%cbeautify-console log: -> ', 'color: green;']
    
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
