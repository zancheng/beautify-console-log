/**
 * 基础配置
 * ```text
 * {
 *  type?: LogType[] | ('info' | 'log' | 'warn' | 'error')[];
 *  title?: string;
 * }
 * ```
 */
export interface BaseConfig {
    type?: LogType[] | ("info" | "log" | "warn" | "error")[];
    title?: string;
}
/**
 * 背景编号：
 *
 *  ``` text
 *  ColorType.black: 40黑，
 *  ColorType.red: 41红，
 *  ColorType.green: 42绿，
 *  ColorType.yellow: 43黄，
 *  ColorType.blue: 44蓝，
 *  ColorType.purple: 45紫，
 *  ColorType.cyan: 46深绿，
 *  ColorType.white: 47白色
 *  ```
 * 字色编号：
 * ``` text
 *  ColorType.black: 30黑，
 *  ColorType.red: 31红，
 *  ColorType.green: 32绿，
 *  ColorType.yellow: 33黄，
 *  ColorType.blue: 34蓝，
 *  ColorType.purple: 35紫，
 *  ColorType.cyan: 36深绿，
 *  ColorType.white: 37白色
 * ```
 * 30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
 * 0 终端默认设置（黑底白字）
 * 1 高亮显示
 * 7 反显
 * 8 不可见
 */
export declare enum ColorType {
    black = 90,
    red = 91,
    green = 92,
    yellow = 93,
    blue = 94,
    purple = 95,
    cyan = 96,
    white = 97
}
/**
 * 默认填充文本样式
 * ```text
 * {
 *  color?: ColorType;
 *  bgColor?: ColorType;
 * }
 * ```
 */
export interface BaseColorType {
    color?: ColorType;
    bgColor?: ColorType;
}
/**
 * 左侧填充文本样式
 * ```text
 * {
 *  color: ColorType;
 *  bgColor: ColorType;
 * }
 * ```
 */
export interface PadStartStyle {
    color: ColorType;
    bgColor: ColorType;
}
/**
 * 左侧填充文本接口
 * ```text
 * {
 *  title: string;
 *  logType: LogType | 'info' | 'log' | 'warn' | 'error';
 *  style?: PadStartStyle;
 * }
 * ```
 */
export interface PadStartText {
    title: string;
    logType: LogType | "info" | "log" | "warn" | "error";
    style?: PadStartStyle;
}
/**
 * 日志类型
 * ```
 * LogType.info = "info"
 * LogType.warn = "warn"
 * LogType.error = "error"
 * LogType.log = "log"
 * ```
 */
export declare enum LogType {
    info = "info",
    warn = "warn",
    error = "error",
    log = "log"
}
