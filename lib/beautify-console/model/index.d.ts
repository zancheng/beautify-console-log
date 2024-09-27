/**
 * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
 * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
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
export interface BaseColorType {
    color?: ColorType;
    bgColor?: ColorType;
}
export interface PadStartStyle {
    color: ColorType;
    bgColor: ColorType;
}
/**
 * 左侧填充文本接口
 */
export interface PadStartText {
    title: string;
    logType: LogType;
    style?: PadStartStyle;
}
/**
 * 日志类型
 */
export declare enum LogType {
    info = "info",
    warn = "warn",
    error = "error",
    log = "log"
}
