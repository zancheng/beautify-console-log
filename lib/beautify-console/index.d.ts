type logType = 'info' | 'error' | 'warn' | 'log';
interface PadStartStyle {
    color: string;
    bgColor: string;
}
interface PadStartText {
    title: string;
    logType: logType;
    style?: PadStartStyle;
}
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
    /**
     * 初始化配置项
     */
    config(config: {
        type?: logType[];
        title?: string;
    }): void;
    /**
     * 设置显示/隐藏console日志
     * @param showLog 是否打印日志 type { boolean }
     * @param type 需要设置的日志类型日志 type { logType }
     */
    private setShowLog;
    /**
     * 重置console日志
     *
     * @param type 需要设置的日志类型日志 type { logType }
     *
     * @returns BeautifyConsole
     */
    reset(): BeautifyConsole;
    /**
     * 打开console日志
     *
     * @param type 需要设置的日志类型日志 type { logType }
     *
     * @returns BeautifyConsole
     */
    open(type?: logType): BeautifyConsole;
    /**
     * 关闭console日志
     *
     * @param type 需要设置的日志类型日志 type { logType }
     *
     * @returns BeautifyConsole
     */
    close(type?: logType): BeautifyConsole;
    /**
     * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
     * @param type type { consoleType }
     * @param text type { any }
     * @returns BeautifyConsole
     */
    setPadStartText(config: PadStartText): BeautifyConsole;
}
export {};
