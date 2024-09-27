"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogType = exports.ColorType = void 0;
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
var ColorType;
(function (ColorType) {
    ColorType[ColorType["black"] = 90] = "black";
    ColorType[ColorType["red"] = 91] = "red";
    ColorType[ColorType["green"] = 92] = "green";
    ColorType[ColorType["yellow"] = 93] = "yellow";
    ColorType[ColorType["blue"] = 94] = "blue";
    ColorType[ColorType["purple"] = 95] = "purple";
    ColorType[ColorType["cyan"] = 96] = "cyan";
    ColorType[ColorType["white"] = 97] = "white";
    // black_bg: 40,
    // red_bg: 41,
    // green_bg: 42,
    // yellow_bg: 43,
    // blue_bg: 44,
    // purple_bg: 45,
    // cyan_bg: 46,
    // white_bg: 47,
})(ColorType || (exports.ColorType = ColorType = {}));
/**
 * 日志类型
 * ```
 * LogType.info = "info"
 * LogType.warn = "warn"
 * LogType.error = "error"
 * LogType.log = "log"
 * ```
 */
var LogType;
(function (LogType) {
    LogType["info"] = "info";
    LogType["warn"] = "warn";
    LogType["error"] = "error";
    LogType["log"] = "log";
})(LogType || (exports.LogType = LogType = {}));
