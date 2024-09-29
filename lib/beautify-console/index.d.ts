import { BaseConfig, LogType, PadStartText } from "./model";
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
export declare class BeautifyConsole {
    private infoPadStartText;
    private errorPadStartText;
    private warnPadStartText;
    private logPadStartText;
    /**
     * Print info type information
     */
    info: (...args: any[]) => void;
    /**
     * Print error type information
     */
    error: (...args: any[]) => void;
    /**
     * Print warn type information
     */
    warn: (...args: any[]) => void;
    /**
     * Print log type information
     */
    log: (...args: any[]) => void;
    private static instance;
    /**
     * Singleton mode
     */ static getInstance(): BeautifyConsole;
    /**
     * 初始化配置项
     * @param config 是否打印日志 type { BaseConfig: {type?: LogType[] | ('info' | 'log' | 'warn' | 'error')[]; title?: string} }
     * 如果配置了type，就只显示配置的日志类型
     */
    config(config: BaseConfig): void;
    /**
     * 设置显示/隐藏console日志
     * @param showLog 是否打印日志 type { boolean }
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     */
    private setShowLog;
    /**
     * 重置console日志
     *
     * @returns BeautifyConsole
     */
    reset(): BeautifyConsole;
    /**
     * 打开console日志
     *
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     *
     * @returns BeautifyConsole
     */
    open(type?: LogType | "info" | "log" | "warn" | "error"): BeautifyConsole;
    /**
     * 关闭console日志
     *
     * @param type 需要设置的日志类型日志 type { LogType | 'info' | 'log' | 'warn' | 'error' }
     *
     * @returns BeautifyConsole
     */
    close(type?: LogType | "info" | "log" | "warn" | "error"): BeautifyConsole;
    /**
     * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
     * @param title type { string }
     * @param logType type { logType | 'info' | 'log' | 'warn' | 'error' }
     * @param style type { PadStartStyle }
     * @returns BeautifyConsole
     */
    setPadStartText(config: PadStartText): BeautifyConsole;
}
