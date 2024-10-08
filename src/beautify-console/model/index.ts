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
 *  ColorType.black: 100黑，
 *  ColorType.red: 101红，
 *  ColorType.green: 102绿，
 *  ColorType.yellow: 103黄，
 *  ColorType.blue: 104蓝，
 *  ColorType.purple: 105紫，
 *  ColorType.cyan: 106深绿，
 *  ColorType.white: 107白色
 *  ```
 * 字色编号：
 * ``` text
 *  ColorType.black: 90黑，
 *  ColorType.red: 91红，
 *  ColorType.green: 92绿，
 *  ColorType.yellow: 93黄，
 *  ColorType.blue: 94蓝，
 *  ColorType.purple: 95紫，
 *  ColorType.cyan: 96深绿，
 *  ColorType.white: 97白色
 * ```
 * 90黑，91红，92绿，93黄，94蓝，95紫，96深绿，97白色
 * 0 终端默认设置（黑底白字）
 * 1 高亮显示
 * 7 反显
 * 8 不可见
 */
export enum ColorType {
  black = 90,
  red = 91,
  green = 92,
  yellow = 93,
  blue = 94,
  purple = 95,
  cyan = 96,
  white = 97,
}

/**
 * 默认填充文本样式
 * ```text
 * {
 *  color?: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
 *  bgColor?: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
 * }
 * ```
 */
export interface BaseColorType {
  color?: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
  bgColor?: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
}

// type logType = 'info' | 'error' | 'warn' | 'log'

/**
 * 左侧填充文本样式
 * ```text
 * {
 *  color: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
 *  bgColor: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
 * }
 * ```
 */
export interface PadStartStyle {
  color: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
  bgColor: ColorType | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white';
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
export enum LogType {
  info = "info",
  warn = "warn",
  error = "error",
  log = "log",
}
