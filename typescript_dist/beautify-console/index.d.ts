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
export declare class BeautifyConsole {
    private infoPadStartText;
    private errorPadStartText;
    private warnPadStartText;
    private logPadStartText;
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    log: (...args: any[]) => void;
    private static instance;
    static getInstance(): BeautifyConsole;
    constructor();
    /**
     * 设置显示/隐藏console日志
     * @param showLog type { boolean }
     */
    private setShowLog;
    /**
     * 打开console日志
     *
     * @returns BeautifyConsole
     */
    openLog(): BeautifyConsole;
    /**
     * 关闭console日志
     *
     * @returns BeautifyConsole
     */
    closeLog(): BeautifyConsole;
    /**
     * 置开始的填充文本console日志
     * @param type type { consoleType }
     * @param text type { any }
     * @returns BeautifyConsole
     */
    setPadStartText(type: 'info' | 'error' | 'warn' | 'log', ...text: any): BeautifyConsole;
}
