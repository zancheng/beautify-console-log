import { formatConsoleStr } from "../utils";
import { BaseConfig, ColorType, LogType } from "../beautify-console/model";
import BeautifyConsole from "../index";

test("BeautifyConsole test", () => {
  const log = BeautifyConsole.getInstance();
  const log2 = new BeautifyConsole();
  log2.info('log2', 111111);
  expect(log.info(1234, "4", [3, 5])).toBe(undefined);
  expect(formatConsoleStr("string=%s number=%d", "string", 1)).toStrictEqual([
    "string=",
    "string",
    " number=",
    1,
    "",
  ]);
  log.config({
    title: '222',
    type: ['error', 'info', 'log'],
  })
  log.setPadStartText({
    style: {
      color: "green",
      bgColor: ColorType.blue,
    },
    title: "",
    logType: "info"
  })
  log.setPadStartText({
    style: {
      color: "green",
      bgColor: ColorType.blue,
    },
    title: "",
    logType: "info"
  })
  expect(
    log.info(formatConsoleStr("string=%s number=%d", "string", 1).join("")),
  ).toBe(undefined);
  expect(
    log.info(formatConsoleStr("object=%o", { name: "chengzan" }).join("")),
  ).toBe(undefined);
  expect(log.log({ name: "chengzan" })).toBe(undefined);
  expect(log.close().warn('warn')).toBe(undefined);
  expect(log.open().log('log')).toBe(undefined);
  expect(log.error('error')).toBe(undefined);
  expect(log.warn('warn')).toBe(undefined);
  expect(
    log
      .setPadStartText({
        title: "hello world ->",
        logType: "info",
      })
      .log(1234),
  ).toBe(undefined);
  expect(
    log
      .setPadStartText({
        title: "hello world ->",
        logType: LogType.info,
      })
      .info("info"),
  ).toBe(undefined);
});

describe("formatConsoleStr", () => {
  test("falsy arguments are kept instead of swallowed", () => {
    expect(formatConsoleStr("val=%s", 0)).toStrictEqual(["val=", "0", ""]);
    expect(formatConsoleStr("val=%d", 0)).toStrictEqual(["val=", 0, ""]);
    expect(formatConsoleStr("v=%s", false)).toStrictEqual([
      "v=",
      "false",
      "",
    ]);
  });

  test("%f placeholder is formatted", () => {
    expect(formatConsoleStr("f=%f", 3.14)).toStrictEqual(["f=", 3.14, ""]);
  });

  test("arguments not consumed by placeholders are appended", () => {
    expect(formatConsoleStr("a=%s b=%s", "x", "y", "z")).toStrictEqual([
      "a=",
      "x",
      " b=",
      "y",
      "",
      "z",
    ]);
  });

  test("repeated placeholders consume arguments in order", () => {
    // 首尾都是占位符时，split 会在两端各留下一个空片段
    expect(formatConsoleStr("%s-%s", "a", "b")).toStrictEqual([
      "",
      "a",
      "-",
      "b",
      "",
    ]);
  });

  test("returns remaining args when there is no format string", () => {
    expect(formatConsoleStr("plain", 1)).toStrictEqual(["plain", 1]);
    expect(formatConsoleStr(1)).toStrictEqual([]);
  });

  test("%o keeps the original behavior across value kinds", () => {
    expect(formatConsoleStr("o=%o", { a: 1 })).toStrictEqual([
      "o=",
      '{"a":1}',
      "",
    ]);

    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(formatConsoleStr("o=%o", circular)).toStrictEqual([
      "o=",
      "[Circular]",
      "",
    ]);

    // Error 的属性不可枚举，需要白名单才能序列化出来
    const formatted = formatConsoleStr("e=%o", new Error("boom"));
    expect(formatted[0]).toBe("e=");
    expect(String(formatted[1])).toContain('"message":"boom"');
  });
});

describe("setPadStartText", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const emitInfoAfter = (act: (log: BeautifyConsole) => void) => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "MY-TITLE", logType: "info" });
    spy.mockClear();
    act(log);
    const calls = spy.mock.calls;
    return calls.length > 0 ? String(calls[0][0]) : "";
  };

  test("custom title survives open()", () => {
    // open/close/reset/config 都会重建绑定，之前会退回成默认的标题
    expect(emitInfoAfter((log) => log.open().info("x"))).toContain("MY-TITLE");
  });

  test("custom title survives reset()", () => {
    expect(emitInfoAfter((log) => log.reset().info("x"))).toContain("MY-TITLE");
  });

  test("custom title survives close().open()", () => {
    expect(
      emitInfoAfter((log) => log.close().open().info("x")),
    ).toContain("MY-TITLE");
  });

  test("custom title survives config()", () => {
    expect(
      emitInfoAfter((log) => {
        log.config({ type: ["info"] });
        log.info("x");
      }),
    ).toContain("MY-TITLE");
  });

  test("unsupported logType reports an error instead of throwing", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    expect(() =>
      log.setPadStartText({ title: "t", logType: "nope" as LogType }),
    ).not.toThrow();
    expect(spy).toHaveBeenCalled();
  });
});

describe("console method binding", () => {
  // 日志方法必须保持 bind 形式：bind 不产生额外的 JS 调用帧，
  // 浏览器 DevTools 才能把行号定位到调用方的代码行。
  // 一旦改成包装函数/箭头函数，README 主打的行号能力就会失效。
  test("log methods stay bound to console", () => {
    const log = new BeautifyConsole();
    expect(log.info.name.startsWith("bound ")).toBe(true);
    expect(log.log.name.startsWith("bound ")).toBe(true);
    expect(log.warn.name.startsWith("bound ")).toBe(true);
    expect(log.error.name.startsWith("bound ")).toBe(true);
  });

  test("setPadStartText rebuilds with bind too", () => {
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "T", logType: "info" });
    expect(log.info.name.startsWith("bound ")).toBe(true);
  });
});

// 环境判断走 process.versions.node + 有无 window，测试里显式指定，避免依赖真实运行环境
const originalNodeVersion = process.versions.node;
const globals = global as unknown as Record<string, unknown>;
const setProcessNode = (hasNode: boolean) => {
  Object.defineProperty(process.versions, "node", {
    value: hasNode ? originalNodeVersion : undefined,
    configurable: true,
  });
};
const setWindow = (hasWindow: boolean) => {
  if (hasWindow) {
    globals.window = {};
  } else {
    delete globals.window;
  }
};
// node：有 process.versions.node 且没有 window
const useNodeEnv = () => {
  setProcessNode(true);
  setWindow(false);
};
// 浏览器：没有 process.versions.node，有 window
const useBrowserEnv = () => {
  setProcessNode(false);
  setWindow(true);
};

describe("badge colors", () => {
  beforeEach(() => {
    // node 分支输出 ANSI 转义序列
    useNodeEnv();
  });

  afterEach(() => {
    useNodeEnv();
    jest.restoreAllMocks();
  });

  // 返回最后一次 info 调用的日志头前缀（node 环境下是 ANSI 字符串）
  const infoPrefixAfter = (
    style: { color: ColorType; bgColor: ColorType },
    title = "T",
  ) => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({ title, logType: "info", style });
    log.info("x");
    const calls = spy.mock.calls;
    return String(calls[calls.length - 1][0]);
  };

  test("same color and bgColor falls back to a contrasting text color", () => {
    // 红底红字会看不见，应自动变成红底白字：[101;97;1m 而不是 [101;91;1m
    expect(
      infoPrefixAfter({ color: ColorType.red, bgColor: ColorType.red }),
    ).toContain("[101;97;1m");
  });

  test("yellow / white background picks black text", () => {
    expect(
      infoPrefixAfter({ color: ColorType.yellow, bgColor: ColorType.yellow }),
    ).toContain("[103;90;1m");
  });

  test("different color and bgColor are kept as is", () => {
    expect(
      infoPrefixAfter({ color: ColorType.white, bgColor: ColorType.purple }),
    ).toContain("[105;97;1m");
  });

  test("omitting style restores the default colors", () => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({
      title: "T",
      logType: "info",
      style: { color: ColorType.red, bgColor: ColorType.red },
    });
    log.setPadStartText({ title: "T", logType: "info" });
    log.info("x");
    const calls = spy.mock.calls;
    // info 默认是蓝底白字
    expect(String(calls[calls.length - 1][0])).toContain("[104;97;1m");
  });
});

describe("config", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("logType works as an alias of type", () => {
    const infoSpy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const warnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.config({ title: "T", logType: [LogType.info] });
    infoSpy.mockClear();
    warnSpy.mockClear();

    log.info("show");
    log.warn("hidden");

    expect(infoSpy).toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(String(infoSpy.mock.calls[0][0])).toContain("T");
  });

  test("a single type instead of an array does not throw", () => {
    const log = new BeautifyConsole();
    expect(() =>
      log.config({ type: "info" } as unknown as BaseConfig),
    ).not.toThrow();
  });
});

describe("browser (%c) styling", () => {
  // baseColor 用 isNodeEnv() 判断运行环境：没有 process.versions.node / 有 window 都算浏览器
  beforeEach(() => {
    useBrowserEnv();
  });

  afterEach(() => {
    useNodeEnv();
    jest.restoreAllMocks();
  });

  test("browser uses %c css styles instead of ansi", () => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.info("x");

    const [format, badgeStyle, titleStyle] = spy.mock.calls[0];
    expect(String(format)).toContain("%c INFO %c");
    expect(String(badgeStyle)).toContain("background:#5555ff");
    expect(String(badgeStyle)).toContain("color:#ffffff");
    expect(String(titleStyle)).toContain("background:");
  });

  test("% in the title is escaped so it is not treated as a placeholder", () => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "100% done", logType: "info" });
    log.info("x");

    const calls = spy.mock.calls;
    expect(String(calls[calls.length - 1][0])).toContain("100%% done");
  });

  test("empty title drops the title segment", () => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "", logType: "info" });
    log.info("x");

    const calls = spy.mock.calls;
    // 没有标题时只有徽章的格式串和一条样式，不会出现第二个 %c
    expect(String(calls[calls.length - 1][0])).toBe("%c INFO ");
    expect(calls[calls.length - 1].length).toBe(3); // 格式串 + 样式 + 用户参数
  });

  test("a process shim with window is still treated as browser", () => {
    // 浏览器里被注入 process 垫片时 process.versions.node 也会存在，
    // 但有 window，应该继续走 %c
    setProcessNode(true);
    setWindow(true);

    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.info("x");

    expect(String(spy.mock.calls[0][0])).toContain("%c INFO %c");
  });
});
