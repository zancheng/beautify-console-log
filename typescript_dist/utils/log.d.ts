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
export declare class Log {
    info: (...parasm: any) => void;
    error: (...parasm: any) => void;
    warn: (...parasm: any) => void;
    log: (...parasm: any) => void;
    infoPadStartText: string[];
    errorPadStartText: string[];
    warnPadStartText: string[];
    logPadStartText: string[];
    showLog: boolean;
    private static instance;
    static getInstance(): Log;
    constructor();
    /**
     * 设置显示/隐藏console日志
     * @param showLog type { boolean }
     */
    private setShowLog;
    /**
     * 打开console日志
     */
    openLog(): void;
    /**
     * 关闭console日志
     */
    closeLog(): void;
    /**
     * 置开始的填充文本console日志
     * @param type type { consoleType }
     * @param text type { any }
     */
    setPadStartText(type: 'info' | 'error' | 'warn' | 'log', ...text: any): void;
}
