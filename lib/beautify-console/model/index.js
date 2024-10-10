"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogType = exports.ColorType = void 0;
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
