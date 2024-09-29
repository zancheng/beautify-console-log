"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConsoleStr = void 0;
/**
 * 格式化字符串，用于兼容console.log('string=%s number=%d', 'string', 1)的写法，把参数进行格式化
 * @param params any[]
 * @returns
 */
function formatConsoleStr(...params) {
    let paramArray = params.slice(1);
    const formatRegExp = /%[sdof]/g;
    if (params.length > 1 && typeof params[0] === 'string') {
        let i = 0;
        const newArray = params[0].split(/(%s|%d|%o|%f)/g);
        const str = params[0].replace(formatRegExp, function (result) {
            i++;
            let index = -1;
            switch (result) {
                case '%s':
                    paramArray = paramArray.slice(1);
                    index = newArray.indexOf('%s');
                    if (index > -1) {
                        newArray[index] = params[i] ? String(params[i]) : '';
                    }
                    return String(params[i]);
                case '%d':
                    paramArray = paramArray.slice(1);
                    index = newArray.indexOf('%d');
                    if (index > -1) {
                        newArray[index] = params[i] ? Number(params[i]) : '';
                    }
                    return Number(params[i]);
                case '%o':
                    index = newArray.indexOf('%o');
                    try {
                        if (params[i] instanceof Error) {
                            paramArray = paramArray.slice(1);
                            if (index > -1) {
                                newArray[index] = params[i] ? JSON.stringify(params[i], ['message', 'stack', 'type', 'name']) : '';
                            }
                            return JSON.stringify(params[i], ['message', 'stack', 'type', 'name']);
                        }
                        else {
                            paramArray = paramArray.slice(1);
                            if (index > -1) {
                                if (typeof global !== 'undefined' && global) {
                                    // 当前代码在Node.js环境中运行
                                    newArray[index] = params[i] ? JSON.stringify(params[i]) : '';
                                }
                                else {
                                    // 当前代码不在Node.js环境中运行
                                    newArray[index] = params[i] ? params[i] : '';
                                }
                            }
                            return params[i];
                        }
                    }
                    catch (e) {
                        paramArray = paramArray.slice(1);
                        index = newArray.indexOf('%o');
                        if (index > -1) {
                            newArray[index] = params[i] ? '[Circular]' : '';
                        }
                        return '[Circular]';
                    }
                case '%f':
                    paramArray = paramArray.slice(1);
                    index = newArray.indexOf('%o');
                    if (index > -1) {
                        newArray[index] = params[i] ? Number.parseFloat(params[i]) : '';
                    }
                    return Number.parseFloat(params[i]);
                default:
                    paramArray = paramArray.slice(1);
                    newArray[index] = params[i] ? params[i] : '';
                    return params[i];
            }
        });
        paramArray.splice(0, 0, str);
        if (newArray.length < params.length) {
            for (let i = newArray.length; i < params.length; i++) {
                newArray[i] = params[i];
            }
        }
        return newArray;
    }
    else {
        return paramArray;
    }
}
exports.formatConsoleStr = formatConsoleStr;
