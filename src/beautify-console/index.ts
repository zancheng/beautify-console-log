import { BaseColorType, ColorType, LogType, PadStartText } from "./model";

/**
 * 转换node使用的日志颜色
 * @param option 颜色类型配置
 * @param text 日志起始填充文本内容
 * @param type 日志类型
 * @returns string
 */
const baseColor = (
  option: BaseColorType = {},
  text: string,
  type: LogType,
): string => {
  const { color = ColorType.white, bgColor = ColorType.white } = option;
  const backgroundColor: number = (bgColor || 0) + 10;
  const textColor: number = color || 0;
  if (typeof process === "object" && process.title === "node") {
    return `\x1b[${
      backgroundColor
    };${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}\x1b[0m`;
  } else {
    return `\x1b[${
      backgroundColor
    };${textColor};1m ${type.toUpperCase()} \x1b[0m\x1b[100;97m ${text}`;
  }
};

/**
 * 日志左侧填充的文字
 */
const padText: Record<string, any> = {
  info(
    text: string = "beautify-console-log ",
    style: BaseColorType = { bgColor: ColorType.blue, color: ColorType.white },
  ) {
    return [baseColor(style, text, LogType.info)];
  },
  error(
    text: string = "beautify-console-log ",
    style: BaseColorType = { bgColor: ColorType.red, color: ColorType.white },
  ) {
    return [baseColor(style, text, LogType.error)];
  },
  warn(
    text: string = "beautify-console-log ",
    style: BaseColorType = {
      bgColor: ColorType.yellow,
      color: ColorType.black,
    },
  ) {
    return [baseColor(style, text, LogType.warn)];
  },
  log(
    text: string = "beautify-console-log ",
    style: BaseColorType = { bgColor: ColorType.green, color: ColorType.white },
  ) {
    return [baseColor(style, text, LogType.log)];
  },
};

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
export class BeautifyConsole {
  private infoPadStartText: string[] = padText[LogType.info]();
  private errorPadStartText: string[] = padText[LogType.error]();
  private warnPadStartText: string[] = padText[LogType.warn]();
  private logPadStartText: string[] = padText[LogType.log]();

  info = console.info.bind(this, ...this.infoPadStartText);
  error = console.error.bind(this, ...this.errorPadStartText);
  warn = console.warn.bind(this, ...this.warnPadStartText);
  log = console.log.bind(this, ...this.logPadStartText);

  private static instance: BeautifyConsole;

  public static getInstance(): BeautifyConsole {
    if (!this.instance) {
      this.instance = new BeautifyConsole();
    }
    return this.instance;
  }
  /**
   * 初始化配置项
   */
  public config(config: { type?: LogType[]; title?: string }) {
    const {
      type = [LogType.info, LogType.error, LogType.warn, LogType.log],
      title,
    } = config;
    if (type.length > 0) {
      this.setShowLog(false);
      type.forEach((item) => this.setShowLog(true, item));
    }
    if (title) {
      type.forEach((item) =>
        this.setPadStartText({
          logType: item,
          title,
        }),
      );
    }
  }

  /**
   * 设置显示/隐藏console日志
   * @param showLog 是否打印日志 type { boolean }
   * @param type 需要设置的日志类型日志 type { LogType }
   */
  private setShowLog(showLog: boolean, type?: LogType) {
    const setShowLogFunction = {
      info: () => {
        this.info = showLog
          ? console.info.bind(this, ...this.infoPadStartText)
          : (...parasm: any) => undefined;
      },
      error: () => {
        this.error = showLog
          ? console.error.bind(this, ...this.errorPadStartText)
          : (...parasm: any) => undefined;
      },
      warn: () => {
        this.warn = showLog
          ? console.warn.bind(this, ...this.warnPadStartText)
          : (...parasm: any) => undefined;
      },
      log: () => {
        this.log = showLog
          ? console.log.bind(this, ...this.logPadStartText)
          : (...parasm: any) => undefined;
      },
    };
    // 如果传入了要修改的console日志类型，就只改对应的显示隐藏，否则就更改所有的
    if (type) {
      if (setShowLogFunction[type]) {
        setShowLogFunction[type]();
      } else {
        console.error(`type:${type} not supported`);
      }
    } else {
      if (showLog) {
        this.info = console.info.bind(this, ...this.infoPadStartText);
        this.error = console.error.bind(this, ...this.errorPadStartText);
        this.warn = console.warn.bind(this, ...this.warnPadStartText);
        this.log = console.log.bind(this, ...this.logPadStartText);
      } else {
        this.info = (...parasm: any) => undefined;
        this.error = (...parasm: any) => undefined;
        this.warn = (...parasm: any) => undefined;
        this.log = (...parasm: any) => undefined;
      }
    }
  }

  /**
   * 重置console日志
   *
   * @param type 需要设置的日志类型日志 type { LogType }
   *
   * @returns BeautifyConsole
   */
  public reset(): BeautifyConsole {
    this.setShowLog(true);
    return this;
  }

  /**
   * 打开console日志
   *
   * @param type 需要设置的日志类型日志 type { LogType }
   *
   * @returns BeautifyConsole
   */
  public open(type?: LogType): BeautifyConsole {
    this.setShowLog(true, type);
    return this;
  }

  /**
   * 关闭console日志
   *
   * @param type 需要设置的日志类型日志 type { LogType }
   *
   * @returns BeautifyConsole
   */
  public close(type?: LogType): BeautifyConsole {
    this.setShowLog(false, type);
    return this;
  }

  /**
   * 重置开始的填充文本console日志，默认如info类型的开始填充： `cbeautify-console-log info: -> `
   * @param type type { consoleType }
   * @param text type { any }
   * @returns BeautifyConsole
   */
  public setPadStartText(config: PadStartText): BeautifyConsole {
    try {
      const setTextFunction = {
        info: () => {
          this.info = console.info.bind(
            this,
            ...padText[LogType.info](config.title, config.style),
          );
        },
        error: () => {
          this.error = console.error.bind(
            this,
            ...padText[LogType.error](config.title, config.style),
          );
        },
        warn: () => {
          this.warn = console.warn.bind(
            this,
            ...padText[LogType.warn](config.title, config.style),
          );
        },
        log: () => {
          this.log = console.log.bind(
            this,
            ...padText[LogType.log](config.title, config.style),
          );
        },
      };
      if (setTextFunction[config.logType]) {
        setTextFunction[config.logType]();
      } else {
        console.error(`type:${config.logType} not supported`);
      }
    } catch (error) {
      this.error(error);
    }
    return this;
  }
}
